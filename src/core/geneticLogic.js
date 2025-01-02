import { numberToInstructions } from '../utils/gameUtils.js';
import { executeInstructions } from './gameLogic.js';

function generateRandomInstructions(length) {
    const instructions = [];
    for (let i = 0; i < length; i++) {
        instructions.push(Math.floor(Math.random() * 3));
    }
    return instructions;
}

function generateRandomPopulation(populationSize, length) {
    const population = [];
    for (let i = 0; i < populationSize; i++) {
        population.push(generateRandomInstructions(length));
    }
    return population;
}

function evaluateFitness(matrix, population) {
    return population.map(individual => {
        const instructions = numberToInstructions(individual);
        const fitness = executeInstructions(matrix, instructions);
        return { individual, fitness };
    });
}

function selectParents(fitnessPopulation) {
    fitnessPopulation.sort((a, b) => a.fitness - b.fitness);
    return fitnessPopulation.slice(0, 2).map(parent => parent.individual);
}

function crossover(parent1, parent2) {
    const point = Math.floor(Math.random() * parent1.length);
    const child1 = parent1.slice(0, point).concat(parent2.slice(point));
    const child2 = parent2.slice(0, point).concat(parent1.slice(point));
    return [child1, child2];
}

function mutate(individual, mutationRate) {
    return individual.map(gene => (Math.random() < mutationRate ? Math.floor(Math.random() * 3) : gene));
}

function geneticAlgorithm(matrix, populationSize, generations, mutationRate) {
    const length = matrix[0].length + matrix.length;
    let population = generateRandomPopulation(populationSize, length);

    for (let generation = 0; generation < generations; generation++) {
        const fitnessPopulation = evaluateFitness(matrix, population);

        console.log(`Generation ${generation}, Best fitness: ${fitnessPopulation[0].fitness}`);

        const [parent1, parent2] = selectParents(fitnessPopulation);
        const newPopulation = [];

        while (newPopulation.length < populationSize) {
            const [child1, child2] = crossover(parent1, parent2);
            newPopulation.push(mutate(child1, mutationRate));
            if (newPopulation.length < populationSize) {
                newPopulation.push(mutate(child2, mutationRate));
            }
        }

        population = newPopulation;

        if (fitnessPopulation[0].fitness === 0) {
            console.log('Optimal solution found!');
            break;
        }
    }

    const bestSolution = evaluateFitness(matrix, population).sort((a, b) => a.fitness - b.fitness)[0];
    return bestSolution;
}


export { 
    generateRandomPopulation, 
    evaluateFitness, 
    selectParents, 
    crossover, 
    mutate,
    geneticAlgorithm
};