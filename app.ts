console.log("App starting...");

import express = require('express');
import {GetUUID} from './utils/utils';
let app = express();
app.get('/',(req,res) => {
    res.json(1);
});

app.get('/start',(req,res)=> {
    res.json(GetUUID());
})
app.listen(3000);