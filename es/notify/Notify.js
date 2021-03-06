import Popup from '../mixins/popup';
import create from '../utils/create';
import { RED, WHITE } from '../utils/color';
export default create({
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
  mixins: [Popup],
  props: {
    message: [String, Number],
    color: {
      type: String,
      value: WHITE
    },
    background: {
      type: String,
      value: RED
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