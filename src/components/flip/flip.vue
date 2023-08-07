<template>
  <span>{{ end }}</span>
</template>

<script>
  import CountUp from 'countup';
  export default {
    name: 'CountUp',
    props: {
      animation: {
        type: Boolean,
        default: false,
      },
      start: {
        type: Number,
        required: false,
        default: 0,
      },
      end: {
        required: true,
      },
      decimals: {
        type: Number,
        required: false,
        default: 0,
      },
      duration: {
        type: Number,
        required: false,
        default: 2,
      },
      intervals: {
        type: Number,
        required: false,
        default: 10,
      },
      options: {
        type: Object,
        required: false,
        default() {
          return {};
        },
      },
      callback: {
        type: Function,
        required: false,
        default: () => {},
      },
    },
    data() {
      return {
        c: null,
        timer: null,
        outTimer: null,
      };
    },
    watch: {
      decimals() {
        if (this.c && this.c.update) {
          this.c.update(this.end);
        }
      },
      end(value) {
        if (this.c && this.c.update) {
          this.c.update(value);
        }
      },
      intervals(value) {
        this.timeChage(value * 1000);
      },
      animation(value) {
        this.timeChage(this.intervals * 1000);
      },
    },
    mounted() {
      // if (this.animation) {
      this.init();
      // }
      this.outTimer = setTimeout(() => {
        this.timeChage(this.intervals * 1000, true);
      }, 2000);
    },
    beforeUnmount() {
      this.destroy();
      clearInterval(this.timer);
      clearTimeout(this.outTimer);
    },
    methods: {
      timeChage(time, isFirstLoad) {
        if (!this.animation) {
          return this.timer && clearInterval(this.timer);
        }
        if (this.timer || !this.intervals) {
          clearInterval(this.timer);
          if (!this.intervals) {
            return;
          }
        }
        this.timer = setInterval(() => {
          if (this.c && this.c.reset) {
            this.c.reset();
          }
          if (this.c && this.c.update) {
            this.c.update(this.end);
          }
        }, time);
      },
      init() {
        if (!this.c) {
          this.c = new CountUp(
            this.$el,
            this.start,
            this.end,
            this.decimals,
            this.duration,
            this.options,
          );
          this.c.start();
        }
      },
      pauseResume() {
        if (this.c && this.c.pauseResume) {
          this.c.pauseResume();
        }
      },
      reset() {
        if (this.c && this.c.reset) {
          this.c.reset();
        }
      },
      update(newEndVal) {
        if (this.c && this.c.update) {
          this.c.update(newEndVal);
        }
      },
      destroy() {
        this.c = null;
      },
    },
  };
</script>
