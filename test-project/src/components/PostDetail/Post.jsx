import Header from '../Header/Header';
import styles from './Post.module.css';
import { useParams } from 'react-router-dom';

export default function Post({src}){
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  const { id } = useParams();
  const hitPost = src.find(post => post.id === Number(id));

  if (!hitPost) {
    return (
      <>
        <Header />
        <div className={styles.inner}>
          <p>記事が見つかりませんでした。</p>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.inner}>
        <div className={styles.postBox}>
          <div className={styles.postImg}>
            <img src={hitPost.thumbnailUrl} alt="" />
          </div>
          <div className={styles.postTextBox}>
            <div>
              <p className={styles.date}>{formatDate(hitPost.createdAt)}</p>
              <ul>
                {hitPost.categories.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>
            <h2>{hitPost.title}</h2>
            <p className={styles.txt} dangerouslySetInnerHTML={{ __html: hitPost.content }} />
          </div>
        </div>
      </div>
    </>
  )
}