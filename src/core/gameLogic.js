import { printMatrix } from "../utils/matrixUtils.js";

function findMarioPosition(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 3) {
                return { x, y };
            }
        }
    }
    throw new Error("Mario's starting position (3) not found.");
}

function applyGravity(matrix, position) {
    while (
        position.y < matrix.length - 1 &&
        (matrix[position.y + 1][position.x] === 0 || matrix[position.y + 1][position.x] === 2)
    ) {
        position.y++;

        if (matrix[position.y][position.x] === 2) {
            console.log("Mario encountered an enemy and defeated it.");
            matrix[position.y][position.x] = 0; 
        }

        printMatrix(matrix, position);

        if (position.y + 1 >= matrix.length || matrix[position.y + 1][position.x] === 1) {
            console.log("Mario landed on a block.");
            break;
        }

        if (position.y + 1 === matrix.length - 1) {
            console.log("Mario fell into the void.");
            throw new Error("Game over.");
        }
    }
    return position;
}

function validateCell(matrix, position) {
    const cell = matrix[position.y][position.x];
    if (cell === 1) {
        return "block"; 
    } else if (cell === 2) {
        return "enemy"; 
    }
    return "clear";
}

function distanceToGoal(position, matrix) {
    const lastColumn = matrix[0].length - 1;
    let minDistance = Infinity;

    for (let y = 0; y < matrix.length; y++) {
        const distance = Math.abs(position.x - lastColumn) + Math.abs(position.y - y);
        if (distance < minDistance) {
            minDistance = distance;
        }
    }

    return minDistance;
}

function moveMario(matrix, position, move) {
    let newPosition = { ...position };
    const initialPosition = { ...position }; 

    switch (move.toUpperCase()) {
        case 'D': 
            newPosition.x++;
            if (validateCell(matrix, newPosition) === "enemy"){
                console.log("Enemy killed Mario.");
                throw new Error("Game over.");
            }
            break;
        case 'I': 
            newPosition.x--;
            break;
        case 'S': 
            // +1 eje Y → +1 eje Y → +1 eje X → -1 eje Y → -1 eje Y
            newPosition.y--; // +1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.y--; // +1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.x++; // +1 eje X
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.y++; // -1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") {
                newPosition.y--; 
                return newPosition;
            }

            newPosition.y++; // -1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") {
                newPosition.y--;
                return newPosition;
            }
            break;
        case 'J': 
            // +1 eje Y → +1 eje X → +1 eje X → +1 eje X → -1 eje Y
            newPosition.y--; // +1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.x++; // +1 eje X
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.x++; // +1 eje X
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.x++; // +1 eje X
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") return initialPosition;

            newPosition.y++; // -1 eje Y
            printMatrix(matrix, newPosition);
            if (validateCell(matrix, newPosition) === "block") {
                newPosition.y--; 
                return newPosition;
            }
            break;
        default:
            throw new Error(`Invalid move: ${move}`);
    }

    if (
        newPosition.y < 0 ||
        newPosition.x < 0 ||
        newPosition.x >= matrix[0].length
    ) {
        console.log("Mario hit a wall or moved out of bounds. Staying in position.");
        return position;
    }

    if (matrix[newPosition.y] && matrix[newPosition.y][newPosition.x] === 2) {
        console.log("Mario killed an enemy.");
        matrix[newPosition.y][newPosition.x] = 0; 
    }

    return applyGravity(matrix, newPosition);
}


function executeInstructions(matrix, instructions) {
    const position = findMarioPosition(matrix);
    const path = instructions.split('');
    let gameFinish = false;
    let fitness;

    try {
        for (const move of path) {
            console.log(`Mario's move: ${move}`);
            Object.assign(position, moveMario(matrix, position, move));
            printMatrix(matrix, position);

            if (position.x === matrix[0].length - 1) {
                gameFinish = true;
                break;
            }
        }
    } catch (e) {
        console.error(e.message);
    }

    fitness = distanceToGoal(position, matrix);
    console.log("\n");
    console.log("Instructions: ", instructions);
    console.log(`Mario's final position: (${position.x}, ${position.y}). Distance to goal: ${fitness}`);

    if (gameFinish) {
        console.log("Congratulations! Mario reached the goal.");
    } else {
        console.log("Game over.");
    }

    return fitness;
}


export { 
    executeInstructions, 
    distanceToGoal, 
    findMarioPosition, 
    applyGravity, 
    validateCell, 
    moveMario 
};