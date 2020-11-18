import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Interstitial from "../components/Interstitial";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      showInterstitial: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts.length !== this.props.posts.length) {
      this.setState({ showInterstitial: true });
      setTimeout(() => {
        this.setState({ showInterstitial: false }, () => {
          this.context.router.push(`/url/${nextProps.post.hash}`);
        });
      }, 1500);
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ height: 300 }}>
          {this.state.showInterstitial ? <Interstitial /> : this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

App.contextTypes = {
  router: React.PropTypes.object,
};

App.propTypes = {
  children: PropTypes.object.isRequired,
};

function mapStateToProps(store) {
  return {
    posts: store.posts,
    post: store.post,
  };
}

export default connect(mapStateToProps)(App);
