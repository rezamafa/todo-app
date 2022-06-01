import {MongoHelper} from "../../database/mongoHelper";
import {dbConfig} from '../../config/dbConfig'
import {User} from '../../models/user'
import { TodoList } from "../../models/todoList";


export default class TodoRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('todo-list');
    }

    public async get(filter: TodoList) {
        return await this.getCollection().findOne(filter) as TodoList;
    }

    public async create(todoList: TodoList) {
        return await this.getCollection().insertOne(todoList);
    }

    public async update(filter: TodoList, update: TodoList) {
        return await this.getCollection().updateOne(filter, {$set: update});
    }

    public async delete(filter: TodoList) {
        return await this.getCollection().deleteOne(filter)
    }

    public async getAll(filter: TodoList) {
        return await this.getCollection().find(filter).toArray() as TodoList[];
    }
}
