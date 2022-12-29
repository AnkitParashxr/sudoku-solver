const puzzleboard = document.querySelector("#puzzle");
const solvebutton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution");
const numberArray = [];
let squares = 81;

for (let i = 0; i < squares; i++) {
  const inputElement = document.createElement("input");
  inputElement.setAttribute("type", "number");
  inputElement.setAttribute("min", "0");
  inputElement.setAttribute("max", "9");
  if (
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
    ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && i > 27 && i < 53) ||
    ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
    ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
  ) {
    inputElement.classList.add("odd-section");
  }
  puzzleboard.appendChild(inputElement);
}

const joinValues = function () {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.value) {
      // if value is an number then we add that number and if it is not an number then we add "."
      numberArray.push(parseInt(input.value));
      input.classList.add("user");
      //solutionDisplay.innerHTML = "Thsi the Answer";
    } else {
      numberArray.push(0);
    }
  });
  console.log(numberArray);
};

// for populating the values
const populateValues = (response) => {
  const inputs = document.querySelectorAll("input");
  let i = 0;
  if (response) {
    inputs.forEach((input) => {
      input.value = response[i++].toString();
    });
  }
  document.body.style.background = "#ADE792";
  //solutionDisplay.innerHTML = "This is the answer";
};

// getting our data from API
const solve = async () => {
  joinValues();
  const options = {
    method: "POST",
    url: "https://sudoku-solver3.p.rapidapi.com/sudokusolver/",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "08c0cca683msha7ea122f08a9617p175f1cjsn27791855dadf",
      "X-RapidAPI-Host": "sudoku-solver3.p.rapidapi.com",
    },
    data: { input: numberArray },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
      populateValues(response.data.answer);
    })
    .catch(function (error) {
      console.error(error);
    });
};

solvebutton.addEventListener("click", solve);
