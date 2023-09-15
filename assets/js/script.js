const today = new Date();
const todayDay = today.getDate();
const todayMonth = today.getMonth() + 1;
const todayYear = today.getFullYear();

const inputDay = document.getElementById("day");
const inputMonth = document.getElementById("month");
const inputYear = document.getElementById("year");

const inputs = document.querySelectorAll("input[type=number]");
const results = document.querySelectorAll(".result");

function daysInMonth(month, year) {
	return new Date(year, month, 0).getDate();
}

function dayValidation() {
	const maxDay = daysInMonth(inputMonth.value, inputYear.value);

	if (inputDay.value.length === 0) {
		inputDay.parentElement.classList.add("empty");
		return false;
	} else if (inputDay.value > 31 || inputDay.value < 1) {
		inputDay.parentElement.classList.add("wrong");
		inputDay.parentElement.classList.remove("incorrect", "empty");
		return false;
	} else if (inputDay.value > maxDay) {
		inputDay.parentElement.classList.remove("wrong", "empty");
		for (const input of inputs) {
			input.parentElement.classList.add("incorrect");
		}
		return false;
	} else {
		inputDay.parentElement.classList.remove("wrong", "empty", "incorrect");
		for (const input of inputs) {
			input.parentElement.classList.remove("incorrect");
		}
		return true;
	}
}

function monthValidation() {
	if (inputMonth.value.length === 0) {
		inputMonth.parentElement.classList.add("empty");
		return false;
	} else if (inputMonth.value > 12 || inputMonth.value < 1) {
		inputMonth.parentElement.classList.add("wrong");
		inputMonth.parentElement.classList.remove("empty");
		return false;
	} else {
		inputMonth.parentElement.classList.remove("wrong", "empty");
		return true;
	}
}

function yearValidation() {
	if (inputYear.value.length === 0) {
		inputYear.parentElement.classList.add("empty");
		return false;
	} else if (inputYear.value > todayYear) {
		inputYear.parentElement.classList.add("wrong");
		inputYear.parentElement.classList.remove("empty");
		return false;
	} else {
		inputYear.parentElement.classList.remove("wrong", "empty");
		return true;
	}
}

function calculateTimePast() {
	const resultYear = todayYear - inputYear.value;
	let resultMonth;
	let resultDay;

	if (inputMonth.value > todayMonth) {
		resultYear--;
		resultMonth = 12 - inputMonth.value;
	} else {
		resultMonth = todayMonth - inputMonth.value;
	}

	if (inputDay.value > todayDay) {
		resultMonth--;
		resultDay = daysInMonth(todayMonth, todayYear) - inputDay.value;
	} else {
		resultDay = todayDay - inputDay.value;
	}

	return { resultYear, resultMonth, resultDay };
}

document.addEventListener("submit", (e) => {
	e.preventDefault();

	dayValidation();
	monthValidation();
	yearValidation();

	if (
		dayValidation() === true &&
		monthValidation() === true &&
		yearValidation() === true
	) {
		const { resultYear, resultMonth, resultDay } = calculateTimePast();
		results[0].innerText = resultYear;
		results[1].innerText = resultMonth;
		results[2].innerText = resultDay;
	} else {
		results[0].innerText = "--";
		results[1].innerText = "--";
		results[2].innerText = "--";
	}
});
