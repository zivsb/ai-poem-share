import React, { useState } from 'react';

const CreatePost = () => {
    const [poem, setPoem] = useState('');
    const [title, setTitle] = useState('');
    const [tag, setTag] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const token = localStorage.getItem('jwt');
            const response = await fetch('http://localhost:8080/api/create-post', {
                method: 'POST',
                body: JSON.stringify({ poem, title, tag, token }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const newPosts = await response.json();

            if(!response.success) {
                throw new Error('Something went wrong');
            }

            alert('Poem submitted successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to submit poem. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
          <label>
            Poem:
            <textarea value={poem} onChange={e => setPoem(e.target.value)} />
          </label>
          <br />
          <label>
            Title:
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <br />
          <label>
            Tag:
            <input type="text" value={tag} onChange={e => setTag(e.target.value)} />
          </label>
          <br />
          <button type="submit">Submit</button>
        </form>
      );
    };
    
    export default CreatePost;