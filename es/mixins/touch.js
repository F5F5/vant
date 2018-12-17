var MIN_DISTANCE = 10;
var inXl = location.href.indexOf('channel=xl') > -1;
var isLandscape = window.innerWidth > window.innerHeight;

function getDirection(x, y) {
  if (x > y && x > MIN_DISTANCE) {
    if (inXl && isLandscape) {
      return 'vertical';
    }

    return 'horizontal';
  }

  if (y > x && y > MIN_DISTANCE) {
    if (inXl && isLandscape) {
      return 'horizontal';
    }

    return 'vertical';
  }

  return '';
}

export default {
  data: function data() {
    return {
      direction: ''
    };
  },
  methods: {
    touchStart: function touchStart(event) {
      this.resetTouchStatus();
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    touchMove: function touchMove(event) {
      var touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || getDirection(this.offsetX, this.offsetY);
    },
    resetTouchStatus: function resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    }
  }
};