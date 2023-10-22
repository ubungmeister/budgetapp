import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();


router.get('/get-tasks', async (req, res) => {
    console.log('get tasks')
    const { userID } = req.query
    try {
        const tasks = await prisma.task.findMany({
            where: {
                userId : userID as string
            }
        })
        res.status(200).json(tasks)
    }catch(error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

export { router as tasksRouter };