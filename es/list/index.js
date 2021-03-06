import create from '../utils/create';
import utils from '../utils/scroll';
import { on, off } from '../utils/event';
export default create({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b()
    }, [_vm._t("default"), _vm.loading ? _c('div', {
      class: _vm.b('loading')
    }, [_vm._t("loading", [_c('loading', {
      class: _vm.b('loading-icon')
    }), _c('span', {
      class: _vm.b('loading-text')
    }, [_vm._v(_vm._s(_vm.loadingText || _vm.$t('loadingTip')))])])], 2) : _vm._e(), _vm.finished && _vm.finishedText ? _c('div', {
      class: _vm.b('finished-text')
    }, [_vm._v("\n    " + _vm._s(_vm.finishedText) + "\n  ")]) : _vm._e()], 2);
  },
  name: 'list',
  model: {
    prop: 'loading'
  },
  props: {
    loading: Boolean,
    finished: Boolean,
    loadingText: String,
    finishedText: String,
    immediateCheck: {
      type: Boolean,
      default: true
    },
    offset: {
      type: Number,
      default: 300
    }
  },
  mounted: function mounted() {
    this.scroller = utils.getScrollEventTarget(this.$el);
    this.handler(true);

    if (this.immediateCheck) {
      this.$nextTick(this.check);
    }
  },
  destroyed: function destroyed() {
    this.handler(false);
  },
  activated: function activated() {
    this.handler(true);
  },
  deactivated: function deactivated() {
    this.handler(false);
  },
  watch: {
    loading: function loading() {
      this.$nextTick(this.check);
    },
    finished: function finished() {
      this.$nextTick(this.check);
    }
  },
  methods: {
    check: function check() {
      if (this.loading || this.finished) {
        return;
      }

      var el = this.$el;
      var scroller = this.scroller;
      var scrollerHeight = utils.getVisibleHeight(scroller);
      /* istanbul ignore next */

      if (!scrollerHeight || utils.getComputedStyle(el).display === 'none' || el.offsetParent === null) {
        return;
      }

      var scrollTop = utils.getScrollTop(scroller);
      var targetBottom = scrollTop + scrollerHeight;
      var reachBottom = false;
      /* istanbul ignore next */

      if (el === scroller) {
        reachBottom = scroller.scrollHeight - targetBottom < this.offset;
      } else {
        var elBottom = utils.getElementTop(el) - utils.getElementTop(scroller) + utils.getVisibleHeight(el);
        reachBottom = elBottom - scrollerHeight < this.offset;
      }
      /* istanbul ignore else */


      if (reachBottom) {
        this.$emit('input', true);
        this.$emit('load');
      }
    },
    handler: function handler(bind) {
      /* istanbul ignore else */
      if (this.binded !== bind) {
        this.binded = bind;
        (bind ? on : off)(this.scroller, 'scroll', this.check);
      }
    }
  }
});