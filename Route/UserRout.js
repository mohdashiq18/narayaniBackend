const express=require("express")
const userRoute=express.Router()
const {UserModel}=require("../Model/UserModel")


userRoute.post("/register",async(req,res)=>{
    const payload=req.body
  const currentDate = new Date();
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
    try{
       const data=new UserModel({...payload,last_visit:formattedDate})
       await data.save()
       res.send(data)
    }
    catch(err){
      res.send(err)
    }
})


userRoute.get('/', async (req, res) => {
  try {
    const { sortBy, consultStatus } = req.query;
    let sortOptions = {};

    if (sortBy === 'last_visit') {
      sortOptions = { last_visit: -1 };
    } else if (sortBy === 'next_consult_date') {
      sortOptions = { next_consult_date: 1 };
    } else if (sortBy === 'consult_status') {
      sortOptions = { consult_status: 1 };
    } else {
      sortOptions = { last_visit: 1 };
    }

    let filterOptions = {};
    if (consultStatus === 'true') {
      filterOptions = { consult_status: true };
    } else if (consultStatus === 'false') {
      filterOptions = { consult_status: false };
    }

    const users = await UserModel.find(filterOptions).sort(sortOptions);
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


userRoute.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const user = await UserModel.findByIdAndUpdate(id, updateData, {
      new: true
    });

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