import React from "react";

export function urlValidator(val) {
  //borrowed from https://gist.github.com/dperini/729294

  const re_weburl = new RegExp(
    "^" +
      // protocol identifier
      "(?:(?:https?|ftp)://)" +
      // user:pass authentication
      "(?:\\S+(?::\\S*)?@)?" +
      "(?:" +
      // IP address exclusion
      // private & local networks
      "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
      "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
      "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
      // IP address dotted notation octets
      // excludes loopback network 0.0.0.0
      // excludes reserved space >= 224.0.0.0
      // excludes network & broacast addresses
      // (first & last IP address of each class)
      "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
      "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
      "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
      "|" +
      // host name
      "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
      // domain name
      "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
      // TLD identifier
      "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
      // TLD may end with dot
      "\\.?" +
      ")" +
      // port number
      "(?::\\d{2,5})?" +
      // resource path
      "(?:[/?#]\\S*)?" +
      "$",
    "i"
  );

  return re_weburl.exec(val);
}

export default class Validator extends React.Component {
  constructor(props) {
    super(props);
    this.validate = this.validate.bind(this);
    this.state = {
      valid: false,
      validText: "",
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.validate(nextProps.text);
    }
  }

  validate(val) {
    const isValid = urlValidator(val);
    const reText = (str) => {
      if (!isValid) this.setState({ validText: str });
    };

    if (isValid) {
      this.setState({
        valid: true,
        validText: "yep",
      });
      this.props.setValid(true);
    } else {
      this.props.setValid(false);
    }

    if (val.length < 5) reText("");
    if (val.length > 5) reText("nope");
    if (val.length > 15) reText("keep trying");
    if (val.length > 25) reText("maybe you need a W3C refresher course?");
  }

  render() {
    return (
      <div>
        <div className="err" style={{ color: "red" }}>
          {this.state.validText}
        </div>
      </div>
    );
  }
}
