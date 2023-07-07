import React, { FC } from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';
import { maxLength30, requiredField } from '../../../utils/validators/validators';
import { TextArea } from '../../FormsControls/FormsControls';
import { PostType } from '../../../types/types';

type AddPostValuesType = {
  newPostText: string;
};

type AddPostOwnProps = {
  addPost: (newPostText: string) => void;
};

const MyPostsForm = (props) => {
  let newPostElement = React.createRef();

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          validate={[requiredField, maxLength30]}
          name='newPostText'
          component={TextArea}
          ref={newPostElement}
          value={props.newPostText}
        />
      </div>
      <div>
        <Field component={'button'}>Add post</Field>
      </div>
    </form>
  );
};

const ReduxMyPostsForm = reduxForm<AddPostValuesType, AddPostOwnProps>({ form: 'myPosts' })(MyPostsForm);

type PropsType = {
  posts: Array<PostType>;
  addPost: (newPostText: string) => void;
};

const MyPostsComponent: FC<PropsType> = (props) => {
  let postsElements = props.posts.map((p) => <Post message={p.message} likesCount={p.likesCount} key={p.id} />);

  const addPost = (values) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <div>
        <ReduxMyPostsForm onSubmit={addPost} />
      </div>
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
};

const MyPosts = React.memo(MyPostsComponent);

export default MyPosts;
