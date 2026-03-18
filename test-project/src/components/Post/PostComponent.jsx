import { Link } from 'react-router-dom';
import styles from './PostComponent.module.css';

export default function PostComponent({src}){    
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
      {src.map((elem, index) => (
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
  );
}