const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
  name: { type: String, required: true },
  userID:{type:String,required:true},
  email: { type: String, required: true },
  number: { type: String, required: true },
  last_visit: { type: String, required: true },
  message:{type:String,required:true},
  address:{type:String,required:true},
  next_consult_date: { type: String, default: 'Not Updated' },
  consult_status: { type: Boolean, default: false },
  consulter_name: { type: String, default: 'Not Consulted' },
  consult_feedback: { type: String, default: 'Not Consulted' }
});

const AppointmentModel = mongoose.model("Appointment", appointmentSchema);

module.exports = {
    AppointmentModel,
};
