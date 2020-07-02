import {Pipe} from './pipe.interface'

export interface Factory {
    id: number;
    name: string;
    country:string;
    pipes:Pipe[];
}
  