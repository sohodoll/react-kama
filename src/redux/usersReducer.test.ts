import { InitialStateType, actions, usersReducer } from './usersReducer'

let state: InitialStateType

beforeEach(() => {
  state = {
    users: [
      {
        id: 0,
        name: 'Dymich 0',
        photos: {
          small: null,
          large: null,
        },
        status: 'status 0',
        followed: false,
      },
      {
        id: 1,
        name: 'Dymich 1',
        photos: {
          small: null,
          large: null,
        },
        status: 'status 1',
        followed: false,
      },
      {
        id: 2,
        name: 'Dymich 2',
        photos: {
          small: null,
          large: null,
        },
        status: 'status 2',
        followed: true,
      },
      {
        id: 3,
        name: 'Dymich 3',
        photos: {
          small: null,
          large: null,
        },
        status: 'status 3',
        followed: true,
      },
    ],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 4,
    isFetching: false,
    followingInProgress: [],
  }
})

test('follow success', () => {
  const newState = usersReducer(state, actions.followSuccess(1))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[1].followed).toBeTruthy()
})

test('unfollow success', () => {
  const newState = usersReducer(state, actions.unfollowSuccess(2))

  expect(newState.users[0].followed).toBeFalsy()
  expect(newState.users[2].followed).toBeFalsy()
})
