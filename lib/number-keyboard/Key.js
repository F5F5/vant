"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('i', {
      class: ['van-hairline', _vm.className],
      domProps: {
        "textContent": _vm._s(_vm.text)
      },
      on: {
        "touchstart": function touchstart($event) {
          $event.stopPropagation();
          $event.preventDefault();
          return _vm.onFocus($event);
        },
        "touchmove": _vm.onBlur,
        "touchend": _vm.onBlur,
        "touchcancel": _vm.onBlur
      }
    });
  },
  name: 'key',
  props: {
    type: Array,
    text: [String, Number]
  },
  data: function data() {
    return {
      active: false
    };
  },
  computed: {
    className: function className() {
      var types = this.type.slice(0);
      this.active && types.push('active');
      return this.b(types);
    }
  },
  methods: {
    onFocus: function onFocus() {
      this.active = true;
      this.$emit('press', this.text);
    },
    onBlur: function onBlur() {
      this.active = false;
    }
  }
});

exports.default = _default;