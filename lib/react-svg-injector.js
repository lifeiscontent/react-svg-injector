import ReactDOM from 'react-dom';
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const isBrowser = typeof window !== 'undefined';
const SVGInjector = isBrowser ? require('svg-injector') : undefined;

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
    SVGInjector(this.img, {
      evalScripts,
      each: this.callback
    });
  }
  render() {
    const { src, evalScripts, callback, children, ...props } = this.props;
    return (
      <Fragment>
        <img data-src={src} {...props} ref={img => (this.img = img)} />
        {children}
      </Fragment>
    );
  }
  callback(svg) {
    this.setState({ svg });
    this.props.callback(svg);
  }
}
