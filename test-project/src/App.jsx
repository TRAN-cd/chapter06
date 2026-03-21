import { Routes, Route } from 'react-router-dom';
import Archive from './components/Archive/Archive';
import Post from './components/PostDetail/Post';
import { posts } from './data/posts';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Archive />} />
        <Route path='/post/:id' element={<Post src={posts} />} />
      </Routes>
    </>
  )
}

export default App
