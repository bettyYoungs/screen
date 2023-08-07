<template>
  <div ref="main" class="custom-text">
    <div ref="box" :style="{ backgroundColor: option.backgroundColor }">
      <a ref="text" :class="['text', option.fillType === 'gradient' ? 'text-gradient' : '']" :href="linkHref"
        :style="[styleName, styleSizeName]" :target="linkTarget">
        <span v-if="textValue">
          {{ textValue }}
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { default as LdataConfig } from './config';
import optionAssign from '@/utils/useOptionAssign';
import { setPx } from '@/utils/utils';
import { orderBy } from 'lodash';
export default {
  name: 'CustomText',
  data() {
    return {
      check: '',
      newLeft: 0,
      width: 235,
      height: 45,
    };
  },
  computed: {
    styleSizeName() {
      return Object.assign(
        {
          width: setPx(this.width),
          height: setPx(this.height),
        },
      );
    },
    scroll() {
      return this.option.scroll || false
    },
    linkHref() {
      return this.option.linkHref || 'javascript:;';
    },
    linkTarget() {
      return this.option.linkTarget || '_self';
    },
    step() {
      return this.option.step || 5;
    },
    speed() {
      return this.option.speed || 100;
    },
    lineHeight() {
      // 避免文字重叠，行高不能字体大小。未设置行高或为0时，默认40
      return this.option.lineHeight
        ? this.option.lineHeight > this.option.fontSize
          ? this.option.lineHeight
          : this.option.fontSize
        : 40;
    },
    fontSize() {
      return this.option.fontSize || 30;
    },
    split() {
      return this.option.split;
    },
    textWidth() {
      const textLen = (this.dataChart?.value || '').length;
      return textLen * this.fontSize;
    },

    textColor() {
      let style = {};
      if (this.option.fillType === 'gradient') {
        const gradient = this.option.colorData || {
          colorStops: [
            { color: '#02B0F9', offset: 0 },
            { color: '#02B0F9', offset: 1 },
          ],
          angle: 50,
        };
        const colorString = [];
        orderBy(gradient.colorStops, 'offset', 'asc').forEach((it) =>
          colorString.push(`${it?.color} ${(it.offset ?? 1) * 100}%`),
        );
        const string = colorString.join(',') || '';
        style = {
          backgroundImage: `linear-gradient(${gradient.angle}deg, ${string})`,
        };
      } else {
        style.color = this.option.color;
      }
      return style;
    },
    styleName() {
      const alignMap = {
        left: 'flex-start',
        center: 'center',
        right: 'flex-end',
      };
      let style = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: alignMap[this.option.textAlign],
        width: this.scroll ? setPx(this.textWidth) : 'auto',
        transform: 'translateX(' + this.newLeft + 'px)',
        letterSpacing: setPx(this.split),
        textIndent: setPx(this.split),
        fontWeight: this.option.fontWeight || 'normal',
        fontSize: this.fontSize + 'px',
        lineHeight: this.lineHeight + 'px',
        opacity: this.option.fontOpacity / 100,
        fontStyle: this.option.italic || 'normal',
      };
      let textShadow = '';
      const shadowShow = !this.option.shadowShow ? this.option.shadowShow : true;
      const shadow = this.option.shadow || [
        {
          shadowX: 0,
          shadowY: 0,
          blur: 8,
          color: '#0075FF',
        },
      ];
      if (shadowShow) {
        for (let i = 0; i < shadow.length; i++) {
          const item = shadow[i];
          textShadow += `${item.color} ${item.shadowX}px ${item.shadowY}px ${item.blur}px,`;
        }
        textShadow = textShadow.substring(0, textShadow.lastIndexOf(','));
        style.textShadow = textShadow;
      }

      return {
        ...style,
        ...this.textColor,
      };
    },
  },
  watch: {
    scroll() {
      this.move();
    },
    speed() {
      this.move();
    },
    width() {
      this.move();
    },
  },
  created() {
    optionAssign(this.option, LdataConfig);
  },
  mounted() {
    this.move();
  },
  beforeDestroy() {
    this.check && clearInterval(this.check);
  },
  methods: {
    move() {
      clearInterval(this.check);
      const offsetLeft =
        this.option.textAlign === 'left'
          ? 0
          : this.option.textAlign === 'center'
            ? (this.width - this.textWidth) / 2
            : this.width - this.textWidth;
      this.newLeft = 0;
      if (this.scroll) {
        this.check = setInterval(() => {
          if (this.option.textAlign === 'left') {
            if (this.newLeft < -this.textWidth) {
              this.newLeft = this.width;
            }
            this.newLeft = this.newLeft - this.step;
          } else if (this.option.textAlign === 'center') {
            if (this.newLeft < -(this.textWidth + offsetLeft)) {
              this.newLeft = this.width - offsetLeft;
            }
            this.newLeft = this.newLeft - this.step;
          } else if (this.option.textAlign === 'right') {
            if (this.newLeft < -this.width) {
              this.newLeft = this.textWidth;
            }
            this.newLeft = this.newLeft - this.step;
          }
        }, this.speed);
      } else {
        this.newLeft = 0;
      }
    },
  },
  props: {
    textValue: String,
    option: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.custom-text {
  margin-bottom: 20px;
}

.text-gradient {
  -webkit-background-clip: text;
  background-clip: text;
  /*设置元素的背景（背景图片或颜色）延伸范围 */
  color: transparent;
}
</style>
