<template>
	<div class="es-center">
		<div class="es-center-top">
			<Map />
		</div>
		<div class="es-center-bottom">
			<img src="@/assets/images/left-2.png" class="es-center-bottom-img" />
			<div class="es-center-bottom-item-chart">
				<Title>API调用量</Title>
				<Chart :option="option" />
			</div>
			<div class="es-center-bottom-item-scroll">
				<Bottom :option="scrollListOption" :data="scrollData" :component="component" />
			</div>
		</div>
		<!-- <AMap /> -->
	</div>
</template>

<script setup lang='ts'>
// import AMap from './AMap.vue'
import Title from '../Title.vue'
import Map from './Map.vue'
import Chart from '@/components/chart/Chart.vue'
import Bottom from './Bottom.vue'
import { default as scrollOption, data, barConfig, seriesColors } from './bottomConfig.js'
import { ref } from 'vue'
const option = ref({
	...barConfig,
	series: getSeries(barConfig)
})
function getSeries(config) {
	const series = [
		{
			title: '系列1',
			name: '系列一',
			showName: '系列一',
			type: 'bar',
			showBackground: true,
			backgroundStyle: {},
			itemStyle: {
				fillType: 1,
				url: '/src/assets/images/barTexture.png',
				isCircle: false, // 是否是子弹头
				borderRadius: [0, 0, 0, 0],
				color: {
					type: 'linear',
					x: 1,
					y: 1,
					x2: 0,
					y2: 0,
					colorStops: [
						{ offset: 0, color: seriesColors[0][0] },
						{ offset: 1, color: seriesColors[0][1] },
					],
					global: false, // 缺省为 false
					angle: 0,
				},
				borderColor: '#E6F7FF',
				borderWidth: 0,
				isDashed: false, // 描边是否是虚线
				borderType: 'solid',
			},
			extremeHighlights: {
				// 极值高亮
				show: false,
				type: 'max',
				color: {
					type: 'linear',
					x: 1,
					y: 1,
					x2: 0,
					y2: 0,
					colorStops: [
						{
							offset: 0,
							color: '#ff0000', // 0% 处的颜色
						},
						{
							offset: 1,
							color: '#ff0000', // 100% 处的颜色
						},
					],
					global: false, // 缺省为 false
					angle: 0,
				},
			},
		},
		{
			title: '系列2',
			name: '系列二',
			showName: '系列二',
			type: 'bar',
			showBackground: true,
			backgroundStyle: {},
			itemStyle: {
				fillType: 1,
				url: '/src/assets/images/barTexture.png',
				isCircle: false, // 是否是子弹头
				borderRadius: [0, 0, 0, 0],
				color: {
					type: 'linear',
					x: 1,
					y: 1,
					x2: 0,
					y2: 0,
					colorStops: [
						{ offset: 0, color: seriesColors[1][0] },
						{ offset: 1, color: seriesColors[1][1] },
					],
					global: false, // 缺省为 false
					angle: 0,
				},
				borderColor: '#E6F7FF',
				borderWidth: 0,
				isDashed: false, // 描边是否是虚线
				borderType: 'solid',
			},
			extremeHighlights: {
				// 极值高亮
				show: false,
				type: 'max',
				color: {
					type: 'linear',
					x: 1,
					y: 1,
					x2: 0,
					y2: 0,
					colorStops: [
						{ offset: 0, color: '#ff0000' },
						{ offset: 1, color: '#ff0000' },
					],
					global: false, // 缺省为 false
					angle: 0,
				},
			},
		},
	]
	const data = [
		{
			x: '苹果',
			y: 180,
			s: '系列一',
		},
		{
			x: '苹果',
			y: 320,
			s: '系列二',
		},
		{
			x: '三星',
			y: 200,
			s: '系列一',
		},
		{
			x: '三星',
			y: 120,
			s: '系列二',
		},
		{
			x: '小米',
			y: 160,
			s: '系列一',
		},
		{
			x: '小米',
			y: 180,
			s: '系列二',
		},
		{
			x: 'vivo',
			y: 180,
			s: '系列一',
		},
		{
			x: 'vivo',
			y: 220,
			s: '系列二',
		},
		{
			x: '一加',
			y: 180,
			s: '系列一',
		},
		{
			x: '一加',
			y: 220,
			s: '系列二',
		},
		{
			x: '锤子',
			y: 240,
			s: '系列一',
		},
		{
			x: '锤子',
			y: 180,
			s: '系列二',
		},
	];
	// 获取图表数据
	const sArr = [];
	const xNameData = [];
	data.forEach((item) => {
		if (sArr.indexOf(item.s) === -1) {
			sArr.push(item.s);
		}
		if (xNameData.indexOf(item.x) === -1) {
			xNameData.push(item.x);
		}
	});
	const seriesArrData = sArr.map((item) => {
		let arr = data
			.filter((str) => item === str.s)
			.map((item) => [item.x, item.y]);
		let dataArr = data
			.filter((str) => item === str.s)
			.map((item) => item.y);
		return { name: item, data: arr, dataArr };
	});
	return series.map((ele, index) => {
		return {
			...ele,
			stack: config.barStack === 1 ? ele.stack : "same",
			backgroundStyle: {
				color: config.barBgColor,
			},
			barWidth: 80,
			// barMaxWidth: config.barMaxWidth || 15,
			// barMinHeight: config.barMinHeight || 0,
			barGap: config.barGap ? config.barGap + "%" : "0%",
			barCategoryGap: config.barCategoryGap
				? `${config.barCategoryGap}%`
				: "0%",
			label: {
				...config.label,
				formatter: (data) => {
					if (config.label.keepDecimal) {
						return data.value[1].toFixed(
							config.label.keepDecimal
						);
					}
					return data.value[1];
				},
				offset: [0, config.label.offset],
			},
			itemStyle: {
				...ele.itemStyle,
				borderRadius: ele.itemStyle.isCircle
					? [
						config.barMaxWidth / 2,
						config.barMaxWidth / 2,
						0,
						0,
					]
					: 0,
				color: function (params) {
					if (
						!ele.itemStyle.fillType ||
						ele.itemStyle.fillType == 1
					) {
						if (
							ele.extremeHighlights &&
							ele.extremeHighlights.show
						) {
							// 极值高亮
							var index_color = params.value[1];
							const data = seriesArrData[index]
								? seriesArrData[index].dataArr
								: [];
							// 根据极值类型获取极值。(目前只有最大值、最小值)
							const extremeValue =
								ele.extremeHighlights.type === "max"
									? Math.max.apply(null, data)
									: ele.extremeHighlights.type === "min"
										? Math.min.apply(null, data)
										: 0;
							if (index_color === extremeValue) {
								//Math.max.apply获取数据源中的的最大值
								return {
									...ele.extremeHighlights.color,
									x: 1 - ele.extremeHighlights.color.angle / 100,
									y: 1 - ele.extremeHighlights.color.angle / 100,
									x2: 0 + ele.extremeHighlights.color.angle / 100,
									y2: 0 + ele.extremeHighlights.color.angle / 100,
								};
							}
						}
						return {
							...ele.itemStyle.color,
							x: 1 - ele.itemStyle.color.angle / 100,
							y: 1 - ele.itemStyle.color.angle / 100,
							x2: 0 + ele.itemStyle.color.angle / 100,
							y2: 0 + ele.itemStyle.color.angle / 100,
						};
					}
				},
				borderType: ele.itemStyle.isDashed ? "dashed" : "solid",
			},
			data:
				seriesArrData.filter((v) => v.name === ele.name)[0]?.data ||
				[],
		}
	})
}
const scrollListOption = ref({
	...scrollOption
})
const scrollData = ref([...data])
const component = ref({
	width: 350,
	height: 300
})
</script>

<style lang='scss' scoped>
.es-center {
	position: relative;
	height: 1000px;
	padding: 0 16px;
	animation: slideAndFade 1.5s;

	.es-center-top {
		height: 60%;
	}

	&-bottom {
		display: flex;
		height: 40%;
		margin-top: 8px;
		position: relative;

		&-img {
			position: absolute;
			top: 0;
			width: 100%;
			height: 100%;
		}

		&-item-chart {
			width: 60%;
			padding-left: 10px;
			margin-left: 16px;
			height: 100%
		}

		&-item-scroll {
			width: 40%;
			height: 100%;
		}
	}
}

@keyframes slideAndFade {
	0% {
		transform: translateY(218px);
		opacity: 0;
	}

	100% {
		transform: translateX(0);
		opacity: 1;
	}
}</style>
