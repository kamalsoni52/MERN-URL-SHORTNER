const express =require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const { connectToMongo } = require("./credential")
const cors = require("cors");
const credentials = require("./middleware/credentials")
const  { checkForVerification } = require("./middleware/auth")
const corsOptions = require("./config/corsOption")
const app =express();
const PORT = 8001 ; 

//routes import
const urlRoute = require("./routes/url")
const analyticsRoute = require("./routes/analytics")
const userRoute = require("./routes/user")
const staticRoute = require("./routes/staticURL")



connectToMongo("mongodb://127.0.0.1:27017/shorti")
.then(() => console.log("mongo started"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"))

app.use(credentials)
app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());





app.use("/", staticRoute);
app.use("/user", userRoute);



app.use(checkForVerification);
app.use("/analytics", analyticsRoute);
app.use("/url", urlRoute);


app.listen(PORT, ()=>{
    console.log("URL Shortner Server Satrted")
})