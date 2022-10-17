export type Folder = {
  id: string;
  name: string;
  owner: number;
  config: { [key: string]: any };
  createdDate: string;
  updatedDate: string;
  boards: Board[];
};

export type Board = {
  id: string;
  folderId: string;
  config: { [key: string]: any };
  owner: number;
  name: string;
  createdDate: string;
  updatedDate: string;
  sections: Section[];
};

export type Task = {
  id: string;
  createdDate: string;
  dueDate: string;
  owner: number;
  sectionId: string;
  config: { [key: string]: any };
  content: { [key: string]: any };
  isDeleted: boolean;
};

export type Section = {
  id: string;
  boardId: string;
  createdDate: string;
  updatedDate: string;
  owner: number;
  config: { [key: string]: any };
  tasks: Task[];
};
