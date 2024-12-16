import "dotenv/config"
import express from "express"
import bodyParser from "body-parser"
import { chatRouter } from "./router"
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.use("/chat", chatRouter)



// async function main() {
//     model.generationConfig.temperature = 0.0

//     const chat = model.startChat()

//     await chat.sendMessage(getSystemPrompt())
//     await chat.sendMessage("For all designs I ask you to make, have them be beautiful, not cookie cutter. Make webpages that are fully featured and worthy for production.\n\nBy default, this template supports JSX syntax with Tailwind CSS classes, React hooks, and Lucide React for icons. Do not install other packages for UI themes, icons, etc unless absolutely necessary or I request them.\n\nUse icons from lucide-react for logos.\n\nUse stock photos from unsplash where appropriate, only valid URLs you know exist. Do not download the images, only link to them in image tags.")

//     const responseStream = await chat.sendMessage("create follball gameing website in nextjs");

//     const data = await responseStream?.response?.text()

//     console.log(data?.length, data)
// }

// main().catch((error) => {
//     console.error("Error:", error);
// });


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT || 3000}`)
})