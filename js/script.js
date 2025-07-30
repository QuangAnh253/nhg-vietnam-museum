(() => {
  const state = {};
  let context = null;
  let nodesToDestroy = [];
  let pendingUpdate = false;

  function destroyAnyNodes() {
    nodesToDestroy.forEach((el) => el.remove());
    nodesToDestroy = [];
  }

  function update() {
    if (pendingUpdate === true) {
      return;
    }
    pendingUpdate = true;

    document.querySelectorAll("[data-el='div-1']").forEach((el) => {
      el.setAttribute("space", 42);
    });

    destroyAnyNodes();
    pendingUpdate = false;
  }

  update();
})();

document
  .getElementById("language-toggle")
  .addEventListener("click", function () {
    const dropdown = document.getElementById("language-dropdown");
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  });

function setLanguage(langCode) {
  let label = "";
  let flag = "";

  if (langCode === "en") {
    label = "English";
    flag = "assets/img/flag_uk.png";
  } else if (langCode === "zh") {
    label = "中文 (Chinese)";
    flag = "assets/img/flag_cn.png";
  } else {
    label = "Tiếng Việt";
    flag = "assets/img/flag_vn.png";
  }

  document.querySelector(".language-toggle img").src = flag;
  document.querySelector(".language-toggle img").alt = label;
  document.querySelector(".language-label").innerText = label;

  document.getElementById("language-dropdown").style.display = "none";

  localStorage.setItem("language", langCode);

  updateContent(langCode);
}

function updateContent(langCode) {
  if (langCode === "en") {
    document.getElementById("title").innerText = "Welcome";
    document.getElementById("description").innerText =
      "This is the description in English.";
  } else if (langCode === "zh") {
    document.getElementById("title").innerText = "欢迎";
    document.getElementById("description").innerText = "这是中文描述。";
  } else {
    document.getElementById("title").innerText = "Chào mừng";
    document.getElementById("description").innerText =
      "Đây là mô tả bằng tiếng Việt.";
  }
}

window.onload = function () {
  const langCode = localStorage.getItem("language") || "vi";
  setLanguage(langCode);
};
