import styles from './Post.module.css';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";


export default function Post(){
  const [post, setPosts] = useState(null);

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
  }, [id]);

  if (!post) {
    return (
      <>
        <Header />
        <div className={styles.inner}>
          <p>記事を読み込み中です...</p>
        </div>
      </>
    )
  }

  // 早期リターンで以下が実行されることはないので削除
  // if ( post === null) {
  //   return (
  //     <>
  //       <Header />
  //       <p>記事を読み込み中です...</p>
  //     </>
  //   )
  // };

  return (
    <>
      <div className={styles.inner}>
        <div className={styles.postBox}>
          <div className={styles.postImg}>
            <img src={post.thumbnailUrl} alt="" />
          </div>
          <div className={styles.postTextBox}>
            <div>
              <p className={styles.date}>{formatDate(post.createdAt)}</p>
              <ul>
                {post.categories.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>
            <h2>{post.title}</h2>
            <p className={styles.txt} dangerouslySetInnerHTML={{ __html: post.content }} />
          </div>
        </div>
      </div>
    </>
  )
}