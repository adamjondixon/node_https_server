import express from "express";
import { createServer } from "https";
import { readFileSync } from "fs";

// get port number from file
const port = String(readFileSync("port.txt"));

// get ssl key and certificate
const ssl_key = readFileSync(import.meta.dirname + "/ssl/ssl.key");
const ssl_cert = readFileSync(import.meta.dirname + "/ssl/ssl.cer");

// initialise express app
const app = express();

// log every request
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// send index file to /
app.get("/", (req, res) => {
    res.sendFile("index.html", { root: import.meta.dirname });
});

// create https server as middleware to express
var server = createServer(
    {
        key: ssl_key,
        cert: ssl_cert
    },
    app
);

// start https server
server.listen(port, () => {
    console.log("server starting on port : " + port);
});
