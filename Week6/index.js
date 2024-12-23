const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const JWT_SECRET = "jadukali";

app.use(express.json());

let users = [];

app.post("/signup", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    users.push({
        username,
        password
    });

    res.send({
        message: "You have signed up successfully!"
    });

});

app.post("/signin", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const token = jwt.sign({
            "username": user.username
        }, JWT_SECRET);

        user.token = token;
        res.send({
            token
        })
        console.log(users);
    } else {
        res.status(403).send({
            message: "Invalid username or password"
        })
    }
});

app.get("/me", (req, res) => {
    const token = req.headers.token;
    const decodedInformation = jwt.verify(token, JWT_SECRET);

    const username = decodedInformation.username;
    const user = users.find(user => user.token === token);

    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000);