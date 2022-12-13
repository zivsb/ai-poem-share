const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { apiRouter } = require('./routes/api-routes'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRouter);



app.get('/', (req, res) => {
    res.send('Root');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});