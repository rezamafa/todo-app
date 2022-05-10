import {MongoHelper} from "../../../database/mongoHelper";
import {dbConfig} from '../../../config/dbConfig'
import {User} from '../../../models/user'


export default class UserRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async getUser(user: User) {
        return await this.getCollection().findOne(user) as User;
    }

    public async createUser(user: User) {
        return await this.getCollection().insertOne(user);
    }

    public async updateUser(filter: User, update: User) {
        return await this.getCollection().updateOne(filter, {$set: update});
    }

    public async deleteUser(filter: User) {
        return await this.getCollection().deleteOne(filter)
    }

    public async getAllUsers(filter?: User) {
        if (filter) {
            return await this.getCollection().find(filter).toArray() as User[];
        } else {
            return await this.getCollection().find().toArray() as User[];
        }
    }
}
