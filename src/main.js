import { findMarioPosition } from './core/gameLogic.js';
import { numberToInstructions } from './utils/gameUtils.js';
import { readMatrix, printMatrix } from './utils/matrixUtils.js';
import {geneticAlgorithm} from './core/geneticLogic.js';

const { rows, cols, matrix } = readMatrix('src/assets/world.txt');
printMatrix(matrix, findMarioPosition(matrix));

const populationSize = 20;
const generations = 100;
const mutationRate = 0.1;

const bestSolution = geneticAlgorithm(matrix, populationSize, generations, mutationRate);

console.log('Best solution:', numberToInstructions(bestSolution.individual));
console.log('Fitness:', bestSolution.fitness);

/*
const manualInstructions = "DDDJSJSSDJJDSDDDSSSSSJJJJJJJDJJSDJJJSS";
const manualSolution = executeInstructions(matrix, manualInstructions);

DEBO MODIFICAR EL PRINT PARA QUE SEA GRAFICO
*/