import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import store from './store';
import request from './utils/request';
import util from './utils/index';

export function createApp() {
	const app = createSSRApp(App);
	
	app.config.globalProperties.$request = request;
	app.config.globalProperties.$util = util;
	app.use(store);

	return {
		app,
		store
	};
}
