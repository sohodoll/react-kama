import styles from './styles.module.css';

export const Preloader = (props) => {
  return (
    <div>
      <img className={styles.loading} src='https://i.gifer.com/ZZ5H.gif' alt='' />
    </div>
  );
};
