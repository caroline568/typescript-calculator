"use strict";
// script.ts
exports.__esModule = true;
exports.calculate = exports.clearDisplay = exports.press = void 0;
// Get references to the display and history div
var display = document.getElementById("display");
var historyDiv = document.getElementById("history");
// Array to store calculation history
var calcHistory = [];
// Function to handle button presses
function press(value) {
    display.value += value;
}
exports.press = press;
// Function to clear the display
function clearDisplay() {
    display.value = "";
}
exports.clearDisplay = clearDisplay;
// Function to perform calculation
function calculate() {
    try {
        var expression = display.value;
        // Only allow numbers, operators, and dot
        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }
        // Safe evaluation
        var result = Function("return ".concat(expression))();
        // Add to history (keep last 5 calculations)
        calcHistory.push(expression + " = " + result);
        if (calcHistory.length > 5) {
            calcHistory.shift();
        }
        updateHistory();
        display.value = result.toString();
    }
    catch (_a) {
        display.value = "Error";
    }
}
exports.calculate = calculate;
// Function to update history panel
function updateHistory() {
    historyDiv.innerHTML = calcHistory.join("<br>");
}
