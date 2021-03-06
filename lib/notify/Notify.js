"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _popup = _interopRequireDefault(require("../mixins/popup"));

var _create = _interopRequireDefault(require("../utils/create"));

var _color = require("../utils/color");

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('transition', {
      attrs: {
        "name": "van-slide-down"
      }
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.value,
        expression: "value"
      }],
      class: _vm.b(),
      style: _vm.style
    }, [_vm._v("\n    " + _vm._s(_vm.message) + "\n  ")])]);
  },
  name: 'notify',
  mixins: [_popup.default],
  props: {
    message: [String, Number],
    color: {
      type: String,
      value: _color.WHITE
    },
    background: {
      type: String,
      value: _color.RED
    },
    duration: {
      type: Number,
      value: 3000
    },
    lockScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style: function style() {
      return {
        color: this.color,
        background: this.background
      };
    }
  }
});

exports.default = _default;