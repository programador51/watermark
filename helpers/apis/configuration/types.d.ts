import { JwtI } from "middlewares/types";

export interface DtoUpdateProfile {
    goFileToken: string;
}

export interface DtoUpdateProfileServer extends JwtI {
    profile: DtoUpdateProfile
}