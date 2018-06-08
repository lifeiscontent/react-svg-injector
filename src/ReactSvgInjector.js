import React from "react";
import PropTypes from "prop-types";

const isBrowser = typeof window !== "undefined";
const SVGInjector = isBrowser ? require("svg-injector") : undefined;
const SvgContext = React.createContext();

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
    SVGInjector(this.img.current, {
      evalScripts,
      each: this.callback
    });
  }
  img = React.createRef();
  render() {
    const { src, evalScripts, callback, children, ...props } = this.props;
    return (
      <SvgContext.Provider value={this.state}>
        <img data-src={src} ref={this.img} {...props} />
        {children}
      </SvgContext.Provider>
    );
  }
  callback = svg => {
    this.setState({ svg });
    this.props.callback(svg);
  };
}

export { SvgContext, ReactSvgInjector };
