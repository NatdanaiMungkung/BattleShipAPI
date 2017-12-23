"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expect = require("expect");
var supertest = require("supertest");
var app = require('./app').app;
describe('GET/', function () {
    it('should return version', function (done) {
        supertest(app)
            .get('/')
            .expect(200)
            .expect(function (res) {
            expect(res.body).toIncludeKey('version');
        })
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});
describe('GET/battleship', function () {
    it('should return GameId', function (done) {
        supertest(app)
            .get('/battleship')
            .expect(200)
            .expect(function (res) {
            expect(res.body).toIncludeKey('Id');
        })
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});
describe('POST/battleship', function () {
    it('should return 400 if request incorrect', function (done) {
        supertest(app)
            .post('/battleship')
            .send({
            "GameId": "5a350c7b22b7af52ac31c93e",
            "Col": 4,
            "Row": 1
        })
            .expect(400)
            .end(function (err, res) {
            if (err) {
                return done(err);
            }
            done();
        });
    });
});
//# sourceMappingURL=app.test.js.map