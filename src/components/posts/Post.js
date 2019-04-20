import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import checkDate from "../../utils/checkDate";
//like post, flat post, add comment, actions(report innappropritate, unfoolow, go to post, cancel)
import { likePost } from "../../actions/PostActions";

import Tooltip from "../common/Tooltip";

export class Post extends Component {
  addDefaultSrc(ev) {
    ev.target.src =
      "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/256x256/plain/user.png";
  }

  handleLike(id) {
    this.props.likePost(id);
  }

  handleCheckLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }
  handleCheckBookmark(bookmarks) {
    const { auth } = this.props;
    // if (bookmarks.filter(like => like.user === auth.user.id).length > 0) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  render() {
    const { post } = this.props;
    //add auth here to check if the user is blocked? idk
    let comments;
    let likes;
    let likesList;

    //display first comment in array, then display in descending order, first comment needs to be caption, ther's no heart for it
    if (post.comments === null || post.comments === undefined) {
      comments = "";
    } else {
      post.comments.length > 1
        ? (comments = comments = post.comments.map(comment => (
            <li key={comment._id} className="list-group-item">
              <img
                onError={this.addDefaultSrc}
                src={comment.avatar}
                className="img-responsive"
                alt={<i className="fas fa-user-circle" />}
              />
              {comment.name}: {comment.text}
            </li>
          )))
        : (comments = (
            <li className="list-group-item">
              <img
                onError={this.addDefaultSrc}
                src={post.comments.avatar}
                className="img-responsive"
                alt={post.comments.name}
              />
              <strong>{post.comments[0].name}</strong> {post.comments[0].text}
            </li>
          ));
    }

    if (post.likes !== null && post.likes !== undefined) {
      likes = <span>{post.likes.length} likes</span>;
      likesList = post.likes.map(like => (
        <li key={like._id} className="list-group-item">
          <Link to={`/${like.user}`}>{like.name}</Link>
        </li>
      ));
    }

    return (
      <div className="post card card-body mt-5">
        <div className="row border-bottom py-2">
          <div className="col-md-1">
            <img //post avatar
              src={post.avatar}
              onError={this.addDefaultSrc}
              alt={<i className="fas fa-user-circle" />}
              className="img-fluid"
            />
          </div>

          <div className="col-md-9 text-left">{post.name}</div>
          <div className="col-md-2 text-right">
            <i className="fas fa-ellipsis-h" />
          </div>
        </div>
        <div className="row m-auto mb-3">
          <img
            onError={this.addDefaultSrc} //make this show iamge not loading
            src={post.image}
            alt={post.image}
            height="500"
            className="mx-auto d-block postimg"
          />
        </div>
        <div className="row py-3">
          {" "}
          <i
            onClick={this.handleLike.bind(this, post._id)}
            className={classnames("far fa-heart fa-2x ml-3", {
              "fas text-danger": this.handleCheckLike(post.likes)
            })}
          />
          <i className="far fa-comment fa-2x ml-3" />
          <i className="far fa-paper-plane fa-2x ml-3" />
          <i
            className={classnames("far fa-bookmark fa-2x ml-auto", {
              fas: this.handleCheckBookmark()
            })}
          />
        </div>

        <div className="row">
          <ul className="list-group list-group-flush">{comments}</ul>
        </div>
        <Tooltip
          message={<ul className="list-group list-group-flush">{likesList}</ul>}
          position={"top"}
        >
          <strong className="text-left">{likes}</strong>
        </Tooltip>
        <div>{checkDate(post.date)}</div>
      </div>
    );
  }
}

Post.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  likePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = { likePost };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);
