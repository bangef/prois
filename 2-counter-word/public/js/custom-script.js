const counterInput = document.querySelector("#counterbox__textarea__input");
const word = document.querySelector("#counterbox__counter__word__output");
const char = document.querySelector("#counterbox__counter__char__output");

let temp = "";

const convertToWord = (temp) => {
	const newStr = temp
		.replace(/ +/g, " ")
		.split(" ")
		.filter((e) => e != "");
	return newStr.length;
};

const convertToChar = (temp) => temp.split("").filter((e) => e != " ").length;

const filtering = (eData) => {
	if (eData != null) {
		temp += eData;
		temp;
	} else {
		let deleteStr = temp.split("");
		deleteStr.pop();
		temp = deleteStr.join("");
	}
};

const updateUiWord = () => {
	word.innerHTML = convertToWord(temp);
};

const updateUiChar = () => {
	char.innerHTML = convertToChar(temp);
};

counterInput.addEventListener("input", function (e) {
	filtering(e.data);
	updateUiWord();
	updateUiChar();
});

const getKeyA = (e) => {
	if ((e.ctrlKey && e.keyCode == 65) || e.keyCode == 97) {
		return e.code;
	} else {
		return false;
	}
};

const keyIsCTRLV = (e) => {
	if (e.ctrlKey && e.keyCode == 86) {
		return "true";
	} else {
		return "false";
	}
};

const keyIsCtrlABackspace = () =>
	new Promise((resolve) => {
		counterInput.addEventListener("keydown", (e) => {
			if (e.ctrlKey && e.keyCode == 65) {
				resolve(
					new Promise((resolve) => {
						counterInput.addEventListener("keydown", (e) => {
							if (e.keyCode == 8) {
								resolve("berhasil");
							}
						});
					})
				);
			}
		});
	});

counterInput.addEventListener("keydown", async function (e) {
	let isKeyV = keyIsCTRLV(e);
	if (isKeyV == "true") {
		temp += await navigator.clipboard.readText().then((response) => response);
		updateUiWord();
		updateUiChar();
	}
	let isKeyA = await keyIsCtrlABackspace(this).then((response) => response);
	isKeyA == "berhasil" ? (temp = "") : temp;
});
