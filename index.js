const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json({"limit" : "1mb"}));

server.listen(port, () => console.log(`Listening`));

app.get('/', (req, res) => {
    res.end("ok this is fine")
})