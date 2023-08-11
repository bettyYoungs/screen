import scrollist from '@/assets/images/scroll.png';
// import dayjs from 'dayjs';
export default {
  borderImageSource: scrollist,
  step: 1,
  marginBottom: 20,
  hoverStop: true,
  backgroundType: 'color',
  background: 'rgba(180, 181, 198, 0.1)',
  icon: {
    show: false,
    width: 100,
    height: 100,
    border: {
      width: 1,
      type: 'solid',
      color: '#fff',
    },
    local: 'flex-start',
    showType: 'conver',
  },
  title: {
    show: true,
    textStyle: {
      color: '#61E3FF',
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 20,
    },
  },
  subTitle: {
    show: false,
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 20,
    },
  },
  tags: {
    show: false,
    bgColor: 'red',
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 20,
    },
  },
  content: {
    show: true,
    ellipsHeight: 100,
    ellipsLine: false,
    spacing: 1,
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 25,
      fontStyle: '',
    },
  },
  time: {
    show: true,
    dayType: 'YYYY-MM-DD',
    textStyle: {
      color: '#fff',
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 20,
    },
  },

};


export const data = 	[
  {
    title: 'test标题',
    subTitle: '版本1',
    desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
    // time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    tags: '测试，美观',
  },
  {
    title: 'test标题',
    subTitle: '版本2',
    desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
    // time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    tag: '测试，美观',
  },
  {
    title: 'test标题',
    subTitle: '版本3',
    desc: '前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发,前端搬砖神器,让数据驱动视图,更加贴合企业开发',
    // time: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
    tags: '测试，美观',
  },
]
export const seriesColors = [
  ['rgba(30, 231, 231, 1)', 'rgba(30, 231, 231, 0.35)'],
  ['#1890FF', 'rgba(24, 144, 255, 0.35)'],
  ['rgba(186, 231, 255, 1)', 'rgba(186, 231, 255, 0.35)'],
  ['rgba(47, 84, 235, 1)', 'rgba(47, 84, 235, 0.35)'],
];
export const barConfig =  {
  title: {
    show: false,
  },
  legend: {
    orient: 'horizontal', // 布局方向，默认为水平布局，可选为：'horizontal' ¦ 'vertical'
    top: 'top', // 图例位置
    left: 'center', // 图例位置
    icon: 'roundRect', // 图例图形
    itemGap: 10, // 各个item之间的间距，单位px，默认为10。 横向布局时为水平间隔，纵向布局时为纵向间隔
    itemWidth: 16, // 图例图形宽度
    itemHeight: 12, // 图例图形高度
    textStyle: {
      color:'#BAE7FF',
      fontSize: 14,
      padding: 10, // 图形间距
      fontStyle: 'normal', //italic
      lineHeight: 22,
    },
    show: true,
  },
  // 图表边距
  grid: {
    width: 'auto',
    height: 'auto',
    left: 40,
    top: 50,
    right: 40,
    bottom: 30,
  },
  xAxis: {
    type: 'category', // 坐标轴类型 category  value
    show: true, // 是否显示 x 轴
    boundaryGap: true,
    position: 'bottom', // x 轴的位置（'top'，'bottom'）
    name: '',
    // 坐标轴名称显示样式
    nameTextStyle: {
      color: '#E6F7FF',
      fontSize: 14,
      fontWeight: 'normal',
      // fontFamily: FontFamily.default,
      lineHeight: 22,
      show: false,
      verticalAlign: 'top',
      paddingX: 0,
      paddingY: 0,
    },
    // 竖轴线
    splitLine: {
      show: false,
      lineStyle: {
        color: 'rgba(186, 231, 255, 0.2)',
        type: 'dashed',
        opacity: 1,
        dashOffset: 20,
      },
    },
    // 横轴文字
    axisLabel: {
      color: '#E6F7FF',
      fontSize: 14,
      fontWeight: 'normal',
      // fontFamily: FontFamily.default,
      lineHeight: 22,
      // ...xAxis.axisLabel,
      show: true,
      interval: 0, //坐标轴刻度标签的显示间隔。
      rotate: '0', // 刻度标签旋转的角度。
      branch: false,
      branchNum: '',
    },
    // X横轴底部线
    axisLine: {
      show: true, // 是否显示坐标轴轴线
      symbol: ['none', 'none'], // 轴线两端箭头，两个值，none表示没有箭头，arrow表示有箭头
      symbolSize: [10, 15], // 轴线两端箭头大小，数值一表示宽度，数值二表示高度
      lineStyle: {
        color: "#BAE7FF",
        width: 1,
      },
    },
    // 刻度线
    axisTick: {
      show: true,
      interval: 'auto',
      length: 7, //坐标轴刻度的长度
      alignWithLabel: true,
      lineStyle: {
        color: '#BAE7FF',
        width: 1,
      },
    },
  },
  yAxis: {
    type: 'value',
    show: true,
    inverse: false, //是否是反向坐标轴
    name: '',
    nameRotate: 0, //坐标轴名字旋转，角度值
    scaleShow: true, // 刻度自适应
    splitNumber: 4, //坐标轴的分割段数
    nameGap: 15, //单位上下偏移
    nameTextStyle: {
      color: '#E6F7FF',
      fontSize: 14,
      fontWeight: 'normal',
      // fontFamily: FontFamily.default,
      lineHeight: 22,
      show: false,
      verticalAlign: 'top',
      paddingX: 0,
      paddingY: 0,
    },
    // 坐标轴刻度标签的相关设置。
    axisLabel: {
      color: '#E6F7FF',
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 22,
      show: true,
      interval: 'auto', // 坐标轴刻度标签的显示间隔，在类目轴中有效。
      rotate: 0, // 刻度标签旋转的角度。
      toFixed: 0, //保留小数
    },
    // 网格线
    splitLine: {
      show: true,
      interval: 'auto', // 坐标轴分隔线的显示间隔
      lineStyle: {
        color: 'rgba(186, 231, 255, 0.2)',
        width: 1,
        type: 'dashed', //线的类型。solid、dashed、dotted
        dashOffset: 3, // 用于设置虚线的偏移量，可搭配 type 指定 dash array 实现灵活的虚线效果
      },
    },
    // 坐标轴轴线相关设置
    axisLine: {
      show: true,
      lineStyle: {
        color: '#BAE7FF',
        width: 1,
      },
    },
    // 刻度线
    axisTick: {
      show: false,
      length: 5,
      lineStyle: {
        color: '#BAE7FF',
        width: 1,
      },
    },
  },
  dataZoom: [
    {
      show: false, //为true滚动条出现
      type: 'inside', //type:'inside'，滚动条在最下面，鼠标点击滚动
      startValue: 0, // 从头开始。
      endValue: 5, //end百分比显示范围，endValue具体显示几个数值
    },
  ],
  // 数值
  label: {
    textStyle: {
      color: '#E6F7FF',
      fontSize: 14,
      fontStyle: 'normal', //italic
      lineHeight: 22,
    },
    show: true,
    position: 'top', // 位置
    offset: 4, // 偏移
    keepDecimal: 0, // 保留小数位
  },
  // 参考线
  markLine: {
    show: false,
    silent: false,
    symbol: ['none', 'none'],
    label: {
      color: '#ff0000',
      fontSize: 14,
      fontStyle: 'normal', //italic
      lineHeight: 22,
      show: true,
      position: 'start',
      paddingX: 120,
      distance: [2, 33],
      labelName: '最大值',
    },
    lineStyle: {
      color: '#ff0000',
      width: 1,
      type: 'solid',
    },
    animation: false,
    yAxisValue: 50, // 自定义值
    data: [
      {
        type: 'max',
      },
    ],
  },
  barStack: 1,
  barBgColor: 'rgba(255, 255, 255, 0.06)',
  barWidth: 0.2,
  barMaxWidth: 10,
  barMinHeight: 0,
  barGap: 0, // 多系列柱间距
  barCategoryGap: 6, // 多系列柱间距
  animation: false,
  timeInterval: 2, //滚动间隔
}