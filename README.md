# D2 Preset Params

## About

Stable Diffusion webui AUTOMATIC1111版（以下 webui）の機能拡張です。

### 基本機能
- 様々な設定項目をボタン一発で反映させることができる
- ボタンにマウスを乗せると設定内容がプレビューできる（設定でON/OFF可能）
- txt2img、img2imgそれぞれ別に管理できる
- CSSセレクタで記述するのでほとんどの項目に対応可能
- プリセットファイルはYAML形式
- プリセットファイルを任意の場所に置ける（OneDrive / Dropbox なども可能）


## Installation

1. "Extensions" タブを開く
2. "Install from URL" を開く
3. `https://github.com/da2el-ai/sd-d2-preset-params` を "URL of the extension repository" に入力
4. "Install" をクリックしてインストールが完了するのを待つ
5. "Installed" を開き、"Apply and restart the UI" をクリック

## Edit Preset file

プリセットファイルは  `{webuiインストールフォルダ}/extensions/sd-d2-preset-params/presets` に置かれています。
設定の `プリセットファイルを置いたフォルダ` で任意の場所を指定できます。

YAML形式ですのでテキストエディタで編集してください（VisualStudioCode推奨）。


### プリセットファイルのサンプル

下記はtxt2imgで画像の幅、高さ、Hires.fixのON、Hires.fixのステップ数、ノイズ除去強度を指定しています。

```yaml
# txt2img で表示される
txt2img:
  # ここからプリセット定義
  -
    # ボタンに表示されるテキスト
    title: "ベースサイズ + Hires.fix"
    # マウスホバーで表示される説明テキスト
    description: "832x1088をHires.fixで1.5倍"
    # パラメーター
    params:
      -
        selector: "#txt2img_width input[type='number']"
        value: "832"
      -
        selector: "#txt2img_height input[type='number']"
        value: "1088"
      -
        selector: '#txt2img_hr-visible-checkbox'
        value: "true"
      -
        selector: "#txt2img_hires_steps input[type='number']"
        value: "20"
      -
        selector: "#txt2img_denoising_strength input[type='number']"
        value: "0.45"
  # ここまでプリセット定義
```

### selector の調べ方

GoogleChoromeなどのデベロッパーツールを使って調べてください。
**調べ方のサポートは行っておりません。**

[≫Chromeデベロッパーツールを使ってみよう](https://sqripts.com/2023/12/14/82607/)


### タグファイルを編集したら表示されなくなった？

だいたいYAMLの書式ミスです。[Online YAML Parser](https://qiita.com/YumaInaura/items/8e4c08821b6940299a27) などで書式チェックしてみてください。

### 編集したので反映させたい

再読み込みボタンで反映されます。


## Settings

webuiの `Settings > D2 Preset Params` から行えます。

### タグフォルダ
タグファイルの置いてあるフォルダをフルパスで指定します。

空欄の時は `{webuiインストールフォルダ}/extensions/sd-d2-preset-params/presets` を参照します。

### プリセットボタンにマウスが乗ったら画面下端に設定内容を表示する
プリセットの内容をすぐに確認できます。


## Update

- 2024.07.06
  - とりあえず公開

## Licence

MIT
