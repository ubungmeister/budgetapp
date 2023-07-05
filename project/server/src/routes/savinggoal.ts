import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();


router.get('/get-all-goals', async (req, res) => {
    const { userID } = req.query
    try {
        const goals = await prisma.savingGoal.findMany({
            where: {
                userId : userID as string
            }
        })
        res.status(200).json(goals)
    }catch(error) {
        console.log(error)
        res.status(500).json({ error })
    }
})

router.post('/update-goal', async (req, res) => {
   const {amount, userId, goalId} = req.body
   if(!userId) return res.status(400).json({ message: 'User id is required' });

   try {
    const goal = await prisma.savingGoal.findUnique({
      where: {
        id: goalId,
      },
    });

    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }

    const currentAmount = goal.currentAmount || 0;
    const updatedAmount = currentAmount + amount;

    const goalAmount = goal.goalAmount || 0;
    if (updatedAmount > goalAmount) {
      return res.status(400).json({ message: `Goal amount exceeded, you can add max ${goalAmount-currentAmount}` });
    }

    const update = await prisma.savingGoal.update({
      where: {
        id: goalId,
      },
      data: {
        currentAmount: updatedAmount,
      },
    });

    res.status(200).json({ message: 'Goal updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

})


export { router as savingGoalRouter }