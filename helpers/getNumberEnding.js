export const getEndingForNumber = n => {
	let ending;
	if (n % 100 >= 10 && n % 100 <= 20) ending = "ов";
	else {
		const lastDigit = n % 10;
		if (lastDigit === 1) ending = "";
		else if (lastDigit >= 2 && lastDigit <= 4) ending = "а";
		else if (lastDigit === 0 || (lastDigit >= 5 && lastDigit <= 9))
			ending = "ов";
	}

	return ending;
};