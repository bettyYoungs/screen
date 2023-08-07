<template>
  <div :style="wrapStyle" class="count-to">
    <span :style="[prefixStyle]" v-if="option.prefix.show">
      {{ option.prefix.text }}
    </span>
    <div :style="styleParentSize">
      <div :style="numberWrapStyle">
        <template v-if="showCount">
          <CountUp
            :style="numberStyle"
            v-for="(item, index) in number"
            :key="index"
            :start="0"
            :end="item"
            :intervals="option.number.intervals"
            :animation="option.number.animation"
            :duration="option.number.duration || 0.5"
          />
        </template>
      </div>
      <span :style="[suffixStyle]" v-if="option.suffix.show">
        {{ option.suffix.text }}
      </span>
    </div>
  </div>
</template>
<script>
  import CountUp from './flip.vue';
  import { setPx } from '@/utils/utils';
  import { default as LdataConfig } from './config';
  import optionAssign from '@/utils/useOptionAssign';
  export default {
    name: 'FlopNew',
    props: {
      option: Object,
      data: Number
    },
    components: {
      CountUp,
    },
    data() {
      return {
        active: 0,
        showCount: true,
      };
    },
    computed: {
      number() {
        let getValue;
        const { useGroup, decimal, separator } = this.option.number || {};
        let dataChart = this.data
          ? this.data + ''
          : '';
        if (!dataChart) return;
        if (dataChart.toString()) {
          const num = Number(dataChart).toFixed(decimal).toString();
          if (useGroup) {
            const numGroup = num.includes('.') ? num.split('.') : [num];
            const intFn = (numStr) =>
              numStr
                .split('')
                .reverse()
                .reduce((prev, next, index) => 
                 (index % 3 ? next : next + separator) + prev
                );
            const intNum = intFn(numGroup[0]);
            const floatNum = numGroup[1] ? '.' + numGroup[1] : '';
            getValue = (intNum + floatNum).split('');
          } else {
            getValue = dataChart.toString().split('');
          }
        }
        return getValue;
      },
      prefixStyle() {
        const { color, fontSize, lineHeight, fontWeight, fontStyle, offsetX, offsetY } =
          this.option.prefix;
        return {
          display: 'inline-block',
          color: color || '#fff',
          fontSize: setPx(fontSize || 16),
          lineHeight: setPx(lineHeight || 24),
          fontWeight: fontWeight,
          fontStyle,
          position: 'absolute',
          top: offsetY + 'px',
          left: offsetX + 'px',
        };
      },
      wrapStyle() {
        return {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
        };
      },
      numberWrapStyle() {
        const {
          widthAuto,
          color,
          fontSize,
          lineHeight,
          fontWeight,
          fontStyle,
          marginLeft,
          marginRight,
        } = this.option.number;
        return {
          flex: widthAuto ? 'auto' : 0,
          color: color || '#fff',
          fontSize: setPx(fontSize || 24),
          lineHeight: setPx(lineHeight || 32),
          fontWeight: fontWeight,
          fontStyle,
          display: 'flex',
          justifyContent: 'space-around',
          marginLeft: setPx(marginLeft),
          marginRight: setPx(marginRight),
        };
      },
      numberStyle() {
        return {
          flex: 1,
          textAlign: 'center',
          background: `url(${this.option.number.backgroundImage}) no-repeat center center`,
          backgroundSize: 'cover',
          margin: `0 ${setPx(this.option.number.space)}`,
        };
      },
      suffixStyle() {
        const { color, fontSize, fontWeight, lineHeight, fontStyle, offsetX, offsetY } =
          this.option.suffix;
        return {
          color: color || '#fff',
          fontSize: setPx(fontSize || 16),
          lineHeight: setPx(lineHeight || 24),
          fontWeight: fontWeight,
          fontStyle,
          position: 'relative',
          left: setPx(offsetX),
          top: setPx(offsetY),
        };
      },
      styleParentSize() {
        return {
          // height: '100%',
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
          // width: 100 / this.span - 1 + '%',
          marginLeft: setPx(this.option.number.offsetX),
          marginTop: setPx(this.option.number.offsetY),
        };
      },
    },

    watch: {
      number: function () {
        this.showCount = false;
        this.$nextTick(() => {
          this.showCount = true;
        });
      },
    },
    created() {
      optionAssign(this.option, LdataConfig);
    },
  };
</script>