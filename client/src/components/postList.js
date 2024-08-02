import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const PostList = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            fetchPosts();
        }
    }, [isAuthenticated]);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/posts', {
                withCredentials: true // Include credentials for session-based authentication
            });
            setPosts(response.data);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Error fetching posts');
        }
    };

    if (!isAuthenticated) {
        return <p>Please log in to view posts.</p>;
    }

    return (
        <div>
            <h2>Post List</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {posts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostList;
