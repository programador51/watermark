import { CanvasI, WatermarkLevel } from "pages/venta/Canvas/types";

export interface CanvasConfigurationI {
    colorWatermark: {
        uuid: string,
        enterprise: string,
    },
    watermarkLevel: WatermarkLevel,
    watermark: string,
    showWatermark: boolean,
}

export interface useWatermarkValuesI {
    canvas: CanvasI[],
    configuration: CanvasConfigurationI,
    updateWatermark: (text: string) => void,
    updateWatermarkShow: (show: boolean) => void,
    downloadWatermarkedImages: () => void,
    promptDownloadConfirmation: () => void,
    downloadRandomImage: () => void,
    updateColorWatermark: (hexCode: string) => void,
    updateDimensionsImage: (width: number, height: number, index: number) => void,
    updateWatermarkLevel: (level: WatermarkLevel) => void,
    isChecked: boolean,
    /**
     * Update the color to use for the left bottom corner
     */
    updateColorEnterprise: (enterprise: string) => void;
    notes: string;
    setNotes: (notes: string) => void;
    isLoading: boolean;
}