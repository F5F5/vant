/**
 * Create a basic component with common options
 */
import '../locale';
import bem from '../mixins/bem';
import i18n from '../mixins/i18n';
import { isDef } from './';

function install(Vue) {
  Vue.component(this.name, this);
}

;

function returnArray() {
  return [];
}

;

function defaultProps(props) {
  Object.keys(props).forEach(function (key) {
    if (props[key] === Array) {
      props[key] = {
        type: Array,
        default: returnArray
      };
    } else if (props[key] === Number) {
      props[key] = {
        type: Number,
        default: 0
      };
    }
  });
}

export default function (sfc) {
  sfc.name = 'van-' + sfc.name;
  sfc.install = sfc.install || install;
  sfc.mixins = sfc.mixins || [];
  sfc.mixins.push(i18n, bem);
  sfc.methods = sfc.methods || {};
  sfc.methods.isDef = isDef;
  sfc.props && defaultProps(sfc.props);
  return sfc;
}