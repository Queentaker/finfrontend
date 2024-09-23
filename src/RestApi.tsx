import axios from "axios";
import {getDomain} from "./helper/getDomain";

export const restApi = axios.create({
    baseURL: getDomain(),
    headers: {"Content-Type": "application/json"},
});

export class RestApi {
    static async health() {
        const response = await restApi.get("/health");
        return response;
    }
    static async getdata() {
        const response = await restApi.get("/data");
        return response;
    }
}