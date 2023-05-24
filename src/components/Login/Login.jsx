import { Field, reduxForm } from 'redux-form';

const LoginForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name={'login'} placeholder='Login' component={'input'} />
      </div>
      <div>
        <Field name={'password'} placeholder='Password' component={'input'} />
      </div>
      <div>
        <Field name={'rememberMe'} type='checkbox' component={'input'} /> remember me
      </div>
      <div>
        <Field component={'button'}>Login</Field>
      </div>
    </form>
  );
};

const ReduxLoginForm = reduxForm({ form: 'login' })(LoginForm);

export const Login = () => {
  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div>
      <h1>Login</h1>
      <ReduxLoginForm onSubmit={onSubmit} />
    </div>
  );
};
