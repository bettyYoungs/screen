<template>
	<div class="es-center">
		<div class="es-center-top">
			<div class="es-center-flip-bg">
				<!-- <div class="es-center-flip-title">
					当年承保费
				</div>
				<Flip /> -->
			</div>
			<Map />
		</div>
		<Bottom />
		<!-- <AMap /> -->
	</div>
</template>

<script setup lang='ts'>
import Map from './Map.vue'
import AMap from './AMap.vue'
import Bottom from './Bottom.vue'
</script>

<style lang='scss' scoped>
.es-center {
	position: relative;
	// width: 100%;
	height: 1000px;
	padding: 0 16px;
	animation: slideAndFade 1.5s;
	.es-center-top {
		height: calc(100% - 150px);
	}
	&-flip-title {
		font-size: 28px;
		font-weight: bold;
		text-align: center;
		padding: 16px;
		text-shadow: #0075FF 5px 0 8px;
	}
	&-flip-bg {
		background-repeat: no-repeat;
		background-size: 100%;
		background-image: url('@/assets/images/flip.png');
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
}
</style>
