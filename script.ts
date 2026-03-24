// script.ts

// Get references to the display and history div
let display = document.getElementById("display") as HTMLInputElement;
let historyDiv = document.getElementById("history") as HTMLDivElement;

// Array to store calculation history
let calcHistory: string[] = [];

// Function to handle button presses
export function press(value: string): void {
    display.value += value;
}

// Function to clear the display
export function clearDisplay(): void {
    display.value = "";
}

// Function to perform calculation
export function calculate(): void {
    try {
        const expression = display.value;

        // Only allow numbers, operators, and dot
        if (!/^[0-9+\-*/. ]+$/.test(expression)) {
            throw new Error("Invalid input");
        }

        // Safe evaluation
        let result = Function(`return ${expression}`)();

        // Add to history (keep last 5 calculations)
        calcHistory.push(expression + " = " + result);
        if (calcHistory.length > 5) {
            calcHistory.shift();
        }

        updateHistory();

        display.value = result.toString();
    } catch {
        display.value = "Error";
    }
}

// Function to update history panel
function updateHistory(): void {
    historyDiv.innerHTML = calcHistory.join("<br>");
}