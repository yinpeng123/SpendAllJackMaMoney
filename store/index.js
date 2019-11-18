import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		cart: [],
		surplus: 0,
		total: 0
	},
	mutations: {
		setCart(state, cart) {
			state.cart = cart
		},
		setSurplus(state, surplus) {
			state.surplus = surplus;
		},
		setTotal(state, total) {
			state.total = total
		}
	},
	getters: {
		cost: state => state.total - state.surplus,
		productsNumber: state => {
			return state.cart.reduce((sum, {
				number
			}) => {
				return sum + number
			}, 0);
		}
	},
	actions: {

	}
})

export default store
