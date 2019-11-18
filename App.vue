<script>
	export default {
		onLaunch: function() {
			// #ifdef MP-WEIXIN
			if (!wx.cloud) {
				console.error("出错了");
			} else {
				wx.cloud.init({
					env: 'yinpeng-d10c8a',
					traceUser: true
				})
			}
			// #endif

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
</style>
