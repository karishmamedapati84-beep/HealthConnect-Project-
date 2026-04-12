const Appointment=require("../models/Appointment");
const Patient = require("../models/patient");
 exports.getHistory =  async(req,res) => {
    try{
        const appointments=await Appointment.find({
            patientId:req.params.id
        });
        const result = [];
        for(let app of appointments){
            const patient= await Patient.findById(app.patientId);
            result.push({
                patientName:app.patientNme || (patient ? patient.name:""),
                age:app.age||"",
                department:app.department||"",
                service:app.service||"",
                doctor:app.doctor||"",
                date:app.date||""
            });
        }
        res.json(result);
    }catch(error){
        res.status(500).json(error);
    }
 };