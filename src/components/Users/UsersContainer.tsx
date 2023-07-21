import { useDispatch, useSelector } from 'react-redux'
import { FC, useEffect } from 'react'
import { Users } from './Users'

import { Preloader } from '../Preloader/Preloader'
import {} from 'redux'
import {} from '../../utils/withRouter'
import { getCurrentPage, getIsFetching, getPageSize, getUsersFilters } from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'
import { getUsers } from '../../redux/usersReducer'

export const UsersPage: FC = () => {
  const isFetching = useSelector(getIsFetching)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilters)
  const dispatch: AppDispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers(currentPage, pageSize, filter))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <h1>Users Page</h1>
      <h2> Users </h2>
      {isFetching ? <Preloader /> : <Users />}
    </div>
  )
}
