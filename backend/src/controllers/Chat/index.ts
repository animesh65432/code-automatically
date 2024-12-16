import { Request, Response } from 'express';
import { StatusCodes } from "http-status-codes";
import { chat } from "../../genAI";
import { basePrompt as nodeBasePrompt } from "../../default/node";
import { basePrompt as reactBasePrompt } from "../../default/react";
import { Responsesendhandler } from "../../Responsesendhandler"
import { getSystemPrompt } from "../../prompts"

const createtemplate = async (
    req: Request,
    res: Response,

) => {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            console.log("clicked")
            Responsesendhandler(res, StatusCodes.BAD_REQUEST, false, null, "prompt is required")
            return
        }

        const data = await chat.sendMessage([
            { text: prompt },
            {
                text: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
            },
        ]);

        const answer = await data.response.text();

        if (answer === "react") {
            Responsesendhandler(res, StatusCodes.OK, true, {
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [reactBasePrompt],
            })
            return
        }

        if (answer === "node") {
            Responsesendhandler(res, StatusCodes.OK, true, {
                prompts: [
                    `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${nodeBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
                ],
                uiPrompts: [nodeBasePrompt],
            })

            return
        }

        Responsesendhandler(res, StatusCodes.CONFLICT, false, null, "you cant access this")
        return
    }
    catch (error) {
        console.log(error, "errors in createtemplate in controllers")

        Responsesendhandler(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "internal server error")
        return
    }


};

const chatmessage = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body
        if (!prompt || prompt.length < 3) {
            console.log("clicked")
            Responsesendhandler(res, StatusCodes.BAD_REQUEST, false, null, "prompt is required")
            return
        }

        const response = await chat.sendMessage([
            { text: getSystemPrompt() },
            { text: prompt[0].text },
            { text: prompt[1].text },
            { text: prompt[2].text }
        ])


        const data = await response.response?.text()

        Responsesendhandler(res, StatusCodes.OK, true, { data })
        return

    } catch (error) {
        console.log(error)
        Responsesendhandler(res, StatusCodes.INTERNAL_SERVER_ERROR, false, null, "internal server errors")
        return

    }
}

export { createtemplate, chatmessage };