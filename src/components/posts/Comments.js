import React, { Component } from "react";
import PropTypes from "prop-types";

class Comments extends Component {
  render() {
    let { comments } = this.props;

    if (comments === null || comments === undefined) {
      comments = "";
    } else {
      comments.length > 1
        ? (comments = comments = comments.slice(0).map(comment => (
            <li key={comment._id} className="list-group-item text-left pl-3">
              <img
                onError={this.addDefaultSrc}
                src={comment.avatar}
                className="img-responsive"
                alt={<i className="fas fa-user-circle" />}
                height="25"
              />
              <span className="mr-auto">
                <strong>{comment.name}</strong> {comment.text}
              </span>
              <i className="far fa-heart text-right ml-auto float-right" />
            </li>
          )))
        : (comments = null);
    }
    return <ul className="list-group list-group-flush w-100">{comments}</ul>;
  }
}
Comments.propTypes = {
  comments: PropTypes.array.isRequired
};

export default Comments;
