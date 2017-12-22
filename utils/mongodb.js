"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var mongoose = require("mongoose");
var constant = new constant_1.Constants();
var MongoDB = /** @class */ (function () {
    function MongoDB() {
        mongoose.Promise = global.Promise;
        mongoose.connect(constant.URL + "/" + constant.DBNAME);
        this._board = mongoose.model('battleship_in_progress', {
            Ships: [{
                    ShipType: String,
                    Locations: [{
                            Row: Number,
                            Col: Number
                        }]
                }],
            TotalFire: Number,
            TotalMiss: Number,
            Status: String
        });
        this._log = mongoose.model('battleship_log', {
            GameID: String,
            Board: {
                Ships: [{
                        ShipType: String,
                        Locations: [{
                                Row: Number,
                                Col: Number
                            }]
                    }],
                TotalFire: Number,
                TotalMiss: Number,
                Status: String,
                Result: String,
                Target: {
                    Row: Number,
                    Col: Number
                }
            }
        });
    }
    MongoDB.prototype.InsertInProgress = function (data) {
        var newBoard = new this._board(data);
        return newBoard.save();
    };
    MongoDB.prototype.UpdateInProgress = function (data, id) {
        return this._board.findByIdAndUpdate(id, data);
    };
    MongoDB.prototype.InsertLog = function (data) {
        var newLog = new this._log(data);
        newLog.save().then(function (res) {
            console.log("saved log for id " + data.GameID);
        }, function (err) {
            console.log("Cannot save log for id " + data.GameID + ", " + err);
        });
    };
    MongoDB.prototype.DeleteInProgress = function (gameId) {
        this._board.findById(gameId).remove().exec();
    };
    MongoDB.prototype.GetBoard = function (gameId) {
        return this._board.findById(gameId);
    };
    return MongoDB;
}());
exports.MongoDB = MongoDB;
//# sourceMappingURL=mongodb.js.map