<template>
	<view class="cart">
		<view class="product-list">
			<view class="product" v-for="(product,index) in cart" :key="index">
				<view class="product-image-view">
					<image class="product-image" :src="product.image"></image>
				</view>
				<view class="product-info">
					<view class="product-title">{{product.title}}</view>
					<view class="product-price-numer money-text-color">
						<view class="product-price">￥{{product.favourPrice}}</view>
						<view class="product-number">X {{product.number}}件</view>
					</view>
				</view>

			</view>
		</view>
		<view class="jackMa-money-info">
			<view class="text-color-placeholder">马云购买物品数量：<text class="money-text-color">{{productsNumber}}</text></view>
			<view class="text-color-placeholder">马云消费金额：<text class="money-text-color">{{cost}}</text></view>
			<view class="text-color-placeholder">马云资产余额：<text class="money-text-color">{{surplus}}</text></view>
		</view>

	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'

	export default {
		data() {
			return {

			};
		},
		computed: {
			...mapState(['total', 'surplus', 'cart']),
			...mapGetters(['cost', 'productsNumber'])
		},
		onShow() {

		},
		onShareAppMessage(res) {
			return {
				title: "JackMa的购物车",
				path: "/pages/cart/cart",
				desc: '总花费270101000000元人民币',
				success: () => {
					console.log('share succeed')
				}
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>

	.text-color-placeholder{
		color: #666666;
	}
	.money-text-color {
		color: #e80080;
		font-weight: 500;
	}

	.cart {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.product-list {
		display: flex;
		flex-flow: column;
		align-items: center;
		justify-content: flex-start;
		margin-top: 10px;
	}

	.product {
		margin: 10rpx;
		width: 720rpx;
		height: 180rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		border-radius: 10rpx;
		background: #f8f8f8;
	}

	.product-image-view {
		padding: 10rpx;
		font-size: 0;

		.product-image {
			border-radius: 5rpx;
			width: 160rpx;
			height: 160rpx;
		}
	}

	.product-info {
		display: flex;
		flex-wrap: nowrap;
		flex-direction: column;
		justify-content: space-between;
		flex-grow: 1;
		height: 160rpx;
		padding: 20rpx;

		.product-title {
			width: 100%;
			word-break: break-all;
			display: -webkit-box;
			overflow: hidden;
			line-height: 1.5;
			text-overflow: ellipsis;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 2;
		}

		.product-price-numer {
			display: flex;
			flex-direction: row;
			justify-content: space-between;

			.product-price {
				flex: 1;
			}

			.product-number {
				flex: 1;
				text-align: right;
			}
		}


	}

	.jackMa-money-info {
		width: 720rpx;
		margin-top: 100rpx;
		text-align: right;

	}
</style>
