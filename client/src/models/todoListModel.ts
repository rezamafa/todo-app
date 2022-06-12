export interface TodoItem {
  _id?: number;
  text: string;
  checked?: boolean;
  createdOn?: Date,
  modifiedOn?: Date,
}

export interface Todo {
  _id?: number;
  title: string;
  todoItems: TodoItem[];
  createdOn?: Date,
  modifiedOn?: Date,
  user?: number
}
