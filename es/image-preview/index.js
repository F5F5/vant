import _extends from "@babel/runtime/helpers/esm/extends";
import Vue from 'vue';
import VueImagePreview from './ImagePreview';
import { isServer } from '../utils';
var instance;
var defaultConfig = {
  images: [],
  loop: true,
  value: true,
  showIndex: true,
  asyncClose: false,
  startPosition: 0,
  showIndicators: false
};

var initInstance = function initInstance() {
  instance = new (Vue.extend(VueImagePreview))({
    el: document.createElement('div')
  });
  document.body.appendChild(instance.$el);
};

var ImagePreview = function ImagePreview(images, startPosition) {
  if (startPosition === void 0) {
    startPosition = 0;
  }

  /* istanbul ignore if */
  if (isServer) {
    return;
  }

  if (!instance) {
    initInstance();
  }

  var options = Array.isArray(images) ? {
    images: images,
    startPosition: startPosition
  } : images;

  _extends(instance, _extends({}, defaultConfig, options));

  instance.$once('input', function (show) {
    instance.value = show;
  });

  if (options.onClose) {
    instance.$once('close', options.onClose);
  }

  return instance;
};

ImagePreview.install = function () {
  Vue.use(VueImagePreview);
};

export default ImagePreview;