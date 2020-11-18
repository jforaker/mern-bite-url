import React from "react";

export default class Cursor extends React.Component {
  render() {
    return (
      <span
        className="cursor blinking-cursor"
        id="cursor"
        style={{
          left: this.props.cursorLeft,
          visibility: this.props.cursorVisible,
        }}
      >
        &nbsp;
      </span>
    );
  }
}
