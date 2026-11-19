"use strict";

const languages = ["zh-Hant", "zh-Hans"];
const languageStorageKey = "pili-archive-language";
const originalText = new WeakMap();
const originalAttributes = new WeakMap();
const translatedAttributes = ["alt", "aria-label", "content", "data-mark", "placeholder"];
const simplifiedPhrases = {
  "原著": "原著",
  "錄影帶": "录像带",
  "串流": "流媒体",
  "原聲帶": "原声专辑",
  "後製": "后期制作",
  "數位": "数字",
  "計畫": "计划",
  "藉此": "借此",
  "淚始乾": "泪始干",
  "影片": "视频"
};
const phrasePattern = new RegExp(`(${Object.keys(simplifiedPhrases).join("|")})`, "u");

function initialLanguage() {
  const requested = new URLSearchParams(location.search).get("lang");
  if (languages.includes(requested)) return requested;
  try {
    const saved = localStorage.getItem(languageStorageKey);
    if (languages.includes(saved)) return saved;
  } catch {
    // The language picker also works when browser storage is unavailable.
  }
  return "zh-Hant";
}

let siteLanguage = initialLanguage();

function simplifyCharacters(value) {
  return Array.from(value, char => simplifiedCharacters[char] ?? char).join("");
}

function displayLanguage(value) {
  if (siteLanguage === "zh-Hant") return value;
  return value.split(phrasePattern)
    .map(part => simplifiedPhrases[part] ?? simplifyCharacters(part)).join("");
}

function localizeAttribute(node, attribute) {
  if (!node.hasAttribute(attribute)) return;
  if (!originalAttributes.has(node)) originalAttributes.set(node, new Map());
  const attributes = originalAttributes.get(node);
  if (!attributes.has(attribute)) attributes.set(attribute, node.getAttribute(attribute));
  const value = displayLanguage(attributes.get(attribute));
  if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

function localizeContent(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let node = walker.nextNode(); node; node = walker.nextNode()) {
    if (node.parentElement?.closest('[translate="no"], script, style, noscript')) continue;
    if (!originalText.has(node)) originalText.set(node, node.data);
    const value = displayLanguage(originalText.get(node));
    if (node.data !== value) node.data = value;
  }
  const selector = "[alt], [aria-label], [data-mark], [placeholder]";
  for (const node of root.querySelectorAll(selector)) {
    if (node.closest('[translate="no"]')) continue;
    for (const attribute of translatedAttributes) localizeAttribute(node, attribute);
  }
}

function initializeLanguagePicker() {
  const picker = document.querySelector(".language-picker");
  const buttons = [...picker.querySelectorAll("[data-language]")];

  function updatePage() {
    document.documentElement.lang = siteLanguage;
    localizeContent(document.body);
    localizeContent(document.querySelector("title"));
    localizeAttribute(document.querySelector('meta[name="description"]'), "content");
    for (const button of buttons) {
      button.setAttribute("aria-pressed", String(button.dataset.language === siteLanguage));
    }
  }

  for (const button of buttons) {
    button.addEventListener("click", () => {
      siteLanguage = button.dataset.language;
      try {
        localStorage.setItem(languageStorageKey, siteLanguage);
      } catch {
        // Rendering the selected language does not depend on persistence.
      }
      if (location.protocol === "http:" || location.protocol === "https:") {
        const url = new URL(location.href);
        url.searchParams.set("lang", siteLanguage);
        history.replaceState(history.state, "", url);
      }
      updatePage();
    });
  }
  updatePage();
  picker.hidden = false;
}
