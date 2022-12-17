const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiRouter, db } = require('./routes/api-routes'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);



app.get('/', (req, res) => {
    res.send('Root');
});

app.get('/post/:x', (req, res) => {
    const hash = req.params["x"];
    console.log("offset");

    db.query('SELECT * FROM posts WHERE hash = ?', [hash], (err, result) => {
        if (err) {
            console.log("hash not found");
            return res.status(500).send(err);
        }
        res.send(result[0]);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});