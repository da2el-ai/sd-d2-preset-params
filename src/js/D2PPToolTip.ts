/**
プリセット内容を画面下部に表示
 */

import { D2PPPresetManager } from './D2PPPresetManager';
import { D2PPElementBuilder } from './D2PPElementBuilder';
import { TArea, TPreset, TOpts } from './types';

declare var opts: TOpts;

class D2PPToolTip {
    static CONTAINER_CLASS = 'd2pp-tooltip-container';
    static container: HTMLElement;
    static toHide = false;

    /**
     * 初期化
     */
    static init() {
        const self = D2PPToolTip;

        if (document.querySelector(self.CONTAINER_CLASS)) return;

        self.container = D2PPElementBuilder.toolTipContainer();
        self.container.addEventListener('animationend', () => {
            self.container.setAttribute('data-show', '');
        });
        document.body.appendChild(self.container);
    }

    /**
     * ツールチップの表示は有効か
     */
    static get isEnabled(): boolean {
        return opts.d2_pp_enable_tooltip;
    }

    static convertPresetToHtml(preset: TPreset): HTMLElement {
        const list = document.createElement('div');
        list.classList.add('d2pp-param-list-container');

        if (preset.description) {
            const description = document.createElement('div');
            description.classList.add('d2pp-param-list-description');
            description.textContent = preset.description;
            list.appendChild(description);
        }

        preset.params.forEach((param) => {
            const item = document.createElement('dl');
            item.classList.add('d2pp-param-list-item');

            const selectorDt = document.createElement('dt');
            selectorDt.textContent = 'SELECTOR';
            const selectorDd = document.createElement('dd');
            selectorDd.textContent = param.selector;

            const valueDt = document.createElement('dt');
            valueDt.textContent = 'VALUE';
            const valueDd = document.createElement('dd');
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
    static showTip(area: TArea, categoryId: string, title: string) {
        const self = D2PPToolTip;
        if (!self.isEnabled) return;

        const preset = D2PPPresetManager.getPreset(area, categoryId, title);
        const list = self.convertPresetToHtml(preset as TPreset);

        self.toHide = false;
        self.container.replaceChildren(list);
        self.container.setAttribute('data-show', 'true');
    }

    /**
     * 非表示
     */
    static hideTip() {
        const self = D2PPToolTip;
        if (!self.isEnabled) return;

        self.toHide = true;

        setTimeout(() => {
            if (!self.toHide) return;

            self.container.setAttribute('data-show', 'false');
        }, 500);
    }
}

export { D2PPToolTip };
