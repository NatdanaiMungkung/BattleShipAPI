# BattleShipAPI

Developed using TypeScript + mongodb
To run clone the project, run 
`npm install`

Before start
change the configuration of the db connection on (need to transpile to js after change)
`utils/constant.ts`
or 
`utils/constant.js`

`public URL:string = 'mongodb://localhost:27017';`

By default will use `local` db, for testing will use `test` db


    `public DBNAME:string =  process.env.NODE_ENV !== 'test'?'local':'test';`

to run the server type
`node app.js`

use POSTMAN file in /postman/postman.json to call API
https://www.getpostman.com/

<details>
   <summary>GET localhost:3000/</summary>
   <p>Get version of the API</p>
  <p>ex. {
    "version": "1.0"
    }</p>
 </details>
 <details>
   <summary>GET localhost:3000/battleship</summary>
   <p>Get new Game Id, API will return GameId, this will generate board and populate all the required ship in the board,
  Saved the location of ships in the DB `battleship_in_progress` and `battleship_logs`</p>
  <p>
    <p>Response ex. {
    "Id": "5a3dd4dc71fd6381dc085c44"
}</p>
 </details>
 
 <details>
   <summary>POST localhost:3000/battleship</summary>
   <p>Send target location object with GameId, if found GameID that match, API will check if target hit or miss</p>
   <p>
    Request ex. {
	"GameId":"5a350c7b22b7af52ac31c93d",
	"Col":4,
	"Row":1
}</p>
  <p>
    Response ex. {
    "Result": "Miss"
}</p>
 </details>

to run test
`npm test`

