import express from "express";
import 'dotenv/config'
import dbConnect from "./dbConnect.js";
import { Book } from "./models/bookmodel.js";

const app = express();

app.use(express.json());   //set the server to accept json data from the frontend(postman/thunderclient)

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

app.post("/book",async (req,res)=>{
    try {
        const{title, author, year} = req.body;
        if(!title || !author || !year)
        {
            return res.json({msg:"Please provide title , author and year"})
        }
        await Book.create(req.body);
        res.json({msg : "Book added Succesfully"})
    } catch (error) {
        console.log(error)
    }
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