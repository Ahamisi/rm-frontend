import axios from "axios";
import { useAuthStore } from "@/stores/auth";
import { MOCK_ENABLED, mockApiCall } from "./mock";

// Create Axios instance
const api = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "/api",
	withCredentials: false,
	headers: { Accept: "application/json" },
});

// Add mock interceptor FIRST (before auth interceptor)
if (MOCK_ENABLED) {
	api.interceptors.request.use(async (config) => {
		try {
			const mockResponse = await mockApiCall(config);
			// Return a resolved promise that axios will treat as a response
			return Promise.reject({
				response: mockResponse,
				config,
				isAxiosError: true,
				toJSON: () => ({}),
				name: 'MockResponse',
				message: 'Mock response',
			});
		} catch (error) {
			// If mock fails or is not enabled, continue with real request
			return config;
		}
	});

	// Handle mock responses in response interceptor
	api.interceptors.response.use(
		(response) => response,
		(error) => {
			// If it's a mock response, return it as successful
			if (error.name === 'MockResponse' && error.response) {
				return Promise.resolve(error.response);
			}
			// Otherwise, handle as normal error
			return Promise.reject(error);
		}
	);
}

// Add token to requests
api.interceptors.request.use((config) => {
	const authStore = useAuthStore();
	const token = authStore.token;
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
		(window as any).axios = axios;
		(window as any).axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;		
	}

	return config;
});

// Global error handling
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			const authStore = useAuthStore();
			await authStore.logout();
		}
		return Promise.reject(error);
	}
);

// 🔹 Helper: create a temporary Axios instance with a dynamic base URL
export function createApiWithBaseUrl(tempBaseUrl: string) {
	const instance = axios.create({
		baseURL: tempBaseUrl,
		withCredentials: false,
		headers: { Accept: "application/json" },
	});

	// Add mock interceptor for dynamic instances too
	if (MOCK_ENABLED) {
		instance.interceptors.request.use(async (config) => {
			try {
				const mockResponse = await mockApiCall(config);
				return Promise.reject({
					response: mockResponse,
					config,
					isAxiosError: true,
					toJSON: () => ({}),
					name: 'MockResponse',
					message: 'Mock response',
				});
			} catch (error) {
				return config;
			}
		});

		instance.interceptors.response.use(
			(response) => response,
			(error) => {
				if (error.name === 'MockResponse' && error.response) {
					return Promise.resolve(error.response);
				}
				return Promise.reject(error);
			}
		);
	}

	// Optional: Add token like default api
	instance.interceptors.request.use((config) => {
		const authStore = useAuthStore();
		const token = authStore.token;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	});

	return instance;
}

export default api;
