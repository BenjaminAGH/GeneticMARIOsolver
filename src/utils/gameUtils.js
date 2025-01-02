
function instructionstoNumber(instructions) {
    const instructionsArray = instructions.split('');
    const instructionsNumber = instructionsArray.map(instruction => {
        switch (instruction) {
            case 'D':
                return 0;
            case 'S':
                return 1;
            case 'J':
                return 2;
        }
    });
    return instructionsNumber;
}

function numberToInstructions(instructionsNumber) {
    const instructionsArray = instructionsNumber.map(instruction => {
        switch (instruction) {
            case 0:
                return 'D';
            case 1:
                return 'S';
            case 2:
                return 'J';
        }
    });
    return instructionsArray.join('');
}

export { 
    instructionstoNumber, 
    numberToInstructions 
};