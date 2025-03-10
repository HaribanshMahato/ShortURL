const express = require("express");

const {connectToMongoDB } = require("./connect");

const urlRout = require('./routes/url');

const URL = require('./models/url');

const app = express();

const PORT = 8000;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(() => 
    console.log("Mongodb connected")
);

app.use(express.json());

app.use("/url",urlRout);

app.get('/:shortId', async (req,res) => {

    const shortId = req.params.shortId ;
   const entry =  await URL.findOneAndUpdate(
    {
        
        shortId 
    }, 
    { 
        $push:  {
            visitHistory : {
                timestamp: Date.now(),  
            },
        },
     });

     res.redirect(entry.redirectURL);

});




app.listen(PORT, () => console.log(`Server started at PORT:${PORT}`));

