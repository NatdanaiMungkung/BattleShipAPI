"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log("App starting...");
var express = require("express");
var app = express();
app.get('/', function (req, res) {
    res.json(1);
});
app.listen(3000);
//# sourceMappingURL=app.js.map