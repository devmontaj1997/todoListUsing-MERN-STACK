import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import asyncErrorHandler from "./errorHandler/asyncErrorHandler.js";
import router from "./routes/todoListRoute.js";

// environment varible

dotenv.config();

const PORT = process.env.PORT || 6060;
// init express

const app = express();
// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(cors({
    origin:[ 'http://localhost:3000', "http://localhost:4173"],
    credentials: true,
  }))

// use router

app.use("/api/v1/todo_list", router)

// use Error Handler
app.use(asyncErrorHandler)
// listen server
app.listen(PORT, () =>{
    console.log(`server is Runing On ${PORT}`.bgGreen.black);
    
})
