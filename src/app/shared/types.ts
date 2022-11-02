export interface Entity {
  id: string;
  owner: number;
  createdDate: string;
  updatedDate: string;
  isDeleted: boolean;
}

export interface Folder extends Entity {
  name: string;
  config: { [key: string]: any };
  boards: Board[];
}

export interface Board extends Entity {
  folderId: string;
  config: { [key: string]: any };
  name: string;
  sections: Section[];
}

export interface Task extends Entity {
  dueDate: string;
  sectionId: string;
  config: { tags: string[]; [key: string]: any };
  content: { title: string; description: string };
}

export interface Section extends Entity {
  boardId: string;
  config: { [key: string]: any };
  tasks: Task[];
}

export interface Tag extends Entity {
  name: string;
  color: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  config: { [key: string]: any };
  createdDate: string;
  updatedDate: string;
  isActive: boolean;
  token: string;
}
