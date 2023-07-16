const express = require("express");
const { SubServicesModel } = require("../Model/Subservice");
const { MainServicesModel } = require("../Model/MainService");
const ServicesSub = express.Router();



ServicesSub.get("/", async (req, res) => {
//   try {
//     const data = await SubServicesModel.find();
//     res.send(data);
//   } catch {
//     res.send("Error");
//   }


try {
    const { query } = req.query;

    let data;

    if (query) {
      data = await SubServicesModel.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { mainname: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { date: { $regex: query, $options: "i" } },
        ],
      })
        .sort({ date: "asc" })
        .exec();
    } else {
      data = await SubServicesModel.find()
        .sort({ date: "asc" })
        .exec();
    }

    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.date.split("/");
      const [dayB, monthB, yearB] = b.date.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateB - dateA;
    });

    res.send(sortedData);
  } catch (error) {
    console.error(error);
    res.send("Error");
  }
});
  
ServicesSub.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await SubServicesModel.find({ _id: id });
    res.send(data);
  } catch {
    res.send("Error");
  }
});


ServicesSub.get("/subservice/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const data = await SubServicesModel.find({mainId : id });
      const sortedData = data.sort((a, b) => {
        const [dayA, monthA, yearA] = a.date.split("/");
        const [dayB, monthB, yearB] = b.date.split("/");
        const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
        const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
        return dateB - dateA;
      });
      res.send(sortedData);
    } catch {
      res.send("Error");
    }
  });

ServicesSub.post("/", async (req, res) => {
  const payload = req.body;
  try {
    const dataMain = await MainServicesModel.findOne({
      smname: payload.mainname,
    });
    const id = dataMain._id;
    const currentDate = new Date();

    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    
    // Add leading zero to month if necessary
    const formattedMonth = month < 10 ? `0${month}` : month;
    
    const formattedDate = `${day}/${formattedMonth}/${year}`;
    
    const data = new SubServicesModel({ ...payload, mainId: id,date:formattedDate });
    await data.save();
    res.send(data);
  } catch(err) {
    console.log(err)
    res.send("Post ERRoR");
  }
});

ServicesSub.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await SubServicesModel.findByIdAndDelete({ _id: id });
    res.send("Delete Success");
  } catch {
    res.send("error delete");
  }
});

ServicesSub.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload=req.body
  try {
    await SubServicesModel.findByIdAndUpdate({ _id: id },payload);
    res.send("Update Success");
  } catch {
    res.send("error Update");
  }
});

module.exports = {
  ServicesSub,
};
