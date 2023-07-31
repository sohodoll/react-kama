import { FC } from 'react'
import { UserOutlined } from '@ant-design/icons'
import { Header } from 'antd/es/layout/layout'
import { Avatar, Button, Col, Menu, MenuProps, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth, selectLogin } from '../../redux/authSelectors'
import { logout } from '../../redux/authReducer'
import { AppDispatch } from '../../redux/reduxStore'
import { NavLink } from 'react-router-dom'

const items1: MenuProps['items'] = ['Developers'].map((key) => ({
  key,
  label: key,
}))

const HeaderComponent: FC = () => {
  const isAuth = useSelector(selectIsAuth)
  const login = useSelector(selectLogin)
  const dispatch: AppDispatch = useDispatch()

  console.log(login)

  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <Header style={{ display: 'flex', alignItems: 'center' }}>
      <Row style={{ width: '100%' }}>
        <Col>
          <div className='demo-logo' />
        </Col>
        <Col span={20}>
          <Menu defaultSelectedKeys={['Developers']} theme='dark' mode='horizontal' items={items1} />
        </Col>
        <Col>
          <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
          <span style={{ color: 'white', marginLeft: '15px', marginRight: '15px' }}>{login}</span>
        </Col>
        <Col>
          {isAuth ? (
            <div>
              <Button onClick={onLogout}>Logout</Button>
            </div>
          ) : (
            <NavLink to='login'>Login</NavLink>
          )}
        </Col>
      </Row>
    </Header>
  )
}

export default HeaderComponent
