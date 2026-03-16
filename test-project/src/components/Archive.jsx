import {posts} from "../data/posts.js";
import PostComponent from "./PostComponent";
import Header from "./Header.jsx";


export default function Archive(){
  return(
    <>
      <Header />
      <PostComponent src={posts}/>
    </>
  )
}