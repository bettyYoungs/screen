<template>
	<div class="es-screen-header">
		<h1 class="es-screen-logo">
			<!-- tdo logo -->
			<div class="es-screen-title">车险BI</div>
		</h1>
		<!-- <div class="es-screen-header-title">{{ store.title }}</div> -->
		<div class="es-screen-header-right">
			<!-- <img class="theme-change" :src="icon" @click="handleChangeTheme"> -->
			<span class="datetime">{{ currentTime }}</span>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { computed, onBeforeUnmount, ref } from 'vue'
import dayjs from 'dayjs'
import { useScreenStore } from '@/store'
import darkIcon from '@/assets/images/qiehuan_dark.png'
import lightIcon from '@/assets/images/qiehuan_light.png'
import githubIconDark from '@/assets/images/github_dark.svg'
import githubIconLight from '@/assets/images/github_light.svg'
const store = useScreenStore()

// const icon = computed(() => store.theme === 'dark' ? darkIcon : lightIcon)

const currentTime = ref('')
const timeId = ref()
function handleChangeTheme() {
	store.$patch({
		theme: store.theme === 'dark' ? 'light' : 'dark'
	})
}

function startTime() {
	timeId.value = setTimeout(() => {
		currentTime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
		startTime()
	}, 1000)
}

onBeforeUnmount(() => {
	clearTimeout(timeId.value)
})

startTime()
</script>

<style lang='scss' scoped>
.es-screen-header {
	
	width: 100%;
	height: var(--es-header-height);
	background-image: url('@/assets/images/header1.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
	animation: fade 3s;
	&-title {
		position: absolute;
		left: 50%;
		top: 50%;
		// transform: translate(-50%, -50%);
		width: 487px;
		height: var(--es-header-height);
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 30px;
		font-weight: 500;
		letter-spacing: 7px;
		text-shadow: 0px 2px 20px rgba(222, 171, 155, 0.6);
	}

	.es-screen {
		&-logo {
			display: flex;
			align-items: center;
			height: var(--es-header-height);
			position: relative;
		}
		&-title {
			// position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 100%;
			height: 100%;
			// transform: translate(50%, 10%);
			font-weight: normal;
			font-size: 40px;
			font-style: italic;
			color: rgb(255, 255, 255);
		}
	}
	&-right {
		display: flex;
		align-items: center;
		position: absolute;
		height: var(--es-header-height);
		right: 30px;
		top: 0;
		font-style: italic;
		font-size: 28px;
		color: #e6f7ff;
		transform: translateY(15%);
		img {
			width: 30px;
			margin-right: 16px;
			cursor: pointer;
			transition: .3s cubic-bezier(.175, .885, .32, 1.275);

			&:hover {
				transform: scale(1.2);
			}
		}
	}
}

@keyframes fade {
	from {
		opacity: 0;
	}

	to {
		opacity: 1;
	}
}</style>
