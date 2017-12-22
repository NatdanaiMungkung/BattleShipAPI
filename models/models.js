"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Log = /** @class */ (function () {
    function Log() {
    }
    return Log;
}());
exports.Log = Log;
var Board = /** @class */ (function () {
    function Board() {
        this.Ships = [];
        this.TotalFire = 0;
        this.TotalMiss = 0;
        this.Status = "InProgress";
    }
    return Board;
}());
exports.Board = Board;
var Ship = /** @class */ (function () {
    function Ship() {
        this.Locations = [];
    }
    return Ship;
}());
exports.Ship = Ship;
var Location = /** @class */ (function () {
    function Location() {
    }
    return Location;
}());
exports.Location = Location;
var TargetLocation = /** @class */ (function (_super) {
    __extends(TargetLocation, _super);
    function TargetLocation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TargetLocation;
}(Location));
exports.TargetLocation = TargetLocation;
var HitResultModel = /** @class */ (function () {
    function HitResultModel() {
    }
    return HitResultModel;
}());
exports.HitResultModel = HitResultModel;
//# sourceMappingURL=models.js.map