const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('db connected');
  } catch (error) {
    throw new Error("Error en la BD, revise logs.");
  }
};

module.exports = {
  dbConnection,
};
