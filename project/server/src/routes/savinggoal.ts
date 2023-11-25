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
  const { name, description, goalAmount, userId, start_date, end_date, isActive, id, currentAmount } = req.body;
  
  if (!userId) {
    return res.status(400).json({ message: 'User id is required' });
  }

  try {
    if (id) {
      // If an ID is provided, update the existing goal
      const updatedGoal = await prisma.savingGoal.update({
        where: { id: id },
        data: {
          name,
          description,
          goalAmount,
          currentAmount,
          userId,
          start_date,
          end_date,
          isActive,
        }
      });
      res.status(200).json({ message: 'Goal updated successfully', goal: updatedGoal });
    } else {
      // If no ID is provided, create a new goal
      const newGoal = await prisma.savingGoal.create({
        data: {
          name,
          description,
          goalAmount,
          currentAmount,
          userId,
          start_date,
          end_date,
          isActive,
        }
      });
      res.status(201).json({ message: 'Goal added successfully', goal: newGoal });
    }
  } catch (error) {
    console.error('Error editing/adding goal:', error);
    return res.status(500).json({ message: 'An error occurred while processing your request', error: error.message });
  }
});


router.post('/delete-goal', async (req, res) => {
  const { id, userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User id is required' });
  }

  if (!id) {
    return res.status(400).json({ message: 'Goal id is required' });
  }

  try {
    // Start a transaction
    const result = await prisma.$transaction(async (prisma) => {
      const goal = await prisma.savingGoal.findUnique({
        where: { id },
      });

      if (!goal) {
        throw new Error('Goal not found');
      }

      const currentAmount = goal.currentAmount || 0;
      if(currentAmount > 0 ){
      // Create a new record for the refunded amount
      await prisma.incomeOutcome.create({
        data: {
          amount: currentAmount,
          category: 'Refund',
          description: 'Refund from goal',
          start_date: new Date(),
          userId: userId,
          category_type: 'Income',
        },
      });
      }
  
      // Delete the goal
      await prisma.savingGoal.delete({
        where: { id },
      });

      return 'Goal deleted successfully';
    });

    res.status(200).json({ message: result });
  } catch (error) {
    // Check the error message to set the appropriate status code
    if (error.message === 'Goal not found') {
      res.status(404).json({ message: error.message });
    } else {
      console.error('Error deleting goal:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

export { router as savingGoalRouter }