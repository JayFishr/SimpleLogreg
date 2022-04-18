require('dotenv').config();
const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const cookieParser = require("cookie-parser")



app.use(cors({credentials: true, origin: 'http://localhost:3000'}));

app.use(cookieParser())

require("./server/config/mongoose.config");

app.use(express.json(), express.urlencoded({extended:true}));

require("./server/routes/user.routes")(app);

app.listen(port, ()=>console.log(`Outchea on port ${port}`));