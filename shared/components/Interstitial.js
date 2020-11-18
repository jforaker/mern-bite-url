import React from "react";
import { listen } from "./keroac";

const Tail = (props) => {
  const { lines, n, children } = props;
  return children(lines.slice(-n));
};

export default class Interstitial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
    };
  }

  componentDidMount() {
    listen((newLines) => {
      this.setState({
        lines: this.state.lines.concat(newLines),
      });
    });
  }

  componentWillUnmount() {
    clearTimeout(listen);
  }

  render() {
    return (
      <div>
        <div className="console-container">
          <Tail lines={this.state.lines} n={5}>
            {(lines) => (
              <ul>
                {lines.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            )}
          </Tail>
          <div className="console-underscore" id="console">
            &#95;
          </div>
        </div>
      </div>
    );
  }
}
