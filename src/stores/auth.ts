import { defineStore } from "pinia";
import api from "@/api"; // Axios wrapper with interceptors
import router from "@/router";

export const useAuthStore = defineStore("auth", {
	state: () => ({
		user: null as any | null,
		token: localStorage.getItem("token") || null,
		hydrated: false, // NEW flag to prevent multiple fetches
		selectedBranch: JSON.parse(localStorage.getItem("selectedBranch") || "null"),
		error: "",
		selectedDepartment: localStorage.getItem('selectedDepartment') || null,
		departments: JSON.parse(localStorage.getItem("departments")) ?? null,
	}),
	getters: {
		isLoggedIn: (state) => !!state.token,
		hasBarcodeScanning: (state) => state.selectedBranch?.has_barcode ?? false,
	},
	actions: {
		setSelectedBranch(branch: any) {
			this.selectedBranch = branch;
			if (branch) {
				localStorage.setItem("selectedBranch", JSON.stringify(branch));
			} else {
				localStorage.removeItem("selectedBranch");
			}
		},

		async login(credentials: { phone: string; password: string; remember?: boolean }) {
			this.error = "";
			try {
				const response = await api.post("/login", credentials);
				this.setUser(response.data.user);
				this.setToken(response.data.token);
				await this.fetchUserDepartments();
				router.push("/dashboard");
			} catch (error: any) {
				this.error = this.parseError(error);
			}
		},

		async fetchUser() {
			if (this.hydrated) return; // Don't fetch twice
			this.hydrated = true;

			// Use local user if available
			if (localStorage.getItem("user") && !this.user) {
				this.user = JSON.parse(localStorage.getItem("user") as string);
				return;
			}

			try {
				const { data } = await api.get("/user");
				this.setUser(data.user);
			} catch (error: any) {
				console.error("Fetch user error:", error);
				if (error.response?.status === 401) {
					this.logout();
				}
			}
		},

		async fetchUserDepartments() {
			try {
				const { data } = await api.get("/users/departments");
				this.setDepartments(data);
			} catch (error: any) {
				console.error("Fetch user departments error:", error);
				if (error.response?.status === 401) {
					this.logout();
				}
			}
		},

		async logout() {
			this.setUser(null);
			this.setToken(null);
			this.setSelectedBranch(null);
			this.setDepartments(null);
			this.setActiveDepartment(null);
			router.push("/");
		},

		parseError(error: any): string {
			if (error.response?.data?.message) {
				return error.response.data.message;
			}
			return "An error occurred. Please try again.";
		},

		setUser(user: any) {
			this.user = user;
			if (user) {
				localStorage.setItem("user", JSON.stringify(user));
			} else {
				localStorage.removeItem("user");
			}
		},

		setToken(token: string | null) {
			this.token = token;
			if (token) {
				localStorage.setItem("token", token);
			} else {
				localStorage.removeItem("token");
			}
		},

		setDepartments(departments: any) {
			this.departments = departments;
			if (departments) {
				localStorage.setItem("departments", JSON.stringify(departments));
			} else {
				localStorage.removeItem("departments");
			}
		},

		setActiveDepartment(department: string | null) {
			this.selectedDepartment = department;
			if (department) {
				localStorage.setItem("selectedDepartment", department);
			} else {
				localStorage.removeItem("selectedDepartment");
			}
		}
	},
});
