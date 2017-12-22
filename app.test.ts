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
            // if (err) {
            //     return done(err)
            // }
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
            expect(res.body).toIncludeKey('GameId');
        })
        .end((err,res)=> {
            // if (err) {
            //     return done(err)
            // }
            done();

        })
    })
})
    
