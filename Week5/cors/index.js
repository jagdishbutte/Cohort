const express = require("express");
// const cors = require("cors");

const app = express();
app.use(express.json());
// app.use(cors());

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/sum", function(req, res){
    const a = parseInt(req.body.a);
    const b = parseInt(req.body.b);

    res.json({
        ans: a+b
    })
});

app.listen(4000, () => {
    console.log("Server is running on port 4000")}
);


