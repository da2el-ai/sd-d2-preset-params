from modules import script_callbacks
from modules.shared import opts


from preset_params.settings import on_ui_settings
from preset_params.preset import d2pp_api

# 設定画面登録
def register_settings():
    script_callbacks.on_ui_settings(on_ui_settings)

# api登録
def register_apis():
    script_callbacks.on_app_started(d2pp_api)

