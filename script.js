const themeIcon = document.getElementById("theme-icon");
const body = document.querySelector("body");

// Cambiar entre temas
themeIcon.addEventListener("click", () => {
  body.classList.toggle("dark-theme");

  if (body.classList.contains("dark-theme")) {
    themeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    themeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

const resultDisplay = document.getElementById("result");
const operationDisplay = document.getElementById("operation");
let currentOperation = "";
let currentValue = "0";

function formatNumber(value) {
  if (value.startsWith(".")) {
    return "0" + value;
  }
  return value;
}

function updateDisplay() {
  resultDisplay.textContent = formatNumber(currentValue || "0");
  operationDisplay.textContent = formatNumber(currentOperation);
}

function handleButtonClick(event) {
  const button = event.target;
  const action = button.getAttribute("data-action");
  const value = button.getAttribute("data-value");

  if (action) {
    if (action === "clear") {
      currentOperation = "";
      currentValue = "0";
    } else if (action === "invert") {
      currentValue = (parseFloat(currentValue) * -1).toString();
    } else if (action === "percent") {
      currentValue = (parseFloat(currentValue) / 100).toString();
    } else if (action === "delete") {
      currentValue = currentValue.slice(0, -1) || "0";
    } else if (action === "equals") {
      try {
        if (currentOperation && currentValue) {
          currentOperation += currentValue;
        }
        currentValue = eval(
          currentOperation.replace("÷", "/").replace("×", "*")
        ).toString();
        currentOperation = "";
      } catch {
        currentValue = "Error";
        currentOperation = "";
      }
    } else {
      if (currentValue !== "") {
        let operator = button.textContent;

        if (operator === "−") operator = "-";
        if (operator === "×") operator = "*";
        if (operator === "÷") operator = "/";

        currentOperation += currentValue + ` ${operator} `;
        currentValue = "";
      }
    }
  } else if (value) {
    if (currentValue === "0" && value !== ".") {
      currentValue = value;
    } else if (value === "." && currentValue.includes(".")) {
      return;
    } else {
      currentValue += value;
    }
  }

  updateDisplay();
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
});

updateDisplay();
