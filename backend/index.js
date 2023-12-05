const express = require('express');
const cors = require('cors')
const port = 8081
const app = express();
const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1719566",
    key: "4256ba19385c508b9e4c",
    secret: "11a24d1380ca61e6ade4",
    cluster: "ap2",
    useTLS: true
});


app.use(
    cors({
        origin: "*"
    })
)

app.use(express.json());


app.post('/api/messages', async (req, res) => {
    await pusher.trigger("chat", "message", {
        username: req.body.username,
        message: req.body.message
    });

    res.json([]);
})



app.listen(port, () => {
    console.log('server up at port 8081');
})