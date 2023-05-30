import { Paginator } from './Paginator';
import { User } from './User';

export const Users = ({ currentPage, onPageChange, totalUsersCount, pageSize, follow, unfollow, followingInProgress, users }) => {
  return (
    <div>
      <Paginator currentPage={currentPage} onPageChange={onPageChange} totalUsersCount={totalUsersCount} pageSize={pageSize} />
      {users.map((user) => (
        <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
      ))}
    </div>
  );
};
