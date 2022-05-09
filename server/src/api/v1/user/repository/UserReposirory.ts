import {MongoHelper} from "../../../database/mongoHelper";
import {dbConfig} from '../../../config/dbConfig'
import {UserInterface} from '../../../interfaces/user'


export default class UserRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async getUser(user: UserInterface) {
        return this.getCollection().findOne(user) as UserInterface;
    }

    public async createUser(user: UserInterface) {
        return this.getCollection().insertOne(user);
    }

    public async getAllUsers() {
        return await this.getCollection().find().toArray() as UserInterface[];
    }
}
