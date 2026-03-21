import {posts} from "../../data/posts.js";
import PostComponent from "../Post/PostComponent.jsx";
import Header from "../Header/Header.jsx";


export default function Archive(){
  return(
    <>
      <Header />
      <PostComponent src={posts}/>
    </>
  )
}