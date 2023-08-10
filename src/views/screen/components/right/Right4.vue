<template>
	<div class="es-block">
		<Title>近期承保单量</Title>
		<div style="width: 100%; height: 86%;">
			<Chart :option="option" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue'
import Title from '../Title.vue'
import Chart from '@/components/chart/Chart.vue'
import allData from '@/assets/data/trend.json'
const choiceType = 'map'
const colorArr2 = [
	'rgba(99, 130, 112, 0.9)',
	'rgba(24, 144, 255, 0.9)',
	'rgba(19, 98, 115, 0.9)',
	'rgba(97, 227, 255,0.9)',
	'rgba(22, 242, 217, 0.9)'
]
const option = ref({
	color: colorArr2,
	grid: {
		left: '6%',
		top: '2%',
		right: '6%',
		bottom: '13%',
		containLabel: true
	},
	tooltip: {
		trigger: 'axis'
	},
	legend: {
		bottom: '4%',
		icon: 'circle',
		data: allData[choiceType].data,
		textStyle: {
			color: '#BAE7FF'
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: allData.common.month,
		axisLine: {
			lineStyle: {
				color: '#BAE7FF'
			}
		}
	},
	yAxis: {
		type: 'value',
		splitLine: {
			show: true,
			interval: 'auto',
			lineStyle: {
				color: 'rgba(186, 231, 255, 0.2)',
				type: 'dashed',
				dashOffset: 5,
			},
		},
	},
	series: getSeries()
})

function getSeries() {
	const colorArr1 = [
		'rgba(99, 130, 112, 0.35)',
		'rgba(24, 144, 255, 0.35)',
		'rgba(19, 98, 115, 0.35)',
		'rgba(97, 227, 255,0.35)',
		'rgba(22, 242, 217, 0.35)',
	]

	// y轴的数据 series下的数据
	const valueArr = allData[choiceType].data
	const seriesArr = valueArr.map((item, index) => {
		return {
			name: item.name,
			type: 'line',
			data: item.data,
			// stack: choiceType,
			itemStyle: {
				borderWidth: 1
			},
			lineStyle: {
				width: 2,
				color: colorArr1[index]
			},
			symbolSize: 4,
			symbol: 'circle',
			// smooth: true,
			// areaStyle: {
			// 	color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
			// 		[{
			// 			offset: 0,
			// 			color: colorArr1[index]
			// 		}, // %0的颜色值
			// 		{
			// 			offset: 1,
			// 			color: colorArr2[index]
			// 		}
			// 		]
			// 	)
			// }
		}
	})

	return seriesArr
}
</script>

<style lang='scss' scoped>
.es-block {
	width: 100%;
	height: 100%;
	background-image: url('@/assets/images/right-3.png');
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
