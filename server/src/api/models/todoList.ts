import { ObjectId } from "mongodb";
import { User } from "./user";

export interface TodoItem {
    _id?: ObjectId,
    text?: string,
    checked?: boolean,
    createdOn?: Date,
    modifiedOn?: Date,
}

export interface TodoList {
    _id?: ObjectId,
    title?: string,
    todoItems?: [TodoItem],
    createdOn?: Date,
    modifiedOn?: Date,
    user?: ObjectId
}