"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("App starting...");
var express = require("express");
var utils_1 = require("./utils/utils");
var constant_1 = require("./utils/constant");
var mongodb_1 = require("./utils/mongodb");
var bodyParser = require("body-parser");
var models_1 = require("./models/models");
var app = express();
var mongoDb = new mongodb_1.MongoDB();
var util = new utils_1.Util();
app.get('/', function (req, res) {
    res.json({ 'version': 1.0 });
});
app.use(bodyParser.json());
app.get('/battleship', function (req, res) {
    var board = util.GenerateBoard();
    mongoDb.InsertInProgress(board).then(function (response) {
        var id = response._id;
        var log = new models_1.Log();
        log.Board = response;
        log.GameID = id;
        mongoDb.InsertLog(log);
        res.json({ Id: id });
    }, function (err) {
        res.json(err);
    });
});
app.post('/battleship', function (req, res) {
    if (!util.isTargetLocation(req.body)) {
        res.status(400);
        res.json("Incorrect request Format");
    }
    var target = new models_1.Location();
    target.Col = req.body.Col;
    target.Row = req.body.Row;
    mongoDb.GetBoard(req.body.GameId).then(function (result) {
        if (!result) {
            throw "Cannot Find Game Id, please check";
        }
        result = result._doc;
        var hitResultModel = new models_1.HitResultModel();
        var newLog;
        newLog = new models_1.Log();
        newLog.GameID = req.body.GameId;
        newLog.Target = target;
        util.CalculateBoardAfterTarget(target, result, hitResultModel);
        newLog.Board = result;
        mongoDb.UpdateInProgress(result, newLog.GameID).catch(function (err) { return res.status(400); });
        //Return Result
        switch (hitResultModel.HitResult) {
            case constant_1.HitResult.Hit:
                newLog.Result = "Hit";
                break;
            case constant_1.HitResult.Miss:
                newLog.Result = "Miss";
                break;
            case constant_1.HitResult.Sink:
                newLog.Result = "You just sank the " + hitResultModel.TypeSank;
                break;
            case constant_1.HitResult.Won:
                newLog.Result = "Win !  You completed the game in " + result.TotalFire + " moves, You have missed " + result.TotalMiss;
                mongoDb.DeleteInProgress(newLog.GameID);
        }
        mongoDb.InsertLog(newLog);
        res.json({ Result: newLog.Result });
    }).catch(function (err) {
        res.status(400);
        res.json(err);
    });
});
app.listen(3000);
module.exports = { app: app };
//# sourceMappingURL=app.js.map