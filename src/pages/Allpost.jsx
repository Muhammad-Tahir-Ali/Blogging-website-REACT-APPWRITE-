import React, { useState, useEffect } from "react";
import service from "../appwrite/configure";
import { Container, PostCard } from "../components";

const Allpost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents);
      }
    });
  }, []);

  return (
    <Container>
      {posts.map((post) => (
        <PostCard
          key={post.$id}
          id={post.$id}
          featuredImage={post.featuredImage}
          title={post.title}
        />
        
      ))}
    </Container>
  );
};

export default Allpost;

