const pili = "https://www.pili.com.tw";
const watch = "https://play.pili.com.tw/";
const thunderbolt = "https://www.thunderboltfantasy.com/lineup/";
const tradition = "https://twh.boch.gov.tw/non_material/intro.aspx?id=745";
const about = pili + "/about.php";
const officialHistory = pili + "/file/corporate/csr/2024%E5%85%A8%E6%96%87%E4%B8%8B%E8%BC%89.pdf";
const roleIndex = pili + "/role-browse.php";
const eras = ["2026 至今", "2021–2025", "2016–2020", "2011–2015", "2006–2010", "2001–2005", "1996–2000", "1991–1995", "1985–1990", "年代未列"];
const eraStarts = [2026, 2021, 2016, 2011, 2006, 2001, 1996, 1991, 1985];
const eraFor = year => eras[eraStarts.findIndex(start => year >= start)];

const workEpisodes = { "霹靂金光": "16 集", "霹靂異數": "40 集" };

const works = officialWorks.map(([name, url, eraIndex, alias, release]) => {
  const year = release ? Number(release.slice(0, 4)) : undefined;
  return {
    name, alias, url, year, release, summary: workSummaries[name], episodes: workEpisodes[name], era: eras[eraIndex],
    type: name.includes("英雄戰紀") ? "英雄戰紀" : "霹靂正劇"
  };
});

