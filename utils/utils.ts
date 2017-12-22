import { Constants,HitResult } from "./constant";
import * as Enumerable from 'linq';
import { toInfinity } from 'linq';
import { Schema } from 'mongoose';
import { Board , Location,Ship,HitResultModel} from '../models/models';

let constants = new Constants();

export class Util {
    public GenerateBoard() {
        let board:Board = new Board();
        let blockedLoc:Location[] = [];
        constants.ShipLengthList.forEach((type)=> {
            let ship = new Ship();
            ship.ShipType = type.Type;
            let isCheckHorizon:boolean = false;
            let isCheckVertical:boolean = false;
            let location = new Location();
            let startLocation = new Location();
            for (let i = 0;i<type.Length;i++) {
                
                
                if (i === 0) {
                    location.Col = this.getRandomInt(0,constants.MAXCOL - 1);
                    location.Row = this.getRandomInt(0,constants.MAXROW - 1);
                    startLocation.Col = location.Col;
                    startLocation.Row = location.Row;
                    isCheckHorizon = location.Col + type.Length < constants.MAXCOL; 
                    isCheckVertical = location.Row + type.Length < constants.MAXROW; 
                    if (!isCheckHorizon && !isCheckVertical) {
                        i--;
                        continue;
                    }
                    //Check if start point is duplicate with existing ships
                    if (blockedLoc.length > 0) {
                        if (Enumerable.from(blockedLoc).any(a=>a.Col == location.Col && a.Row == location.Row)) {
                            i--; //Re random location
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                        }
                    } else {
                        ship.Locations.push(location);
                    }
                }
                else {
                    let prevLoc = location;
                    location = new Location();
                    location.Col = prevLoc.Col;
                    location.Row = prevLoc.Row;
                    if (isCheckHorizon) {
                        location.Col++;
                        location.Row = location.Row;
                        if (Enumerable.from(blockedLoc).any(a=>a.Col == location.Col && a.Row == location.Row)) {
                            isCheckHorizon = false;
                            i = 0;
                            ship.Locations.splice(1); //change from horizon to vertical
                            location.Row = startLocation.Row;
                            location.Col = startLocation.Col;
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                            continue;
                        }
                    }

                    if (isCheckVertical) {

                        location.Col = location.Col;
                        location.Row++;
                        if (Enumerable.from(blockedLoc).any(a=>a.Col === location.Col && a.Row === location.Row)) {
                            isCheckVertical = false;
                            i = 0;
                            ship.Locations.splice(1);
                            location.Row = startLocation.Row;
                            location.Col = startLocation.Col;
                            continue;
                        }
                        else {
                            ship.Locations.push(location);
                            continue;
                        }
                    }
                    if (!isCheckHorizon && !isCheckVertical) {
                        i = -1;
                        ship.Locations.splice(0);
                        // re random location at start point
                        continue;
                    }
                }
            }
            // get area around ship 
            ship.Locations.forEach((location)=> {
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
            if (ship.Locations.length > type.Length)
                console.log("Found");
            board.Ships.push(ship);
        })
        return board;
    }
    public CalculateBoardAfterTarget(target:Location,result:Board,hitResultModel:HitResultModel) {
        hitResultModel.HitResult = HitResult.Miss
        result.TotalFire++;
        for (let i =0;i<result.Ships.length;i++) {
            for (let j=0;j<result.Ships[i].Locations.length;j++) {
                if (result.Ships[i].Locations[j].Col == target.Col && 
                    result.Ships[i].Locations[j].Row == target.Row) {
                        hitResultModel.HitResult = HitResult.Hit
                        result.Ships[i].Locations.splice(j,1);
                        if (result.Ships[i].Locations.length == 0) {
                            hitResultModel.HitResult = HitResult.Sink
                            hitResultModel.TypeSank = result.Ships[i].ShipType
                            result.Ships.splice(i,1);
                            if (result.Ships.length == 0) {
                                hitResultModel.HitResult = HitResult.Won;
                                result.Status = "Finished"
                                
                            }
                        }
                        break;
                    }
            }
        }
        if (hitResultModel.HitResult == HitResult.Miss)
            result.TotalMiss++;
    }

    public isTargetLocation(obj:any) {
        return obj.GameId !== undefined && obj.Row !== undefined && obj.Col !== undefined
    }
    private getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
};