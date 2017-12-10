"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("App starting...");
var express = require("express");
var utils_1 = require("./utils/utils");
var app = express();
app.get('/', function (req, res) {
    res.json(1);
});
app.get('/start', function (req, res) {
    res.json(utils_1.GetUUID());
});
app.listen(3000);
//# sourceMappingURL=app.js.map