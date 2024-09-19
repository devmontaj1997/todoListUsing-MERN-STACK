import expressAsyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// create formValidation Controllers
/**
 * @description: this formValidation get Controller
 * @route: /api/v1/formValidation
 * @access: public
 * @method: get
 */

export const getTodo = expressAsyncHandler(async (req, res) => {
  const allTodo = await prisma.User.findMany();

  const todoCount = await prisma.User.count();

  res
    .status(200)
    .json({ allTodo, todoCount});
});

/**
 * @description: this is get TaskOption get Controller
 * @route: /api/v1/formValidation
 * @access: public
 * @method: get
 */

export const getTaskOption = expressAsyncHandler(async (req, res) => {
  const { taskOption } = req.params; // Extract taskOption from route parameters

  const filteredTasks = await prisma.User.findMany({
    where: {
      taskOption: taskOption, // Use exact match
    },
  });

  // Check if tasks were found
  if (filteredTasks.length === 0) {
    return res
      .status(404)
      .json({ message: "No tasks found with the given task option" });
  }
  //Count the number of tasks with the same taskOption
  const todoCount = await prisma.User.count({
    where: {
      taskOption: taskOption, // Same condition used for count
    },
  });

  // Send back the filtered tasks
  res
    .status(200)
    .json({
      filteredTasks,
      todoCount,
      message: ` here is your ${taskOption} todo`,
    });
});

/**
 * @description: this  is todo create user data Controller
 * @route: /api/v1/todo_list/add_task
 * @access: public
 * @method: post
 */

export const createTask = expressAsyncHandler(async (req, res) => {
  const { task, taskOption } = req.body;

  if (!task) {
    return res.status(400).json({ message: " Enter Your Task" });
  }

  const createTodo = await prisma.User.create({
    data: {
      task,
      taskOption,
    },
  });
  const todoCount = await prisma.User.count();
  res
    .status(200)
    .json({ createTodo, todoCount, message: "SuccessFully Added Your Task" });
});

/**
 * @description: this  is deleteTodo create user data Controller
 * @route: /api/v1/todo_list/delete_todo/:id
 * @access: public
 * @method: delete
 */

export const deleteTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedUser = await prisma.User.delete({
    where: { id },
  });
  const todoCount = await prisma.User.count();

  res.status(200).json({
    deletedUser,
    todoCount,
    message: ` SuccessFully Deleted ${deletedUser.task}`,
  });
});

/**
 * @description: this  is deleteAllTodo create user data Controller
 * @route: /api/v1/todo_list/delete_todo
 * @access: public
 * @method: delete
 */

export const deleteAllTask = expressAsyncHandler(async (req, res) => {
  // checking available todo
  const availableTodo = await prisma.User.findMany();
  if (availableTodo.length === 0) {
    return res.status(400).json({ message: "Todo not available Here " });
  } else {
    const deletedAllTask = await prisma.User.deleteMany({});
    const todoCount = await prisma.User.count();
    res
      .status(200)
      .json({
        deletedAllTask,
        todoCount,
        message: ` SuccessFully Delete All Tasks `,
      });
  }
});

/**
 * @description: this  is upDateTask create user data Controller
 * @route: /api/v1/todo_list/update_todo/:id
 * @access: public
 * @method: post
 */

export const upDateTask = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { task, taskOption } = req.body;


  const updatedTask = await prisma.User.update({
    where: { id }, // Update based on the unique id
    data: { task, taskOption }, // Specify what field(s) to update
  });
  const todoCount = await prisma.User.count();

  res.status(200).json({
    updatedTask,
    todoCount,
    message: ` SuccessFully Updated your new task ${updatedTask.task} now status ${updatedTask.taskOption} `,
  });
});
