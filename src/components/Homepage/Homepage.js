import React, { Component } from 'react'
import axiosInstance from "../../axiosInstance";
import {Navigate} from 'react-router-dom'
import { Row,Col } from 'react-bootstrap';
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
        this.setState({createPostError:""})

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
                        key={eachPost._id}
                        link={true}
                        postId = {eachPost._id}
                        post={eachPost.post}
                        posted_on={eachPost.posted_on}
                        username={eachPost.username}
                    />
            )
        })
        const userIsLoggedIn = this.props.userDetails
        let nameOfUser = undefined
        if(userIsLoggedIn){
            nameOfUser = this.props.userDetails.name.split(" ");
            nameOfUser = nameOfUser[0][0]+nameOfUser[1][0];
        }
        return (
            
                <div className="">
                    {!userIsLoggedIn&&
                        <Navigate to="/login" replace={true} /> 
                    }
                    

                        <div xs={6} className="homepage-container px-2 pt-1">
                            <Row>
                                <Col xs={2} className="text-center">
                                    <p className="homepage-image-box">
                                        {nameOfUser}
                                    </p>
                                </Col>
                                <Col xs={10}>
                                    <form onSubmit={this.handleCreatePost}>
                                    
                                        <div className="post-field-input mt-2">
                                            <textarea
                                                rows={5}
                                                className="form-control input-field-text-area"
                                                placeholder="What's happening?"        
                                                onChange={this.onChangePostCreate}
                                                value={this.state.createPost}
                                            />
                                        </div>
                                    
                                        <hr className="w-75" />
                                        <div className="text-right">
                                            <button className="btn btn-dark " type="submit">Tweet</button>
                                        </div>
                                    </form>
                                </Col>
                            </Row>
                    {this.state.createPostSuccess&&<div className="alert alert-success my-2" role="alert">
                        {this.state.createPostSuccess}
                        </div>
                    }

                    {this.state.createPostError&&
                        <div className="alert alert-danger my-2" role="alert">
                            {this.state.createPostError}
                        </div>
                    }
                    <hr/>
                    {
                        
                        result
                    }
                    </div>
                </div>
            
        )
    }

}
