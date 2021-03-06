"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = _default;

require("../locale");

var _bem = _interopRequireDefault(require("../mixins/bem"));

var _i18n = _interopRequireDefault(require("../mixins/i18n"));

var _ = require("./");

/**
 * Create a basic component with common options
 */
function install(Vue) {
  Vue.component(this.name, this);
}

;

function returnArray() {
  return [];
}

;

function defaultProps(props) {
  Object.keys(props).forEach(function (key) {
    if (props[key] === Array) {
      props[key] = {
        type: Array,
        default: returnArray
      };
    } else if (props[key] === Number) {
      props[key] = {
        type: Number,
        default: 0
      };
    }
  });
}

function _default(sfc) {
  sfc.name = 'van-' + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(_i18n.default, _bem.default);
  sfc.methods = sfc.methods || {};
  sfc.methods.isDef = _.isDef;
  sfc.props && defaultProps(sfc.props);
  return sfc;
}