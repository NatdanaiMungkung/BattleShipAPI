"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var utils_1 = require("./utils");
it('should return UUID', function () {
    var res = utils_1.GetUUID();
    if (res.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i) === null)
        throw new Error("incorrect format");
});
//# sourceMappingURL=utils.test.js.map