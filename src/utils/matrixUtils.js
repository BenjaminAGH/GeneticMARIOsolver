import fs from 'fs';

function readMatrix(filename) {
    const content = fs.readFileSync(filename, 'utf-8').trim().split('\n');
    const rows = parseInt(content[0], 10);
    const cols = parseInt(content[1], 10);
    const matrix = content.slice(2).map(row => row.trim().split(/\s+/).map(Number));
    return { rows, cols, matrix };
}

function printMatrix(matrix, position) {
    const matrixCopy = matrix.map(row => 
        row.map(value => {
            if (value === 0) return '◦';
            if (value === 1) return '■';
            if (value === 2) return '☹';
            return value; 
        })
    );
    matrixCopy[position.y][position.x] = 'M'; 
    console.log("--------------------");
    console.log(matrixCopy.map(row => row.join(' ')).join('\n'));
    console.log("--------------------");
}


export { readMatrix, printMatrix };