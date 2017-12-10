console.log("App starting...");

import express = require('express');

let app = express();
app.get('/',(req,res) => {
    res.json(1);
});
app.listen(3000);