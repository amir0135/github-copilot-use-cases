// The code below is a simple function that compares three numbers 
// and returns the sum of the positive ones.

/**
 * Calculates the sum of all positive numbers from the given parameters.
 * @param numbers - Variable number of numeric arguments to sum
 * @returns The sum of all positive numbers, or 0 if none are positive
 */
function sumPositiveNumbers(...numbers: number[]): number {
    return numbers
        .filter(num => num > 0)
        .reduce((sum, num) => sum + num, 0);
}

// Alternative implementation for exactly three parameters with explicit validation
function sumPositiveNumbersThree(a: number, b: number, c: number): number {
    // Input validation to prevent NaN or infinite values
    const validNumbers = [a, b, c].filter(num => 
        typeof num === 'number' && 
        isFinite(num) && 
        num > 0
    );
    
    return validNumbers.reduce((sum, num) => sum + num, 0);
}

// Usage examples:
// sumPositiveNumbers(1, 2, 3) // Returns: 6
// sumPositiveNumbers(-1, 2, -3) // Returns: 2
// sumPositiveNumbers(-1, -2, -3) // Returns: 0
// sumPositiveNumbers(5, -2, 8, 1) // Returns: 14 (works with any number of arguments)

// Prompt in Ask: Refactor the code to make it more readable and effective.