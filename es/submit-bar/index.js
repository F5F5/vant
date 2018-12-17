import VanButton from '../button';
import create from '../utils/create';
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b()
    }, [_vm._t("top"), _vm.tip || _vm.$slots.tip ? _c('div', {
      class: _vm.b('tip')
    }, [_vm._v("\n    " + _vm._s(_vm.tip)), _vm._t("tip")], 2) : _vm._e(), _c('div', {
      class: _vm.b('bar')
    }, [_vm._t("default"), _c('div', {
      class: _vm.b('text')
    }, [_vm.hasPrice ? [_c('span', [_vm._v(_vm._s(_vm.label || _vm.$t('label')))]), _c('span', {
      class: _vm.b('price')
    }, [_vm._v(_vm._s(_vm.currency) + " " + _vm._s(_vm._f("format")(_vm.price)))])] : _vm._e()], 2), _c('van-button', {
      attrs: {
        "square": "",
        "size": "large",
        "type": _vm.buttonType,
        "disabled": _vm.disabled,
        "loading": _vm.loading
      },
      on: {
        "click": function click($event) {
          _vm.$emit('submit');
        }
      }
    }, [_vm._v("\n      " + _vm._s(_vm.loading ? '' : _vm.buttonText) + "\n    ")])], 2)], 2);
  },
  name: 'submit-bar',
  components: {
    VanButton: VanButton
  },
  props: {
    tip: String,
    price: Number,
    label: String,
    loading: Boolean,
    disabled: Boolean,
    buttonText: String,
    currency: {
      type: String,
      default: '¥'
    },
    buttonType: {
      type: String,
      default: 'danger'
    }
  },
  computed: {
    hasPrice: function hasPrice() {
      return typeof this.price === 'number';
    }
  },
  filters: {
    format: function format(price) {
      return (price / 100).toFixed(2);
    }
  }
});