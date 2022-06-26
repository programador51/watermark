import { JwtI } from "middlewares/types";

export interface DtoSell extends JwtI {
    id: string;
    idsPhotos: string[];
    notes: string;
}

export interface DtoResSell {
    message: string;
    wasCreated: boolean;
}