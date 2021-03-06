import create from '../utils/create';
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b(),
      on: {
        "touchmove": _vm.onTouchMove
      }
    }, _vm._l(_vm.list, function (full, index) {
      return _c('icon', {
        key: index,
        class: _vm.b('item'),
        attrs: {
          "size": _vm.size + 'px',
          "data-index": index,
          "name": full ? _vm.icon : _vm.voidIcon,
          "color": _vm.disabled ? _vm.disabledColor : full ? _vm.color : _vm.voidColor
        },
        on: {
          "click": function click($event) {
            _vm.onSelect(index);
          }
        }
      });
    }));
  },
  name: 'rate',
  props: {
    value: Number,
    readonly: Boolean,
    disabled: Boolean,
    size: {
      type: Number,
      default: 20
    },
    icon: {
      type: String,
      default: 'star'
    },
    voidIcon: {
      type: String,
      default: 'star-o'
    },
    color: {
      type: String,
      default: '#ffd21e'
    },
    voidColor: {
      type: String,
      default: '#c7c7c7'
    },
    disabledColor: {
      type: String,
      default: '#bdbdbd'
    },
    count: {
      type: Number,
      default: 5
    }
  },
  computed: {
    list: function list() {
      var _this = this;

      return Array.apply(null, {
        length: this.count
      }).map(function (value, index) {
        return index < _this.value;
      });
    }
  },
  methods: {
    onSelect: function onSelect(index) {
      if (!this.disabled && !this.readonly) {
        this.$emit('input', index + 1);
        this.$emit('change', index + 1);
      }
    },
    onTouchMove: function onTouchMove(event) {
      if (!document.elementFromPoint) {
        return;
      }

      event.preventDefault();
      var _event$touches$ = event.touches[0],
          clientX = _event$touches$.clientX,
          clientY = _event$touches$.clientY;
      var target = document.elementFromPoint(clientX, clientY);

      if (target && target.dataset) {
        var index = target.dataset.index;
        /* istanbul ignore else */

        if (index) {
          this.onSelect(+index);
        }
      }
    }
  }
});