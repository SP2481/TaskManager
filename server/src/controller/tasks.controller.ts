import { Request, Response } from 'express';
import * as statusCodes from 'http-status';
import { Project } from '../models/projects.model';
import { Tasks } from '../models/tasks.model';
import { ResponseBuilder } from '../utils/response.builder';

export const createTask = async (req: Request, res: Response) => {
  try {
    const project_id = req.params.id;
    const {
      title,
      description,
      status,
    }: { title: string; description: string; status: string } = req.body;
    console.log(title, description, status, project_id)
    const createdTasks = await Tasks.create({
      project_id: project_id,
      title: title,
      description: description,
      status: status ?? "Todo",
    });
    const response = ResponseBuilder(createdTasks, statusCodes.OK);
    res.status(statusCodes.OK).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const project_id = req.params.id;
    if (!project_id) {
      throw new Error('Project Id required!');
    } 
    const tasks = await Tasks.find({ project_id: project_id }).populate('project_id');
    const response = ResponseBuilder(tasks, statusCodes.OK);
    res.status(statusCodes.OK).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};

export const getAllTasksByUserId = async (req: Request, res: Response) => {
  try {
    const userObject = JSON.parse(req.headers['user'] as string);
    const projects = await Project.find({user_id:userObject._id}).populate({
      path: 'user_id',
    });
    const allTasks = [];
    console.log(projects)
    const tasks  = await projects.map(async (project) => {
      const tasks = await Tasks.find({project_id: project._id});
      console.log(tasks)
      allTasks.push(tasks)
    })
    
    const response = ResponseBuilder(tasks, statusCodes.OK);
    res.status(statusCodes.OK).send(response);
  } catch(err:unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
  }

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    const {
      title,
      description,
      status,
    }: {
      title: string;
      description: string;
      status: string;
    } = req.body;

    await Tasks.findByIdAndUpdate(taskId, {
      $set: { title: title, description: description, status: status },
    });
    const response = ResponseBuilder('Success', statusCodes.OK);
    res.status(statusCodes.OK).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskId = req.params.id;
    await Tasks.findByIdAndDelete(taskId);
    const response = ResponseBuilder('Success', statusCodes.OK);
    res.status(statusCodes.OK).send(response);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: err.message });
    }
    return res
      .status(statusCodes.BAD_REQUEST)
      .json({ message: 'An unknown error occurred' });
  }
};
