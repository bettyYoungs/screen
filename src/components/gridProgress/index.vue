<template>
	<div :id="svgId" class="grid-progress-grid">
		<div class="grid-progress-title">{{ title }}</div>
		<div class="grid-progress-content" ref="content">
			<svg
				width="100%"
				:height="option.grid.height"
				:id="`grid-progress-svg-${svgId}`"
			>
				<defs>
					<clipPath :id="`grid-progress-barcut-${svgId}`">
						<rect
							y="0"
							:rx="option.grid.radius"
							:ry="option.grid.radius"
							:height="option.grid.height"
							v-for="(item, index) in rxs"
							:x="item"
							:key="index"
							:width="realWidth"
						/>
					</clipPath>
					<clipPath :id="`grid-progress-bgcut-${svgId}`">
						<rect
							y="0"
							:rx="option.grid.radius"
							:ry="option.grid.radius"
							:height="option.grid.height"
							v-for="(item, index) in rxs"
							:x="item"
							:key="index"
							:width="realWidth"
						/>
					</clipPath>
					<linearGradient :id="`grid-progress-g1-${svgId}`">
						<stop offset="0%" :stop-color="option.grid.startColor" />
						<stop offset="91.25%" :stop-color="option.grid.endColor" />
					</linearGradient>
				</defs>
				<rect
					x="0"
					y="0"
					width="100%"
					:height="option.grid.height"
					:fill="option.grid.backgroundColor"
					:clip-path="`url(#grid-progress-bgcut-${svgId})`"
				/>
				<rect
					x="0"
					y="0"
					:width="`${svgRectWidth}px`"
					:height="option.grid.height"
					:fill="`url(#grid-progress-g1-${svgId})`"
					:clip-path="`url(#grid-progress-barcut-${svgId})`"
				/>
			</svg>
			<div
				class="grid-progress-line"
				:style="{
					top: `${option.grid.height + 5}px`,
					width: `${svgRectWidth}px`,
					background: option.grid.underline
						? 'rgba(230,247,255,.6)'
						: 'rgba(1,1,1,0)',
				}"
			></div>
		</div>
		<div
			v-if="option.text.realValue"
			class="grid-progress-text-label"
			:style="{
				...labelStyle,
			}"
		>
			{{ data.value }}
		</div>
	</div>
