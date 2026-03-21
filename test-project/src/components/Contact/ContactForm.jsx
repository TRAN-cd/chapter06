import styles from './ContactForm.module.css';
import { useState } from 'react';



export default function ContactForm(){
  const defaultFormValue = {name: '', email: '', message: ''};

  const [form, setForm] = useState(defaultFormValue);

  const handleForm = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleReset = () => {
    setForm(defaultFormValue);
  };

  // バリデートと送信時の処理
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleValidate = async () => {
    const newErrors = {};

    // お名前のチェック
    if (!form.name) {
      newErrors.name = 'お名前は必須です。'
    } else if (form.name.length > 31) {
      newErrors.name = 'お名前は30文字以内で入力してください。'
    };

    // メールアドレスのチェック
    const regex = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!form.email) {
      newErrors.email = 'メールアドレスは必須です。'
    } else if (!regex.test(form.email)) {
      newErrors.email = 'メールアドレスの形式が正しくありません。'
    };

    // 本文のチェック
    if (!form.message) {
      newErrors.message = '本文は必須です。'
    } else if (form.message.length > 501) {
      newErrors.message = '本文は500文字以内で入力してください。'
    };

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // 送信中なので、入力とボタンクリックできないようにする
      setIsSubmitting(true);

      try {
        const response = await fetch("https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: JSON.stringify(form)
        });

        if (response.ok) {
          alert('送信しました');
          handleReset();
        } else {
          // 意図的のcatch（送信処理エラーが起きたトクの処理）へ飛ばす
          throw new Error("サーバーエラー");
        }
      } catch (error) {
        alert('通信に失敗しました。ネット環境を確認してください。')
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <div className={styles.inner}>
        <h1>お問い合わせフォーム</h1>

        <form action="">
          <div className={styles.form}>
            <label htmlFor="name">お名前</label>
            <div className={styles.formBox}>
              <input id="name" name="name" type="text" value={form.name} onChange={handleForm} disabled={false}/><br />
              {errors.name && <p className={styles.error}>{errors.name}</p>}
            </div>
          </div>
          <div className={styles.form}>
            <label htmlFor="email">メールアドレス</label>
            <div className={styles.formBox}>
              <input id="email" name="email" type="text" value={form.email} onChange={handleForm} disabled={isSubmitting}/>
              {errors.email && <p className={styles.error}>{errors.email}</p>}
            </div>
          </div>
          <div className={styles.form}>
            <label htmlFor="message">本文</label>
            <div className={styles.formBox}>
              <textarea id="message" name="message" cols="30" rows="10" value={form.message} onChange={handleForm} disabled={isSubmitting}></textarea>
              {errors.message && <p className={styles.error}>{errors.message}</p>}
            </div>
          </div>

          <div className={styles.btnBox}>
            <button type="button" className={styles.submitBtn} onClick={handleValidate} disabled={isSubmitting}>送信</button>
            <button type="button" className={styles.clearBtn} onClick={handleReset}>クリア</button>
          </div>
        </form>
      </div>
    </>
  )
}