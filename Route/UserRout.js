const express=require("express")
const userRoute=express.Router()
const {UserModel}=require("../Model/UserModel")
const { AppointmentModel } = require("../Model/Appointment");

userRoute.post("/",async(req,res)=>{
    const payload=req.body
  const currentDate = new Date();
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  const user=await UserModel.find({number:payload.number})
    try{
       if(user.length>0){
         const data=await UserModel.findByIdAndUpdate({_id:user[0]._id},{last_visit:formattedDate})
         res.send(data)
       }
       else{
        const data=new UserModel({...payload,last_visit:formattedDate})
       await data.save()
       res.send(data)
       }
    }
    catch(err){
      res.send(err)
    }
})


userRoute.get('/', async (req, res) => {
  try {
    const { query } = req.query;

    let data;

    if (query) {
      data = await UserModel.find({
        $or: [
          { name: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { number: { $regex: query, $options: "i" } },
          { last_visit: { $regex: query, $options: "i" } },
        ],
      })
        .sort({ date: "asc" })
        .exec();
    } else {
      data = await UserModel.find()
        .sort({ date: "asc" })
        .exec();
    }

    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.last_visit.split("/");
      const [dayB, monthB, yearB] = b.last_visit.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateB - dateA;
    });

    res.send(sortedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

userRoute.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.find({"_id":id})

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

userRoute.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const payload=req.body
  try {
    const user = await UserModel.findByIdAndUpdate({"_id":id},payload)

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});
userRoute.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await AppointmentModel.deleteMany({ userID: id });
    const user = await UserModel.findByIdAndDelete({"_id":id})

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports={
    userRoute
}