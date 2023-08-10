<template>
	<div class="es-block-top-center">
		<Title>明星产品</Title>
		<div style="width: 100%; height: 70%">
			<Chart :option="option" />
		</div>
	</div>
</template>
<script setup>
import { ref } from 'vue'
import Title from '../Title.vue'
import Chart from '@/components/chart/Chart.vue'
import * as echarts from 'echarts'

var data = [];
for (let i = 0; i < 5; ++i) {
	data.push(Math.round(Math.random() * 200));
}

let option = ref({
	grid: {
		left: '6%',
		top: '2%',
		right: '6%',
		bottom: '10%',
		containLabel: true
	},
	xAxis: {
		max: 'dataMax',
		splitLine: {     //网格线
			show: true,
			lineStyle: {
				type: 'dashed',
				color: ['#aaa', '#ddd']
			}
		},
		axisLabel: { //坐标轴刻度标签的相关设置
			formatter: function (n) {
				return Math.round(n) + ""; //刻度取整数
			},
		},

	},
	yAxis: {
		type: 'category',
		data: ['产品一', '产品二', '产品三', '产品四', '产品五'],
		inverse: true,
		animationDuration: 300,
		animationDurationUpdate: 300,
		max: 3, // only the largest 4 bars will be displayed
	},
	series: [
		{
			realtimeSort: true,
			name: 'X',
			type: 'bar',
			data: data,
			itemStyle: {
				color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
					{
						offset: 0,
						color: 'rgba(24, 144, 255, 0.35)'
					},
					{
						offset: 1,
						color: 'rgba(24, 144, 255, 1)'
					}
				])
			},
			label: {
				show: true,
				position: 'right',
				valueAnimation: true
			}
		}
	],
	legend: {
		show: false
	},
	animationDuration: 3000,
	animationDurationUpdate: 3000,
	animationEasing: 'linear',
	animationEasingUpdate: 'linear'
});

function update() {
	let data = [...option.value.series[0].data];
	for (let i = 0; i < data.length; ++i) {
		if (Math.random() > 0.9) {
			data[i] += Math.round(Math.random() * 2000);
		} else {
			data[i] += Math.round(Math.random() * 200);
		}
	}
	option.value = {
		...option.value,
		series: [
			{
				...option.value.series[0],
				data
			}
		]
	}
}

for (let i = 0; i < 100; ++i) {
	setTimeout(function () {
		update();
	}, 300);
}

</script>

<style lang='scss' scoped>
.es-block-top-center {
	width: 100%;
	height: 80%;
}

.es-left-bottom {
	display: flex;
	flex-direction: column;
}
</style>
