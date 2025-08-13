export const truncate = (text: string, length: number, suffix = "...") => {
	if (text.length > length) {
		return text.substring(0, length) + suffix;
	}
	return text;
};
