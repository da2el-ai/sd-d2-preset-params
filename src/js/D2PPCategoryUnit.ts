import { D2PPPresetManager } from './D2PPPresetManager';
import { D2PPElementBuilder } from './D2PPElementBuilder';
import { D2PPToolTip } from './D2PPToolTip';
import { TArea, TCategoryPresets, TElementParams } from './types';

///////////////////
class D2PPCategoryUnit {
    // onClick: TPresetButtonClick;
    area: TArea;
    categoryId: string = '';
    container: HTMLElement;

    constructor(area: TArea, categoryId: string) {
        this.area = area;
        this.categoryId = categoryId;
        // this.onClick = onClick;
        this.container = D2PPElementBuilder.presetField();
        // this.container.style.display = 'none';
    }

    /**
     * カテゴリーを作る
     */
    createCategory(categoryPresets: TCategoryPresets): HTMLElement {
        categoryPresets[this.area].forEach((preset) => {
            const button = this.$_createPresetButton(preset.title, 'secondary');
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
    private $_createPresetButton(title: string, color = 'primary'): HTMLButtonElement {
        const elementParams: TElementParams = {
            onClick: (e: MouseEvent) => {
                e.preventDefault();
                D2PPPresetManager.applyPreset(this.area, this.categoryId, title);
            },
            onMouseEnter: () => {
                D2PPToolTip.showTip(this.area, this.categoryId, title);
            },
            onMouseLeave: () => {
                D2PPToolTip.hideTip();
            },
            color,
        };

        return D2PPElementBuilder.presetButton(title, elementParams);
    }
}

export { D2PPCategoryUnit };
