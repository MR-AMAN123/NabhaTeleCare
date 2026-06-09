const Medicine = require("../models/Medicine");
const Reservation = require("../models/MedicineReservation");

// Add Medicine
const addMedicine =
async (req, res) => {

 try {

 if (
   Array.isArray(req.body)
 ) {

   const medicines =
   req.body.map(
   (medicine)=>({

     name:
     medicine.name,

     quantity:
     medicine.quantity,

     pharmacy:
     req.user._id,

   }));

   const result =
   await Medicine.insertMany(
    medicines
   );

   return res
   .status(201)
   .json({
     success:true,
     medicines:result,
   });

 }

 const medicine =
 await Medicine.create({

   name:req.body.name,

   quantity:
   req.body.quantity,

   pharmacy:
   req.user._id,

 });

 res.status(201).json({
   success:true,
   medicine,
 });

 } catch(error){

 res.status(500).json({
   success:false,
   message:
   error.message,
 });

 }

};

// Get All Medicines
const getMedicines = async (req, res) => {
  try {
    const medicines = await Medicine.find().populate("pharmacy", "name email");

    res.status(200).json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Search Medicine
const searchMedicine = async (req, res) => {
  try {
    const medicines = await Medicine.find({
      name: {
        $regex: req.query.name,
        $options: "i",
      },
    }).populate("pharmacy", "name email phone");

    res.json({
      success: true,
      medicines,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const reserveMedicine = async (req, res) => {
  try {
    const { medicineId, quantity } = req.body;

    const medicine = await Medicine.findById(medicineId);

    if (medicine.quantity < quantity) {
      return res.status(400).json({
        success: false,
        message: "Not enough stock",
      });
    }

    medicine.quantity -= quantity;

    await medicine.save();
  

    //reservation 

   const reservation =
await Reservation.create({

 patient: req.user._id,

 pharmacy:
 medicine.pharmacy,

 medicine:
 medicine._id,

 quantity,

});

    res.json({
      success: true,

      reservation,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getPharmacyReservations =
async (req, res) => {

 try {

 const reservations =
 await Reservation.find({

   pharmacy:
   req.user._id,

 })

 .populate(
  "patient",
  "name email"
 )

 .populate(
  "medicine",
  "name"
 )

 .sort({
   createdAt:-1
 });

 res.json({
   success:true,
   reservations,
 });

 } catch(error){

 res.status(500).json({
   success:false,
   message:error.message,
 });

 }

};

const confirmReservation =
async (req,res)=>{

 try{

 const reservation =
 await Reservation.findById(
 req.params.id
 );

 reservation.status =
 "CONFIRMED";

 reservation.message =
 "Collect before 6 PM";

 await reservation.save();

 res.json({
   success:true,
   reservation,
 });

 }catch(error){

 res.status(500).json({
   success:false,
   message:error.message,
 });

 }

};

const cancelReservation =
async (req,res)=>{

 try{

 const reservation =
 await Reservation.findById(
 req.params.id
 );

 reservation.status =
 "CANCELLED";

 await reservation.save();

 res.json({
   success:true,
   reservation,
 });

 }catch(error){

 res.status(500).json({
   success:false,
   message:error.message,
 });

 }

};

const getMyReservations =
async (req, res) => {
  try {

    const reservations =
      await Reservation.find({
        patient:
          req.user._id,
      })

        .populate(
          "medicine",
          "name"
        )

        .populate(
          "pharmacy",
          "name email"
        )

        .sort({
          createdAt: -1,
        });

    res.json({
      success: true,
      reservations,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        error.message,
    });

  }
};

module.exports = {
  addMedicine,
  getMedicines,
  searchMedicine,
  reserveMedicine,
  getPharmacyReservations,
  confirmReservation,
  cancelReservation,
  getMyReservations,
};

