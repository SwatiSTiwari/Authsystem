const mongoose = require("mongoose");

const { MONGODB_ULR } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGODB_ULR, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("database connected successfuly"))
    .catch((error) => {
      console.log("database connection failed");
      console.log(error);
      // console.exit(1);
    });
};
