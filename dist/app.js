"use strict";

const byId = id => document.getElementById(id);
const element = (tag, value, className) => {
  const node = document.createElement(tag);
  if (value) node.textContent = value;
  if (className) node.className = className;
  return node;
};
const sourceLink = (label, url, className) => {
  const link = element("a", label, className);
  link.href = url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  return link;
};

function fold(value) {
  return simplifyCharacters(value.normalize("NFKC").toLowerCase())
    .replace(/[\s：:·・／/]/g, "");
}

function match(query, ...fields) {
  return fields.some(field => field && fold(String(field)).includes(query)) || !query;
}

const workByName = new Map(works.map(work => [work.name, work]));
const personByName = new Map(people.map(person => [person.name, person]));
const pillars = ["素還真", "一頁書", "葉小釵"].map(name => personByName.get(name));
const orderedWorks = works.slice().sort((first, second) => {
  if (first.era !== second.era) return eras.indexOf(first.era) - eras.indexOf(second.era);
  return (second.release ?? String(second.year ?? 0)).localeCompare(first.release ?? String(first.year ?? 0));
});
const orderedPeople = people.slice().sort((first, second) => first.name.localeCompare(second.name, "zh-Hant"));

const dialog = byId("detail");
const detailBody = byId("detail-body");
const close = dialog.querySelector(".close");
close.addEventListener("click", () => dialog.close());
dialog.addEventListener("click", event => {
  if (event.target === dialog) dialog.close();
});

function modalButton(text, open) {
  const button = element("button", text, "text-action");
  button.type = "button";
  button.addEventListener("click", open);
  return button;
}

function openDetail(item, kind) {
  const isWork = kind === "work";
  const tag = element("p", item.type, "tag");
  const heading = element("h2", item.name);
  heading.id = "detail-title";
  const fields = element("dl", "", "detail-fields");
  const actions = element("div", "", "detail-actions");
  const addField = (label, value) => {
    if (!value) return;
    const row = element("div");
    const contents = element("dd");
    contents.append(value);
    row.append(element("dt", label), contents);
    fields.append(row);
  };
  if (isWork) {
    addField(item.release ? "發行日期" : item.year ? "發行年份" : "目錄年代", String(item.release ?? item.year ?? item.era));
    addField("篇幅", item.episodes);
    if (item.alias !== item.name) addField("目錄短名", item.alias);
    const appearances = people.filter(person => person.debut === item.name);
    for (const person of appearances) {
      addField("初登場", modalButton(person.name + " · " + person.episode, () => openDetail(person, "person")));
    }
  } else {
    if (item.title !== item.name) addField("稱號或身份", item.title);
    if (item.debut) {
      const work = workByName.get(item.debut);
      addField("初登場", modalButton(item.debut + " · " + item.episode, () => openDetail(work, "work")));
    }
  }
  detailBody.replaceChildren(tag, heading);
  if (item.summary) detailBody.append(element("p", item.summary));
  if (fields.childElementCount) detailBody.append(fields);
  actions.append(sourceLink(isWork ? "查看官方作品資料" : "查看官方角色資料", item.url, "text-action"));
  if (isWork && ["霹靂正劇", "英雄戰紀", "霹靂電影"].includes(item.type)) {
    actions.append(sourceLink("前往 PILI 線上看", watch, "text-action"));
  }
  if (!isWork && item.related) {
    const related = element("div", "", "detail-actions");
    related.append(element("strong", "相關人物"));
    for (const name of item.related) {
      const person = personByName.get(name);
      if (person) related.append(modalButton(name, () => openDetail(person, "person")));
    }
    detailBody.append(related);
  }
  detailBody.append(actions);
  localizeContent(detailBody);
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  close.focus();
}

function itemButton(item, kind) {
  const button = element("button", "", "item");
  button.type = "button";
  const subtitle = kind === "work"
    ? [item.year ?? item.era, item.type].filter(Boolean).join(" · ")
    : [item.title === item.name ? "" : item.title, item.type].filter(Boolean).join(" · ");
  button.append(element("small", subtitle), element("strong", item.name));
  button.addEventListener("click", () => openDetail(item, kind));
  return button;
}

