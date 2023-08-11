<template>
	<div class="es-block">
		<img src="@/assets/images/right-1.png" class="es-top-img" />
		<LeftTop />
		<LeftCenter />
	</div>
</template>

<script setup lang='ts'>
import LeftTop from './LeftTop.vue'
import LeftCenter from './LeftTopChart.vue'
</script>

<style lang='scss' scoped>
.es-block {

	.es-top-img {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 1;
		z-index: -1;
		transform: rotate(0deg) scaleX(1) scaleY(1);
		mix-blend-mode: normal;
	}
}
</style>
