import styles from "./Header.module.css";

export default function Header(){
  return (
    <>
      <header className={styles.header}>
        <a href="/">Blog</a>
        <a href="/contact/">お問い合わせ</a>
      </header>
    </>
  )
}