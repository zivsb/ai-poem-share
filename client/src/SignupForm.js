import React, { useState, useEffect } from 'react';

const SignupForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const submitForm = async () => {
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
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form>
            <label htmlFor='username'>Username</label>
            <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <label htmlFor='password'>Password</label>
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor='email'>Email</label>
            <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button type="submit" onClick={submitForm}>Sign Up</button>
        </form>
    );
};

export default SignupForm;