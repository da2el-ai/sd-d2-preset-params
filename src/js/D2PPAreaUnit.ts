/* global gradioApp */

import { D2PPElementBuilder } from './D2PPElementBuilder';
import { D2PPCategoryUnit } from './D2PPCategoryUnit';
import { D2PPPresetManager } from './D2PPPresetManager';
import { TArea } from './types';

declare var gradioApp: any;

class D2PPAreaUnit {
    AREA_ID_BASE = 'd2pp-pp-container--';

    area: TArea;
    visible: boolean;
    categories: D2PPCategoryUnit[];

    /**
     * コンストラクタ
     */
    constructor(area: TArea) {
        this.area = area;
        this.visible = false;
        this.categories = [];
    }

    /**
     * 表示切り替えボタンなど基本コントローラー作成
     */
    createControl(reloadClick: () => void) {
        // 表示切り替えボタン
        const openButton = D2PPElementBuilder.openButton({
            onClick: () => {
                this.changeVisible();
            },
        });

        // プリセット再読み込みボタン
        const reloadButton = D2PPElementBuilder.reloadButton('🔄', {
            onClick: async () => {
                await reloadClick();
            },
        });

        // 機能拡張エリアの枠を生成ボタンの下に移動しちゃう
        const actionColumn = gradioApp().getElementById(`${this.area}_actions_column`);
        const container = document.createElement('div');
        container.classList.add('d2pp-action-container');
        container.appendChild(openButton);
        container.appendChild(reloadButton);
        actionColumn.appendChild(container);
    }

    /**
     * 初期化
     */
    init() {
        // タグボタンを消して作り直す
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
        this.$_getContainer().style.display = this.visible ? 'block' : 'none';
    }

    /**
     * プリセット全体を格納したコンテナ
     */
    private $_getContainer(): HTMLElement {
        return gradioApp().querySelector(`#${this.AREA_ID_BASE}${this.area}`);
    }

    /**
     * タグエリア全体を作る
     */
    private $_render() {
        // 全体を覆うコンテナ
        const container = D2PPElementBuilder.ppContainer(`${this.AREA_ID_BASE}${this.area}`);

        // タブ切り替えボタン
        // container.appendChild(this.$_renderTabNavi());
        // タグカテゴリ作成
        this.$_renderCategory(container);
        // this.$_changeCategory();

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
    private $_renderCategory(ppContainer: HTMLElement) {
        Object.keys(D2PPPresetManager.allPresets).forEach((categoryId: string) => {
            // const category = new D2PPCategoryUnit(this.area, categoryId, (categoryId: string, title: string) => {
            //     console.log('click', categoryId, title);
            //     D2PPPresetManager.applyPreset(this.area, categoryId, title);
            // });
            const category = new D2PPCategoryUnit(this.area, categoryId);

            const categoryContainer = category.createCategory(D2PPPresetManager.allPresets[categoryId]);
            ppContainer.appendChild(categoryContainer);
            this.categories.push(category);
        });
    }
}

export { D2PPAreaUnit };
