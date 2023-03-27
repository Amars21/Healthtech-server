const express = require("express");
const app = express();
const cors = require("cors");;
app.use(express.json());
app.use(cors());

app.use(express.json());
const models = require("./models");

const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

models.sequelize.sync().then(() =>{
    app.listen(3001, () => {
        console.log("Running on port 3001");
    });
});
