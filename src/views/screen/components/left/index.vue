<template>
	<div ref="containerRef" class="es-screen-left-container">
		<component
			v-for="item in components"
			:key="item.name"
			:is="item.component"
			class="es-screen-left-item"
			:name="item.name"
		/>
		
	</div>
</template>

<script setup lang='ts'>
import { shallowRef } from 'vue'
import { useSortable } from '@/utils/useSortable'
import Left1 from './Left1.vue'
import Left2 from './Left2.vue'


const components = shallowRef([
	{ name: 'left1', component: Left1 },
	{ name: 'left2', component: Left2 },
])

const { containerRef } = useSortable(components)
</script>

<style lang='scss' scoped>
.es-screen-left-container {
	position: relative;
	height: 100%;
	background-color: rgba(0,59,104,0.21);
	backdrop-filter: blur(10px);
}
.es-screen-left-item {
	position: absolute;
	width: 100%;
	height: 320px;
	background-color: var(--es-block-bg);
	animation-name: slide;

	& + & {
		margin-top: 10px;
	}
	&:nth-child(1) {
		height: 60%;
		animation-duration: .8s;
	}
	&:nth-child(2) {
		height: 38%;
		animation-duration: 1.5s;
	}
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
