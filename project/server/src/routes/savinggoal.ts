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

router.post('/update-goal-amount', async (req, res) => {
   const {amount, userId, saving_goal_Id} = req.body
   if(!userId) return res.status(400).json({ message: 'User id is required' });

   try {
    const goal = await prisma.savingGoal.findUnique({
      where: {
        id: saving_goal_Id,
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

    if(updatedAmount === goalAmount){
        const update = await prisma.savingGoal.update({
            where: {
            id: saving_goal_Id,
            },
            data: {
            currentAmount: updatedAmount,
            isActive: false,
            },
        });
        return res.status(222).json({ message: 'Goal reached!' });
    }

    const update = await prisma.savingGoal.update({
      where: {
        id: saving_goal_Id,
      },
      data: {
        currentAmount: updatedAmount,
        isActive: true
      },
    });

    res.status(200).json({ message: 'Goal updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

})

router.post('/edit-goal', async (req, res) => {
    const {name, description, goalAmount, userId,start_date,end_date, isActive, id, currentAmount } = req.body
    if(!userId) return res.status(400).json({ message: 'User id is required' });
    if(id){
      await prisma.savingGoal.update({
        where: {id: id},
        data: {
          name: name,
          description: description,
          goalAmount: goalAmount,
          currentAmount: currentAmount,
          userId: userId,
          start_date: start_date,
          end_date: end_date,
          isActive: isActive,
        }
    })
    res.status(200).json({ message: 'Goal added successfully' });
    }
    else{
      await prisma.savingGoal.create({
        data: {
          name: name,
          description: description,
          goalAmount: goalAmount,
          currentAmount: 0,
          userId: userId,
          start_date: start_date,
          end_date: end_date,
          isActive: isActive,
        }
    })
    res.status(200).json({ message: 'Goal added successfully' });
    }
})


router.post('/delete-goal', async (req, res) => {
  const {id, userId } = req.body
    if(!userId) return res.status(400).json({ message: 'User id is required' });
    if(!id) return res.status(400).json({ message: 'Goal id is required' });
    await prisma.savingGoal.delete({
        where: {id: id}
    })
    res.status(200).json({ message: 'Goal deleted successfully' });
})


export { router as savingGoalRouter }