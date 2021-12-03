import React,{useState,useEffect} from 'react'
import { Container } from 'react-bootstrap';
import axiosInstance from '../axiosInstance';
import PostContainer from './Posts/PostContainer';

function Explore() {
    const [posts,setPosts] =useState([]);
    const getAllPost = ()=>{
        axiosInstance.get("/api/post/")
        .then((response)=>{
            setPosts(response.data)
            
            
        })
        .catch((error)=>{
            setPosts([])
            console.log(error)
        });
    }
    const likedButtonTrigger= ()=>{
        getAllPost()
    }

    useEffect(()=>{
        getAllPost()
    },[]);
    return (
        <Container>
            <h4 className="text-center mt-4 mb-3"> Explore Posts</h4>
            {posts.map((eachPost)=>{
            return (
                    <PostContainer 
                        key={eachPost._id}
                        link={true}
                        postId = {eachPost._id}
                        post={eachPost.post}
                        posted_on={eachPost.posted_on}
                        isLiked = {eachPost.isLiked}
                        username={eachPost.username}
                        likedButtonTrigger={likedButtonTrigger}
                        likedBy = {eachPost.likes.length}
                        commentedBy = {eachPost.comments.length}
                        comments = {eachPost.comments.splice(0,2)}
                    />
            )
    })}
        </Container>
    )
}

export default Explore
