# BattleShipAPI

Developed using TypeScript + mongodb
To run clone the project, run 
`npm install`

Before start
change the configuration of the db connection on (need to transpile to js after change)
`utils/constant.ts`
or 
`utils/constant.js`

then 
`node app.js`

use POSTMAN file in /postman/postman.json to call API
https://www.getpostman.com/

<details>
   <summary>localhost:3000/</summary>
   <p>Get version of the API</p>
  <p>ex. `{
    "version": "1.0"
    }`</p>
 </details>
 <details>
   <summary>localhost:3000/battleship</summary>
   <p>Get new Game Id, API will return GameId, this will generate board and populate all the required ship in the board,
  Saved the location of ships in the DB `battleship_in_progress` and `battleship_logs`</p>
  <p>
    <p>ex. `{
    "Id": "5a3dd4dc71fd6381dc085c44"
}`</p>
 </details>

to run test
`npm test`

