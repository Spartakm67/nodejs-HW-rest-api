const mongoose = require("mongoose");

const app = require('./app');
// Zrwam5UOs0X83atz
// const { DB_HOST } = require("./config");

const { DB_HOST, PORT = 3000 } = process.env;
// console.log(process.env);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Database connection successful");
})
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


