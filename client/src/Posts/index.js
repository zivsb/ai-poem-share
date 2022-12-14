import React, { Component } from 'react';
import SinglePost from './SinglePost';
import './posts.css';

class Posts extends Component {    
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            hasMore: true,
            posts: []
        };

        this.fetchPosts(this.state.page);
    }

  async componentDidMount() {
    console.log("component did mount");
    window.addEventListener('scroll', this.handleScroll);
    console.log("here" + JSON.stringify(this.state));
  }

  componentWillUnmount() {
    this.setState({ posts: [] });
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = (skip) => {
    // Check if the user has scrolled to the bottom of the page
    console.log("here");
    if (Math.abs((window.innerHeight + document.documentElement.scrollTop) - Math.floor(document.documentElement.offsetHeight)) >= 1) return;
    console.log("passed check 1 " + this.state.hasMore);
    // If there are more pages to load, increment the page number and fetch the next page of posts
    if (this.state.hasMore) {
        console.log("passed check 2");
        this.fetchPosts(this.state.page);
    }
  }

  fetchPosts = async (localPage) => {
    console.log("page: " + localPage);
    const offset = localPage; // Calculate the correct offset for the SQL query

    const response = await fetch(`http://localhost:8080/api/get-entries/${offset}`);
    
    if(!response.ok) {
        throw new Error('Something went wrong');
    }

    const newPosts = await response.json();

    await this.setState(prevState => ({
        posts: [...prevState.posts, ...newPosts],
        hasMore: newPosts.length === 10, page: prevState.page + 1
    }));

    console.log("In function: ");
    console.log(this.state);

  }

  render() {
    return (
      <div id="posts">
        {this.state.posts.map(post => (
          <SinglePost
            title={post.title}
            ai={post.ai}  
            creator={post.creator}
            poem={post.poem}
            timestamp={post.timestamp}

            hash={post.hash}
            />

        ))}


        {this.state.hasMore && (
          <div>Loading...</div>
        )}
      </div>
    )}

}

export default Posts;


