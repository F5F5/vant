"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _PickerColumn = _interopRequireDefault(require("./PickerColumn"));

var _deepClone = _interopRequireDefault(require("../utils/deep-clone"));

var _picker = _interopRequireDefault(require("../mixins/picker"));

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b()
    }, [_vm.showToolbar ? _c('div', {
      staticClass: "van-hairline--top-bottom",
      class: _vm.b('toolbar')
    }, [_vm._t("default", [_c('div', {
      class: _vm.b('cancel'),
      on: {
        "click": function click($event) {
          _vm.emit('cancel');
        }
      }
    }, [_vm._v("\n        " + _vm._s(_vm.cancelButtonText || _vm.$t('cancel')) + "\n      ")]), _vm.title ? _c('div', {
      staticClass: "van-ellipsis",
      class: _vm.b('title'),
      domProps: {
        "textContent": _vm._s(_vm.title)
      }
    }) : _vm._e(), _c('div', {
      class: _vm.b('confirm'),
      on: {
        "click": function click($event) {
          _vm.emit('confirm');
        }
      }
    }, [_vm._v("\n        " + _vm._s(_vm.confirmButtonText || _vm.$t('confirm')) + "\n      ")])])], 2) : _vm._e(), _vm.loading ? _c('div', {
      class: _vm.b('loading')
    }, [_c('loading')], 1) : _vm._e(), _c('div', {
      class: _vm.b('columns'),
      style: _vm.columnsStyle,
      on: {
        "touchmove": function touchmove($event) {
          $event.preventDefault();
        }
      }
    }, [_vm._l(_vm.simple ? [_vm.columns] : _vm.columns, function (item, index) {
      return _c('picker-column', {
        key: index,
        attrs: {
          "value-key": _vm.valueKey,
          "initial-options": _vm.simple ? item : item.values,
          "class-name": item.className,
          "default-index": item.defaultIndex,
          "item-height": _vm.itemHeight,
          "visible-item-count": _vm.visibleItemCount
        },
        on: {
          "change": function change($event) {
            _vm.onChange(index);
          }
        }
      });
    }), _c('div', {
      staticClass: "van-hairline--top-bottom",
      class: _vm.b('frame'),
      style: _vm.frameStyle
    })], 2)]);
  },
  name: 'picker',
  mixins: [_picker.default],
  components: {
    PickerColumn: _PickerColumn.default
  },
  props: {
    columns: Array,
    valueKey: {
      type: String,
      default: 'text'
    }
  },
  data: function data() {
    return {
      children: []
    };
  },
  computed: {
    frameStyle: function frameStyle() {
      return {
        height: this.itemHeight + 'px'
      };
    },
    columnsStyle: function columnsStyle() {
      return {
        height: this.itemHeight * this.visibleItemCount + 'px'
      };
    },
    simple: function simple() {
      return this.columns.length && !this.columns[0].values;
    }
  },
  watch: {
    columns: function columns() {
      this.setColumns();
    }
  },
  methods: {
    setColumns: function setColumns() {
      var _this = this;

      var columns = this.simple ? [{
        values: this.columns
      }] : this.columns;
      columns.forEach(function (columns, index) {
        _this.setColumnValues(index, (0, _deepClone.default)(columns.values));
      });
    },
    emit: function emit(event) {
      if (this.simple) {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit(event, this.getValues(), this.getIndexes());
      }
    },
    onChange: function onChange(columnIndex) {
      if (this.simple) {
        this.$emit('change', this, this.getColumnValue(0), this.getColumnIndex(0));
      } else {
        this.$emit('change', this, this.getValues(), columnIndex);
      }
    },
    // get column instance by index
    getColumn: function getColumn(index) {
      return this.children[index];
    },
    // get column value by index
    getColumnValue: function getColumnValue(index) {
      var column = this.getColumn(index);
      return column && column.getValue();
    },
    // set column value by index
    setColumnValue: function setColumnValue(index, value) {
      var column = this.getColumn(index);
      column && column.setValue(value);
    },
    // get column option index by column index
    getColumnIndex: function getColumnIndex(columnIndex) {
      return (this.getColumn(columnIndex) || {}).currentIndex;
    },
    // set column option index by column index
    setColumnIndex: function setColumnIndex(columnIndex, optionIndex) {
      var column = this.getColumn(columnIndex);
      column && column.setIndex(optionIndex);
    },
    // get options of column by index
    getColumnValues: function getColumnValues(index) {
      return (this.children[index] || {}).options;
    },
    // set options of column by index
    setColumnValues: function setColumnValues(index, options) {
      var column = this.children[index];

      if (column && JSON.stringify(column.options) !== JSON.stringify(options)) {
        column.options = options;
        column.setIndex(0);
      }
    },
    // get values of all columns
    getValues: function getValues() {
      return this.children.map(function (child) {
        return child.getValue();
      });
    },
    // set values of all columns
    setValues: function setValues(values) {
      var _this2 = this;

      values.forEach(function (value, index) {
        _this2.setColumnValue(index, value);
      });
    },
    // get indexes of all columns
    getIndexes: function getIndexes() {
      return this.children.map(function (child) {
        return child.currentIndex;
      });
    },
    // set indexes of all columns
    setIndexes: function setIndexes(indexes) {
      var _this3 = this;

      indexes.forEach(function (optionIndex, columnIndex) {
        _this3.setColumnIndex(columnIndex, optionIndex);
      });
    }
  }
});

exports.default = _default;