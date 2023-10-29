const express = require('express');
const cors = require('cors');
require("dotenv").config();
const videoRoutes = require("./routes/videoRoutes");
const app = express();
const port = process.env.PORT || 8080;
//using cors
app.use(cors());
//cors headers
app.use(function(req: any, res: { setHeader: (arg0: string, arg1: string | boolean) => void; }, next: () => void) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req: any, res: { send: (arg0: string) => void; }) => {
    res.send("The server is running");
})

app.use("/videos", videoRoutes);


app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
