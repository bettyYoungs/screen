<template>
	<div class="es-block">
		<img src="@/assets/images/center-1.png" class="es-center-top-img" />
		<Title><p style="margin-left: 30px;">分支机构当日承保情况</p></Title>
    <div style="width: 100%; height: 86%;">
			<Chart :option="option" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Title from '../Title.vue'
import Chart from '@/components/chart/Chart.vue'
import allData from '@/assets/data/map.json'
import chinaJson from '@/assets/data/china.json'
import * as echarts from 'echarts'
echarts.registerMap('china', chinaJson as any)
const option = ref({
	geo: {
		type: 'map',
		map: 'china',
		top: '5%',
		bottom: '5%',
		itemStyle: {
			areaColor: '#2E72BF',
			borderColor: '#333'
		}
	},
	legend: {
		left: '5%',
		bottom: '5%',
		orient: 'vertical',
		data: allData.map(item => item.name),
		textStyle: {
			color: '#aaa'
		}
	},
	series: allData.map(item => {
		// return的这个对象就代表的是一个类别下的所有散点数据
		// 如果想在地图中显示散点的数据, 我们需要给散点的图表增加一个配置, coordinateSystem:geo
		return {
			type: 'effectScatter',
			rippleEffect: {
				scale: 5,
				brushType: 'stroke'
			},
			name: item.name,
			data: item.children,
			coordinateSystem: 'geo'
		}
	})
})
</script>

<style lang='scss' scoped>
.es-block {
	width: 100%;
	height: 100%;
	position: relative;
	padding-top: 10px;
	// background-image: url('@/assets/images/center-1.png');
	background-repeat: no-repeat;
	background-size:  100% auto;
	.es-center-top-img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}
}
</style>
