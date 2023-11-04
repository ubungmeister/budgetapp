import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();

const getTasksForUser = async (userID: string) => {
    return await prisma.task.findMany({
        where: {
            userId: userID
        }
    });
};

const getTasksForAdmin = async (familyID: string) => {
    return await prisma.task.findMany({
        where: {
            user: {
                family: { id: familyID }
            }
        }
    });
};

router.get('/get-all-tasks', async (req, res) => {
  const { userID } = req.query as { userID: string }

    if (!userID) return res.status(400).json({ message: 'No userID provided' });
  
  try{
    const user = await prisma.user.findUnique({ where: { id: userID } });
    if (!user) return res.status(400).json({ message: 'No user found' });
     let tasks 
     if(user.role === "USER"){
        tasks = await getTasksForUser(userID);
     }
     else if(user.role === "ADMIN"){
        const familyID =  user.familyID;
        tasks = await getTasksForAdmin(familyID);
     }
      res.status(200).json({ tasks });

  }catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


router.post('/add-task', async (req, res) => {
    
    const {name, description, amount, userId,start_date,end_date, isActive, status } = req.body

    if(!userId) return res.status(400).json({ message: 'User id is required' });
    await prisma.task.create({
        data: {
          name: name,
          description: description,
          userId: userId,
          amount: amount,
          start_date: start_date,
          end_date: end_date,
          isActive: isActive,
          status: status,
        }
    })
    res.status(200).json({ message: 'Task added successfully' });
    
})



export { router as tasksRouter };
