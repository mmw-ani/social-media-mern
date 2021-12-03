import React, { Component } from 'react'
import axiosInstance from "../../axiosInstance";
import {Navigate,Link} from 'react-router-dom'
import { Row,Col,Container } from 'react-bootstrap';
import "./index.css"
import PostContainer from '../Posts/PostContainer';
import {AllUser} from '../User/AllUser';

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
        axiosInstance.get("/api/feed/")
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
            setTimeout(()=>{
                this.setState({createPostSuccess:"",createPostError:""})
            },5000)
        })
        .catch((error)=>{
            console.log(error);
        })
        }
        else{
            this.setState({createPostError:"Empty Post!"})
        }
    }
    
    likedButtonTrigger= ()=>{
        this.getAllPost()
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
                        isLiked = {eachPost.isLiked}
                        username={eachPost.username}
                        likedButtonTrigger={this.likedButtonTrigger}
                        likedBy = {eachPost.likes.length}
                        commentedBy = {eachPost.comments.length}
                        comments = {eachPost.comments.splice(0,2)}
                    />
            )
        })
        const userIsLoggedIn = this.props.userDetails
        let nameOfUser = undefined
        if(userIsLoggedIn){
            nameOfUser = this.props.userDetails.name.split(" ");
            nameOfUser = nameOfUser[0][0]+nameOfUser[1][0];
            nameOfUser = nameOfUser.toUpperCase();
        }
        return (

                <Container className="">
                    {!userIsLoggedIn&&
                        <Navigate to="/login" replace={true} /> 
                    }
                    
                    <Row>
                        
                        <Col xs={12} lg={9} className="px-2 pt-1 homepage-container">
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
                    {   this.state.posts.length 
                        ?result
                        :<p className="text-center">Follow Users to see post.</p>
                    }
                    </Col>
                    <Col className="text-center d-none d-lg-block" lg={3}>
                        <AllUser inMainScreen={true} />
                        <Link to="/users" className="text-center m-3" >See All Users</Link>
                    </Col>

                    </Row>

                </Container>
            
        )
    }

}
