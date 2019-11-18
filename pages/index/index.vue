<template>
	<view class="">
		<view class="top-content">
			<image class="jackMa-img" :src="jackMa.imgSrc"></image>
			<view class="text-area">
				<text class="saying">{{jackMa.saying}}</text>
			</view>
			<view class="jackMa-money-seat" v-if="isFixed"></view>
			<view class="jackMa-money" :class="{'jackMa-money-position-relative':!isFixed, 'jackMa-money-position-fixed':isFixed}">
				<text>马云还有<text class="jackMa-money-surplus">{{jackMa.money}}</text>元</text>
			</view>
		</view>
		<view class="uni-product-list">
			<view class="uni-product" v-for="(product,index) in productList" :key="index">
				<view class="image-view">
					<image v-if="renderImage" class="uni-product-image" :src="product.image"></image>
				</view>
				<view class="uni-product-title">{{product.title}}</view>
				<view class="uni-product-price">￥{{product.favourPrice}}</view>
				<view class="uni-product-limit">限购{{product.limit}}件</view>
				<view class="uni-product-number">
					<uni-number-box class="uni-number-box" :plus-disabled="product.plusDisabled" :min="0" :max="product.limit" @change="changeNumber($event,product)"></uni-number-box>
				</view>
			</view>
		</view>
		<view class="jackMa-cart">
			<view class="cart-text">
				<text>马云的购物车👇</text>
			</view>
			<view class="cart-img" @click="gotoCart($event)">
				<image class="cart-image" :src="'https://img-cdn-qiniu.dcloud.net.cn/uniapp/uni-ui/goodsnav/carts.png'"></image>
			</view>

		</view>
	</view>

</template>

<script>
	// #ifndef MP-WEIXIN
	import goods from "../../common/goods.js"
	// #endif
	import UniGoodsNav from "@/components/uni-goods-nav/uni-goods-nav.vue"
	import UniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import {
		mapMutations
	} from 'vuex'
	export default {
		components: {
			UniGoodsNav,
			UniNumberBox
		},
		data() {
			return {
				jackMa: {
					imgSrc: "https://7969-yinpeng-d10c8a-1258090796.tcb.qcloud.la/jackMa.png?sign=cae30d4d42a99a324960763501cf6d34&t=1573857413",
					saying: "你花任你花，我穷算我输",
					money: 270101000000
				},
				productList: [],
				renderImage: false,
				top: 0,
				isFixed: false
			};
		},
		methods: {
			async loadData(action = 'add') {
				uni.showLoading({
					title: '加载中',
					mask: false
				});


				if (action === 'refresh') {
					this.productList = [];
				}

				// #ifndef MP-WEIXIN
				for (let item of goods) {
					item.plusDisabled = false;
					item.number = 0;
					this.productList.push(item);
				}
				this.renderImage = true;
				uni.hideLoading();
				uni.stopPullDownRefresh();
				// #endif
				
				// #ifdef MP-WEIXIN
				const db = wx.cloud.database();
				db.collection('goods').orderBy('favourPrice', 'asc').skip(this.productList.length).limit(10).get().then((res) => {
					for (let item of res.data) {
						item.plusDisabled = false;
						item.number = 0;
						this.productList.push(item);
					}
					this.renderImage = true;

				}).catch((err) => {
					console.err(err)
				}).finally(() => {
					uni.hideLoading();
					uni.stopPullDownRefresh();
				})
				// #endif


			},
			changeNumber({
				type,
				value
			}, product) {
				if (type === 'plus') {
					this.jackMa.money -= product.favourPrice;
				} else {
					this.jackMa.money += product.favourPrice;
				}
				product.number = +value;
				this.setSurplus(this.jackMa.money);
				// var maker;
				this.productList.forEach((product, index) => {
					// if (maker && index > maker) {
					// 	product.plusDisabled = true;
					// 	return true;
					// }
					if (product.favourPrice > this.jackMa.money) {
						product.plusDisabled = true;
						// maker = index;
					}
				})
			},
			gotoCart(event) {
				this.setCart(this.productList.filter((product) => !!product.number));
				uni.navigateTo({
					url: '/pages/cart/cart'
				})
			},
			...mapMutations(['setTotal', 'setSurplus', 'setCart'])
		},
		onReady() {
			this.setTotal(this.jackMa.money);
			// #ifdef MP-WEIXIN
			uni.showShareMenu({
				withShareTicket: true
			})
			// #endif
		},
		onLoad() {
			this.loadData();
		},
		onShareAppMessage(res) {
			return {
				title: "花光马爸爸的钱",
				path: "/pages/index/index",
				imageUrl: this.jackMa.imgSrc,
				desc: '马云还有270101000000元人民币',
				success: () => {
					console.log('share succeed')
				}
			}
		},
		onPageScroll({
			scrollTop
		}) {
			if (scrollTop >= this.top) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		},
		onPullDownRefresh() {
			this.loadData('refresh');
		},
		onReachBottom() {
			// #ifdef MP-WEIXIN
			this.loadData();
			uni.hideShareMenu();
			// #endif
		},
		mounted() {
			uni.createSelectorQuery().in(this).select('.jackMa-money').boundingClientRect(data => {
				this.top = data.top;
			}).exec();
		}
	}
</script>

<style lang="scss">
	$money-color: #e80080;

	.top-content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.jackMa-img {
		height: 150rpx;
		width: 150rpx;
		margin-top: 30rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 30rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.saying {
		font-size: 36rpx;
		color: #333;
		;
	}

	.jackMa-money-position-relative {
		position: relative;
	}

	.jackMa-money-position-fixed {
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 90rpx;
		/* #endif */
		
	}

	.jackMa-money-seat {
		width: 100%;
		height: 50rpx;
	}

	.jackMa-money {
		width: 100%;
		height: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		font-size: 36rpx;
		color: #333;
		background: #ffffff;
		z-index: 99;

		.jackMa-money-surplus {
			font-size: 48rpx;
			color: $money-color;
			font-weight: 500;
		}
	}

	.jackMa-cart {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: fixed;
		bottom: 50rpx;
		right: $uni-font-size-base;

		.cart-text {
			width: $uni-font-size-base;
			font-size: $uni-font-size-base;
			color: $money-color;
		}

		.cart-img {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100rpx;
			height: 100rpx;
			margin-top: 20rpx;
			background-color: orange;
			border-radius: $uni-border-radius-circle;

			.cart-image {
				width: 72rpx;
				height: 72rpx;
			}

		}

	}

	view {
		font-size: $uni-font-size-base;
	}

	.uni-product-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		flex-direction: row;
	}

	.uni-product {
		margin: 10rpx;
		padding: 12rpx;
		display: flex;
		flex-direction: column;
		border-radius: 10rpx;
		background: #f8f8f8;
	}

	.image-view {
		height: 330rpx;
		width: 330rpx;
		margin: 12rpx 0;
	}

	.uni-product-image {
		height: 330rpx;
		width: 330rpx;
	}

	.uni-product-title {
		width: 300rpx;
		word-break: break-all;
		display: -webkit-box;
		overflow: hidden;
		line-height: 1.5;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
	}

	.uni-product-price {
		margin-top: $uni-spacing-col-sm;
		font-size: 36rpx;
		line-height: 1.5;
		color: $money-color;
		font-weight: 500;
	}

	.uni-product-limit {
		margin-top: $uni-spacing-col-sm;
		font-size: 20rpx;
		line-height: 1.5;
		color: #999999;
	}


	.uni-product-number {
		display: flex;
		flex-direction: row;
		justify-content: center;
		margin-top: $uni-spacing-col-sm;
	}
</style>
