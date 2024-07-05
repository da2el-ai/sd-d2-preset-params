from pathlib import Path
from fastapi import FastAPI, Body
import yaml
import gradio as gr
from modules import shared
from modules.api import api
from modules.scripts import basedir
import modules.script_callbacks as script_callbacks
# from scripts.setup import TAGS_DIR

class PresetUtil:
    BASE_DIR = Path(basedir())
    PRESETS_DIR = BASE_DIR.joinpath('presets')
    presets = {}

    @classmethod
    def preset_files(cls):
        opt_dir = shared.opts.d2_pp_presets_dir
        dir = Path(opt_dir) if opt_dir != "" else cls.PRESETS_DIR
        return dir.rglob("*.yml")

    @classmethod
    def load_presets(cls):
        cls.presets = {}
        for filepath in cls.preset_files():
            with open(filepath, "r", encoding="utf-8") as file:
                yml = yaml.safe_load(file)
                cls.presets[filepath.stem] = yml


# /d2pp/presets にアクセスすると
# タグファイルの中身をjsonで返す
def d2pp_api(_: gr.Blocks, app: FastAPI):
    @app.get("/d2pp/presets")
    async def presets_json():
        PresetUtil.load_presets()
        return PresetUtil.presets


