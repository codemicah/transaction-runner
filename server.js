require("dotenv").config();
const http = require("http");
const app = require("./app");

const { LOCAL_PORT, PORT } = process.env;

const server = http.createServer(app);

const port = PORT || LOCAL_PORT;
server.listen(port, () => console.log(`Server listening on port *:${port}`));
