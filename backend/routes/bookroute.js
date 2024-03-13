import express from "express";
import { StatusCodes } from "http-status-codes";
import { Book } from "../models/bookModel.js";

const bookRoute = express.Router();

bookRoute.get("/book",async(req,res)=>{
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

bookRoute.post("/book", async(req,res)=>{
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

bookRoute.get("/book/:id",async(req,res)=>{
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

bookRoute.put("/book/:id",async(req,res)=>{
    const {id} = req.params;
    const {title,author,year} = req.body;
    try {
        if(!title || !author || !year)
        {
            return res
            .status(StatusCodes.BAD_REQUEST)
            .json({msg:"Please provide title , author and year"})
        }
        const book = await Book.findByIdAndUpdate(id,req.body);
        if(!book)
            return res.status(StatusCodes.NOT_FOUND).json({msg: `book not found with ${id}`});
        res.status(StatusCodes.OK).json({msg: `Book updated with ${id}`, data: book})
    } catch (error) {
        console.log(error)
        res.status(StatusCodes.BAD_GATEWAY).json({msg: "internal server error"});
    }
})

bookRoute.delete("/book/:id",async(req,res)=>{
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

export default bookRoute;