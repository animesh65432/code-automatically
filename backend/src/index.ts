import "dotenv/config"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { getSystemPrompt } from "./prompts"

const MODEL_NAME = process.env.MODEL_NAME as string

async function main() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    model.generationConfig.temperature = 0.0

    const chat = model.startChat()

    await chat.sendMessage(getSystemPrompt())

    await chat.sendMessage("For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.")


    const responseStream = await chat.sendMessage("create follball gameing website");

    const data = await responseStream?.response

    console.log(data?.text())
}

main().catch((error) => {
    console.error("Error:", error);
});                  