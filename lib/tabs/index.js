"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _create = _interopRequireDefault(require("../utils/create"));

var _raf = require("../utils/raf");

var _event = require("../utils/event");

var _scroll = _interopRequireDefault(require("../utils/scroll"));

var _touch = _interopRequireDefault(require("../mixins/touch"));

var _default = (0, _create.default)({
  render: function render() {
    var _vm = this;

    var _h = _vm.$createElement;

    var _c = _vm._self._c || _h;

    return _c('div', {
      class: _vm.b([_vm.type])
    }, [_c('div', {
      ref: "wrap",
      class: [_vm.b('wrap', {
        scrollable: _vm.scrollable
      }), {
        'van-hairline--top-bottom': _vm.type === 'line'
      }],
      style: _vm.wrapStyle
    }, [_c('div', {
      ref: "nav",
      class: _vm.b('nav', [_vm.type]),
      style: _vm.navStyle
    }, [_vm.type === 'line' ? _c('div', {
      class: _vm.b('line'),
      style: _vm.lineStyle
    }) : _vm._e(), _vm._l(_vm.tabs, function (tab, index) {
      return _c('div', {
        ref: "tabs",
        refInFor: true,
        staticClass: "van-tab",
        class: {
          'van-tab--active': index === _vm.curActive,
          'van-tab--disabled': tab.disabled
        },
        style: _vm.getTabStyle(tab, index),
        on: {
          "click": function click($event) {
            _vm.onClick(index);
          }
        }
      }, [_c('span', {
        ref: "title",
        refInFor: true,
        staticClass: "van-ellipsis"
      }, [_vm._v("\n          " + _vm._s(tab.title) + "\n        ")])]);
    })], 2)]), _c('div', {
      ref: "content",
      class: _vm.b('content')
    }, [_c('div', {
      directives: [{
        name: "show",
        rawName: "v-show",
        value: _vm.computedWidth !== 0,
        expression: "computedWidth !== 0"
      }],
      class: _vm.b('track'),
      style: _vm.trackStyle
    }, [_vm._t("default")], 2)])]);
  },
  name: 'tabs',
  mixins: [_touch.default],
  model: {
    prop: 'active'
  },
  props: {
    color: String,
    sticky: Boolean,
    animated: Boolean,
    offsetTop: Number,
    swipeable: Boolean,
    lineWidth: {
      type: Number,
      default: null
    },
    active: {
      type: [Number, String],
      default: 0
    },
    type: {
      type: String,
      default: 'line'
    },
    duration: {
      type: Number,
      default: 0.3
    },
    swipeThreshold: {
      type: Number,
      default: 4
    }
  },
  data: function data() {
    return {
      tabs: [],
      position: '',
      curActive: null,
      lineStyle: {},
      events: {
        resize: false,
        sticky: false,
        swipeable: false
      },
      computedWidth: 0
    };
  },
  computed: {
    // whether the nav is scrollable
    scrollable: function scrollable() {
      return this.tabs.length > this.swipeThreshold;
    },
    wrapStyle: function wrapStyle() {
      switch (this.position) {
        case 'top':
          return {
            top: this.offsetTop + 'px',
            position: 'fixed'
          };

        case 'bottom':
          return {
            top: 'auto',
            bottom: 0
          };

        default:
          return null;
      }
    },
    navStyle: function navStyle() {
      return {
        borderColor: this.color
      };
    },
    trackStyle: function trackStyle() {
      var curActive = this.curActive,
          _this$computedWidth = this.computedWidth,
          computedWidth = _this$computedWidth === void 0 ? 0 : _this$computedWidth,
          tabs = this.tabs,
          animated = this.animated;
      if (!animated) return {};
      var offset = -1 * computedWidth * curActive;
      return {
        width: computedWidth * tabs.length + "px",
        transitionDuration: this.duration + "s",
        transform: "translateX(" + offset + "px)"
      };
    }
  },
  watch: {
    active: function active(val) {
      if (val !== this.curActive) {
        this.correctActive(val);
      }
    },
    color: function color() {
      this.setLine();
    },
    tabs: function tabs(_tabs) {
      this.correctActive(this.curActive || this.active);
      this.scrollIntoView();
      this.setLine();
    },
    curActive: function curActive() {
      this.scrollIntoView();
      this.setLine(); // scroll to correct position

      if (this.position === 'top' || this.position === 'bottom') {
        _scroll.default.setScrollTop(window, _scroll.default.getElementTop(this.$el));
      }
    },
    sticky: function sticky() {
      this.handlers(true);
    },
    swipeable: function swipeable() {
      this.handlers(true);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.correctActive(this.active);
    this.setLine();
    this.setWidth();
    this.$nextTick(function () {
      _this.handlers(true);

      _this.scrollIntoView(true);
    });
  },
  activated: function activated() {
    var _this2 = this;

    this.$nextTick(function () {
      _this2.handlers(true);

      _this2.scrollIntoView(true);
    });
  },
  deactivated: function deactivated() {
    this.handlers(false);
  },
  beforeDestroy: function beforeDestroy() {
    this.handlers(false);
  },
  methods: {
    setWidth: function setWidth() {
      if (this.$el) {
        var rect = this.$el.getBoundingClientRect() || {};
        this.computedWidth = rect.width;
      }
    },
    // whether to bind sticky listener
    handlers: function handlers(bind) {
      var events = this.events;
      var sticky = this.sticky && bind;
      var swipeable = this.swipeable && bind; // listen to window resize event

      if (events.resize !== bind) {
        events.resize = bind;
        (bind ? _event.on : _event.off)(window, 'resize', this.setLine, true);
      } // listen to scroll event


      if (events.sticky !== sticky) {
        events.sticky = sticky;
        this.scrollEl = this.scrollEl || _scroll.default.getScrollEventTarget(this.$el);
        (sticky ? _event.on : _event.off)(this.scrollEl, 'scroll', this.onScroll, true);
        this.onScroll();
      } // listen to touch event


      if (events.swipeable !== swipeable) {
        events.swipeable = swipeable;
        var content = this.$refs.content;
        var action = swipeable ? _event.on : _event.off;
        action(content, 'touchstart', this.touchStart);
        action(content, 'touchmove', this.touchMove);
        action(content, 'touchend', this.onTouchEnd);
        action(content, 'touchcancel', this.onTouchEnd);
      }
    },
    // watch swipe touch end
    onTouchEnd: function onTouchEnd() {
      var direction = this.direction,
          deltaX = this.deltaX,
          curActive = this.curActive;
      var minSwipeDistance = 50;
      /* istanbul ignore else */

      if (direction === 'horizontal' && this.offsetX >= minSwipeDistance) {
        /* istanbul ignore else */
        if (deltaX > 0 && curActive !== 0) {
          this.setCurActive(curActive - 1);
        } else if (deltaX < 0 && curActive !== this.tabs.length - 1) {
          this.setCurActive(curActive + 1);
        }
      }
    },
    // adjust tab position
    onScroll: function onScroll() {
      var scrollTop = _scroll.default.getScrollTop(window) + this.offsetTop;

      var elTopToPageTop = _scroll.default.getElementTop(this.$el);

      var elBottomToPageTop = elTopToPageTop + this.$el.offsetHeight - this.$refs.wrap.offsetHeight;

      if (scrollTop > elBottomToPageTop) {
        this.position = 'bottom';
      } else if (scrollTop > elTopToPageTop) {
        this.position = 'top';
      } else {
        this.position = '';
      }

      var scrollParams = {
        scrollTop: scrollTop,
        isFixed: this.position === 'top'
      };
      this.$emit('scroll', scrollParams);
    },
    // update nav bar style
    setLine: function setLine() {
      var _this3 = this;

      this.$nextTick(function () {
        var tabs = _this3.$refs.tabs;

        if (!tabs || _this3.type !== 'line') {
          return;
        }

        var tab = tabs[_this3.curActive];
        var width = _this3.isDef(_this3.lineWidth) ? _this3.lineWidth : tab.offsetWidth / 2;
        var left = tab.offsetLeft + (tab.offsetWidth - width) / 2;
        _this3.lineStyle = {
          width: width + "px",
          backgroundColor: _this3.color,
          transform: "translateX(" + left + "px)",
          transitionDuration: _this3.duration + "s"
        };
      });
    },
    // correct the value of active
    correctActive: function correctActive(active) {
      active = +active;
      var exist = this.tabs.some(function (tab) {
        return tab.index === active;
      });
      var defaultActive = (this.tabs[0] || {}).index || 0;
      this.setCurActive(exist ? active : defaultActive);
    },
    setCurActive: function setCurActive(active) {
      active = this.findAvailableTab(active, active < this.curActive);

      if (this.isDef(active) && active !== this.curActive) {
        this.$emit('input', active);

        if (this.curActive !== null) {
          this.$emit('change', active, this.tabs[active].title);
        }

        this.curActive = active;
      }
    },
    findAvailableTab: function findAvailableTab(active, reverse) {
      var diff = reverse ? -1 : 1;
      var index = active;

      while (index >= 0 && index < this.tabs.length) {
        if (!this.tabs[index].disabled) {
          return index;
        }

        index += diff;
      }
    },
    // emit event when clicked
    onClick: function onClick(index) {
      var _this$tabs$index = this.tabs[index],
          title = _this$tabs$index.title,
          disabled = _this$tabs$index.disabled;

      if (disabled) {
        this.$emit('disabled', index, title);
      } else {
        this.setCurActive(index);
        this.$emit('click', index, title);
      }
    },
    // scroll active tab into view
    scrollIntoView: function scrollIntoView(immediate) {
      var tabs = this.$refs.tabs;

      if (!this.scrollable || !tabs) {
        return;
      }

      var tab = tabs[this.curActive];
      var nav = this.$refs.nav;
      var scrollLeft = nav.scrollLeft,
          navWidth = nav.offsetWidth;
      var offsetLeft = tab.offsetLeft,
          tabWidth = tab.offsetWidth;
      this.scrollTo(nav, scrollLeft, offsetLeft - (navWidth - tabWidth) / 2, immediate);
    },
    // animate the scrollLeft of nav
    scrollTo: function scrollTo(el, from, to, immediate) {
      if (immediate) {
        el.scrollLeft += to - from;
        return;
      }

      var count = 0;
      var frames = Math.round(this.duration * 1000 / 16);

      var animate = function animate() {
        el.scrollLeft += (to - from) / frames;
        /* istanbul ignore next */

        if (++count < frames) {
          (0, _raf.raf)(animate);
        }
      };

      animate();
    },
    // render title slot of child tab
    renderTitle: function renderTitle(el, index) {
      var _this4 = this;

      this.$nextTick(function () {
        var title = _this4.$refs.title[index];
        title.parentNode.replaceChild(el, title);
      });
    },
    getTabStyle: function getTabStyle(item, index) {
      var style = {};
      var color = this.color;
      var active = index === this.curActive;
      var isCard = this.type === 'card';

      if (color) {
        if (!item.disabled && isCard && !active) {
          style.color = color;
        }

        if (!item.disabled && isCard && active) {
          style.backgroundColor = color;
        }

        if (isCard) {
          style.borderColor = color;
        }
      }

      if (this.scrollable) {
        style.flexBasis = 88 / this.swipeThreshold + '%';
      }

      return style;
    }
  }
});

exports.default = _default;