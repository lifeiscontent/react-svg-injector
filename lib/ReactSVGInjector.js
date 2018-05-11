import ReactDOM from "react-dom";
import React from "react";
import PropTypes from "prop-types";

const isBrowser = typeof window !== "undefined";
const SVGInjector = isBrowser ? require("svg-injector") : undefined;
const SVGContext = React.createContext();

class ReactSvgInjector extends React.Component {
  static defaultProps = {
    evalScripts: "once",
    callback: () => {}
  };
  static propTypes = {
    src: PropTypes.string,
    callback: PropTypes.func,
    evalScripts: PropTypes.oneOf(["always", "once", "never"])
  };
  state = {
    svg: null
  };
  componentDidMount() {
    const { evalScripts } = this.props;
    SVGInjector(this.img, {
      evalScripts,
      each: this.callback
    });
  }
  render() {
    const { src, evalScripts, callback, children, ...props } = this.props;
    return (
      <SVGContext.Provider value={this.state}>
        <img data-src={src} ref={img => (this.img = img)} {...props} />
        {children}
      </SVGContext.Provider>
    );
  }
  callback = svg => {
    this.setState({ svg });
    this.props.callback(svg);
  };
}

export { SVGContext, ReactSvgInjector };
