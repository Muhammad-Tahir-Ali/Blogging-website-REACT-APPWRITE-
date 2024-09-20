import React, { useState, useEffect } from 'react'
import service from '../appwrite/configure'
import { Container, PostCard } from '../components'

const Home = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
      service.getPosts().then((response) => {
          if (response) {
            setPosts(response.documents)
          }
      })
     
    }, [])

    if (posts.length === 0) {
        return (
          <Container>
            <div>login to read posts</div>
          </Container>
        )
    }
    
  return (
    <Container>
      {posts.map((post) => (
        <PostCard key={post.$id} {...post} />
      ))}
    </Container>
  )
}

export default Home

