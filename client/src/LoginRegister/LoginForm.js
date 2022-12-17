import React, { useState, useEffect } from 'react';
import "./LoginRegister.css"

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
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

        }catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <div class="form-field">
                <label htmlFor='username'>Username</label>
                <br />
                <input 
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
            />
        </div>

            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm;