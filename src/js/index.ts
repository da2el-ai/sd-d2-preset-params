declare var onOptionsChanged: any;
declare var onUiLoaded: any;

/*********************************************************
 * webui callback
 */

import { D2PresetParams } from './D2PPPresetParams';
import { D2PPToolTip } from './D2PPToolTip';

const presetParams = new D2PresetParams();

// 設定変更したらタグ読み直し
// onOptionsChanged(() => {
//     // console.log('------ onOptionsChanged');
//     presetParams.init();
// });

// UI表示したら作成
onUiLoaded(() => {
    presetParams.createControl();
    presetParams.init();
    D2PPToolTip.init();
});
