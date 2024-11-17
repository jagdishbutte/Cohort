const express = require("express");
const { UserModel, TodoModel } = require("./db");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "mongoisgood";
const bcrypt = require("bcrypt");
const { z } = require("zod");

mongoose.connect("mongodb+srv://james:james123@cluster0.hqs2m.mongodb.net/todo-app-2");

const app = express();
app.use(express.json());

app.post("/signup", async function(req, res) {

    const requiredBody = z.object({
        email: z.string().min(3).max(30).email(),
        password: z.string().min(3).max(30),
        name: z.string().min(3).max(30)
    });

    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message: "Incorrect format"
        });
    }

    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    try{
        const hashedPassword = await bcrypt.hash(password, 5);

        await UserModel.create({
        email: email,
        password: hashedPassword,
        name: name
        });

        res.json({
            message: "You are signed up"
        });
    }catch(e){
        res.json({
            message: "User already exist"
        });
    } 
});

app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
    });

    if(!response){
        res.status(403).json({
            message: "User does not exist"
        });
        return
    }

    const passwordMatch = await bcrypt.compare(password, response.password);

    if (passwordMatch) {
        const token = jwt.sign({
            id: response._id.toString()
        }, JWT_SECRET);

        res.json({
            token
        });
    } 
    
    else {
        res.status(403).json({
            message: "Incorrect creds"
        });
    }
});


app.post("/todo", auth,  function(req, res) {
    const userId = req.userId;
    const title = req.body.title;
    const done = req.body.done;

    TodoModel.create({
        title,
        userId,
        done
    })
    
    res.json({
        message: "Todo created"
    })
});


app.get("/todos", auth, async function(req, res) {
    const userId = req.userId;

    const todos = await  TodoModel.find({
        userId: userId
    });

    res.json({
        todos
    });
});

function auth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        });
    }
}

app.listen(3000);
