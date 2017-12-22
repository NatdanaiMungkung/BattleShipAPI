import { HitResult } from '../utils/constant';
export class Log {
    public GameID: string;
    public Board:Board;
    public Result:string;
    public Target:Location;
}
export class Board {
    public Ships:Ship[];
    public TotalFire:number;
    public TotalMiss:number;
    public Status:string;
    constructor() {
        this.Ships = [];
        this.TotalFire = 0;
        this.TotalMiss = 0;
        this.Status = "InProgress";
    }
}
export class Ship {
    public ShipType:string;
    public Locations:Location[];
    constructor() {
        this.Locations = [];
    }
}
export class Location {
    public Row:number;
    public Col:number;
}
export class TargetLocation extends Location {
    public GameId:string;
}
export class HitResultModel {
    public HitResult:HitResult;
    public TypeSank:string;
}