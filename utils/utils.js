"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var constant_1 = require("./constant");
var Enumerable = require("linq");
var models_1 = require("../models/models");
var constants = new constant_1.Constants();
var Util = /** @class */ (function () {
    function Util() {
    }
    Util.prototype.GenerateBoard = function () {
        var _this = this;
        var board = new models_1.Board();
        var blockedLoc = [];
        constants.ShipLengthList.forEach(function (type) {
            var ship = new models_1.Ship();
            ship.ShipType = type.Type;
            var isCheckHorizon = false;
            var isCheckVertical = false;
            var location = new models_1.Location();
            var startLocation = new models_1.Location();
            for (var i = 0; i < type.Length; i++) {
                if (i === 0) {
                    location.Col = _this.getRandomInt(0, constants.MAXCOL - 1);
                    location.Row = _this.getRandomInt(0, constants.MAXROW - 1);
                    startLocation.Col = location.Col;
                    startLocation.Row = location.Row;
                    isCheckHorizon = location.Col + type.Length < constants.MAXCOL;
                    isCheckVertical = location.Row + type.Length < constants.MAXROW;
                    if (!isCheckHorizon && !isCheckVertical) {
                        i--;
                        continue;
                    }
                    //Check if start point is duplicate with existing ships
                    if (blockedLoc.length > 0) {
                        if (Enumerable.from(blockedLoc).any(function (a) { return a.Col == location.Col && a.Row == location.Row; })) {
                            i--; //Re random location
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                        }
                    }
                    else {
                        ship.Locations.push(location);
                    }
                }
                else {
                    var prevLoc = location;
                    location = new models_1.Location();
                    location.Col = prevLoc.Col;
                    location.Row = prevLoc.Row;
                    if (isCheckHorizon) {
                        location.Col++;
                        location.Row = location.Row;
                        if (Enumerable.from(blockedLoc).any(function (a) { return a.Col == location.Col && a.Row == location.Row; })) {
                            isCheckHorizon = false;
                            i = 0;
                            ship.Locations.splice(1); //change from horizon to vertical
                            location.Row = startLocation.Row;
                            location.Col = startLocation.Col;
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                            continue;
                        }
                    }
                    if (isCheckVertical) {
                        location.Col = location.Col;
                        location.Row++;
                        if (Enumerable.from(blockedLoc).any(function (a) { return a.Col === location.Col && a.Row === location.Row; })) {
                            isCheckVertical = false;
                            i = 0;
                            ship.Locations.splice(1);
                            location.Row = startLocation.Row;
                            location.Col = startLocation.Col;
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                            continue;
                        }
                    }
                    if (!isCheckHorizon && !isCheckVertical) {
                        i = -1;
                        ship.Locations.splice(0);
                        // re random location at start point
                        continue;
                    }
                }
            }
            // get area around ship 
            ship.Locations.forEach(function (location) {
                var toInsert = {
                    Col: location.Col,
                    Row: location.Row
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col === toInsert.Col && a.Row === toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col,
                    Row: location.Row - 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col,
                    Row: location.Row + 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col - 1,
                    Row: location.Row
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col + 1,
                    Row: location.Row
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col - 1,
                    Row: location.Row - 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col - 1,
                    Row: location.Row + 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col + 1,
                    Row: location.Row - 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
                toInsert = {
                    Col: location.Col + 1,
                    Row: location.Row + 1
                };
                if (!Enumerable.from(blockedLoc).any(function (a) { return a.Col == toInsert.Col && a.Row == toInsert.Row; }))
                    blockedLoc.push(toInsert);
            });
            if (ship.Locations.length > type.Length)
                console.log("Found");
            board.Ships.push(ship);
        });
        return board;
    };
    Util.prototype.CalculateBoardAfterTarget = function (target, result, hitResultModel) {
        hitResultModel.HitResult = constant_1.HitResult.Miss;
        result.TotalFire++;
        for (var i = 0; i < result.Ships.length; i++) {
            for (var j = 0; j < result.Ships[i].Locations.length; j++) {
                if (result.Ships[i].Locations[j].Col == target.Col &&
                    result.Ships[i].Locations[j].Row == target.Row) {
                    hitResultModel.HitResult = constant_1.HitResult.Hit;
                    result.Ships[i].Locations.splice(j, 1);
                    if (result.Ships[i].Locations.length == 0) {
                        hitResultModel.HitResult = constant_1.HitResult.Sink;
                        hitResultModel.TypeSank = result.Ships[i].ShipType;
                        result.Ships.splice(i, 1);
                        if (result.Ships.length == 0) {
                            hitResultModel.HitResult = constant_1.HitResult.Won;
                            result.Status = "Finished";
                        }
                    }
                    break;
                }
            }
        }
        if (hitResultModel.HitResult == constant_1.HitResult.Miss)
            result.TotalMiss++;
    };
    Util.prototype.isTargetLocation = function (obj) {
        return obj.GameId !== undefined && obj.Row !== undefined && obj.Col !== undefined;
    };
    Util.prototype.getRandomInt = function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return Util;
}());
exports.Util = Util;
;
//# sourceMappingURL=utils.js.map