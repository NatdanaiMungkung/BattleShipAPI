import * as expect from "expect";
import { Util } from './utils';
import * as Enumerable from 'linq';
import { loadavg } from "os";
import { HitResult } from "./constant";
import {Location,Board,Ship,HitResultModel,TargetLocation} from '../models/models'
it("should generate valid board",()=> {
    let utils = new Util();
    let board = utils.GenerateBoard();
    let isValidLocation:boolean = true;
    for (let i = 0;i<board.Ships.length;i++) {
        let ship = board.Ships[i];
        if (!isValidLocation)
        break;
        let blockedLoc:Location[] = [];
        ship.Locations.forEach((location,j)=> {
            
            let toInsert:Location = {
                Col: location.Col,
                Row: location.Row
            };
            if (!Enumerable.from(blockedLoc).any(a=> a.Col === toInsert.Col && a.Row === toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col,
                Row: location.Row - 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col,
                Row: location.Row + 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)
            
            toInsert = {
                Col: location.Col - 1,
                Row: location.Row
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col + 1,
                Row: location.Row
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col - 1,
                Row: location.Row - 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col - 1,
                Row: location.Row + 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col + 1,
                Row: location.Row - 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)

            toInsert = {
                Col: location.Col + 1,
                Row: location.Row + 1
            }
            if (!Enumerable.from(blockedLoc).any(a=> a.Col == toInsert.Col && a.Row == toInsert.Row))
            blockedLoc.push(toInsert)
        })
        
        for (let j=0;j<board.Ships.length;j++) {
            if (i === j)
            continue;
            board.Ships[j].Locations.forEach((location)=> {
                if (Enumerable.from(blockedLoc).any(a=>a.Col == location.Col && a.Row == location.Row)) {
                    isValidLocation = false;
                }
                    
            })
        }
    }

    expect(board.Status).toEqual("InProgress");
    expect(board.TotalFire).toEqual(0);
    expect(board.TotalMiss).toEqual(0);
    expect(board.Ships.length).toEqual(10);
    expect(isValidLocation).toBeTruthy();

})

it("should return miss if miss target",()=> {
    let board = new Board();
    let location = new Location();
    location.Col = 1;
    location.Row = 1;
    let ship = new Ship();
    let hitResultModel = new HitResultModel();
    let utils = new Util();
    ship = {
        ShipType : "Test",
        Locations : [location]
    }
    
    board.Ships.push(ship)
    utils.CalculateBoardAfterTarget(<Location>{Col:0,Row:0},board,hitResultModel);
    expect(hitResultModel.HitResult).toEqual(HitResult.Miss);
})

it("should return hit if hit target",()=> {
    let board = new Board();
    let location = new Location();
    location.Col = 1;
    location.Row = 1;
    let ship = new Ship();
    let hitResultModel = new HitResultModel();
    let utils = new Util();
    ship = {
        ShipType : "Test",
        Locations : [location,{Col:1,Row:2}]
    }
    board.Ships.push(ship)
    utils.CalculateBoardAfterTarget(<Location>{Col:1,Row:1},board,hitResultModel);
    expect(hitResultModel.HitResult).toEqual(HitResult.Hit);
})

it("should return sank if sank target",()=> {
    let board = new Board();
    let location = new Location();
    location.Col = 1;
    location.Row = 1;
    let ship = new Ship();
    let hitResultModel = new HitResultModel();
    let utils = new Util();
    ship = {
        ShipType : "Test",
        Locations : [location]
    }
    
    board.Ships.push(ship)
    ship = new Ship();
    ship = {
        ShipType : "Test2",
        Locations : [{Col:5,Row:5}]
    }
    board.Ships.push(ship)
    utils.CalculateBoardAfterTarget(<Location>{Col:1,Row:1},board,hitResultModel);
    expect(hitResultModel.HitResult).toEqual(HitResult.Sink);
})

it("should return won if won game",()=> {
    let board = new Board();
    let location = new Location();
    let ship = new Ship();
    let hitResultModel = new HitResultModel();
    let utils = new Util();
    ship = {
        ShipType : "Test",
        Locations : [location]
    }
    location.Col = 1;
    location.Row = 1;
    board.Ships.push(ship)
    utils.CalculateBoardAfterTarget(<Location>{Col:1,Row:1},board,hitResultModel);
    expect(hitResultModel.HitResult).toEqual(HitResult.Won);
})

it("should return false if not TargetLocation Class",()=> {

    let utils = new Util();
    let fakeTarget = {name:'test'}
    let result = utils.isTargetLocation(fakeTarget);
    expect(result).toBeFalsy();
})

it("should return true if TargetLocation Class",()=> {
    
        let utils = new Util();
        let Target = new TargetLocation();
        Target.GameId = "test";
        Target.Col = 5
        Target.Row = 5;
        let result = utils.isTargetLocation(Target);
        expect(result).toBeTruthy();
    })