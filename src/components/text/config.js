import baseTitle from '@/assets/images/left-top.png';
export default {
  label: '文本框',
  option: {
    title: '文本框',
    name: '文本框',
    icon: 'icon-text',
    img: baseTitle,
    dataType: 0,
    dataFormatter: '',
    stylesFormatter: '',
    child: {
      index: [],
      paramName: '',
    },
    data: [
      {
        value: '这是一个文本框',
      },
    ],
    component: {
      width: 235,
      height: 45,
      name: 'text',
      prop: 'text',
    },
    option: {
      textAlign: 'center',
      fontSize: 26,
      color: '#fffffe',
      backgroundColor: 'rgba(0, 255, 255, 0)',
      fontOpacity: 100,
      split: 0,
      lineHeight: 30,
      shadowShow: true,
      fillType: 'pure',
      colorData: {
        colorStops: [
          { color: '#02B0F9', offset: 0 },
          { color: '#02B0F9', offset: 1 },
        ],
        angle: 50,
      },
      shadow: [
        {
          shadowX: 0,
          shadowY: 0,
          blur: 8,
          color: '#0075FF',
        },
      ],
    },
  },
};
