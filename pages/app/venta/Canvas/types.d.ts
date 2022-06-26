import { useWatermarkValuesI } from "pages/customHooks/useWatermak/types";

/**
 * Indicates the level of watermark to use on the picture
 */
export type WatermarkLevel = "normal" | "agressive" | "none" | "low"

export interface PropsI {
    /**
     * Username to use on the watermark
     */
    watermark?: string;

    /**
     * List of the canvas created in order to download the watermarked media
     */
    onDownload: (canvas: HTMLCanvasElement[]) => void;

    /**
     * Image files to render
     */
    files: File[];

    /**
    * Indicates the level of watermark to use on the picture
    */
    watermarkLevel?: WatermarkLevel;

    /**
     * Indicates how bigger will be the text (on terms of percentage) according the size of each image 
     */
    sizeWatermark?: number
}

export interface CanvasI {
    idCanvas: string;
    imageBlob: string;
    dimensions: {
        width: number;
        height: number
    }
    file: File;
}

export interface CanvasContext extends useWatermarkValuesI {

}