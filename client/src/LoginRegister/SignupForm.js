import React, { useState } from 'react';
import "./LoginRegister.css";

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                    email
                }),
            });

            const result = await response.json();
            // console.log(result);
            // Check if the server returned an error
            if (result.message !== undefined) {
                setError(result.error);
                alert(result.message);
                return;
            }

            // If the server returned a JWT, save it in local storage
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('username', username);

            if(localStorage.getItem('jwt') === result.token) {
                console.log("Successful creation and login");
                alert("Successful creation and login");
                window.location.replace('/');
            }

        }catch (error) {
            setError(error.message);
        }
    };

    return (
        <form>
            <h1>Create Account</h1>
            <div class="form-field">
                <label htmlFor='username'>Username</label>
                <br />
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            <div class="form-field">
                <label htmlFor='password'>Password</label>
                <br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            
            <div class="form-field">
                <label htmlFor='email'>Email</label>
                <br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            

            <button type="submit" onClick={submitForm}>Sign Up</button>
        </form>
    );
};

export default SignupForm;