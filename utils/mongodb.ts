import { Constants } from './constant';
import {MongoClient} from 'mongodb' ;
import * as mongoose from 'mongoose';
import { Log } from '../models/models';
import { ObjectID } from 'bson';
let constant = new Constants();
export class MongoDB {
    private _board;
    private _log;
    constructor() {
        mongoose.Promise = global.Promise;
        mongoose.connect(constant.URL + "/" + constant.DBNAME);
        this._board = mongoose.model('battleship_in_progress',<any>{
            Ships: [{
                ShipType:String,
                Locations:[{
                    Row:Number,
                    Col:Number
                }]
            }],
            TotalFire:Number,
            TotalMiss:Number,
            Status:String
        });
        this._log = mongoose.model('battleship_log',<any>{
            GameID: String,
            Board: {
                Ships: [{
                    ShipType:String,
                    Locations:[{
                        Row:Number,
                        Col:Number
                    }]
                }],
                TotalFire:Number,
                TotalMiss:Number,
                Status:String,
                Result:String,
                Target:{
                    Row:Number,
                    Col:Number
                }
            }
        })
    }

    public  InsertInProgress(data:any) {
        let newBoard = new this._board(data)
        return newBoard.save()
    }

    public  UpdateInProgress(data:any,id:string) {

        return this._board.findByIdAndUpdate(id,data)
    }

    public  InsertLog(data:Log) {
        let newLog = new this._log(data)
        newLog.save().then((res)=> {
            console.log(`saved log for id ${data.GameID}`)
        },(err)=> {
            console.log(`Cannot save log for id ${data.GameID}, ${err}`)
        })
    }

    public DeleteInProgress(gameId:string) {
        this._board.findById(gameId).remove().exec();
    }

    public GetBoard(gameId:string) {
        return this._board.findById(gameId);
    }
}