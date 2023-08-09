<template>
	<Vue3SeamlessScroll class="imgItem es-center-bottom-scroll" :list="data" v-bind="defaultOption">
		<ul class="imgItem_box" v-for="v in 2" :key="v">
			<li class="imgItem_item" :style="styleName" v-for="(item, index) in data" :key="index">
				<div class="imgItem_left" :style="{ alignItems: option.icon.local }" v-show="option.icon.show">
					<div :style="iconWrapStyle">
						<img class="imgItem_img" :style="imgStyle" :src="item.imgUrl" alt="icon" />
					</div>
				</div>
				<div class="imgItem_right">
					<div class="imgItem_top">
						<div>
							<span class="imgItem_name" :style="titleStyle" v-show="option.title.show">{{ item.title }}</span>
							<span :style="subTitleStyle" v-show="option.subTitle.show">{{ item.subTitle }}</span>
						</div>

						<span class="imgItem_tag" v-show="option.tags.show">
							<span v-for="(citem, cindex) in optionTags(item.tags)" :key="cindex" :style="tagsStyle">{{ citem }}</span>
						</span>
					</div>
					<div class="imgItem_content" :style="contentStyle" v-show="option.content.show">
						{{ item.desc }}
					</div>
					<!-- <div class="imgItem_time" :style="timeStyle" v-show="option.time.show">{{
						setDayJs(item.time).format(option.time.dayType)
					}}</div> -->
				</div>
			</li>
		</ul>
	</Vue3SeamlessScroll>
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import { Vue3SeamlessScroll } from 'vue3-seamless-scroll';

const props = defineProps(['option', 'component', 'data'])
const getTextStyle = (obj) => {
	return {
		color: obj.color,
		fontSize: obj.fontSize + 'px',
		fontFamily: obj.fontFamily,
		fontWeight: obj.fontWeight,
		lineHeight: obj.lineHeight + 'px',
		fontStyle: obj.fontStyle,
	};
}

const iconWrapStyle = computed(() => {
	let {
		icon,
		icon: { border },
	} = props.option;
	return {
		width: icon.width + 'px',
		height: icon.height + 'px',
		border: `${border.width}px ${border.type} ${border.color}`,
		flexShrink: '0',
	};
})

const imgStyle = computed(() => {
	let { icon } = props.option;
	let { showType } = icon;
	let obj = {};
	switch (showType) {
		case 'contain':
			obj = { objectFit: 'contain' }
			break;
		case 'conver':
			obj = {
				width: '100%',
				height: '100%',
			};
			break;
		default:
			obj = {
				width: 'auto',
				height: 'auto',
			};
	}
	return obj;
})

const scrollStyle = computed(() => {
	return {
		width: props.component.width + 'px',
		height: props.component.height + 'px',
		overflow: 'hidden',
	};
})

const styleName = computed(() => {
	return {
		marginBottom: (props.option.marginBottom || 20) + 'px',
		borderImageSource: 'url(' + props.option.borderImageSource + ')',
		backgroundColor: props.option.background,
	};
})

const defaultOption = computed(() => {
	return {
		// direction: 'vertical',
		// gap: 10,
		// duration: 2,
		step: props.option.step, // 数值越大速度滚动越快
		limitScrollNum: props.data.length,
		hover: props.option.hoverStop, // 是否开启鼠标悬停stop
		direction: 'up', // up，down，left，right
		isWatch: true, // 开启数据实时监控刷新dom
		singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
		singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
		singleWaitTime: 1000, // 单步运动停止的时间(默认值1000ms)
	};
})

const titleStyle = computed(() => {
	return getTextStyle(props.option.title.textStyle);
})

const subTitleStyle = computed(() => {
	let style = getTextStyle(props.option.subTitle.textStyle);
	return { ...style, marginLeft: '10px' };
})
const tagsStyle = computed(() => {
	return {
		...getTextStyle(props.option.tags.textStyle),
		backgroundColor: props.option.tags.bgColor,
	};
})

const contentStyle = computed(() => {
	let style = getTextStyle(props.option.content.textStyle);
	let obj = {};
	if (props.option.content.ellipsLine) {
		obj = {
			height: props.option.content.ellipsHeight + 'px',
			overflowY: 'scroll',
		};
	} else {
		obj = {};
	}
	return { ...style, ...obj, letterSpacing: props.option.content.spacing + 'px' };
})

const timeStyle = computed(() => {
	return getTextStyle(props.option.time.textStyle);
})

const optionTags = (tag) => {
	let tagArr = [];
	if (tag) {
		tagArr = tag.split(/,|，/);
	}
	return tagArr;
}
</script>

<style lang='scss' scoped>
.es-center-bottom-scroll {
	position: relative;
	width: 100%;
	overflow: hidden;
	height: 150px;

	.es-bottom-item {
		position: absolute;
		top: 0;
		left: 0;
		width: 170px;
		height: 150px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: var(--es-block-bg);
		font-size: 22px;
		font-weight: 600;

		.es-item-text {
			margin-top: 16px;
		}
	}
}

.imgItem {
	width: 100%;
	height: 100%;
	overflow: hidden;

	&_box {
		box-sizing: border-box;
		padding: 0 30px;
	}

	&_item {
		list-style: none;
		padding: 15px 25px;
		display: flex;
		font-size: 14px;
		color: #fff;
		border-radius: 3px;
		background-color: rgba(180, 181, 198, 0.1);
		background-clip: padding-box;
		opacity: 1;
		filter: blur(0px);
		// border-image-source: url(@/assetsimg/border/border1.png);
		border-image-slice: 10 16 15 10 fill;
		border-width: 10px 16px 15px 10px;
		border-style: solid;
		box-sizing: border-box;

		&:last-child {
			margin-bottom: 0;
		}
	}

	&_left {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	&_img {
		width: 100%;
		height: 100%;
	}

	&_right {
		padding-left: 20px;
	}

	&_top {
		margin-bottom: 10px;
		display: flex;
		justify-content: space-between;
		position: relative;
	}

	&_tag {
		span {
			position: relative;
			padding: 2px 10px 2px 10px;
			font-size: 10px;
			margin-left: 10px;
		}
	}

	&_content {
		line-height: 25px;
		overflow: hidden;
		text-indent: 2em;
	}

	&_name {
		display: inline-block;
		color: #73fbf9;
		font-weight: bold;
	}

	&_time {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
