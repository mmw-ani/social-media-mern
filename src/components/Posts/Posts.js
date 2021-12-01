import React, { Component} from 'react'
import axiosInstance from '../../axiosInstance'
import { useParams} from 'react-router-dom'
import {Row, Col, Container,Dropdown} from 'react-bootstrap'
import {Navigate } from 'react-router'
import "./index.css"
import PostContainer from './PostContainer'


class PostComponent extends Component {
    state={
        post:{},
        editPost:"",
        editable:false,
        currentUsername:"",
        redirect:false,
        likes:[],
        comments:[],
        editFormOpen:false,

    }
    getPostDetails = ()=>{
        axiosInstance.get(`/api/post/${this.props.postId}`)
        .then((response)=>{
            this.setState({currentUsername:response.data.currentUsername})
            const checking = this.state.currentUsername===response.data.username;
            
            this.setState({
                post:response.data,
                editPost:response.data.post,
                currentUserId:response.data.loggedIn,
                editable:checking,
                likes:response.data.likes,
                comments:response.data.comments,
            })
        })
        .catch((e)=>{
            console.log(e);
        })
    }
    componentDidMount(){
        this.getPostDetails()
        
    }
    handleSubmitEditForm=(e)=>{
        e.preventDefault();
        const body = {
            post:this.state.editPost
        }
        axiosInstance.put(`/api/post/${this.props.postId}`,body)
        .then((response)=>{

            const newArr = Object.assign({},this.state.post,{
                post:this.state.editPost
            })
            this.setState({editable:true})
            this.setState({post:newArr,editFormOpen:false})
        })
        .catch((error)=>{
            this.setState({editable:false})
        })
    }

    handleDeleteButton = (e)=>{
        e.preventDefault();
        axiosInstance.delete(`/api/post/${this.props.postId}`)
        .then((response)=>{
            console.log("Post Deleted");
            this.setState({
                redirect:true,
            })
            
        })
        .catch((error)=>{
            console.log("Error: "+e);
        });
    }
    handleOpenEditForm = ()=>{
        this.setState({editFormOpen:!this.state.editFormOpen})
    }
    render() {
        return (
            <Container className="mt-5">
                <Row>
                <Col xs={12}>
                {
                    this.state.editable && 
                    <div className="dropdown-post-container">
                    <Dropdown >
                        <Dropdown.Toggle variant="" id="dropdown-basic" className="dropdown-post-button">
                            
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleOpenEditForm}>Edit</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleDeleteButton}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                            
                    </Dropdown>
                    {   this.state.editFormOpen&&
                                <div className="mb-3 text-center">
                                    <form onSubmit={this.handleSubmitEditForm}>
                                        <textarea
                                            rows={5}
                                            className="form-control ml-auto mr-auto"
                                            placeholder="Write Your Post here"
                                            onChange={(e)=>this.setState({editPost:e.target.value})}
                                            value={this.state.editPost}
                                        />
                                    
                                        <br />
                                        <button className="btn btn-dark" type="submit">Update</button>
                                    </form>
                                
                                    
                                </div>
                    }
                    </div>
                }
                </Col>
                <Col xs={12}>
                    {this.state.redirect&& 
                        <Navigate to="/" replace={true} />
                    }
                    <PostContainer
                        post={this.state.post.post}
                        username={this.state.post.username}
                        posted_on={this.state.post.posted_on}
                        isLiked = {this.state.post.isLiked}
                        postId = {this.state.post._id}
                        likedButtonTrigger={this.getPostDetails}
                        likedBy = {this.state.likes.length}
                        commentedBy = {this.state.comments.length}
                        comments = {this.state.comments}
                    />
                </Col>
                
                </Row>
                
            </Container>
        )
    }
}

function Posts() {
    const params = useParams();
    const postId= params.postId;

    return (
        <PostComponent postId={postId}/>
    )
}


export default Posts
