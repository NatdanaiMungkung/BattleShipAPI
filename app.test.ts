import * as expect from 'expect';
import * as supertest from 'supertest';
import { MongoDB } from './utils/mongodb';
import { TargetLocation } from './models/models';
const {app} = require('./app');
describe('GET/',()=> {
    it('should return version',(done)=> {
        supertest(app)
        .get('/')
        .expect(200)
        .expect((res)=> {
            expect(res.body).toIncludeKey('version');
        })
        .end((err,res)=> {
            if (err) {
                return done(err)
            }
            done();

        })
    })
})

describe('GET/battleship',()=> {
    it('should return GameId',(done)=> {
        supertest(app)
        .get('/battleship')
        .expect(200)
        .expect((res)=> {
            expect(res.body).toIncludeKey('Id');
        })
        .end((err,res)=> {
            if (err) {
                return done(err)
            }
            done();

        })
    })
})
    
describe('POST/battleship',()=> {
    it('should return 400 if request incorrect',(done)=> {
        supertest(app)
        .post('/battleship')
        .send({
            "GameId":"5a350c7b22b7af52ac31c93e",
            "Col":4,
            "Row":1
        })
        .expect(400)
        .end((err,res)=> {
            if (err) {
                return done(err)
            }
            done();

        })
    })
})