import express from "express";
import 'dotenv/config'
import dbConnect from "./dbConnect.js";
import { Book } from "./models/bookmodel.js";
import { StatusCodes} from "http-status-codes"; 

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



app.get("/book",async(req,res)=>{
    try {
        const books = await Book.find();
        if(!books)
            return res.status(StatusCodes.OK).json({msg: "Book is not available"});
        res.status(StatusCodes.OK).json({count: books.length, data: books});
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({msg: "Internal server error, try again"});
    }
})

app.post("/book", async(req,res)=>{
    try {
        const{title, author, year} = req.body;                  //object destructuring from body
        if(!title || !author || !year)
        {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({msg:"Please provide title , author and year"})
        }
        await Book.create(req.body);                        // insert query same as sql {insert into Book(author,title,year) values('','',);}
        res.status(StatusCodes.CREATED).json({msg : "Book added Succesfully"})
    } catch (error) {
        console.log(error)
        res
        .status(StatusCodes.BAD_GATEWAY)
        .json({msg:"Internal server error, try again"});
        
    }
})

app.get("/book/:id",async(req,res)=>{
    const {id} = req.params;                        //from the url
    try {
        const book = await Book.findById(id);
        if(!book)
            return res.status(StatusCodes.NOT_FOUND).json({msg: `book not found with ${id}`});
        res.status(StatusCodes.OK).json({data: book});
        
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg: "internal server error"});
    }
    
})

app.put("/book/:id",(req,res)=>{
    res.send("Update the book")
})

app.delete("/book/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const book = await Book.findByIdAndDelete(id);
        if(!book) return res.status(StatusCodes.NOT_FOUND).json({msg : `Book not found with id ${id}`})
        res.status(StatusCodes.OK).json({msg:"Book deleted", data: book});
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_REQUEST).json({msg: "internal server error"});
    }
})

app.get("*",(req,res)=>{
    res.send("How may I help you?")
})