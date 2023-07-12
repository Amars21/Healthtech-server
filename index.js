const express = require("express");
const app = express();
const cors = require("cors");;
app.use(express.json());
app.use(cors());
const http = require('http');
const { Server } = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});


app.use(express.json());
const models = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

const prescriptionRouter = require("./routes/Prescription");
app.use("/electronic", prescriptionRouter);

const hospitalRouter = require("./routes/Hospitals");
app.use("/api", hospitalRouter);

const questionsRouter = require("./routes/Question");
app.use("/everyDay", questionsRouter);

const energyRouter = require("./routes/Energy");
app.use("/energy", energyRouter);

const patientRouter = require("./routes/PatientAnswers");
app.use("/patient", patientRouter);

const answerRouter = require("./routes/EveryDayAnswer");
app.use("/answer", answerRouter);

const doctorRouter = require("./routes/FetchAnswers")
app.use("/doctor", doctorRouter);

models.sequelize.sync().then(() =>{
    server.listen(3001, () => {
        console.log("Running on port 3001");
    });
});
