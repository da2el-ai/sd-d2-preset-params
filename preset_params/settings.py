from modules import shared

def on_ui_settings():
    section = "d2_preset_params", "D2 Preset Params"

    shared.opts.add_option(
        key="d2_pp_presets_dir",
        info=shared.OptionInfo(
            "",
            label="タグフォルダ（無指定の時は機能拡張フォルダの presets フォルダ）",
            section=section,
        ),
    )

    shared.opts.add_option(
        key = "d2_pp_enable_tooltip",
        info = shared.OptionInfo(
            True,
            label = "プリセットボタンにマウスが乗ったら画面下端に内容を表示する",
            section = section
        ),
    )


