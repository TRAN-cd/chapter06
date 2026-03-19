import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styles from '../components/Post/PostComponent.module.css';

export default function PostAPI(){
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts");
      const data = await response.json();
      setPosts(data.posts);
    }
  
    fetcher();
  }, []);
  
  if ( posts.length === 0) {
    return (
      <p>記事を読み込み中です...</p>
    )
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <>
      <div className={styles.inner}>
        <h1>記事一覧</h1>
        {posts.map((elem, index) => (
          <Link to={`/post/${elem.id}`} className={styles.postBox} key={index} id={elem.id}>
            <div className={styles.postImg}>
              <img src={elem.thumbnailUrl} alt="" />
            </div>
            <div className={styles.postTextBox}>
              <div>
                <p className={styles.date}>{formatDate(elem.createdAt)}</p>
                <ul>
                  {elem.categories.map((cat, i) => (
                    <li key={i}>{cat}</li>
                  ))}
                </ul>
              </div>
              <h2>{elem.title}</h2>
              <p className={styles.txt} dangerouslySetInnerHTML={{ __html: elem.content }} />
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}