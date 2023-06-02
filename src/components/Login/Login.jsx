import { Field, reduxForm } from 'redux-form';
import { Input } from '../FormsControls/FormsControls';
import { requiredField } from '../../utils/validators/validators';
import { connect } from 'react-redux';
import { login, logout } from '../../redux/authReducer';
import { Navigate } from 'react-router-dom';
import styles from './styles.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
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

const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm);

export const LoginElement = (props) => {
  const onSubmit = (formData) => {
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

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl,
});

export const Login = connect(mapStateToProps, {
  login,
  logout,
})(LoginElement);
