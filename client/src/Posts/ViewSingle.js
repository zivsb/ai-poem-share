import React, { useState, useEffect } from 'react';
import SinglePost from './SinglePost';
import { useLocation } from 'react-router-dom';
import './posts.css';

function ViewSingle() {    
    
    const [title, setTitle] = useState("");
    const [ai, setAi] = useState("");
    const [creator, setCreator] = useState("");
    const [poem, setPoem] = useState("");
    const [timestamp, setTimestamp] = useState("");
    const [loading, setLoading] = useState(true);

    const location = useLocation();
    const params =  new URLSearchParams(location.search);


    async function fetchPost() {
        const response = await fetch(`http://localhost:8080/post/${params.get('hash')}`);
        
        if(!response.ok) {
            throw new Error('Something went wrong');
        }

        const post = await response.json();

        console.log("post");
        console.log(post);

        setTitle(post.title);
        setAi(post.ai);
        setCreator(post.creator);
        setPoem(post.poem);
        setTimestamp(post.timestamp);
        console.log("timestamp " + post.timestamp);
        setLoading(false);
    }

    useEffect(() => {
        console.log("in useEffect");
        
    
        fetchPost();
    }, []);
    
  return (
    <div id="posts">
      rendering
      <br />
      {loading ? (
        <div>Loading</div>
      ) : (
        <SinglePost
          title={title}
          ai={ai}  
          creator={creator}
          poem={poem}
          timestamp={timestamp}

          hash={params.get('hash')}
      />
      )}
       
    </div>
  );
}

export default ViewSingle;
