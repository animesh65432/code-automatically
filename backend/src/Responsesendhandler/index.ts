
import { ResponseTypes } from "../types"
import { Response } from "express"

const Responsesendhandler = async (res: Response, status: number, success: boolean, data?: any, message?: string) => {
    const responseType: ResponseTypes = {
        data,
        success,
        message
    };
    res.status(status).json(responseType);
}

export { Responsesendhandler }