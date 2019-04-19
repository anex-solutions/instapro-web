import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import checkDate from "../../utils/checkDate";
//like post, flat post, add comment, actions(report innappropritate, unfoolow, go to post, cancel)

export class Post extends Component {
  render() {
    const { post } = this.props;
    //add auth here to check if the user is blocked? idk
    let comments;
    let likes;
    //display first comment in array, then display in descending order, first comment needs to be caption, ther's no heart for it
    if (post.comments === null || post.comments === undefined) {
      comments = "";
    } else {
      console.log(post.comments);
      post.comments.length > 1
        ? (comments = comments = post.comments.map(comment => (
            <li key={comment._id} className="list-group-item">
              {comment.avatar ? (
                <img src={comment.avatar} alt={comments.name} />
              ) : (
                <i className="fas fa-user-circle" />
              )}
              {comment.name}: {comment.text}
            </li>
          )))
        : (comments = (
            <li>
              {post.comments.avatar ? (
                <img src={post.comments.avatar} alt={post.comments.name} />
              ) : (
                <i className="fas fa-user-circle" />
              )}
              {post.comments.name}: {post.comments[0].text}
            </li>
          ));
    }
    if (post.likes !== null && post.likes !== undefined) {
      post.likes.length > 1 ? (likes = <div>Likes: 0</div>) : (likes = "");
    }
    return (
      <div className="post card card-body mt-5">
        <div className="row">
          <div className="col-md-1">
            {post.avatar ? (
              <img src={post.avatar} alt={post.name} />
            ) : (
              <i className="fas fa-user-circle" />
            )}
          </div>
          <div className="col-md-9 text-left">{post.user}</div>
          <div className="col-md-2 text-right">...</div>
        </div>
        <div className="row m-auto">
          <img src={post.image} alt={post.image} />
        </div>
        <div className="row">
          {" "}
          <i className="far fa-heart fa-lg" />
          <i className="far fa-heart fa-lg" />
          <i className="far fa-heart fa-lg" />
        </div>
        <div>{likes}</div>
        <div className="row">
          <ul className="list-group list-group-flush">{comments}</ul>
        </div>
        <div>{checkDate(post.date)}</div>
      </div>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
