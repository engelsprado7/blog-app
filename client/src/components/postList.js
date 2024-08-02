import React from 'react';

const PostList = ({ posts, onDeletePost }) => (
    <ul>
        {posts.map(post => (
            <li key={post._id}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <button onClick={() => onDeletePost(post._id)}>Delete</button>
            </li>
        ))}
    </ul>
);

export default PostList;
