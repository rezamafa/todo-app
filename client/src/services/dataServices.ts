import RequestHandler from "./requestHandler"; 
import { ApiRespond } from "../models/apiRequestModels";
import { LoginModel } from "../models/loginModel";
import { RegisterModel } from "../models/registerModel";

export default class DataServices {

    static login (data : LoginModel) : Promise<ApiRespond> {
        return RequestHandler.post('/auth/login', data)
    }

    static register (data : RegisterModel) : Promise<ApiRespond> {
        return RequestHandler.post('/auth/signup', data)
    }

    static createTodo (data: any) : Promise<ApiRespond> {
        return RequestHandler.post('/todo', data)
    }

    static editTodo (data: any) : Promise<ApiRespond> {
        return RequestHandler.put('/todo', data)
    }

    static deleteTodo (id: number) : Promise<ApiRespond> {
        return RequestHandler.delete('/todo/' + id)
    }

    static getAllTodos () : Promise<ApiRespond> {
        return RequestHandler.get('/todo/all')
    }

}