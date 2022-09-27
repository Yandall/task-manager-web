export type Folder = {
  id?: string;
  name?: string;
  isDeleted?: boolean;
  owner?: string;
  config?: { [key: string]: any };
  createdDate?: string;
  updatedDate?: string;
  boards?: Board[];
};

export type Board = {
  id?: string;
  folderId?: string;
  config?: { [key: string]: any };
  owner?: string;
  name?: string;
  createdDate?: string;
  updatedDate?: string;
  isDeleted?: boolean;
};

export type Section = {
  title?: string;
};
