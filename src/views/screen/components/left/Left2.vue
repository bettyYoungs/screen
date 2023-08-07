<template>
	<div class="es-block">
		<Title>当年承保单量</Title>
		<div style="width: 100%; height: 90%;" class="es-left-bottom">
			<GridProgress :option="option" title="投保率" :data="{
				value: 7,
				max: 10
			}" />
			<GridProgress :option="option" title="投保率" :data="{
				value: 8,
				max: 10
			}" />
			<Left3 />
		</div>
	</div>
</template>

<script setup lang='ts'>
import Title from '../Title.vue'
import GridProgress from '@/components/gridProgress/index.vue'
import Left3 from './Left3.vue'

</script>

<style lang='scss' scoped>
.es-block {
	width: 100%;
	height: 100%;
	top: 60%;
	background-image: url('@/assets/images/left-2.png');
	// background-repeat: no-repeat;
	background-size: auto 100%;
}
.es-left-bottom {
	display: flex;
	flex-direction: column;
}
</style>
