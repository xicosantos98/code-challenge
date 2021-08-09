import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [reactRefresh()],
	server: {
		port: 3000,
		watch: {
			usePolling: true,
		},
		hmr: {
			protocol: "ws",
			host: "localhost",
		},
	},
	define: {
		"process.env": {},
	},
	css: {
		preprocessorOptions: {
			less: {
				javascriptEnabled: true,
			},
		},
	},
});
