import RequestHandler from "./requestHandler"; 
import { ApiRespond } from "../models/apiRequestModels";
import { LoginModel } from "../models/loginModel";

export default class DataServices {

    static login (data : LoginModel) : Promise<ApiRespond> {
        return RequestHandler.post('/auth/login', data)
    }

}