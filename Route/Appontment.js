const express = require("express");
const { AppointmentModel } = require("../Model/Appointment");
const Appointment = express.Router();
const { UserModel } = require("../Model/UserModel");
Appointment.get("/", async (req, res) => {
  try {
    const { query } = req.query;

    let data;

    if (query) {
      data = await AppointmentModel.find({
        $or: [
          { next_consult_date: { $regex: query, $options: "i" } },
          { phone: { $regex: query, $options: "i" } },
          { email: { $regex: query, $options: "i" } },
          { consulter_name: { $regex: query, $options: "i" } },
          { last_visit: { $regex: query, $options: "i" } },
        ],
      })
        .sort({ last_visit: "asc" })
        .exec();
    } else {
      data = await AppointmentModel.find()
        .sort({ last_visit: "asc" })
        .exec();
    }

    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.last_visit.split("/");
      const [dayB, monthB, yearB] = b.last_visit.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateA - dateB;
    });

    res.send(sortedData);
  } catch (error) {
    console.error(error);
    res.send("Error");
  }
});

Appointment.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const data = await AppointmentModel.find({ userID: id }).sort({
      appointmentDate: "asc",
    });
    const sortedData = data.sort((a, b) => {
      const [dayA, monthA, yearA] = a.last_visit.split("/");
      const [dayB, monthB, yearB] = b.last_visit.split("/");
      const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
      const dateB = new Date(`${yearB}-${monthB}-${dayB}`);
      return dateA - dateB;
    });
    res.send(sortedData);
  } catch {
    res.send("Error");
  }
});
Appointment.post("/", async (req, res) => {
  const payload = req.body;
  let check = await UserModel.find({ number: payload.number });
  const currentDate = new Date();
  
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; 
  const year = currentDate.getFullYear();
  
  const formattedDate = `${day}/${month}/${year}`;
  try {
    if (check.length == 0) {
      const user = new UserModel({
        number: payload.number,
        name: payload.name,
        last_visit: formattedDate,
        email: payload.email 
      });
      await user.save();
      console.log("user save");
    }
    const userid = await UserModel.find({ number: payload.number });
    const id = userid[0]._id;
    await UserModel.findByIdAndUpdate({_id:id},{last_visit:formattedDate})
    const data = new AppointmentModel({ ...payload, userID: id,last_visit:formattedDate });
    await data.save();
    res.send(data);
  } catch (err) {
    res.send("Post ERRoR");
    console.log(err);
  }
});

Appointment.delete("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await AppointmentModel.findByIdAndDelete({ _id: id });
    res.send("Delete Success");
  } catch {
    res.send("Delete Error");
  }
});

Appointment.patch("/:id", async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    await AppointmentModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Update Success");
  } catch {
    res.send("Update Error");
  }
});

module.exports = {
  Appointment,
};