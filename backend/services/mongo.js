const mongoose = require("mongoose");

const MONGODB_URL =
  "mongodb+srv://mohamadkrayem:v8hgQY4i5MW2RXFl@cluster0.w3nq5xd.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("Mongo is connected !!!");
});

mongoose.connection.on("error", (error) => {
  console.log(error);
});

const mongoConnect = async () => {
  try{
    await mongoose.connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
  catch(err){
    console.log(err);
    process.exit(1);
  }
}

async function mongoDisconnect() {
  await mongoose.disconnect();
}

module.exports = {mongoConnect};