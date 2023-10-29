import { Status } from "./status";

export class Pokemon {
    id!: number;
    name!: string;
    height?: number;
    weight?: number;
    sprite?: string;
    url?: string;
    type1?: string;
    type2?: string;
    status?: Status;
}
