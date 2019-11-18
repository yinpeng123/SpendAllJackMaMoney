<template>
	<view class="uni-numbox">
		<view @tap="_calcValue('minus')" class="uni-numbox__minus" :class="{'uni-numbox--disabled': inputValue <= min || disabled || minusDisabled }">
		</view>
		<view class="uni-numbox__value">{{inputValue}}</view>
		<!-- <input :disabled="true" @blur="_onBlur" class="uni-numbox__value" type="number" v-model="inputValue" /> -->
		<view @tap="_calcValue('plus')" class="uni-numbox__plus" :class="{'uni-numbox--disabled': inputValue >= max || disabled || plusDisabled }">
		</view>
	</view>
</template>
<script>
	export default {
		name: "UniNumberBox",
		props: {
			value: {
				type: [Number, String],
				default: 0
			},
			min: {
				type: Number,
				default: 0
			},
			max: {
				type: Number,
				default: 100
			},
			step: {
				type: Number,
				default: 1
			},
			disabled: {
				type: Boolean,
				default: false
			},
			minusDisabled: {
				type: Boolean,
				default: false
			},
			plusDisabled: {
				type: Boolean,
				default: false
			},
		},
		data() {
			return {
				inputValue: 0
			};
		},
		watch: {
			value(val) {
				this.inputValue = +val;
			},
			inputValue(newVal, oldVal) {
				if (+newVal !== +oldVal) {
					if(newVal>oldVal){
						this.$emit("change", {'value': newVal, 'type': 'plus'});
					}else{
						this.$emit("change", {'value': newVal, 'type': 'minus'});
					}
					
				}
			}
		},
		created() {
			this.inputValue = +this.value;
		},
		methods: {
			_calcValue(type) {
				if (this.disabled || (this.plusDisabled && type === "plus") || (this.mimusDisabled && type === "mimus")) {
					return;
				}
				const scale = this._getDecimalScale();
				let value = this.inputValue * scale;
				let step = this.step * scale;
				if (type === "minus") {
					value -= step;
				} else if (type === "plus") {
					value += step;
				}
				if (value < this.min || value > this.max) {
					return;
				}

				this.inputValue = String(value / scale);
			},
			_getDecimalScale() {
				let scale = 1;
				// 浮点型
				if (~~this.step !== this.step) {
					scale = Math.pow(10, (this.step + "").split(".")[1].length);
				}
				return scale;
			},
			_onBlur(event) {
				let value = event.detail.value;
				if (!value) {
					// this.inputValue = 0;
					return;
				}
				value = +value;
				if (value > this.max) {
					value = this.max;
				} else if (value < this.min) {
					value = this.min;
				}
				this.inputValue = Math.floor(value);
			}
		}
	};
</script>
<style lang="scss" scoped>
	$box-height: 50rpx;
	$box-line-height: 50rpx;
	$box-width: 50rpx;

	.uni-numbox {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		justify-content: center;
		height: $box-height;
		line-height: $box-height;
		width: 100%;
	}

	.uni-numbox__value {
		height: $box-height;
		line-height: $box-line-height;
		min-height: $box-line-height;
		text-align: center;
		font-size: $uni-font-size-lg;
		padding: 0 $uni-spacing-row-sm;
	}
	
	.uni-numbox__minus, .uni-numbox__plus {
		position: relative;
		width: $box-width;
		height: $box-height;
		line-height: $box-line-height;
		color: $uni-text-color;
		border-radius: $uni-border-radius-circle;
	}

	.uni-numbox__minus {
		background-color: #e0e0e0;
	}

	.uni-numbox__plus {
		background-color: orange;
	}
	
	.uni-numbox__minus:before, .uni-numbox__plus:before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		width: 20rpx;
		border-top: 6rpx solid;
		margin: -3rpx 0 0 -10rpx;
	}
	
	.uni-numbox__plus:after {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		height: 20rpx;
		border-left: 6rpx solid;
		margin: -10rpx 0 0 -3rpx;
	}

	.uni-numbox--disabled {
		background-color: #f0f0f0;
		color: $uni-text-color-disable;
	}
</style>
