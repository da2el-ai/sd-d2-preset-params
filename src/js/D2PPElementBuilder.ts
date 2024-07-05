import { TElementParams } from './types';

/*********************************************************
 * UI作成クラス
 */
class D2PPElementBuilder {
    /**
     * ボタン作成
     * @param {*} text ボタンに表示するテキスト
     * @param {*} param1 サイズ、色の指定
     */
    static baseButton(text: string, { size = 'sm', color = 'primary' }: TElementParams): HTMLButtonElement {
        const button = document.createElement('button');
        button.classList.add(
            // gradio 3.16
            `gr-button-${size}`,
            `gr-button-${color}`,
            // gradio 3.22
            size,
            color,
        );
        button.textContent = text;

        return button;
    }

    /**
     * プリセットリストを開くボタン
     */
    static openButton({ onClick = () => {} }: TElementParams): HTMLButtonElement {
        const button = D2PPElementBuilder.baseButton('プリセットを選択', {
            size: 'sm',
            color: 'secondary',
        });
        button.classList.add('d2pp-button', 'd2pp-button--open');
        button.addEventListener('click', onClick);
        return button;
    }

    /**
     * プリセット全体を覆うコンテナ
     */
    static ppContainer(id: string = ''): HTMLElement {
        const container = document.createElement('div');
        container.id = id;
        container.classList.add('d2pp-pp-container');
        return container;
    }

    /**
     * プリセットボタン
     */
    static presetButton(
        title: string,
        {
            onClick = () => {},
            onRightClick = () => {},
            onMouseEnter = () => {},
            onMouseLeave = () => {},
            color = 'primary',
        }: TElementParams,
    ): HTMLButtonElement {
        const button = D2PPElementBuilder.baseButton(title, { color });
        button.classList.add('d2pp-button', 'd2pp-button--preset');
        button.addEventListener('click', onClick);
        button.addEventListener('contextmenu', onRightClick);
        button.addEventListener('mouseenter', onMouseEnter);
        button.addEventListener('mouseleave', onMouseLeave);
        return button;
    }

    /**
     * プリセットボタンを格納する枠
     */
    static presetField(): HTMLElement {
        const field = document.createElement('div');
        field.classList.add('d2pp-preset-field');
        return field;
    }

    /**
     * 再読み込みボタン
     */
    static reloadButton(title: string, { onClick = () => {}, color = 'primary' }: TElementParams): HTMLButtonElement {
        const button = D2PPElementBuilder.baseButton(title, { color });
        button.classList.add('d2pp-button', 'd2pp-button--reload');
        button.addEventListener('click', onClick);
        return button;
    }

    /**
     * ツールチップ
     */
    static toolTipContainer() {
        const container = document.createElement('div');
        container.classList.add('d2pp-tooltip-container');
        return container;
    }
}

export { D2PPElementBuilder };
