var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const _D2PPPresetManager = class _D2PPPresetManager {
  /**
   * プリセットをjsonで取得
   */
  static async getPresetsFromApi() {
    const response = await fetch(`/d2pp/presets?${(/* @__PURE__ */ new Date()).getTime()}`);
    const presets = await response.json();
    _D2PPPresetManager.allPresets = presets;
  }
  /**
   * 任意のプリセットを取得する
   */
  static getPreset(area, categoryId, title) {
    const categoryPreset = _D2PPPresetManager.allPresets[categoryId][area];
    return categoryPreset.find((preset) => preset.title === title);
  }
  /**
   * プリセットを適用する
   */
  static applyPreset(area, categoryId, title) {
    const preset = _D2PPPresetManager.getPreset(area, categoryId, title);
    if (preset === void 0)
      return;
    preset.params.forEach((param) => {
      const element = document.querySelector(param.selector);
      if (!element)
        return;
      if (element.type === "checkbox") {
        element.checked = param.value === "true";
      } else {
        element.value = param.value;
      }
      updateInput(element);
    });
  }
};
__publicField(_D2PPPresetManager, "allPresets");
let D2PPPresetManager = _D2PPPresetManager;
class D2PPElementBuilder {
  /**
   * ボタン作成
   * @param {*} text ボタンに表示するテキスト
   * @param {*} param1 サイズ、色の指定
   */
  static baseButton(text, { size = "sm", color = "primary" }) {
    const button = document.createElement("button");
    button.classList.add(
      // gradio 3.16
      `gr-button-${size}`,
      `gr-button-${color}`,
      // gradio 3.22
      size,
      color
    );
    button.textContent = text;
    return button;
  }
  /**
   * プリセットリストを開くボタン
   */
  static openButton({ onClick = () => {
  } }) {
    const button = D2PPElementBuilder.baseButton("プリセットを選択", {
      size: "sm",
      color: "secondary"
    });
    button.classList.add("d2pp-button", "d2pp-button--open");
    button.addEventListener("click", onClick);
    return button;
  }
  /**
   * プリセット全体を覆うコンテナ
   */
  static ppContainer(id = "") {
    const container = document.createElement("div");
    container.id = id;
    container.classList.add("d2pp-pp-container");
    return container;
  }
  /**
   * プリセットボタン
   */
  static presetButton(title, {
    onClick = () => {
    },
    onRightClick = () => {
    },
    onMouseEnter = () => {
    },
    onMouseLeave = () => {
    },
    color = "primary"
  }) {
    const button = D2PPElementBuilder.baseButton(title, { color });
    button.classList.add("d2pp-button", "d2pp-button--preset");
    button.addEventListener("click", onClick);
    button.addEventListener("contextmenu", onRightClick);
    button.addEventListener("mouseenter", onMouseEnter);
    button.addEventListener("mouseleave", onMouseLeave);
    return button;
  }
  /**
   * プリセットボタンを格納する枠
   */
  static presetField() {
    const field = document.createElement("div");
    field.classList.add("d2pp-preset-field");
    return field;
  }
  /**
   * 再読み込みボタン
   */
  static reloadButton(title, { onClick = () => {
  }, color = "primary" }) {
    const button = D2PPElementBuilder.baseButton(title, { color });
    button.classList.add("d2pp-button", "d2pp-button--reload");
    button.addEventListener("click", onClick);
    return button;
  }
  /**
   * ツールチップ
   */
  static toolTipContainer() {
    const container = document.createElement("div");
    container.classList.add("d2pp-tooltip-container");
    return container;
  }
}
const _D2PPToolTip = class _D2PPToolTip {
  /**
   * 初期化
   */
  static init() {
    const self = _D2PPToolTip;
    if (document.querySelector(self.CONTAINER_CLASS))
      return;
    self.container = D2PPElementBuilder.toolTipContainer();
    self.container.addEventListener("animationend", () => {
      self.container.setAttribute("data-show", "");
    });
    document.body.appendChild(self.container);
  }
  /**
   * ツールチップの表示は有効か
   */
  static get isEnabled() {
    return opts.d2_pp_enable_tooltip;
  }
  static convertPresetToHtml(preset) {
    const list = document.createElement("div");
    list.classList.add("d2pp-param-list-container");
    if (preset.description) {
      const description = document.createElement("div");
      description.classList.add("d2pp-param-list-description");
      description.textContent = preset.description;
      list.appendChild(description);
    }
    preset.params.forEach((param) => {
      const item = document.createElement("dl");
      item.classList.add("d2pp-param-list-item");
      const selectorDt = document.createElement("dt");
      selectorDt.textContent = "SELECTOR";
      const selectorDd = document.createElement("dd");
      selectorDd.textContent = param.selector;
      const valueDt = document.createElement("dt");
      valueDt.textContent = "VALUE";
      const valueDd = document.createElement("dd");
      valueDd.textContent = param.value;
      item.appendChild(selectorDt);
      item.appendChild(selectorDd);
      item.appendChild(valueDt);
      item.appendChild(valueDd);
      list.appendChild(item);
    });
    return list;
  }
  /**
   * タグを表示
   */
  static showTip(area, categoryId, title) {
    const self = _D2PPToolTip;
    if (!self.isEnabled)
      return;
    const preset = D2PPPresetManager.getPreset(area, categoryId, title);
    const list = self.convertPresetToHtml(preset);
    self.toHide = false;
    self.container.replaceChildren(list);
    self.container.setAttribute("data-show", "true");
  }
  /**
   * 非表示
   */
  static hideTip() {
    const self = _D2PPToolTip;
    if (!self.isEnabled)
      return;
    self.toHide = true;
    setTimeout(() => {
      if (!self.toHide)
        return;
      self.container.setAttribute("data-show", "false");
    }, 500);
  }
};
__publicField(_D2PPToolTip, "CONTAINER_CLASS", "d2pp-tooltip-container");
__publicField(_D2PPToolTip, "container");
__publicField(_D2PPToolTip, "toHide", false);
let D2PPToolTip = _D2PPToolTip;
class D2PPCategoryUnit {
  constructor(area, categoryId) {
    // onClick: TPresetButtonClick;
    __publicField(this, "area");
    __publicField(this, "categoryId", "");
    __publicField(this, "container");
    this.area = area;
    this.categoryId = categoryId;
    this.container = D2PPElementBuilder.presetField();
  }
  /**
   * カテゴリーを作る
   */
  createCategory(categoryPresets) {
    categoryPresets[this.area].forEach((preset) => {
      const button = this.$_createPresetButton(preset.title, "secondary");
      this.container.appendChild(button);
    });
    return this.container;
  }
  /**
   * プリセットボタンを作成
   * @param title ボタンに表示するテキスト
   * @param value プロンプトタグ
   * @param color ボタン色
   * @returns ボタン
   */
  $_createPresetButton(title, color = "primary") {
    const elementParams = {
      onClick: (e) => {
        e.preventDefault();
        D2PPPresetManager.applyPreset(this.area, this.categoryId, title);
      },
      onMouseEnter: () => {
        D2PPToolTip.showTip(this.area, this.categoryId, title);
      },
      onMouseLeave: () => {
        D2PPToolTip.hideTip();
      },
      color
    };
    return D2PPElementBuilder.presetButton(title, elementParams);
  }
}
class D2PPAreaUnit {
  /**
   * コンストラクタ
   */
  constructor(area) {
    __publicField(this, "AREA_ID_BASE", "d2pp-pp-container--");
    __publicField(this, "area");
    __publicField(this, "visible");
    __publicField(this, "categories");
    this.area = area;
    this.visible = false;
    this.categories = [];
  }
  /**
   * 表示切り替えボタンなど基本コントローラー作成
   */
  createControl(reloadClick) {
    const openButton = D2PPElementBuilder.openButton({
      onClick: () => {
        this.changeVisible();
      }
    });
    const reloadButton = D2PPElementBuilder.reloadButton("🔄", {
      onClick: async () => {
        await reloadClick();
      }
    });
    const actionColumn = gradioApp().getElementById(`${this.area}_actions_column`);
    const container = document.createElement("div");
    container.classList.add("d2pp-action-container");
    container.appendChild(openButton);
    container.appendChild(reloadButton);
    actionColumn.appendChild(container);
  }
  /**
   * 初期化
   */
  init() {
    const container = this.$_getContainer();
    if (container != null) {
      container.remove();
      this.categories = [];
    }
    gradioApp().getElementById(`${this.area}_toprow`).after(this.$_render());
  }
  /**
   * 表示状態切り替え
   */
  changeVisible() {
    this.visible = !this.visible;
    this.$_getContainer().style.display = this.visible ? "block" : "none";
  }
  /**
   * プリセット全体を格納したコンテナ
   */
  $_getContainer() {
    return gradioApp().querySelector(`#${this.AREA_ID_BASE}${this.area}`);
  }
  /**
   * タグエリア全体を作る
   */
  $_render() {
    const container = D2PPElementBuilder.ppContainer(`${this.AREA_ID_BASE}${this.area}`);
    this.$_renderCategory(container);
    return container;
  }
  /**
   * タブ切り替えを作る
   */
  // private $_renderTabNavi(): HTMLElement {
  //     this.tabNavi = new D2PPTabNavi(() => {
  //         this.$_changeCategory();
  //     });
  //     return this.tabNavi.createTabNavi(this.config as TConfig, this.tags);
  // }
  /**
   * アクティブカテゴリーを切り替える
   */
  // private $_changeCategory() {
  //     this.categories.forEach((category: D2PPCategoryUnit) => {
  //         if (this.tabNavi!.activeCategory === category.categoryId) {
  //             category.container.style.display = 'flex';
  //         } else {
  //             category.container.style.display = 'none';
  //         }
  //     });
  // }
  /**
   * タグカテゴリを作る
   */
  $_renderCategory(ppContainer) {
    Object.keys(D2PPPresetManager.allPresets).forEach((categoryId) => {
      const category = new D2PPCategoryUnit(this.area, categoryId);
      const categoryContainer = category.createCategory(D2PPPresetManager.allPresets[categoryId]);
      ppContainer.appendChild(categoryContainer);
      this.categories.push(category);
    });
  }
}
class D2PresetParams {
  /**
   * コンストラクタ
   */
  constructor() {
    __publicField(this, "allPresets");
    __publicField(this, "t2iAreaUnit");
    __publicField(this, "i2iAreaUnit");
    this.t2iAreaUnit = new D2PPAreaUnit("txt2img");
    this.i2iAreaUnit = new D2PPAreaUnit("img2img");
    this.allPresets = {};
  }
  /**
   * 表示切り替えボタンなどを作成
   * 再読み込みボタンの動作も指定
   */
  createControl() {
    this.t2iAreaUnit.createControl(() => {
      this.init();
    });
    this.i2iAreaUnit.createControl(() => {
      this.init();
    });
  }
  /**
   * 初期化
   */
  async init() {
    await D2PPPresetManager.getPresetsFromApi();
    this.t2iAreaUnit.init();
    this.i2iAreaUnit.init();
  }
  /**
   * 表示状態切り替え
   */
  changeVisible() {
    this.t2iAreaUnit.changeVisible();
    this.i2iAreaUnit.changeVisible();
  }
}
const presetParams = new D2PresetParams();
onUiLoaded(() => {
  presetParams.createControl();
  presetParams.init();
  D2PPToolTip.init();
});
//# sourceMappingURL=d2_prompt_selector.js.map
