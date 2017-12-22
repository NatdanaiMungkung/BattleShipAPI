"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require("expect");
var utils_1 = require("./utils");
var Enumerable = require("linq");
var constant_1 = require("./constant");
var models_1 = require("../models/models");
it("should generate valid board", function () {
    var utils = new utils_1.Util();
    var board = utils.GenerateBoard();
    var isValidLocation = true;
    var _loop_1 = function (i) {
        var ship = board.Ships[i];
        if (!isValidLocation)
            return "break";
        var blockedLoc = [];
        ship.Locations.forEach(function (location, j) {
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
        for (var j = 0; j < board.Ships.length; j++) {
            if (i === j)
                continue;
            board.Ships[j].Locations.forEach(function (location) {
                if (Enumerable.from(blockedLoc).any(function (a) { return a.Col == location.Col && a.Row == location.Row; })) {
                    isValidLocation = false;
                }
            });
        }
    };
    for (var i = 0; i < board.Ships.length; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    expect(board.Status).toEqual("InProgress");
    expect(board.TotalFire).toEqual(0);
    expect(board.TotalMiss).toEqual(0);
    expect(board.Ships.length).toEqual(10);
    expect(isValidLocation).toBeTruthy();
});
it("should return miss if miss target", function () {
    var board = new models_1.Board();
    var location = new models_1.Location();
    location.Col = 1;
    location.Row = 1;
    var ship = new models_1.Ship();
    var hitResultModel = new models_1.HitResultModel();
    var utils = new utils_1.Util();
    ship = {
        ShipType: "Test",
        Locations: [location]
    };
    board.Ships.push(ship);
    utils.CalculateBoardAfterTarget({ Col: 0, Row: 0 }, board, hitResultModel);
    expect(hitResultModel.HitResult).toEqual(constant_1.HitResult.Miss);
});
it("should return hit if hit target", function () {
    var board = new models_1.Board();
    var location = new models_1.Location();
    location.Col = 1;
    location.Row = 1;
    var ship = new models_1.Ship();
    var hitResultModel = new models_1.HitResultModel();
    var utils = new utils_1.Util();
    ship = {
        ShipType: "Test",
        Locations: [location, { Col: 1, Row: 2 }]
    };
    board.Ships.push(ship);
    utils.CalculateBoardAfterTarget({ Col: 1, Row: 1 }, board, hitResultModel);
    expect(hitResultModel.HitResult).toEqual(constant_1.HitResult.Hit);
});
it("should return sank if sank target", function () {
    var board = new models_1.Board();
    var location = new models_1.Location();
    location.Col = 1;
    location.Row = 1;
    var ship = new models_1.Ship();
    var hitResultModel = new models_1.HitResultModel();
    var utils = new utils_1.Util();
    ship = {
        ShipType: "Test",
        Locations: [location]
    };
    board.Ships.push(ship);
    ship = new models_1.Ship();
    ship = {
        ShipType: "Test2",
        Locations: [{ Col: 5, Row: 5 }]
    };
    board.Ships.push(ship);
    utils.CalculateBoardAfterTarget({ Col: 1, Row: 1 }, board, hitResultModel);
    expect(hitResultModel.HitResult).toEqual(constant_1.HitResult.Sink);
});
it("should return won if won game", function () {
    var board = new models_1.Board();
    var location = new models_1.Location();
    var ship = new models_1.Ship();
    var hitResultModel = new models_1.HitResultModel();
    var utils = new utils_1.Util();
    ship = {
        ShipType: "Test",
        Locations: [location]
    };
    location.Col = 1;
    location.Row = 1;
    board.Ships.push(ship);
    utils.CalculateBoardAfterTarget({ Col: 1, Row: 1 }, board, hitResultModel);
    expect(hitResultModel.HitResult).toEqual(constant_1.HitResult.Won);
});
it("should return false if not TargetLocation Class", function () {
    var utils = new utils_1.Util();
    var fakeTarget = { name: 'test' };
    var result = utils.isTargetLocation(fakeTarget);
    expect(result).toBeFalsy();
});
it("should return true if TargetLocation Class", function () {
    var utils = new utils_1.Util();
    var Target = new models_1.TargetLocation();
    Target.GameId = "test";
    Target.Col = 5;
    Target.Row = 5;
    var result = utils.isTargetLocation(Target);
    expect(result).toBeTruthy();
});
//# sourceMappingURL=utils.test.js.map