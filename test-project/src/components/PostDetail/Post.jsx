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
  const hitPostId = id - 1;
  console.log(hitPostId);

  return (
    <>
      <Header />
      <div className={styles.inner}>
        <div className={styles.postBox}>
          <div className={styles.postImg}>
            <img src={src[hitPostId].thumbnailUrl} alt="" />
          </div>
          <div className={styles.postTextBox}>
            <div>
              <p className={styles.date}>{formatDate(src[hitPostId].createdAt)}</p>
              <ul>
                {src[hitPostId].categories.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>
            <h2>{src[hitPostId].title}</h2>
            <p className={styles.txt} dangerouslySetInnerHTML={{ __html: src[hitPostId].content }} />
          </div>
        </div>
      </div>
    </>
  )
}