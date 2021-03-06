import create from '../utils/create';
import { RED, BLUE, GREEN, GRAY_DARK } from '../utils/color';
var COLOR_MAP = {
  danger: RED,
  primary: BLUE,
  success: GREEN
};
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('span', {
      class: [_vm.b((_obj = {
        mark: _vm.mark,
        plain: _vm.plain,
        round: _vm.round
      }, _obj[_vm.size] = _vm.size, _obj)), {
        'van-hairline--surround': _vm.plain
      }],
      style: _vm.style
    }, [_vm._t("default")], 2);

    var _obj;
  },
  name: 'tag',
  props: {
    size: String,
    type: String,
    mark: Boolean,
    color: String,
    plain: Boolean,
    round: Boolean
  },
  computed: {
    style: function style() {
      var _ref;

      var color = this.color || COLOR_MAP[this.type] || GRAY_DARK;
      var key = this.plain ? 'color' : 'backgroundColor';
      return _ref = {}, _ref[key] = color, _ref;
    }
  }
});