/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { FC, useEffect } from 'react'
import { Users } from './Users'

import { Preloader } from '../Preloader/Preloader'
import {} from 'redux'
import {} from '../../utils/withRouter'
import { getCurrentPage, getIsFetching, getPageSize, getUsersFilters } from '../../redux/usersSelectors'
import { AppDispatch } from '../../redux/reduxStore'
import { getUsers } from '../../redux/usersReducer'
import { useLocation, useNavigate } from 'react-router-dom'

export const UsersPage: FC = () => {
  const isFetching = useSelector(getIsFetching)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilters)
  const dispatch: AppDispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const search = location.search.substring(1)
    const params = new URLSearchParams(search)

    let actualPage = currentPage
    let actualFilter = filter

    const term = params.get('term')

    if (params.get('page')) {
      actualPage = +params.get('page')
    }
    if (term) {
      actualFilter = { ...filter, term: term.trim() }
    }
    if (params.get('friend')) {
      actualFilter = { ...actualFilter, friend: params.get('friend') === 'null' ? null : params.get('friend') === 'true' ? true : false }
    }
    debugger
    dispatch(getUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query = `?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`
    navigate(query)
  }, [filter, navigate, currentPage])

  return (
    <div>
      <h1>Users Page</h1>
      <h2> Users </h2>
      {isFetching ? <Preloader /> : <Users />}
    </div>
  )
}
