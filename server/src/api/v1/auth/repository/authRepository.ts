import {MongoHelper} from "../../../database/mongoHelper";
import {dbConfig} from '../../../config/dbConfig'
import {User} from '../../../models/user'
import { NewUser } from "../../../models/auth";


export default class authRepository {

    private getCollection = () => {
        return MongoHelper.client.db(dbConfig.dbName).collection('user');
    }

    public async login(userEmail: string) {
        return this.getCollection().findOne({email: userEmail}) as User;
    }

    public async signup(user: User) {
        return this.getCollection().insertOne(user);
    }

    public async ifUserExist(newUser: any) {
        let checkEmail  = await this.getCollection().find({email: newUser.email}).toArray();
        if (checkEmail.length > 0) {return true} else {return false}
    }
}
