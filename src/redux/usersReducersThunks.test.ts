import { usersAPI } from './../api/usersAPI'
import { APIResponseType, ResultCodesEnums } from '../api/api'
import { follow, unfollow } from './usersReducer'

jest.mock('../api/usersAPI')

const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>
const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear()
  getStateMock.mockClear()
  userAPIMock.followUser.mockClear()
  userAPIMock.unfollowUser.mockClear()
})

const result: APIResponseType = {
  resultCode: ResultCodesEnums.Success,
  messages: ['Hello'],
  data: {},
}

test('follow thunk', async () => {
  const thunk = follow(1)
  userAPIMock.followUser.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})

test('unfollow thunk', async () => {
  const thunk = unfollow(1)
  userAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result))

  await thunk(dispatchMock, getStateMock, {})

  expect(dispatchMock).toBeCalledTimes(3)
})
