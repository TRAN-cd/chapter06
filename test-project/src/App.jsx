import { Routes, Route } from 'react-router-dom';
import Archive from './components/Archive/Archive';
import Post from './components/PostDetail/Post';
import { posts } from './data/posts';
import ContactForm from './components/Contact/ContactForm';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Archive />} />
        <Route path='/post/:id' element={<Post src={posts} />} />
        <Route path='/contact' element={<ContactForm />} />
      </Routes>
    </>
  )
}

export default App
