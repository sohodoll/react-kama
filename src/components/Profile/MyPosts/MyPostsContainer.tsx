import { actions } from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/reduxStore';
import { DispatchPropsType, MapPropsType } from './MyPosts';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';

const mapStateToProps = (state: AppStateType) => {
  return {
    posts: state.profilePage.posts,
  };
};

const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {
  addPost: actions.addPostActionCreator,
})(MyPosts);

export default MyPostsContainer;
