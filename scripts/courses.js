// function from https://stackoverflow.com/a/14991797
function parseCSV(str) {
    const arr = [];
    let quote = false;
	for (let row = 0, col = 0, c = 0; c < str.length; c++) {
        let cc = str[c], nc = str[c+1];
        arr[row] = arr[row] || [];
        arr[row][col] = arr[row][col] || "";
        if (cc == '"' && quote && nc == '"') { arr[row][col] += cc; ++c; continue; }
        if (cc == '"') { quote = !quote; continue; }
        if (cc == ',' && !quote) { ++col; continue; }
        if (cc == '\r' && nc == '\n' && !quote) { ++row; col = 0; ++c; continue; }
        if (cc == '\n' && !quote) { ++row; col = 0; continue; }
        if (cc == '\r' && !quote) { ++row; col = 0; continue; }
        arr[row][col] += cc;
    }
    return arr;
}

// global variable to store course list
let courseList = [];

// load course-list.csv in background
fetch("data/course-list.csv")
	.then(response => response.text())
	.then(text => courseList = parseCSV(text));

function loadCourses(subject) {
	const modal = document.getElementById("modal-container");
	modal.style.display = "block"; // present modal

	// wait for course list to load, in case the user clicked the button too quickly
	if (courseList.length === 0) {
		setTimeout(() => loadCourses(subject), 100);
		return;
	}

	courseList.forEach((row, rowIndex) => {
		if (rowIndex > 0 && row[10] != subject) return; // filter by subject

		const tableRow = document.createElement("tr");
		row.forEach((cell, columnIndex) => {
			if (columnIndex === 10) return; // skip subject column

			const tableEntry = document.createElement(rowIndex == 0 ? "th" : "td");
			tableEntry.textContent = cell;
			tableRow.appendChild(tableEntry);

			// centre everything after the summary column
			if (columnIndex > 2) tableEntry.style.textAlign = "center";
		});
		document.getElementById("courses-table").appendChild(tableRow);
	});

	// close modal when clicking outside of it
	modal.removeEventListener("click", closeModal); // prevent listener duplication
	modal.addEventListener("click", event => {
		if (event.target === modal) closeModal();
	});
}

function closeModal() {
	document.getElementById("modal-container").style.display = "none"; // dismiss modal
	document.getElementById("courses-table").innerHTML = ""; // clear table
}
