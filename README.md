# TaskManager

TaskManager is a project management tool that allows users to manage projects and their associated tasks. The application includes a frontend built with Next.js and TypeScript, and a backend using Express.js, Node.js, and MongoDB for data storage.


## Features

- Create, update, and delete projects
- Manage tasks within each project
- Track task statuses
- Seamless frontend-backend integration

## Tech Stack

### Frontend:
- **Framework**: Next.js
- **Language**: TypeScript
- **Package Manager**: npm

### Backend:
- **Framework**: Express.js
- **Database**: MongoDB
- **Package Manager**: yarn

## Setup Instructions

### Frontend Setup

1. Navigate to the client folder 
2. Install dependencies : npm install
3. Run dev server:  npm run dev


### Backend Setup

1. Navigate to the server folder 
2. Install dependencies : yarn 
3. Run dev server:  yarn dev

## Data Model

The TaskManager application uses a MongoDB database to manage users, projects, and tasks. Below is an explanation of the data model and relationships between the entities:

### 1. **User Schema**
- **Fields**:
  - `username` (String)
  - `email` (String)
  - `password` (String)

### 2. **Project Schema**
- **Fields**:
  - `user_id` (ObjectId): A reference to the `User` document, linking each project to a user.
  - `title` (String)
  - `description` (String)
- **Relationship**: Each project is associated with a user through the `user_id`. A user can have multiple projects, establishing a one-to-many relationship.
- **Purpose**: Projects are the containers for tasks and are user-specific. Each user can manage their projects individually.

### 3. **Task Schema**
- **Fields**:
  - `project_id` (ObjectId): A reference to the `Project` document, associating each task with a project.
  - `title` (String)
  - `description` (String)
  - `status` (String, enum: ['Todo', 'InProgress', 'Done']): current status of the task.
- **Relationship**: Each task is linked to a project via the `project_id`, allowing tasks to be organized under their respective projects.
- **Purpose**: Tasks represent specific actions or items that need to be completed within a project. They are categorized by status and belong to projects.

