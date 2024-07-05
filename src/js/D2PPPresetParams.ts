/* global gradioApp */

import { D2PPPresetManager } from './D2PPPresetManager';
import { D2PPAreaUnit } from './D2PPAreaUnit';
import { TAllPresets } from './types';

class D2PresetParams {
    allPresets: TAllPresets;
    t2iAreaUnit: D2PPAreaUnit;
    i2iAreaUnit: D2PPAreaUnit;

    /**
     * コンストラクタ
     */
    constructor() {
        this.t2iAreaUnit = new D2PPAreaUnit('txt2img');
        this.i2iAreaUnit = new D2PPAreaUnit('img2img');
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

export { D2PresetParams };
