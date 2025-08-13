import { defineStore } from "pinia";
import api from "@/api"; // Axios wrapper with interceptors
import router from "@/router";

export const useGlobalStore = defineStore("glob", {
	state: () => ({
		searchTerm: "",
		openDropdownId: null as string | null
	}),
	getters: {
		// isLoggedIn: (state) => !!state.token,
	},
	actions: {
		toggleDropdown(id: string) {
			const wasOpen = this.openDropdownId === id;
			if (wasOpen) {
				this.openDropdownId = null;
			} else {
				this.openDropdownId = id;
			}
		},
		closeDropdown() {
			this.openDropdownId = null;
		},

		// async login(credentials: {
		// 	phone: string;
		// 	password: string;
		// 	remember?: boolean;
		// }) {
		// 	this.error = "";
		// 	try {
		// 		const response = await api.post("/login", credentials);
		// 		console.log("Login API response:", response.data);
		// 		this.token = response.data.token;
		// 		localStorage.setItem("token", this.token);
		// 		await this.fetchUser();
		// 		router.push("/dashboard");
		// 	} catch (error: any) {
		// 		this.error = this.parseError(error);
		// 	}
		// },
		// async fetchUser() {
		// 	try {
		// 		const { data } = await api.get("/user");
		// 		this.user = data;
		// 	} catch (error) {
		// 		console.error("Fetch user error:", error);
		// 		this.logout();
		// 	}
		// },
		// async logout() {
		// 	try {
		// 		await api.post("/logout");
		// 	} catch (error) {
		// 		console.error("Logout error:", error);
		// 	} finally {
		// 		this.token = null;
		// 		this.user = null;
		// 		localStorage.removeItem("token");
		// 		router.push("/");
		// 	}
		// },
		// parseError(error: any): string {
		// 	if (
		// 		error.response &&
		// 		error.response.data &&
		// 		error.response.data.message
		// 	) {
		// 		return error.response.data.message;
		// 	}
		// 	return "An error occurred. Please try again.";
		// },
	},
});