import express from "express";
const app = express();
const PORT = 3000;
app.listen(PORT,()=>{
    console.log("Server is started..")
})
app.get("/book",(req,res)=>{
    res.send("<h1>Welcome to the BookStore!</h1>")
})
app.get("*",(req,res)=>{
    res.send("How may I help you?")
})