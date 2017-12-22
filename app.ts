console.log("App starting...");

import express = require('express');
import { Util } from './utils/utils';
import { Constants, HitResult } from './utils/constant';
import { MongoDB } from './utils/mongodb';
import * as bodyParser from 'body-parser';
import * as Enumerable from 'linq';
import { Log,Location,HitResultModel,TargetLocation} from './models/models';
let app = express();
let mongoDb = new MongoDB();
let util = new Util();
app.get('/',(req,res) => {
    res.json({'version':1.0});
});
app.use(bodyParser.json());
app.get('/battleship',(req,res)=>  {

        let board = util.GenerateBoard();
        mongoDb.InsertInProgress(board).then((response)=> {
            let id = response._id;
            let log = new Log();
            log.Board = response;
            log.GameID = id;
            mongoDb.InsertLog(log);
            res.json({Id:id});
        },(err)=> {
            res.json(err);
        })
})


app.post('/battleship',(req,res)=> {
    if (!util.isTargetLocation(req.body)) {
        res.status(400);
        res.json("Incorrect request Format")
    }
    let target = new Location();
    target.Col = req.body.Col;
    target.Row = req.body.Row;
    mongoDb.GetBoard(req.body.GameId).then((result) => {
        if (!result) {
            throw "Cannot Find Game Id, please check";
        }
        result = result._doc;
        let hitResultModel = new HitResultModel();
        let newLog:Log
        newLog = new Log();
        newLog.GameID = req.body.GameId;
        newLog.Target = target;
        util.CalculateBoardAfterTarget(target,result,hitResultModel);
        newLog.Board = result;
        mongoDb.UpdateInProgress(result,newLog.GameID).catch(err=>res.status(400));
        

        //Return Result
        switch(hitResultModel.HitResult) {
            case HitResult.Hit:
                newLog.Result = "Hit"
                break;
            case HitResult.Miss:
                newLog.Result = "Miss"
                break;
            case HitResult.Sink:
                newLog.Result = `You just sank the ${hitResultModel.TypeSank}`
                break;
            case HitResult.Won:
                newLog.Result = `Win !  You completed the game in ${result.TotalFire} moves, You have missed ${result.TotalMiss}`;
                mongoDb.DeleteInProgress(newLog.GameID);
        }
        mongoDb.InsertLog(newLog);
        res.json({Result: newLog.Result});
    }).catch(err=> {
        res.status(400);
        res.json(err)
    });
})
app.listen(3000);
module.exports = {app};