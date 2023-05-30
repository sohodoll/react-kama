import styles from './styles.module.css';

export const Paginator = (props) => {
  //   const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];

  console.log(props);

  for (let i = 1; i <= 7 + 1; i++) {
    pages.push(i);
  }

  return (
    <div>
      <div>
        {pages.map((page) => (
          <span
            onClick={(e) => {
              props.onPageChange(page);
            }}
            className={props.currentPage === page && styles.selected}
          >
            {page}
          </span>
        ))}
      </div>
    </div>
  );
};
