const mongoose = require("mongoose");

const app = require('./app');
// Zrwam5UOs0X83atz
const DB_HOST = "mongodb+srv://spartakm67:Zrwam5UOs0X83atz@cluster0.a8yiffv.mongodb.net/db-contacts?retryWrites=true&w=majority";

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000, () => {
      console.log("Database connection successful");
})
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });


