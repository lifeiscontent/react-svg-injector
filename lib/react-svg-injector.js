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
    const { evalScripts } = this.props;
    SVGInjector(this.img, {
      evalScripts,
      each: this.callback
    });
  }
  render() {
    const { evalScripts, callback, children, ...props } = this.props;
    return [<img {...props} key={0} ref={img => (this.img = img)} />, children];
  }
  callback(svg) {
    this.setState({ svg });
    this.props.callback(svg);
  }
}
