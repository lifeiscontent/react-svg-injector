import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { typeOf } from './utils';

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
          if (typeOf(value) === 'Function') {
            node[key.toLowerCase()] = value;
          } else {
            node.setAttributeNS(null, key, value);
          }
        }
      }
    }
    if (
      typeOf(nextProps.children) === 'String' &&
      nextProps.children.trim().length
    ) {
      node.innerText = nextProps.children;
    }
  }
  render() {
    return null;
  }
}
