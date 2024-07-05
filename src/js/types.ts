type TArea = 'txt2img' | 'img2img';

type TParam = {
    selector: string;
    value: string;
};

type TPreset = {
    title: string;
    description?: string;
    params: TParam[];
};

type TCategoryPresets = {
    txt2img: TPreset[];
    img2img: TPreset[];
};

type TAllPresets = { [key: string]: TCategoryPresets };

type TPresetButtonClick = (categoryId: string, title: string) => void;

type TElementParams = {
    size?: string;
    color?: string;
    onClick?: (e: MouseEvent) => void;
    onRightClick?: (e: MouseEvent) => void;
    onChange?: (checked: boolean) => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
};

type TOpts = {
    d2_pp_enable_tooltip: boolean;
};

export type { TArea, TParam, TPreset, TCategoryPresets, TAllPresets, TElementParams, TPresetButtonClick, TOpts };
