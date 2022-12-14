const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const sha256 = require('sha256');

const JWT_SECRET = 'secret_key';
const apiRouter = express.Router();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ai-poem-share'
});

// MySQL request to get 10 most recent posts:
// `SELECT * FROM posts ORDER BY timestamp DESC LIMIT 10`
// Then send a response of an array of objects


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
        console.log("decoded");
        next();
    });
};

apiRouter.get('/get-entries/:x', (req, res) => {
    const offset = 10 * req.params["x"];
    console.log("offset");

    db.query('SELECT * FROM posts ORDER BY timestamp DESC LIMIT 10 OFFSET ?', [offset], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }

        console.log("success to this point");
        res.send(results);
    });
});

// A test to make sure that we can allow 
apiRouter.post('/secret', validateJWT, (req, res) => {
    const user = req.decoded;
    console.log("in the secret function");

    console.log("Sucess. The user is: " + JSON.stringify(user));
    res.json({
        success: true,
        data: user
    });
});

// Sign up route
apiRouter.post('/signup', async (req, res) => {
    const { username, password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    // TO DO check validity of email
    // If invalid: return res.status(404).send({ message: 'Username exists' });

    db.query('SELECT * FROM `users` WHERE `username` = ?', [username], async (error, results) => {
        console.log("in the query");
        
        if (error) {
            console.log("There's an error");
            console.log(error);
            return res.status(504).send({ message: "Error on our side. Sorry :("});
        }
        
        if (results.length > 0) {
            console.log("Username exists");
            return res.status(404).send({ message: 'Username exists' });
        }

        db.query(
            'INSERT INTO users (username, password, email, timestamp) VALUES (?, ?, ?, CURRENT_TIMESTAMP)',
            [username, hashedPassword, email], (error, results) => {
    
                if(error) {
                    console.log(error);
                    res.send('An error occured while creating user');
                } else {
                    console.log(`User ${username} Created!`);
    
                    const token = jwt.sign({ username }, JWT_SECRET);
                    console.log({token});
                    res.send({ token });
                }
            }
        );
    });

    
});

// Login route
apiRouter.post('/login', async (req, res) => {
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
    
});

apiRouter.post('/create-post', validateJWT, (req, res) => {
    const { poem, title, tag } = req.body;
    const creator = req.decoded.username;
    const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');

    console.log(`Received poem: "${title}" by ${creator} with tag ${tag}`);

    const hash = sha256(creator + timestamp);
    console.log(hash);

    db.query(
            'INSERT INTO posts (hash, creator, title, poem, ai, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
            [hash, creator, title, poem, tag, timestamp], (error, results) => {
    
                if(error) {
                    console.log(error);
                    res.send('An error occured while creating post');
                } else {
                    console.log(`Post ${title} Created!`);

                    res.send("success");
                }
            }
    );


});

module.exports = {
    apiRouter,
    validateJWT, 
    db
}