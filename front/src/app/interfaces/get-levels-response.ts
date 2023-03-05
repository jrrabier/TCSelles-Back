import { Level } from "./level";

export interface GetLevelsResponse {
    success: boolean;
    msg: string;
    levels: Level[];
}