const extraWorks = [
  ["東離劍遊紀 最終章", 2025, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session_final/story.php"],
  ["東離劍遊紀 4", 2024, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session4/story.php"],
  ["素還真", 2022, "霹靂電影", pili + "/film-su.php"],
  ["東離劍遊紀 3", 2021, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session3/story.php"],
  ["東離劍遊紀 西幽玹歌", 2019, "東離劍遊紀", "https://thunderboltfantasy.com.tw/SwordLifeDeath/news.php?id=130"],
  ["東離劍遊紀 2", 2018, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session2/story.html"],
  ["東離劍遊紀 生死一劍", 2017, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session3/news.php?id=65"],
  ["東離劍遊紀", 2016, "東離劍遊紀", "https://thunderboltfantasy.com.tw/session1/story.html"],
  ["奇人密碼：古羅布之謎", 2015, "霹靂電影", pili + "/film-arti.php"],
  ["聖石傳說", 2000, "霹靂電影", pili + "/film-sacred-stone.php"],
  ["霹靂英雄榜之狼城疑雲", 1998, "舞臺公演", pili + "/drama-view/other/1588134425/"],
  ["仙界小霹靂", 2018, "兒少偶戲", "https://www.tcb.tw/zh/activity_exhibition/17"],
  ["天子傳奇", 2001, "其他系列", pili + "/drama-view/other/1588133146/"],
  ["火爆球王", 2000, "其他系列", pili + "/drama-view/other/1588139057/"],
  ["黑河戰記", 1995, "其他系列", pili + "/drama-view/other/1588134901/"],
  ["天生我才怎麼用", null, "兒少偶戲", pili + "/news-view.php?id=2020031918534319890&pagenum=33"]
];
extraWorks.forEach(([name, year, type, url]) => works.push({
  name, year, type, summary: workSummaries[name], url, era: year ? eraFor(year) : "年代未列"
}));

const peopleNotes = {
  "素還真": ["清香白蓮", "三位台柱", "日才子，善以謀略在各方勢力間周旋。琉璃仙境是他的代表性居所。", "霹靂金光", "第 13 集", ["談無慾", "一頁書", "葉小釵", "風采鈴"], "#452726", "蓮"],
  "一頁書": ["百世經綸 · 梵天", "三位台柱", "以雲渡山為重要據點的佛門高人。面對武林災厄時經常與素還真並肩。", "霹靂異數", "第 16 集", ["素還真", "葉小釵"], "#3a3030", "梵"],
  "葉小釵": ["刀狂劍痴", "三位台柱", "以刀劍雙修聞名。白髮、面上傷疤與沉默少言，構成他的辨識特徵。", "霹靂至尊", "第 1 集", ["素還真", "一頁書"], "#29343c", "劍"],
  "談無慾": ["脫俗仙子 · 月才子", "中原與江湖", "早年與身為日才子的素還真互相較勁，兩人的立場隨武林局勢而變。", "", "", ["素還真"]],
  "劍子仙跡": ["道門先天", "三教先天", "古塵劍的主人，言談詼諧，與疏樓龍宿及佛劍分說並稱三教先天。", "", "", ["疏樓龍宿", "佛劍分說"]],
  "疏樓龍宿": ["儒門龍首", "三教先天", "以華麗衣著與善辯聞名的儒門劍者，與劍子仙跡交情深厚。", "", "", ["劍子仙跡", "佛劍分說"]],
  "佛劍分說": ["佛門先天", "三教先天", "持佛牒入世的修行者，面對惡業與劫難時常選擇親自承擔。", "", "", ["劍子仙跡", "疏樓龍宿"]],
  "棄天帝": ["異度魔界", "異境與對手", "牽動神州篇發展的強敵，與異度魔界的由來密切相關。"],
  "羅喉": ["武君", "異境與對手", "與天都密切相關的武者，在刀龍故事中有重要地位。"],
  "秦假仙": ["秦假仙", "中原與江湖", "行走武林的消息靈通人物，常以詼諧口吻串起不同角色與事件。"],
  "風采鈴": ["風采鈴", "中原與江湖", "早期霹靂的重要人物，其故事與素還真及素續緣相連。", "", "", ["素還真"]],
  "慕少艾": ["藥師", "中原與江湖", "擅醫藥的武林人物，常以從容而詼諧的態度應對局勢。"],
  "吞佛童子": ["異度魔界", "異境與對手", "異度魔界一線的重要角色，在刀戟戡魔相關篇章中登場。"],
  "蝴蝶君": ["陰川蝴蝶君", "中原與江湖", "有鮮明紅色造型的江湖刀客，可循官方資料了解他與公孫月的故事。"],
  "蒼": ["玄宗弦首", "中原與江湖", "玄宗六弦之首，連結玄宗與異度魔界的故事。"],
  "倦收天": ["北芳秀", "中原與江湖", "道門劍者，與南修真原無鄉並稱南北道真。", "", "", ["原無鄉"]],
  "原無鄉": ["銀驃當家", "中原與江湖", "道門人物，與倦收天在劇中多有交集。", "", "", ["倦收天"]],
  "綺羅生": ["刀神九千勝", "中原與江湖", "風雅的江湖刀客，和意琦行、最光陰的故事互有交集。", "", "", ["意琦行"]],
  "意琦行": ["絕代劍宿", "中原與江湖", "劍法精湛的武者，與綺羅生有深厚交情。", "", "", ["綺羅生"]],
  "君奉天": ["法儒無私", "中原與江湖", "德風古道的重要人物，與天跡的往事牽動仙門故事。", "", "", ["天跡", "玉離經"]],
  "天跡": ["神毓逍遙", "中原與江湖", "與君奉天相識的仙門人物，和地冥等角色共同牽動仙魔相關篇章。", "", "", ["君奉天", "地冥"]],
  "地冥": ["鬼諦", "異境與對手", "仙魔相關篇章的重要人物，可依官方資料查閱其化身與故事。", "", "", ["天跡"]],
  "傲笑紅塵": ["半涉濁流", "中原與江湖", "中原劍客，亦是電影《聖石傳說》的主要人物之一。"],
  "青陽子": ["道教人物", "中原與江湖"],
  "莫召奴": ["心築情巢", "中原與江湖"],
  "玉離經": ["德風古道", "中原與江湖", "", "", "", ["君奉天"]],
  "玄同太子": ["黑海森獄", "異境與對手"],
  "天扇子": ["凌虛七仙", "中原與江湖"],
  "四無君": ["冥界天嶽", "異境與對手"],
  "劍非道": ["道劍", "中原與江湖"],
  "亂世狂刀": ["早期正劇", "中原與江湖", "使獅頭寶刀的武者，可從《霹靂狂刀》追索他的故事。"],
  "風之痕": ["魔流劍", "異境與對手", "以劍術聞名的武者，與白衣、黑衣兩位劍少有師徒關係。", "", "", ["白衣劍少", "黑衣劍少"]],
  "黑白郎君": ["南宮恨", "中原與江湖", "造型以黑白相對而聞名，曾在早期霹靂作品登場。"],
  "最光陰": ["北狗", "中原與江湖", "帶著狗頭面具的刀客，與綺羅生的故事互相交織。", "", "", ["綺羅生"]],
  "暴雨心奴": ["祆撒舞司", "異境與對手"],
  "香獨秀": ["集境劍客", "異境與對手", "以自在逍遙的性情和劍術見長。"],
  "戢武王": ["殺戮碎島", "異境與對手"],
  "素續緣": ["素還真與風采鈴之子", "中原與江湖", "", "", "", ["素還真", "風采鈴"]],
  "公孫月": ["蝴蝶君的伴侶", "中原與江湖", "", "", "", ["蝴蝶君"]],
  "金小開": ["葉小釵一脈", "中原與江湖", "", "", "", ["葉小釵"]],
  "歐陽上智": ["歐陽世家", "異境與對手", "早期正劇中與素還真周旋的重要人物。", "", "", ["素還真"]],
  "白衣劍少": ["風之痕門下", "中原與江湖", "", "", "", ["風之痕", "黑衣劍少"]],
  "黑衣劍少": ["風之痕門下", "中原與江湖", "", "", "", ["風之痕", "白衣劍少"]]
};

const people = Object.entries(officialPeople).map(([name, url]) => {
  const [title, type, summary, debut, episode, related, color, mark] = peopleNotes[name] ?? ["", "近年人物"];
  return { name, url, title, type, summary, debut, episode, related, color, mark };
});
people.push(
  { name: "凜雪鴉", title: "掠風竊塵", type: "東離劍遊紀", summary: "神出鬼沒的謎樣人物，與殤不患同路，擅長藏起自己的意圖。", url: "https://thunderboltfantasy.com.tw/session1/character.php" },
  { name: "殤不患", title: "刃無鋒", type: "東離劍遊紀", summary: "來自西幽的劍客，旅途中遇上丹翡與凜雪鴉。", url: "https://thunderboltfantasy.com.tw/session1/character.php" },
  { name: "丹翡", title: "護印師", type: "東離劍遊紀", summary: "守護神誨魔械的護印師，與天刑劍的遭遇開啟首季冒險。", url: "https://thunderboltfantasy.com.tw/session1/character.php" },
  { name: "浪巫謠", title: "弦歌斷邪", type: "東離劍遊紀", summary: "來自西幽的吟遊詩人，與可開口說話的琵琶聆牙同行。", url: "https://thunderboltfantasy.com.tw/session2/character.php" }
);

const timeline = [
  [1988, "《霹靂金光》發行", "以錄影帶推出的早期霹靂正劇。素還真在第 13 集首次登場。", works.find(w => w.name === "霹靂金光").url],
  [1996, "霹靂國際多媒體成立", "由黃家布袋戲傳承發展出具規模的影視製作體系。", officialHistory],
  [1998, "登上國家戲劇院", "《霹靂英雄榜之狼城疑雲》在臺北舉行舞臺公演。", officialHistory],
  [2000, "《聖石傳說》進入戲院", "霹靂首部布袋戲電影上映，將戲偶與數位動畫結合。", pili + "/film-sacred-stone.php"],
  [2016, "《東離劍遊紀》首播", "臺灣霹靂與日本創作團隊共同打造武俠偶戲。", thunderbolt],
  [2019, "《刀說異數》推出", "早期正劇的故事重新拍攝，並經 Netflix 與更多觀眾見面。", about],
  [2020, "PILI 線上看啟用", "霹靂推出自家影音平台，收錄劇集及音樂等內容。", officialHistory],
  [2025, "《東離劍遊紀》完結", "四季電視劇與多部劇場版發展至《最終章》。", thunderbolt],
  [2026, "《塗附世界》發行", "英雄戰紀推出新作，PILI 線上看同步上架。", "https://events.pili.com.tw/drama/AbyssOfEvil/"]
];

const crafts = [
  ["偶頭與妝髮", "雕刻與彩繪定下人物的年齡、表情和性格。造型師再用髮絲、冠飾及配色，讓同一個人物在遠景中仍容易辨認。", tradition],
  ["戲服與道具", "刺繡、衣料和比例都影響角色的辨識度。長袖、披風或兵器也會改變操偶時的節奏與動作。", pili + "/weapon-browse.php"],
  ["操偶與身段", "手在偶體內控制頭部和手臂。行走、回望與拂袖各有節奏；拍攝武戲時還會配合鏡位、剪接與場景。", tradition],
  ["臺語口白", "口白兼顧敘事、對話與表演。黃文擇以不同聲線、語速與語氣區別人物，延續掌中戲一人配多角的傳統。", about],
  ["音樂與後場", "傳統演出靠後場配樂烘托動作與轉折。電視霹靂又發展出劇集原聲帶、人物曲、文武場曲與主題歌。", pili + "/series-browse.php"],
  ["布景與拍攝", "微縮場景、燈光、攝影和後製共同決定銀幕上的尺度感。霹靂影視製作也分設造型、操偶、音效與剪輯等工種。", officialHistory]
];

const piliSceneNotes = pili + "/news-view.php?id=2009050517142545123&pagenum=103";
const worldScenes = [
  {
    title: "琉璃仙境",
    series: "霹靂系列",
    credit: "AI 場景示意",
    source: piliSceneNotes,
    sourceLabel: "角色居所設定",
    file: "liuli-xianjing.webp",
    alt: "山腰的木造亭閣傍崖而建，石階沿山壁而上，谷中浮著薄霧",
    summary: "素還真住在山腰，亭閣傍崖而建，也是中原群俠歇腳、議事的地方。"
  },
  {
    title: "磐隱神宮",
    series: "霹靂神州 III 之天罪",
    credit: "AI 場景示意",
    source: piliSceneNotes,
    sourceLabel: "劇中場景設定",
    file: "panyin-shengong.webp",
    alt: "古老石殿嵌在山壁之間，暮光照亮神殿中的巨大石柱",
    summary: "神州僅存的一座支柱藏在宮中。棄天帝逼近時，三教先天等人趕來守住支柱。"
  },
  {
    title: "七罪塔",
    series: "東離劍遊紀 · 第一季",
    credit: "官方劇照",
    source: "https://thunderboltfantasy.com.tw/session1/story.html",
    sourceLabel: "第一季劇照來源",
    file: "seven-sins-tower.webp",
    alt: "夜色中一座高塔立於岩峰之上，紫霧環繞山谷，塔頂亮著紅光",
    summary: "蔑天骸的據點。丹翡與同行者為奪回天刑劍，必須先闖過塔中的關卡。"
  },
  {
    title: "魔脊山谷與無界閣",
    series: "東離劍遊紀 · 第三季",
    credit: "官方劇照",
    source: "https://www.thunderboltfantasy.com/season3/story/",
    sourceLabel: "第三季第 1 話劇照來源",
    file: "void-palace.webp",
    alt: "殤不患一行站在幽暗的山谷洞窟中，身後是起伏的岩壁",
    summary: "殤不患一行下到魔脊山谷尋找魔劍，意外發現通往無界閣的洞穴。無界閣能連通東離、西幽與魔界。"
  }
];

const world = [
  ["苦境與中原", "許多正劇以苦境的中原武林為主要舞台。隨篇章推進，異度魔界、黑海森獄等勢力也陸續進入故事。", pili + "/series-browse.php"],
  ["琉璃仙境", "素還真的代表居所之一。由人物頁可以延伸到翠環山等地點，以及常往來的角色。", officialPeople["素還真"]],
  ["儒、釋、道", "三教是霹靂重要的思想與組織線索。從疏樓龍宿、佛劍分說與劍子仙跡，可以讀到三種不同的行事方式。", pili + "/role-browse.php"],
  ["佛牒與古塵", "佛牒隨佛劍分說入世，古塵是劍子仙跡的配劍。霹靂的道具目錄也可依劍、刀、槍、樂器等分類查閱。", pili + "/weapon-browse.php"],
  ["異度魔界", "從刀戟戡魔到神州系列，異度魔界在多個篇章中牽動中原局勢。棄天帝、吞佛童子可作為人物線的查閱入口。", officialPeople["棄天帝"]],
  ["東離與西幽", "《東離劍遊紀》在自己的世界裡展開。隨著殤不患等人的旅程，故事從東離一路延伸至西幽。", thunderbolt]
];

const sources = [
  ["PILI 線上看", watch], ["霹靂官方劇集目錄", pili + "/series-browse.php"],
  ["霹靂官方人物總覽", roleIndex], ["官方武器與道具", pili + "/weapon-browse.php"],
  ["劇集發行快訊", pili + "/news-browse.php?newstype=drama"], ["霹靂官方 YouTube", "https://www.youtube.com/user/epilinet"],
  ["角色桌布資源", pili + "/wallpaper-browse.php"], ["霹靂官方商店", "https://ec.pili.com.tw/"],
  ["《東離劍遊紀》官方系列總覽", thunderbolt], ["文化部文化資產局 · 布袋戲", tradition],
  ["霹靂理念與黃家傳承", about], ["霹靂永續報告與官方大事紀", officialHistory],
  ["仙界小霹靂", pili + "/series-browse/kids/"], ["其他霹靂作品", pili + "/series-browse/other/"]
];
