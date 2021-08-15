const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport");

const app = express();
app.use(morgan("dev"));
app.use(cors());
// app.use(bodyParser.urlencoded({ limit: "1024mb", extended: true }));
// app.use(bodyParser.json({ limit: "1024mb", extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());
require("./passport")(passport);

app.use("/api/visitors", require("./routers/visitorRouter"));
app.use("/api/guide", require("./routers/guideRouter"));
app.use("/api/admin", require("./routers/adminRouter"));
app.use("/api/places", require("./routers/placeRouter"));
app.use("/api/reportedPlaces", require("./routers/reportedPlaceRouter"));
app.use("/api/reportedPost", require("./routers/reportedPostRouter"));
app.use("/api/posts", require("./routers/postRouter"));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Travelers Hut",
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  mongoose.connect(
    "mongodb://localhost/Travelers-Hut",
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("database connected");
    }
  );
});
