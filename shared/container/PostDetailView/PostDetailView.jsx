import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import * as Actions from "../../redux/actions/actions";

class PostDetailView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const u = window.location.origin + "/u/" + this.props.post.hash;
    const orig = this.props.post.url;

    return (
      <div>
        <div className="container">
          <h5>your bite-size url:</h5>
          <div className="single-post post-detail">
            <a className="post-title" href={orig} target="_blank">
              {u}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

PostDetailView.need = [
  (params) => {
    console.log("params ", params);
    return Actions.getPostRequest.bind(null, params.hash)();
  },
];

PostDetailView.contextTypes = {
  router: React.PropTypes.object,
};

PostDetailView.propTypes = {
  post: PropTypes.shape({
    hash: PropTypes.string.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(store) {
  return {
    post: store.post,
    posts: store.posts,
  };
}

export default connect(mapStateToProps)(PostDetailView);
