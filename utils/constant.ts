export class Constants {
    public URL:string = 'mongodb://localhost:27017';
    public DBNAME:string =  process.env.NODE_ENV !== 'test'?'local':'test';
    //public DBNAME:string =  'local';
    public MAXROW = 10;
    public MAXCOL = 10;
    public ShipLengthList = [
        {Length:4,Type:"BattleShip"},
        {Length:3,Type:"Cruiser"},
        {Length:3,Type:"Cruiser"},
        {Length:2,Type:"Destroyer"},
        {Length:2,Type:"Destroyer"},
        {Length:2,Type:"Destroyer"},
        {Length:1,Type:"Submarines"},
        {Length:1,Type:"Submarines"},
        {Length:1,Type:"Submarines"},
        {Length:1,Type:"Submarines"},
    ];
    
        
    
}
export enum HitResult {
    Miss,
    Hit,
    Sink,
    Won 
}