import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiRespond } from "../models/apiRequestModels";

const baseURL = "http://localhost:3080/v1";

export default class RequestHandler {

    static post(url: string, data: any) : Promise<ApiRespond>{
        let auth = localStorage.getItem('auth');
        const config: AxiosRequestConfig = {};
        if (auth) {
            config.headers = {'Auth' : auth}
        }
        return axios.post(baseURL + url, data, config).then((response) => {
            return {
                Success: response.data.Success,
                Status: response.status,
                Data: response.data.Data,
            }
        }).catch((error) => {
            return {
                Success: false,
                Status: error.response.status,
                Errors: error.response.data.Errors
            }
        });
    }

    static get(url: string) : Promise<ApiRespond>{
        let auth = localStorage.getItem('auth');
        const config: AxiosRequestConfig = {};
        if (auth) {
            config.headers = {'Auth' : auth}
        }
        return axios.get(baseURL + url, config).then((response) => {
            return {
                Success: response.data.Success,
                Status: response.status,
                Data: response.data.Data,
            }
        }).catch((error) => {
            return {
                Success: false,
                Status: error.response.status,
                Errors: error.response.data.Errors
            }
        });
    }

    static put(url: string, data: any) : Promise<ApiRespond>{
        let auth = localStorage.getItem('auth');
        const config: AxiosRequestConfig = {};
        if (auth) {
            config.headers = {'Auth' : auth}
        }
        return axios.put(baseURL + url, data, config).then((response) => {
            return {
                Success: response.data.Success,
                Status: response.status,
                Data: response.data.Data,
            }
        }).catch((error) => {
            return {
                Success: false,
                Status: error.response.status,
                Errors: error.response.data.Errors
            }
        });
    }

    static delete(url: string) : Promise<ApiRespond>{
        let auth = localStorage.getItem('auth');
        const config: AxiosRequestConfig = {};
        if (auth) {
            config.headers = {'Auth' : auth}
        }
        return axios.delete(baseURL + url, config).then((response) => {
            return {
                Success: response.data.Success,
                Status: response.status,
                Data: response.data.Data,
            }
        }).catch((error) => {
            return {
                Success: false,
                Status: error.response.status,
                Errors: error.response.data.Errors
            }
        });
    }
}