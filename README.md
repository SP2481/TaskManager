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

Data Model
The TaskManager application uses a MongoDB database to manage users, projects, and tasks. Below is an explanation of the data model and relationships between the entities:

1. User Schema
Fields:
username (String, required, unique): A unique identifier for each user.
email (String, required, unique): Used to store the user's email address and ensure no duplicates.
password (String, required, minlength: 6): Stores the user's password securely.
Timestamps: Automatically records the creation and last update times of each user document.
Purpose: Users are the primary actors in the system. They create and manage projects and tasks.
2. Project Schema
Fields:
user_id (ObjectId, required, ref: 'User'): A reference to the User document, linking each project to a user.
title (String, required): The project’s title.
description (String): An optional field for a brief description of the project.
Relationship: Each project is associated with a user through the user_id. A user can have multiple projects, establishing a one-to-many relationship.
Timestamps: Records when the project was created and last updated.
Purpose: Projects are the containers for tasks and are user-specific. Each user can manage their projects individually.
3. Task Schema
Fields:
project_id (ObjectId, required, ref: 'Project'): A reference to the Project document, associating each task with a project.
title (String, required): The task’s title.
description (String): An optional field to describe the task.
status (String, enum: ['Todo', 'InProgress', 'Done'], default: 'Todo'): Tracks the current status of the task.
Relationship: Each task is linked to a project via the project_id, allowing tasks to be organized under their respective projects.
Timestamps: Automatically records the creation and last update times of each task.
Purpose: Tasks represent specific actions or items that need to be completed within a project. They are categorized by status and belong to projects.
Data Relationships
Users and Projects: A one-to-many relationship where each user can have multiple projects.
Projects and Tasks: A one-to-many relationship where each project can contain multiple tasks.
The relationships are established through references (e.g., user_id in the Project schema and project_id in the Task schema), allowing efficient querying and management of tasks and projects in the database. The use of ref fields ensures that data can be populated with related documents (e.g., populating tasks with project details) to create a connected and well-organized structure.