</template>
<script>
import { default as LdataConfig } from "./config";
import { toRef } from "vue";
function checkData(data) {
	if (data) {
		if (Array.isArray(data)) {
			if (data.length && Reflect.has(data[0], key)) {
				return data;
			} else {
				return [initData];
			}
		} else {
			return [data];
		}
	} else {
		return [initData];
	}
}
export default {
	name: "gridProgress",
	computed: {
		width() {
			const el = this.$refs.content;
			const w = el.offsetWidth || 0;
			const width = Math.floor(w) || LdataConfig.option.component.width;
			return width;
		},
		textStyle() {
			const textStyle = this.option.text;
			return {
				fontFamily: textStyle.fontFamily,
				fontWeight: textStyle.fontWeight,
				fontStyle: textStyle.fontStyle,
				fontSize: `${textStyle.fontSize}px`,
				lineHeight: `${textStyle.lineHeight}px`,
				color: textStyle.color,
				top: `${textStyle.offsetY}px`,
				paddingLeft: `${textStyle.offsetX}px`,
			};
		},
		component() {
			return LdataConfig.option.component;
		},
		width() {
			return this.component?.width || LdataConfig.option.component.width;
		},
		assistBg() {
			const assist = this.option.assist;
			const position = this.option.position;
			let style = {};
			switch (position.position) {
				case "left":
					style = {
						...style,
						position: "absolute",
						right: `${position.offsetX}px`,
						top: `${position.offsetY}px`,
					};
					break;
				case "right":
					style = {
						...style,
						position: "absolute",
						left: `${position.offsetX}px`,
						top: `${position.offsetY}px`,
					};
					break;
				default:
					break;
			}
			return {
				...style,
				backgroundRepeat: "no-repeat",
				backgroundPosition: "0% 0%",
				// backgroundImage: `url(${assist.url || '/img/border/backgroundImage.png'})`,
				backgroundImage: `url(${assist.url})`,
				width: `${assist.width}px`,
				height: `${assist.height}px`,
				backgroundSize: `${assist.width}px ${assist.height}px`,
			};
		},
		assistWrapStyle() {
			const ass = this.option.assist;
			const position = this.option.position;
			let left = 0;
			let top = 0;
			switch (position.position) {
				case "left":
					left = `-100%`;
					top = 0;
					break;
				case "right":
					left = `100%`;
					top = 0;
					break;
				default:
					top = ass.offsetTop;
					left = 0;
					break;
			}
			return {
				left: left,
				top: `${top}px`,
			};
		},
		labelStyle() {
			const unit = this.option.unit;
			return {
				fontFamily: unit.fontFamily,
				fontSize: `${unit.fontSize}px`,
				lineHeight: `${unit.lineHeight}px`,
				fontWeight: unit.fontWeight,
				fontStyle: unit.fontStyle,
				color: unit.color,
				top: `${+unit.offsetY + +this.option.grid.height + 8}px`,
			};
		},
		rectWidth() {
			const width = this.option.grid.width * 2;
			return width;
		},
		realWidth() {
			return this.rectWidth - this.rectWidth * this.option.grid.space;
		},
		rxs() {
			let rxArr = [];
			this.$nextTick(() => {
				const el = this.$refs.content;
				const w = el.offsetWidth || 0;
				const width = Math.floor(w) || LdataConfig.option.component.width;
				const arrLength = Math.floor(width / this.rectWidth);
				console.log(width, "w");
				for (let i = 0; i < arrLength; i++) {
					rxArr.push(i * this.rectWidth);
				}
			});
			return rxArr;
		},
	},

	data() {
		return {
			svgId: "grid-svg" + new Date().getTime(),
			refId: null,
			svgRectWidth: 0,
			pathWidth: 0,
			textValue: 0,
		};
	},
	props: ["title", "data"],
	setup(props) {
		const option = toRef({ ...LdataConfig.option.option });
		return {
			checkData: checkData({ value: 0 }),
			option,
			title: props.title,
		};
	},
	mounted() {
		setTimeout(() => {
			this.calculateWidth();
			this.getTextValue();
			this.animation();
		});
	},
	watch: {
		width(newVal, oldVal) {
			if (newVal !== oldVal) {
				this.calculateWidth();
				this.getTextValue();
			}
		},
		option: {
			handler() {
				this.getTextValue();
				const show =
					this.option.animation.show && this.option.animation.dynamicEffect;
				if (!show) return;
				if (this.reqId) {
					window.cancelAnimationFrame(this.reqId);
				}
				this.animation();
			},
			// immediate: true,
			deep: true,
		},
		data() {
			this.calculateWidth();
			this.getTextValue();
		},
	},
	unmounted() {
		if (this.reqId) {
			window.cancelAnimationFrame(this.reqId);
		}
	},
	methods: {
		getTextValue() {
			const textStyle = this.option.text;
			const data = this.data;
			const val = textStyle.realValue
				? textStyle.showUnit
					? data.value + textStyle.unit
					: data.value
				: ((data.value * 100) / (data.max * 100)).toFixed(2) * 100 + "%";
			this.textValue = val;
		},
		animation() {
			const _this = this;
			const {
				animation: { duration: time, value },
				text,
			} = this.option;
			const data = this.data;
			if (!data) return;
			const { max, value: content } = data;
			const width = this.width;

			let start, previousTimeStamp;
			let done = false;
			const w = (content / max) * width;

			const beginValue = value > max ? max : value;
			let wi = (beginValue / max) * width;
			const beginWidth = wi;
			const disX = w - beginWidth;
			//每秒要走的距离
			const disStep = disX / time;
			//起始宽度
			this.svgRectWidth = wi;
			//起始值
			let textValue = 0,
				lastValue = content;
			if (value) {
				textValue = Math.min(value, max);
			}
			if (!text.realValue) {
				textValue = (textValue / max) * 100;
				lastValue = (lastValue / max) * 100;
			}
			const disText = (lastValue - textValue) / time;
			function step(timestamp) {
				if (start === undefined) {
					start = timestamp;
				}
				let elapsed = timestamp - start;
				if (previousTimeStamp !== timestamp) {
					elapsed > time && (elapsed = time);
					if (!value) {
						const count = Math.min(disStep * elapsed, w);
						_this.svgRectWidth = beginWidth + count;
						const textVal = Math.min(disText * elapsed, lastValue);
						const digValue = (textValue + textVal).toFixed(1);
						// 显示真实值
						if (text.realValue) {
							//显示单位
							if (text.showUnit) {
								_this.textValue = digValue + "" + text.unit;
							}
						} else {
							_this.textValue = digValue + "" + "%";
						}
						count === w && (done = true);
					} else {
						const count = Math.min(disStep * elapsed, w);
						_this.svgRectWidth = beginWidth + count;
						const textVal = Math.min(disText * elapsed, lastValue);
						const digValue = (textValue + textVal).toFixed(1);
						// 显示真实值
						if (text.realValue) {
							_this.textValue = digValue;
							//显示单位
							if (text.showUnit) {
								_this.textValue = digValue + "" + text.unit;
							}
						} else {
							_this.textValue = digValue + "" + "%";
						}
						if (disStep < 0) {
							beginWidth + count <= w && (done = true);
						} else {
							beginWidth + count >= w && (done = true);
						}
					}
				}

				if (elapsed < time) {
					previousTimeStamp = timestamp;
					if (!done) {
						window.requestAnimationFrame(step);
					}
				}
			}
			this.refId = window.requestAnimationFrame(step);
		},
		calculateWidth() {
			const data = this.data;
			this.pathWidth = (this.width * data.value) / data.max;
			this.svgRectWidth = (data.value / data.max) * this.width;
		},
	},
};
</script>
<style scoped lang="scss">
.grid-progress {
	&-grid {
		width: 100%;
		height: 35px;
		display: flex;
		padding-left: 20px;
	}

	&-title {
		width: 80px;
	}

	&-content {
		flex: 1;
	}

	&-assist {
		position: absolute;
		width: 100%;
	}

	&-text {
		position: absolute;
		text-align: center;

		&-label {
			// position: absolute;
			width: 54px;
			transform: translateX(0px);
			letter-spacing: 0px;
			text-indent: 0px;
			font-weight: normal;
			font-size: 18px;
			line-height: 30px;
			opacity: 1;
			font-style: normal;
			text-shadow: rgb(0, 117, 255) 0px 0px 8px;
			color: rgb(155, 254, 255);
			height: 45px;
		}
	}

	&-line {
		position: absolute;
		height: 2px;
	}
}
</style>
