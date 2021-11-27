import React, { Component } from 'react'
import axiosInstance from "../../axiosInstance";
import {Link,Navigate} from 'react-router-dom'
import { Container } from 'react-bootstrap';
import "./index.css"
import PostContainer from '../Posts/PostContainer';
export default class Homepage extends Component {
    _isMounted = false;
    state={
        posts:[],
        createPost:"",
        createPostSuccess:"",
        createPostError:"",
    };
    componentDidMount(){
        this._isMounted=true;
        if(this.props.userDetails){
        this.getAllPost();
    }
    
    }
    getAllPost = ()=>{
        axiosInstance.get("/api/post/")
        .then((response)=>{
            const posts = response.data
            if(this._isMounted){
                this.setState({posts})
            }
            
        })
        .catch((error)=>{
            this.setState({posts:[]})
            console.log(error)
        });
    }
    componentWillUnmount(){
        this._isMounted=false;
    }
    onChangePostCreate = (e) =>{
        this.setState({createPost:e.target.value});
    }
    handleCreatePost=(e)=>{
        e.preventDefault();
        const body={
            post:this.state.createPost
        }
        if(body.post!==""){
        axiosInstance.post('/api/post/',body)
        .then((response)=>{
            this.setState({createPostSuccess:response.data})
            this.getAllPost();
            this.setState({createPost:""})
        })
        .catch((error)=>{
            console.log(error);
        })
        }
        else{
            this.setState({createPostError:"Empty Post!"})
        }
    }
    render() {
        const posts = this.state.posts;     
        const result = posts.map((eachPost)=>{
            
            return (
                    <PostContainer 
                        link={true}
                        postId = {eachPost._id}
                        post={eachPost.post}
                        posted_on={eachPost.posted_on}
                        username={eachPost.username}
                    />
            )
        })
        const userIsLoggedIn = this.props.userDetails
        return (
            
                <Container className="text-center">
                    {!userIsLoggedIn&&
                    <Navigate to="/login" replace={true} /> 
                    
                    }
                    <div className="m-2" >
                        <Link to="/users">User</Link>
                    </div>
                    <form onSubmit={this.handleCreatePost}>
                        <textarea
                            rows={5}
                            className="form-control"
                            placeholder="Write Your Post here"        
                            onChange={this.onChangePostCreate}
                            value={this.state.createPost}
                        />
        
                        <br />
                        <button className="btn btn-dark" type="submit">Submit</button>
                    </form>
                {this.state.createPostSuccess&&<p>{this.state.createPostSuccess}</p>}
                {this.state.createPostError&&<p>{this.state.createPostError}</p>}
                {
                    
                    result
                }
                    
                </Container>
            
        )
    }

}
