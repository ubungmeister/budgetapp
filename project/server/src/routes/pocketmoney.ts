import express from "express"
import { PrismaClient } from "@prisma/client"

const router = express.Router();

const prisma = new PrismaClient();


router.get('/get-pocket-money', async (req, res) => {
  const { monthYear, userID } = req.query
  const adminID = userID as string

  const admin = await prisma.user.findUnique({ where: { id: adminID } });
  const familyID =  admin.familyID;

  if (!monthYear) return res.status(400).json({ message: 'No monthYear provided' });
  const pocketMoney = await prisma.pocketMoney.findMany({
    where: {
      user: {
        family: { id: familyID },
      }
    }
  })
  console.log("pocketMoney", pocketMoney)
   res.status(200).json({pocketMoney})
})

router.get('/get-pocket-money-user', async (req, res) => {

    const { monthYear, userID } = req.query;
    console.log(monthYear, userID)
    if(!userID) return res.status(400).json({ message: 'No userId provided' });
    console.log('monthYear', monthYear)
    const date = new Date(monthYear as string);
    console.log('date', date)
    const year = date.getFullYear();
    const month = date.getMonth()+1;

    const newDate = new Date(year, month, 1);
    newDate.setUTCHours(0, 0, 0, 0);

    const pocketMoney = await prisma.pocketMoney.findFirst({
        where: {
            userId: userID as string,
            month: newDate,
        }
    })

    console.log(pocketMoney)
  

    res.status(200).json({ pocketMoney});

})

router.post('/add-pocket-money', async (req, res) => {
    const {pocketMoney, userID} = req.body
    const adminID = userID;
    const admin = await prisma.user.findUnique({ where: { id: adminID } });
    const familyID =  admin.familyID;

   const  getPocketMoney = await prisma.pocketMoney.findMany({
    where: {
      user: {
        family: { id: familyID },
      }
    }
  })
    const getPocketMoneyID = getPocketMoney.map((item) => item.id)
    console.log('getPocketMoneyID', getPocketMoneyID)

    for (let i = 0; i < pocketMoney.length; i++) {
        if(getPocketMoneyID.includes(pocketMoney[i].id)){
          await prisma.pocketMoney.update({
            where: { id: pocketMoney[i].id },
            data: {
              amount: pocketMoney[i].amount,
            },
          })
        }
    else{
        await prisma.pocketMoney.create({
          data:{
            id: pocketMoney[i].id,
            amount: pocketMoney[i].amount,
            month: pocketMoney[i].month,
            userId: pocketMoney[i].userId,
          }
        })
    }
}
res.status(200).json({ message: 'Pocket Money updated' });
});

export { router as pocketMoneyRouter };


