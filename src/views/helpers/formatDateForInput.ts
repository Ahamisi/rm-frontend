export function formatDateForInput(dateString: string): string {
	if (!!dateString) {
		return new Date(dateString).toISOString().split("T")[0];
	}
}
