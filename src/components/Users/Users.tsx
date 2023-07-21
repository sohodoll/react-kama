import { FC } from 'react'
import { Paginator } from './Paginator'
import { User } from './User'
import { UsersSearchForm } from './UsersSearchForm'
import { FilterType, getUsers, follow, unfollow } from '../../redux/usersReducer'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsersFilters,
  selectUsersSuper,
} from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'

export const Users: FC = () => {
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilters)
  const users = useSelector(selectUsersSuper)
  const followingInProgress = useSelector(getFollowingInProgress)

  const dispatch: AppDispatch = useDispatch()

  const onPageChange = (pageNumber: number) => {
    dispatch(getUsers(pageNumber, pageSize, filter))
  }

  const onFilterChange = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter))
  }

  const followUser = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollowUser = (userId: number) => {
    dispatch(unfollow(userId))
  }

  return (
    <div>
      <UsersSearchForm onFilterChanged={onFilterChange} />
      <Paginator currentPage={currentPage} onPageChange={onPageChange} totalUsersCount={totalUsersCount} pageSize={pageSize} />
      {users.map((user) => (
        <User user={user} followingInProgress={followingInProgress} unfollow={unfollowUser} follow={followUser} />
      ))}
    </div>
  )
}
