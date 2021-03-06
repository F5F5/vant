"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _create = _interopRequireDefault(require("../../utils/create"));

var _skuHelper = require("../utils/skuHelper");

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      staticClass: "van-sku-row__item",
      class: {
        'van-sku-row__item--active': _vm.isChoosed,
        'van-sku-row__item--disabled': !_vm.isChoosable
      },
      on: {
        "click": _vm.onSelect
      }
    }, [_vm._v("\n  " + _vm._s(_vm.skuValue.name) + "\n")]);
  },
  name: 'sku-row-item',
  props: {
    skuEventBus: Object,
    skuValue: Object,
    skuList: Array,
    selectedSku: Object,
    skuKeyStr: String
  },
  computed: {
    isChoosed: function isChoosed() {
      return this.skuValue.id === this.selectedSku[this.skuKeyStr];
    },
    isChoosable: function isChoosable() {
      return (0, _skuHelper.isSkuChoosable)(this.skuList, this.selectedSku, {
        key: this.skuKeyStr,
        valueId: this.skuValue.id
      });
    }
  },
  methods: {
    onSelect: function onSelect() {
      if (this.isChoosable) {
        this.skuEventBus.$emit('sku:select', (0, _extends2.default)({}, this.skuValue, {
          skuKeyStr: this.skuKeyStr
        }));
      }
    }
  }
});

exports.default = _default;