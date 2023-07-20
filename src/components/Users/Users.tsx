import { FC } from 'react'
import { Paginator } from './Paginator'
import { User } from './User'
import { UserType } from '../../types/types'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType } from '../../redux/usersReducer'

type UsersProps = {
  currentPage: number
  onPageChange: (pageNumber: number) => void
  onFilterChanged?: (filter: FilterType) => void
  totalUsersCount: number
  pageSize: number
  follow: (userId: number) => void
  unfollow: (userId: number) => void
  followingInProgress: Array<number>
  users: Array<UserType>
}

export const Users: FC<UsersProps> = ({
  currentPage,
  onPageChange,
  totalUsersCount,
  onFilterChanged,
  pageSize,
  follow,
  unfollow,
  followingInProgress,
  users,
}) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Paginator currentPage={currentPage} onPageChange={onPageChange} totalUsersCount={totalUsersCount} pageSize={pageSize} />
      {users.map((user) => (
        <User user={user} followingInProgress={followingInProgress} unfollow={unfollow} follow={follow} />
      ))}
    </div>
  )
}
