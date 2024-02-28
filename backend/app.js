import express from "express";
import 'dotenv/config'
import dbConnect from "./dbConnect.js";

const app = express();

const PORT = process.env.PORT;

const start = async ()=>{
    try {
        await dbConnect(process.env.MONGO_URL);
        console.log("Database connected");
        app.listen(PORT,()=>{
            console.log("Server is started..")
        })
    } catch (error) {
        console.log(error);
    }
};

start();



app.get("/book",(req,res)=>{
    res.send("<h1>Welcome to the BookStore!</h1>")
})

app.post("/book",(req,res)=>{
    res.send("Add a new book")
})

app.get("/book/:id",(req,res)=>{
    res.send("Get a book")
})

app.put("/book/:id",(req,res)=>{
    res.send("Update the book")
})

app.delete("/book/:id",(req,res)=>{
    res.send("Delete the book")
})

app.get("*",(req,res)=>{
    res.send("How may I help you?")
})