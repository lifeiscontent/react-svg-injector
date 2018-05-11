"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactSvgInjector = exports.SvgContext = void 0;

var _reactDom = _interopRequireDefault(require("react-dom"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } _setPrototypeOf(subClass.prototype, superClass && superClass.prototype); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.getPrototypeOf || function _getPrototypeOf(o) { return o.__proto__; }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isBrowser = typeof window !== "undefined";
var SVGInjector = isBrowser ? require("svg-injector") : undefined;

var SvgContext = _react.default.createContext();

exports.SvgContext = SvgContext;

var ReactSvgInjector =
/*#__PURE__*/
function (_React$Component) {
  function ReactSvgInjector() {
    var _getPrototypeOf2;

    var _temp, _this;

    _classCallCheck(this, ReactSvgInjector);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _possibleConstructorReturn(_this, (_temp = _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ReactSvgInjector)).call.apply(_getPrototypeOf2, [this].concat(args))), _defineProperty(_defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", {
      svg: null
    }), "callback", function (svg) {
      _this.setState({
        svg: svg
      });

      _this.props.callback(svg);
    }), _temp));
  }

  _createClass(ReactSvgInjector, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var evalScripts = this.props.evalScripts;
      SVGInjector(this.img, {
        evalScripts: evalScripts,
        each: this.callback
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          src = _this$props.src,
          evalScripts = _this$props.evalScripts,
          callback = _this$props.callback,
          children = _this$props.children,
          props = _objectWithoutProperties(_this$props, ["src", "evalScripts", "callback", "children"]);

      return _react.default.createElement(SvgContext.Provider, {
        value: this.state
      }, _react.default.createElement("img", _extends({
        "data-src": src,
        ref: function ref(img) {
          return _this2.img = img;
        }
      }, props)), children);
    }
  }]);

  _inherits(ReactSvgInjector, _React$Component);

  return ReactSvgInjector;
}(_react.default.Component);

exports.ReactSvgInjector = ReactSvgInjector;

_defineProperty(_defineProperty(ReactSvgInjector, "defaultProps", {
  evalScripts: "once",
  callback: function callback() {}
}), "propTypes", {
  src: _propTypes.default.string,
  callback: _propTypes.default.func,
  evalScripts: _propTypes.default.oneOf(["always", "once", "never"])
});