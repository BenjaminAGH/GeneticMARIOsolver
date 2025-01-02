import { findMarioPosition } from './core/gameLogic.js';
import { numberToInstructions } from './utils/gameUtils.js';
import { readMatrix, printMatrix } from './utils/matrixUtils.js';
import { geneticAlgorithm, generateRandomPopulation } from './core/geneticLogic.js';
import { generateLatexReport } from './utils/generateReport.js';

const args = process.argv.slice(2);
const populationSize = parseInt(args[0]) || 20;
const generations = parseInt(args[1]) || 100;
const mutationRate = parseFloat(args[2]) || 0.1;

console.log(`Population Size: ${populationSize}, Generations: ${generations}, Mutation Rate: ${mutationRate}`);

const { rows, cols, matrix } = readMatrix('src/assets/world.txt');
printMatrix(matrix, findMarioPosition(matrix));

const initialPopulation = generateRandomPopulation(populationSize, matrix[0].length + matrix.length);

const { bestSolution, generationDetails } = geneticAlgorithm(matrix, populationSize, generations, mutationRate);

console.log('Best solution:', numberToInstructions(bestSolution.individual));
console.log('Fitness:', bestSolution.fitness);

generateLatexReport(matrix, initialPopulation, generationDetails, bestSolution);
