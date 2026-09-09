export interface IActivitySector{
    id: string;
    name: string;
    types: IActivityType[];
}

export interface IActivityType{
    id:string;
    name:string;
    idSector?:string;
}