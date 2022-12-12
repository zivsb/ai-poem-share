import React, { useState, useEffect } from 'react';

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

            // Check if the server returned an error
            if (result.error) {
                setError(result.error);
                return;
            }

            // If the server returned a JWT, save it in local storage
            localStorage.setItem('jwt', result.token);

        }catch (error) {
            setError(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p className='error'>{error}</p>}
            <label htmlFor='username'>Username</label>
            <input 
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
            />

        <label htmlFor='password'>Password</label>
            <input 
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">Log In</button>
        </form>
    )
}

export default LoginForm;