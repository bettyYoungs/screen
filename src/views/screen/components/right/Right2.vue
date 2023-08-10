<template>
	<div class="es-block">
		<Title>承保分析</Title>
		<div style="width: 100%; height: 90%">
			<Chart :option="option" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Title from "../Title.vue";
import Chart from "@/components/chart/Chart.vue";
import allData from "@/assets/data/stock.json";
import * as echarts from "echarts";

const currentIndex = ref(0);
const option = ref({
	grid: {
		left: '6%',
		top: '2%',
		right: '6%',
		bottom: '10%',
		containLabel: true
	},
	series: getSeries(),
});

function getSeries() {
	const centerArr = [
		["18%", "20%"],
		["50%", "20%"],
		["82%", "20%"],
		["34%", "65%"],
		["66%", "65%"],
	];
	const colorArr = [
		['rgba(142,231,255,1)', 'rgba(95,221,255,0.55)'],
		["rgba(111, 235,248,0.5)", "rgba(230, 235,248,1)"],
		["#E8821C", "#E55445"],
		["#5052EE", "#AB6EE5"],
		['rgba(75, 255, 242, 0.31)', 'rgba(43,232,255,1)']
	];
	// 处理图表需要的数据
	const start = currentIndex.value * 5;
	const end = (currentIndex.value + 1) * 5;
	const showData = allData.slice(start, end);

	const min =1000, max = 6000; 
	// const outterRadius = innerRadius * 1.125;
	const list:Record<string, any>[] = []
	showData.forEach((item, index) => list.push(
		{
      name: "刻度",
      type: "gauge",
			center: centerArr[index],
      radius: '50%',
      min, 
      max,
      splitNumber: 10, //刻度数量
      startAngle: 225,
      endAngle: -45,
      axisLine: {
        show: true,
        lineStyle: {
          width: 1,
          color: [[1, "rgba(0,0,0,0)"]],
        },
      }, 
			//仪表盘轴线
      axisLabel: {
        show: false,
        color: "#113359",
        distance: 10,
      },
			 //刻度标签。
      axisTick: {
        show: true,
        splitNumber: 7,
        lineStyle: {
          color: "#468EFD",
          width: 1,
        },
        length: -6,
      },
			//刻度样式
      splitLine: {
        show: true,
        length: -10,
        lineStyle: {
          color: "#468EFD",
        },
      },
			//分隔线样式
      detail: {
        show: false,
      },
      pointer: {
        show: false,
      },
    },
    {
      name: "仪表盘",
      type: "gauge",
			center: centerArr[index],
      radius: '35%',
      splitNumber: 10,
      axisLine: {
        lineStyle: {
          color: [
            [item.sales / (max - min), "#1999fd"],
          ],
          width: 4,
        },
      },
      axisLabel: {
        show: false,
      },
			detail: {
				show:false
			},
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      itemStyle: {
        show: false,
      },
      title: {
        color: "#fff",
        fontSize: 10,
        offsetCenter: [0, "55%"],
      },
			data: [
				{
					name: item.name + "\n\n" + item.sales,
					value: item.sales,
					itemStyle: {
						color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
							{
								offset: 0,
								color: colorArr[index][0],
							},
							{
								offset: 1,
								color: colorArr[index][1],
							},
						]),
					},
				},
			
			],
      pointer: {
        show: true,
        length: "70%",
				radius: "15%",
        width: 6, //指针粗细
      },
    },
		)
	)
	return list
}
</script>

<style lang="scss" scoped>
.es-block {
	width: 100%;
	height: 100%;
	background-image: url("@/assets/images/right-2.png");
	background-repeat: no-repeat;
	background-size: cover;
}
</style>
