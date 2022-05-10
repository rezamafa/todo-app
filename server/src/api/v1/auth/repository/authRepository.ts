import {MongoHelper} from "../../../database/mongoHelper";
import {dbConfig} from '../../../config/dbConfig'
import {User} from '../../../models/user'


export default class authRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async login(user: User) {
        return this.getCollection().findOne(user) as User;
    }

    public async signup(user: User) {
        return this.getCollection().insertOne(user);
    }

}
