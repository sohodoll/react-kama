import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { Field, reduxForm } from 'redux-form';

const MyPostsForm = (props) => {
  let newPostElement = React.createRef();

  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field name='newPostText' component={'textarea'} ref={newPostElement} value={props.newPostText} />
      </div>
      <div>
        <Field component={'button'}>Add post</Field>
      </div>
    </form>
  );
};

const ReduxMyPostsForm = reduxForm({ form: 'myPosts' })(MyPostsForm);

const MyPosts = (props) => {
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

export default MyPosts;
