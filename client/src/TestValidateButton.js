import React from 'react';


const TestValidateButton = () => {
    const handleClick = async () => {
        const token = localStorage.getItem('jwt');
        
        // Send HTTP POST request with token in the body
        const response = await fetch('http://localhost:8080/api/secret', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token
                }),
            });

            const result = await response.json();

            console.log(result);

        
    }

    return (
        <button onClick={handleClick}>
            Check Validation
        </button>
    )
}

export default TestValidateButton;