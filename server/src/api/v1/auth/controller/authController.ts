import express from "express";
import Repository from '../repository/authRepository';
import {apiResponse} from '../../../models/expressModels'
import {User, userRole, userState} from '../../../models/user';

export default class authController {
    private rep = new Repository;

    public login() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body){
                let user : User = req.body as User;
                let result = await this.rep.login(user);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
                } else {
                    respond = { Success: false, Errors: ['User not found.'] };
                    res.status(404);
                }
            } else {
                respond = { Success: false, Errors: ['Request Denied.'] };
                res.status(400);
            }
            res.json(respond);
            res.end();
        } 
    }
    
    public signup() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            if (req.body){
                let user : User = req.body as User;
                user.userState = userState.NotApproved;
                user.userRole = [userRole.Viewer];

                let result = await this.rep.signup(user);
                if (result) {
                    respond = { Success: true, Data: result };
                    res.status(200);
                } else {
                    respond = { Success: false, Errors: ['Request failed.'] };
                    res.status(500);
                }
            } else {
                respond = { Success: false, Errors: ['Request Denied.'] };
                res.status(400);
            }
            res.json(respond);
            res.end();
        } 
    }

}