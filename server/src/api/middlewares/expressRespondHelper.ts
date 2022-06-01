import express from "express";
import { apiResponse } from '../models/expressModels';

export default class ExpressHelper {

    public static send( res: express.Response, RespondStatus: number, SuccessStatus: boolean, Data?: any, Errors?: [string]): express.Response {
        return res.status(RespondStatus).json(<apiResponse>{ Success: SuccessStatus, Data: Data, Errors: Errors }); 
    }

}