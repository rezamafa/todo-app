import {MongoHelper} from "../../database/mongoHelper";
import {dbConfig} from '../../config/dbConfig'
import {User} from '../../models/user'


export default class UserRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async get(user: User) {
        return await this.getCollection().findOne(user) as User;
    }

    public async create(user: User) {
        return await this.getCollection().insertOne(user);
    }

    public async update(filter: User, update: User) {
        return await this.getCollection().updateOne(filter, {$set: update});
    }

    public async delete(filter: User) {
        return await this.getCollection().deleteOne(filter)
    }

    public async getAll(filter: User) {
        return await this.getCollection().find(filter).toArray() as User[];
    }
}
