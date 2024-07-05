import { TAllPresets, TArea, TPreset } from './types';

declare var updateInput: any;

class D2PPPresetManager {
    static allPresets: TAllPresets;

    /**
     * プリセットをjsonで取得
     */
    static async getPresetsFromApi() {
        const response = await fetch(`/d2pp/presets?${new Date().getTime()}`);
        const presets = await response.json();
        // console.log('getPresets', presets);
        D2PPPresetManager.allPresets = presets;
    }

    /**
     * 任意のプリセットを取得する
     */
    static getPreset(area: TArea, categoryId: string, title: string): undefined | TPreset {
        const categoryPreset = D2PPPresetManager.allPresets[categoryId][area];
        return categoryPreset.find((preset) => preset.title === title);
    }

    /**
     * プリセットを適用する
     */
    static applyPreset(area: TArea, categoryId: string, title: string) {
        const preset = D2PPPresetManager.getPreset(area, categoryId, title);
        // console.log('applyPreset', categoryId, title, preset);
        if (preset === undefined) return;

        preset.params.forEach((param) => {
            const element = document.querySelector(param.selector) as HTMLInputElement;
            // console.log('element', element);
            if (!element) return;

            if (element.type === 'checkbox') {
                element.checked = param.value === 'true';
            } else {
                element.value = param.value;
            }

            updateInput(element);
        });
    }
}

export { D2PPPresetManager };
