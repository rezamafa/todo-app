import { ObjectId } from "mongodb";
import { User } from "./user";

export interface TodoItem {
    text?: string,
    checked?: boolean,
    createdOn?: Date,
}

export interface TodoList {
    _id?: ObjectId,
    title?: string,
    todoItems?: [TodoItem],
    user?: User
}