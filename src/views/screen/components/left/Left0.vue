<template>
	<div class="es-block0">
		<Title>整体形势</Title>
		<div class="es-screen-text-container">
			<div class="es-screen-text">
				<CustomText textValue="全年运行天数" />
				<CountTo :data="2017" :option="flip1Option" />
			</div>
			<div class="es-screen-text">
				<CustomText textValue="全年无事故率" />
				<CountTo :data="166" suffix="rmb" :option="flip2Option" />
			</div>
		</div>
	</div>
</template>

<script setup>
import CustomText from '@/components/text/index.vue'
import CountTo from '@/components/flip/index.vue'
import Title from '../Title.vue'
const flip1Option = {
	prefix: {
		show: false,
		offsetY: 20,
		offsetX: 50
	},
	number: {
		color: '#61E3FF',
		fontSize: 42,
		duration: 2,
		intervals: 10,
		animation: true,
		offsetX: 6,
		fontStyle: 'oblique'
	},
	suffix: {
		offsetY: 12,
		text: '天'
	}
}

const flip2Option = {
	prefix: {
		show: false,
		offsetY: 20,
		offsetX: 50
	},
	number: {
		color: '#61E3FF',
		fontSize: 42,
		duration: 2,
		intervals: 10,
		offsetX: 20,
		animation: true,
		fontStyle: 'oblique'
	},
	suffix: {
		offsetY: 12,
		text: '%'
	}
}
</script>
<style scoped lang="scss">
.es-block0 {
	height: 34%;
}
.es-screen-text {
	&-container {
		display: flex;
		height: 64px;
		padding-left: 10px;
	}

	background-image: url('@/assets/images/left-top.png');
	background-repeat: no-repeat;
	background-position: 0 4px;
	background-size: contain;
	background-color: rgba(0, 59, 104,.2);
	mix-blend-mode: lighten;
	padding: 10px 0;
}
</style>