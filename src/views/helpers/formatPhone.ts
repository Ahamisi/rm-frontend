export function formatPhone(phone: string, countryCode = '+234') {
	let formatted = phone.trim();
	formatted = formatted.replace(/\s+/g, '');
	const cc = countryCode.replace('+', '');
	if (formatted.startsWith(`+${cc}`)) {
	  formatted = formatted.slice(cc.length + 1);
	} else if (formatted.startsWith(cc)) {
	  formatted = formatted.slice(cc.length);
	}
  	formatted = formatted.replace(/^0+/, '');

	return formatted;
  }
