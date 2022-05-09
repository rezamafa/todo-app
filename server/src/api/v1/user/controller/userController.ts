import express from "express";
import Repository from '../repository/UserReposirory';
import {apiResponse} from '../../../models/models';
import {UserInterface, userRole, userState} from '../../../interfaces/user';

export default class userController {
    private rep = new Repository;

    public login() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            console.log(req.body);
            let respond : apiResponse ;
            if (req.body && req.body.email && req.body.password){
                let user : UserInterface = {email: req.body.email, password: req.body.password} ;
                let result = await this.rep.getUser(user);
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
            console.log(req.body);
            let respond : apiResponse ;
            if (req.body && req.body.email && req.body.password){
                let user : UserInterface = {
                    email: req.body.email, 
                    password: req.body.password, 
                    userState: userState.NotApproved,
                    userRole: [userRole.Viewer]
                };
                let result = await this.rep.createUser(user);
                if (result) {
                    respond = { Success: true, Data: result, Errors: [] };
                    res.status(200);
                } else {
                    respond = { Success: false, Errors: [] };
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

    public getAllUsersList() : express.RequestHandler {
        return async (req: express.Request, res: express.Response) => {
            let respond : apiResponse ;
            let result = await this.rep.getAllUsers();
            if (result) {
                respond = { Success: true, Data: result };
                res.status(200);
            } else {
                respond = { Success: false, Errors: ['User not found.'] };
                res.status(500);
            }
            res.json(respond);
            res.end();
        } 
    }
}