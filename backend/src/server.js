const http = require("http");
const app = require("./index");

const server = http.createServer(app);

// Start the server and listen on the specified port
server.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

// Handle server-level errors
server.on("error", (error) => {
    console.error("Server Error: ", error);
});