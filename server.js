const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const JWT_SECRET = 'secret_key';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ai-poem-share'
});

const validateJWT = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({
            success:false,
            message: 'No token provided.'
        });
    }

    jwt.verify(token, JWT_SECRET, (error, decoded) => {
        if (error) {
            console.log("authentication failed");

            return res.status(401).json({
                success: false,
                message: 'Failed to authenticate token.'
            });

            
        }

        console.log("authentication passed");
        req.decoded = decoded;
        next();
    });
};

app.post('/api/secret', validateJWT, (req, res) => {
    const user = req.decoded;
    console.log("in the secret function");

    console.log("Sucess. The user is: " + JSON.stringify(user));
    res.json({
        success: true,
        data: user
    });
});

app.post('/api/signup', async (req, res) => {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        'INSERT INTO users (username, password, email, timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
        [username, hashedPassword, email], (error, results) => {
            if(error) {
                console.log(error);
                res.send('An error occured while creating user');
            } else {
                console.log('User Created!');

                const token = jwt.sign({ username: user.name }, JWT_SECRET);
                console.log({token});
                res.send({ token });
                window.location = '/';
            }
        }
    );
});

// Login route
app.post('/api/login', async (req, res) => {
    const {username, password} = req.body;
    let user;

    console.log("login called");
    // Checking if username exists
    db.query('SELECT * FROM `users` WHERE `username` = ?', [username], async (error, results) => {
        console.log("in the query");
        
        if (error) {
            console.log("There's an error");
            console.log(error);
            return res.status(504).send({ message: "Error on our side. Sorry :("});
        }
        
        if (results.length === 0) {
            console.log("results length is 0");
            return res.status(404).send({ message: 'Username not found' });
        }

        console.log("No Error and username found");
        user = results[0];
        console.log("USER: ")
        console.log(JSON.stringify(user));
        console.log(user);

        // const isValid = bcrypt.compare(password, user.password);

        if((await bcrypt.compare(password, user.password))) {
            // Create and return a JWT token
            console.log("valid password");
            const token = jwt.sign({ username: user.username }, JWT_SECRET);
            console.log({token});
            res.send({ token });
    

        }else {
            console.log("invalid password")
            return res.status(401).send({ message:'Invalid password'});
        }

        

        
    });



    // Check if password is correct
    
    

    

    
});

app.get('/', (req, res) => {
    res.send('Root');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});