export interface ITaskProject {
  _id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  project_id: ITaskProject;
  title: string;
  description: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
