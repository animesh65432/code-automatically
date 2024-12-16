import { Router } from "express";
import Controllers from "../../controllers";

const chatRouter = Router();

chatRouter.post("/template", Controllers.chat.createtemplate);
chatRouter.post("/build", Controllers.chat.chatmessage)

export default chatRouter;