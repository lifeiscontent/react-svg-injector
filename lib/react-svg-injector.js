import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SVGInjector from 'svg-injector';

export default class ReactSVGInjector extends Component {
  static defaultProps = {
    evalScripts: 'once',
    callback: () => {}
  };
  static propTypes = {
    callback: PropTypes.func,
    evalScripts: PropTypes.oneOf(['always', 'once', 'never'])
  };
  static childContextTypes = {
    svg: PropTypes.object
  };
  state = {
    svg: null
  };
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }
  getChildContext() {
    return {
      svg: this.state.svg
    };
  }
  componentDidMount() {
    const { evalScripts, callback, children, ...props } = this.props;
    const container = document.createElement('div');
    const img = document.createElement('img');
    container.appendChild(img);
    Object.entries(props).reduce((img, [key, value]) => {
      img.setAttribute(key, value);
      return img;
    }, img);
    SVGInjector(img, {
      evalScripts,
      each: this.callback
    });
  }
  render() {
    const { src, evalScripts, callback, children, ...props } = this.props;
    return <svg {...props}>{children}</svg>;
  }
  callback(svgNode) {
    const svg = ReactDOM.findDOMNode(this);
    for (let attr of Object.values(svgNode.attributes)) {
      const attr2 = svg.attributes.getNamedItemNS(
        attr.namespaceURI,
        attr.name
      ) || { value: null };
      if (!(attr2.value === attr.value)) {
        svg.setAttributeNS(
          attr.namespaceURI,
          attr.name,
          [attr2.value, attr.value].filter(x => x).join(' ')
        );
      }
    }
    svg.innerHTML = svgNode.innerHTML;
    this.setState({ svg });
    this.props.callback(svg);
  }
}
