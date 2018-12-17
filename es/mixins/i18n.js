// component mixin
import { get, camelize } from '../utils';
export default {
  computed: {
    $t: function $t() {
      var name = this.$options.name;
      var prefix = name ? camelize(name) + '.' : '';

      if (!this.$vantMessages) {
        if (process.env.NODE_ENV !== 'production') {
          console.error('[Vant] Locale not correctly registered');
        }

        return function () {
          return '';
        };
      }

      var messages = this.$vantMessages[this.$vantLang];
      return function (path) {
        var message = get(messages, prefix + path) || get(messages, path);

        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        return typeof message === 'function' ? message.apply(null, args) : message;
      };
    }
  }
};