function selectOptions(select, choices) {
  for (const value of choices) {
    const option = element("option", value);
    option.value = value;
    select.append(option);
  }
}

function addSearch({ kind, items, types, filter, pageSize, countText, empty }) {
  const search = byId(kind + "-search");
  const type = byId(kind + "-type");
  const era = byId(kind + "-era");
  const output = byId(kind + "-results");
  const count = byId(kind + "-count");
  const more = byId(kind + "-more");
  const reset = byId(kind + "-reset");
  selectOptions(type, types);
  if (era) selectOptions(era, eras.filter(label => items.some(item => item.era === label)));
  let limit = pageSize;

  function render() {
    const query = fold(search.value.trim());
    const found = items.filter(item =>
      (!type.value || type.value === item.type)
      && (!era?.value || era.value === item.era)
      && filter(item, query, type.value)
    );
    const visible = found.slice(0, limit);
    count.textContent = countText(found.length, visible.length, query, type.value);
    more.hidden = found.length <= visible.length;
    output.replaceChildren(...visible.map(item => itemButton(item, kind)));
    if (!visible.length) output.append(element("p", empty, "empty"));
    localizeContent(count);
    localizeContent(output);
  }

  const filterChanged = () => { limit = pageSize; render(); };
  search.addEventListener("input", filterChanged);
  type.addEventListener("change", filterChanged);
  era?.addEventListener("change", filterChanged);
  reset?.addEventListener("click", () => {
    search.value = "";
    type.value = "";
    era.value = "";
    filterChanged();
    search.focus();
  });
  more.addEventListener("click", () => {
    const firstNewIndex = limit;
    limit += pageSize;
    render();
    output.children[firstNewIndex]?.focus();
  });
  render();
}

addSearch({
  kind: "work", items: orderedWorks, types: [...new Set(orderedWorks.map(work => work.type))], pageSize: 12,
  filter: (work, query) => match(query, work.name, work.alias, work.year, work.type, work.era),
  countText: (total, shown) => total > shown ? `共 ${total} 部，顯示 ${shown} 部` : `共 ${total} 部作品`,
  empty: "找不到符合條件的作品。可縮短關鍵字，或清除篩選。"
});

addSearch({
  kind: "person", items: orderedPeople, types: ["三位台柱", "三教先天", "中原與江湖", "異境與對手", "近年人物", "東離劍遊紀"], pageSize: 12,
  filter: (person, query, type) => (query || type || !person.mark) && match(query, person.name, person.title, person.debut),
  countText: (total, shown, query, type) => {
    const label = query || type ? "符合條件" : "更多人物";
    return total > shown ? `${label} ${total} 位，顯示 ${shown} 位` : `${label} ${total} 位`;
  },
  empty: "找不到符合條件的人物。可改用姓名、稱號或初登場劇名。"
});

byId("work-total").textContent = works.length;
byId("person-total").textContent = people.length;
for (const person of pillars) {
  const button = element("button", "", "pillar");
  button.type = "button";
  button.style.setProperty("--tone", person.color);
  button.dataset.mark = person.mark;
  button.append(element("span", person.title), element("strong", person.name), element("small", person.debut + " · " + person.episode));
  button.addEventListener("click", () => openDetail(person, "person"));
  byId("pillars").append(button);
}

for (const [year, name, summary, url] of timeline) {
  const item = element("article");
  const time = element("time", String(year));
  time.dateTime = String(year);
  item.append(time, element("h3", name), element("p", summary), sourceLink("查閱來源", url));
  byId("timeline-list").append(item);
}
for (const [id, entries] of [["world-list", world], ["craft-list", crafts]]) {
  for (const [title, summary, url] of entries) {
    const item = element("article");
    item.append(element("h3", title), element("p", summary), sourceLink("延伸閱讀", url));
    byId(id).append(item);
  }
}
for (const [label, url] of sources) {
  byId("source-list").append(sourceLink(label, url));
}
for (const button of document.querySelectorAll("[data-work]")) {
  button.addEventListener("click", () => {
    const work = workByName.get(button.dataset.work) ?? works.find(item => item.alias === button.dataset.work);
    if (work) openDetail(work, "work");
  });
}
byId("find-link").addEventListener("click", () => byId("work-search").focus({ preventScroll: true }));
initializeLanguagePicker();
