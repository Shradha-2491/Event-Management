import 'dotenv/config'
import express from 'express'
import { createServer } from 'http'
import cors from 'cors'
import registerRoutes from './routes/index.js'
import { Server } from "socket.io";

const app = express()
const server = createServer(app);
const io = new Server(server, {
    cors: { origin: "*" },
});
app.use(express.urlencoded({ limit: '100mb', extended: true }))
app.use(express.json({
    limit: '100mb',
    verify: (req, res, buf) => {
        req.rawBody = buf
    }
}))

app.use(express.text({
    limit: '100mb'
}))

app.use(cors({
    origin: [process.env.CORS_ORIGIN, "http://localhost:3000"],
    methods: 'GET,PUT,POST,PATCH,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
}));

io.on("connection", (socket) => {
    // console.log("A user connected:", socket.id);

    socket.on("disconnect", () => {
        // console.log("User disconnected:", socket.id);
    });
});

app.set("socketio", io);

registerRoutes(app);
server.listen(process.env.PORT, () => console.log('Server started on: ' + process.env.PORT))

export default app;