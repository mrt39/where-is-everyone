// Import the mongoose module
const mongoose = require("mongoose");

// Set `strictQuery: false` to globally opt into filtering by properties that aren't in the schema
// Included because it removes preparatory warnings for Mongoose 7.
// See: https://mongoosejs.com/docs/migrating_to_6.html#strictquery-is-removed-and-replaced-by-strict
mongoose.set("strictQuery", false);

// Define the database URL to connect to.
const mongoDB = "mongodb://127.0.0.1:27017/scoreboard";

// Wait for database to connect, logging an error if there is a problem
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

 
// Schema for users of app
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});
const User = mongoose.model('users', UserSchema);
User.createIndexes();
 
// For backend and express
const express = require('express');
const app = express();
const cors = require("cors");
console.log("App listen at port 5000");
app.use(express.json());
app.use(cors());




app.get("/", (req, res) => {
 
    res.send("App is Working");

});

app.get("/leaderboard", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
/*       return res.status(200).json({
        success: true,
        count: users.length,
        data: users,
      });  */

    } catch (err) {
      res.send(err);
    }
})

 
app.post("/register", async (req, res) => {

    console.log(req.body)
    try {
        const newuser = new User({
            name: req.body.input,
            time: req.body.time
        });
        newuser.save();
 
    } catch (e) {
        res.send("Something Went Wrong");
    }
});
app.listen(5000);