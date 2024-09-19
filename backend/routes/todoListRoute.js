import express from "express";
import { createTask, getTaskOption,deleteTask,deleteAllTask,getTodo ,upDateTask} from "../controllers/todoListController/todoListController.js";

// init route

const router = express.Router();


// create router

router.get( "/", getTodo)
router.get( "/:taskOption", getTaskOption)
router.post( "/add_task", createTask)
router.delete( "/delete_todo/:id", deleteTask)
router.delete( "/delete_todo", deleteAllTask)
router.patch( "/update_todo/:id", upDateTask)



// export router

export default router