import {MongoHelper} from "../../database/mongoHelper";
import {dbConfig} from '../../config/dbConfig'
import {User} from '../../models/user'


export default class AuthRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async login(userEmail: string) {
        return this.getCollection().findOne({email: userEmail}) as User;
    }

    public async signup(user: User) {
        return this.getCollection().insertOne(user);
    }

    public async ifUserExist(userEmail: string) {
        let checkEmail  = await this.getCollection().find({email: userEmail}).toArray();
        if (checkEmail.length > 0) {return true} else {return false}
    }
}
