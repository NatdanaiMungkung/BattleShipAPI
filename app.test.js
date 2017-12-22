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
            // if (err) {
            //     return done(err)
            // }
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
            expect(res.body).toIncludeKey('GameId');
        })
            .end(function (err, res) {
            // if (err) {
            //     return done(err)
            // }
            done();
        });
    });
});
//# sourceMappingURL=app.test.js.map