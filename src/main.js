import {
	createSSRApp
} from "vue";
import App from "./App.vue";
import store from './store';
import request from './utils/request';

export function createApp() {
	const app = createSSRApp(App);
	
	app.config.globalProperties.$request = request;
	app.use(store);

	return {
		app,
		store
	};
}
