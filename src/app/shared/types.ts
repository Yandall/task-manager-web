export type Folder = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  owner?: number;
  config?: { [key: string]: any };
  createdDate?: string;
  updatedDate?: string;
  boards?: Board[];
};

export type Board = {
  id?: string;
  folderId?: string;
  config?: { [key: string]: any };
  owner?: number;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  isDeleted?: boolean;
  sections?: Section[];
};

export type Task = {
  id?: string;
  createdDate?: string;
  dueDate?: string;
  owner?: number;
  sectionId?: string;
  config: { [key: string]: any };
  content: { [key: string]: any };
  updatedDate?: string;
  isDeleted?: boolean;
};

export type Section = {
  id?: string;
  boardId?: string;
  createdDate?: string;
  updatedDate?: string;
  owner?: number;
  isDeleted?: boolean;
  config: { title: string; [key: string]: any };
  tasks?: Task[];
};
