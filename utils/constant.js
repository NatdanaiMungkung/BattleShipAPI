"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Constants = /** @class */ (function () {
    function Constants() {
        this.URL = 'mongodb://localhost:27017';
        this.DBNAME = process.env.NODE_ENV !== 'test' ? 'local' : 'test';
        //public DBNAME:string =  'local';
        this.MAXROW = 10;
        this.MAXCOL = 10;
        this.ShipLengthList = [
            { Length: 4, Type: "BattleShip" },
            { Length: 3, Type: "Cruiser" },
            { Length: 3, Type: "Cruiser" },
            { Length: 2, Type: "Destroyer" },
            { Length: 2, Type: "Destroyer" },
            { Length: 2, Type: "Destroyer" },
            { Length: 1, Type: "Submarines" },
            { Length: 1, Type: "Submarines" },
            { Length: 1, Type: "Submarines" },
            { Length: 1, Type: "Submarines" },
        ];
    }
    return Constants;
}());
exports.Constants = Constants;
var HitResult;
(function (HitResult) {
    HitResult[HitResult["Miss"] = 0] = "Miss";
    HitResult[HitResult["Hit"] = 1] = "Hit";
    HitResult[HitResult["Sink"] = 2] = "Sink";
    HitResult[HitResult["Won"] = 3] = "Won";
})(HitResult = exports.HitResult || (exports.HitResult = {}));
//# sourceMappingURL=constant.js.map