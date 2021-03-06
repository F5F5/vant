import create from '../utils/create';
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('cell', {
      class: _vm.b(),
      attrs: {
        "title": _vm.title || _vm.$t('title'),
        "value": _vm.value,
        "border": _vm.border,
        "is-link": _vm.editable
      },
      on: {
        "click": function click($event) {
          _vm.$emit('click');
        }
      }
    });
  },
  name: 'coupon-cell',
  model: {
    prop: 'chosenCoupon'
  },
  props: {
    title: String,
    coupons: Array,
    border: {
      type: Boolean,
      default: true
    },
    chosenCoupon: {
      type: Number,
      default: -1
    },
    editable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    value: function value() {
      var coupons = this.coupons;
      var coupon = coupons[this.chosenCoupon];

      if (coupon) {
        var value = coupon.denominations || coupon.value;
        return "-\uFFE5" + (value / 100).toFixed(2);
      }

      return coupons.length === 0 ? this.$t('tips') : this.$t('count', coupons.length);
    }
  }
});