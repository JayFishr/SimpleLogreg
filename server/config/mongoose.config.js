const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/login_signup2", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(()=>console.log("Connected like wifi"))
    .catch(err=>console.log("beep boop bop, db connection was a flop", err))