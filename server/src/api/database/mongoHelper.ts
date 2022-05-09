import * as mongodb from 'mongodb';
import {dbUrl} from '../config/dbConfig'
 
export class MongoHelper {

    public static client: mongodb.MongoClient;
    constructor() { }
    public static connect(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            mongodb.MongoClient.connect(dbUrl.url, (err, client: any) => {
                if (err) {
                    reject(err);
                } else {
                    MongoHelper.client = client;
                    console.log("Connected to database.");
                    resolve(client);
                }
            });
        });
    }
    
    public disconnect(): void {
        MongoHelper.client.close();
    }
}