import { Request, Response } from 'express';
import * as statusCodes from 'http-status';
import { Project } from '../models/projects.model';
import { Tasks } from '../models/tasks.model';
import { ResponseBuilder } from '../utils/response.builder';

export const createProject = async (req: Request, res: Response) => {
  try {
    const userObject = JSON.parse(req.headers['user'] as string);
    const { title, description }: { title: string; description: string } =
      req.body;
    if (!title || !description) {
      throw new Error('Title/Description are required');
    }
    console.log(userObject)
    const project = await Project.create({
      user_id: userObject._id,
      title: title,
      description: description,
    });
    const response = ResponseBuilder(project, statusCodes.OK);
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

export const updateProject = async (req: Request, res: Response) => {
  try {
    const project_id  = req.params.id;
    const {
      title,
      description,
    }: { project_id: string; title: string; description: string } = req.body;
    await Project.findByIdAndUpdate(
      project_id,
      { $set: { title: title, description: description } },
      { new: true }
    );
    const response = ResponseBuilder({}, statusCodes.OK);
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

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project_id  = req.params.id;
    if (!project_id) {
      throw new Error('Project Id required!');
    } 
    await Tasks.deleteMany({project_id:project_id})
    const deleteProject = await Project.deleteOne({ _id: project_id });

    const response = ResponseBuilder(deleteProject , statusCodes.OK);
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

export const getAllProject = async (req: Request, res: Response) => {
  try {
    const userObject = JSON.parse(req.headers['user'] as string);
    const projects = await Project.find({ user_id: userObject._id });

    const response = ResponseBuilder(projects, statusCodes.OK);
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
