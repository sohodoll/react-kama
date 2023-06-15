import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import { Input } from '../FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import styles from './styles.module.css';
import { AppStateType } from '../../redux/reduxStore';
import { FC } from 'react';

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

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
  );
};

const ReduxLoginForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStatePropsType = {
  isAuth: boolean;
  captchaUrl: string | null;
};

type MapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captcha: string) => void;
  logout: () => void;
};

type LoginFormValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

export const LoginElement: FC = (props: MapStatePropsType & MapDispatchPropsType) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) {
    return <Navigate to={'/profile'} />;
  } else {
    return (
      <div>
        <h1>Login</h1>
        <ReduxLoginForm captchaUrl={props.captchaUrl} onSubmit={onSubmit} />
      </div>
    );
  }
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export const Login = connect(mapStateToProps, {
  login,
  logout,
})(LoginElement);
