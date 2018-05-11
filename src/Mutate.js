import React, { Component } from "react";
import PropTypes from "prop-types";
import { SvgContext } from "./ReactSvgInjector";

class Mutate extends Component {
  static propTypes = {
    selector: PropTypes.string.isRequired
  };
  render() {
    return (
      <SvgContext.Consumer>
        {state => {
          if (state.svg) {
            const { selector, ...props } = this.props;
            const nodeList = state.svg.querySelectorAll(selector);
            for (let node of nodeList.values()) {
              for (let [key, value] of Object.entries(props)) {
                if (typeof value === "function") {
                  // NOTE: covers mose cases, like onClick however I haven't tested
                  // if any other DOM elements take functions that aren't on* events
                  node[key.toLowerCase()] = value;
                } else {
                  node.setAttributeNS(null, key, value);
                }
              }
            }
          }
          return null;
        }}
      </SvgContext.Consumer>
    );
  }
}

export { Mutate };
