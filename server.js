require("dotenv").config();
const http = require("http");
const api = require("./api");

const { LOCAL_PORT, PORT } = process.env;

const server = http.createServer(api);

const port = PORT || LOCAL_PORT;
server.listen(port, () => console.log(`Server listening on port *:${port}`));
