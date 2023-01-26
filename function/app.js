const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8080;
const axios = require("axios");
const cors = require("cors");
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/login", async (req, res) => {
  try {
    const { data } = await axios.post(
      "http://localhost:3000/user/login",
      req.body
    );

    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/user", async (req, res) => {
  const instance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 1000,
    headers: { Authorization: "Bearer " + req.body.token },
  });
  try {
    const data = await instance
      .get("/users/" + req.body.id)
      .then((response) => {
        return response.data;
      });
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 Not found ☕_☕");
});

app.listen(port, () =>
  console.log(`Expresso ☕ is on Port ${port} Ctrl + C to Stop `)
);
