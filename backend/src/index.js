const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json(), cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.options("*", cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

app.use("/api", require("./routers/index"));

app.listen(3200);
console.log("Server on port", 3200);
