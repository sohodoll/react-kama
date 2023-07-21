import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import { Input } from '../FormsControls/FormsControls'
import { requiredField } from '../../utils/validators/validators'
import { useDispatch, useSelector } from 'react-redux'
import { getAuthUserData, login } from '../../redux/authReducer'
import { Navigate } from 'react-router-dom'
import styles from './styles.module.css'
import { AppDispatch, AppStateType } from '../../redux/reduxStore'
import { FC, useEffect } from 'react'

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field validate={[requiredField]} name={'email'} placeholder='Login' component={Input} />
      </div>
      <div>
        <Field validate={[requiredField]} name={'password'} placeholder='Password' component={Input} />
      </div>
      <div>
        <Field name={'rememberMe'} type='checkbox' component={Input} /> remember me
      </div>
      {captchaUrl && <img src={captchaUrl} alt={'captcha'}></img>}
      {captchaUrl && <Field validate={[requiredField]} name={'captcha'} placeholder='Symbols from image' component={Input} />}
      {error && <div className={styles.error}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  )
}

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm)

type LoginFormValuesType = {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export const Login: FC = () => {
  const captchaUrl = useSelector<AppStateType>((state) => state.auth.captchaUrl)
  const isAuth = useSelector<AppStateType>((state) => state.auth.isAuth)

  const dispatch: AppDispatch = useDispatch()

  const onLogin = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    dispatch(login(email, password, rememberMe, captcha))
  }

  const onSubmit = (formData: LoginFormValuesType) => {
    onLogin(formData.email, formData.password, formData.rememberMe, formData.captcha)
  }

  useEffect(() => {
    dispatch(getAuthUserData())
  }, [dispatch])

  if (isAuth) {
    return <Navigate to={'/profile'} />
  }

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  )
}
