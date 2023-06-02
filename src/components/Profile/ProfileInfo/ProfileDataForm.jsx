import { Field, reduxForm } from 'redux-form';
import { Input, TextArea } from '../../FormsControls/FormsControls';
import { requiredField } from '../../../utils/validators/validators';
import styles from './ProfileInfo.module.css';

const ProfileData = ({ handleSubmit, error, profileData }) => {
  return (
    <form onSubmit={handleSubmit}>
      <button>Save</button>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <b>Full name:</b>
        <Field placeholder={'Full name'} name={'fullName'} component={Input} validate={[requiredField]} />
      </div>
      <div>
        <b>Looking for job:</b>
        <Field type={'checkbox'} name={'lookingForAJob'} component={Input} />
      </div>
      <div>
        <b>About me:</b>
        <Field placeholder={'About me'} name={'aboutMe'} component={TextArea} validate={[requiredField]} />
      </div>
      <div>
        <b>Job description:</b>
        <Field placeholder={'Job description'} name={'lookingForAJobDescription'} component={TextArea} validate={[requiredField]} />
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profileData.contacts).map((contact) => (
          <div key={contact}>
            <b>{contact}:</b>
            <Field placeholder={contact} name={'contacts.' + contact} component={Input} />
          </div>
        ))}
      </div>
    </form>
  );
};

export const ProfileDataForm = reduxForm({ form: 'edit-profile' })(ProfileData);
