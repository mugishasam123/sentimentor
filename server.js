var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index.routes");
var nlpRouter = require("./routes/nlp.routes");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/nlp", nlpRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

module.exports = app;
