import Header from '../Header/Header';
import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function Post(){
  const [posts, setPosts] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const { id } = useParams();

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetch(`https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/posts/${id}`);
      const data = await response.json();
      setPosts(data.post);
    }
  
    fetcher();
  }, []);

  if (!posts) {
    return (
      <>
        <Header />
        <div className={styles.inner}>
          <p>記事が見つかりませんでした。</p>
        </div>
      </>
    )
  }

  if ( posts.length === 0) {
    return (
      <p>記事を読み込み中です...</p>
    )
  };

  return (
    <>
      <Header />
      <div className={styles.inner}>
        <div className={styles.postBox}>
          <div className={styles.postImg}>
            <img src={posts.thumbnailUrl} alt="" />
          </div>
          <div className={styles.postTextBox}>
            <div>
              <p className={styles.date}>{formatDate(posts.createdAt)}</p>
              <ul>
                {posts.categories.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>
            <h2>{posts.title}</h2>
            <p className={styles.txt} dangerouslySetInnerHTML={{ __html: posts.content }} />
          </div>
        </div>
      </div>
    </>
  )
}