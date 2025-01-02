import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url'; 
import { numberToInstructions } from './gameUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateLatexReport(initialMatrix, initialPopulation, generationDetails, bestSolution) {
    const outputDir = path.join(__dirname, '../output');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const texFilePath = path.join(outputDir, 'GeneticAlgorithmReport.tex');
    const pdfFilePath = path.join(outputDir, 'GeneticAlgorithmReport.pdf');

    let latexContent = `
\\documentclass[a4paper,12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage{amsmath}
\\usepackage{geometry}
\\geometry{margin=1in}
\\title{\\textbf{Informe Resultado}}
\\author{Mario Genetic Algorithm}
\\date{}

\\begin{document}
\\maketitle

\\section*{Matriz Inicial}
\\begin{verbatim}
${initialMatrix.map(row => row.join(' ')).join('\n')}
\\end{verbatim}

\\section*{Población Inicial}
${initialPopulation.map((ind, i) => `GEN ${i + 1} ${numberToInstructions(ind)}`).join('\n\n')}

\\section*{Evolución por Generaciones}
${generationDetails.map(detail => `
\\subsection*{Generación ${detail.generation}}
${detail.population.map((ind, i) => `GEN ${i + 1} ${numberToInstructions(ind.instructions)} Fitness: ${ind.fitness}`).join('\n\n')}
`).join('')}

\\section*{Mejor Solución}
\\textbf{${numberToInstructions(bestSolution.individual)}} \\newline
Fitness: ${bestSolution.fitness}

\\end{document}
`;

    fs.writeFileSync(texFilePath, latexContent);
    console.log(`Archivo LaTeX generado: ${texFilePath}`);

    try {
        execSync(`pdflatex -output-directory=${outputDir} -interaction=nonstopmode ${texFilePath}`);
        console.log(`PDF generado: ${pdfFilePath}`);
    } catch (error) {
        console.error('Error al compilar el archivo .tex:', error);
    }
}

export { generateLatexReport };
