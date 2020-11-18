import React from "react";

export default class Writer extends React.Component {
  lineToBreak(txt) {
    return txt.replace(/\n/g, "<br />");
  }

  render() {
    return <span id="writer">{this.props.text}</span>;
  }
}
