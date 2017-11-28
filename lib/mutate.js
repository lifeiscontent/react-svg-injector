import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Mutate extends Component {
  static contextTypes = {
    svg: PropTypes.object
  };
  static propTypes = {
    selector: PropTypes.string.isRequired
  };
  componentWillReceiveProps(nextProps, nextContext) {
    const { selector, ...props } = nextProps;
    if (nextContext.svg) {
      const nodeList = nextContext.svg.querySelectorAll(selector);
      for (let node of nodeList.values()) {
        for (let [key, value] of Object.entries(props)) {
          if (typeof value === 'function') {
            node[key] = value;
          } else {
            node.setAttributeNS(null, key, value);
          }
        }
      }
    }
    if (
      typeof nextProps.children === 'string' &&
      nextProps.children.trim().length
    ) {
      node.innerText = nextProps.children;
    }
  }
  render() {
    return null;
  }
}
