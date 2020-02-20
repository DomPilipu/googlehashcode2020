import fs from 'fs';
import path from 'path';
import { Context } from './Context';
import { Library } from './Library';

export function parseInput(fileName: string): Context {
    const filePath: string = path.join('input', fileName);
    const content: string = fs.readFileSync(filePath, { encoding: 'utf8' });
    const [firstLine, secondLine, ...lines] = content.split('\n');
    const [totalBooks, totalLibraries, daysForScanning] = splitAndParseInt(firstLine);
    const books: number[] = splitAndParseInt(secondLine);
    const libraries: Library[] = [];

    for (let i = 0; i < lines.length - 1; i += 2) {
        const libraryContext: string = lines[i];
        const libraryBooks: string = lines[i + 1];
        const library: Library = parseLibrary(libraryContext, libraryBooks);

        libraries.push(library);
    }

    return new Context(
        totalBooks, totalLibraries, daysForScanning, books, libraries
    );
}

function parseLibrary(libraryContext: string, libraryBooks: string): Library {
    const [totalBooks, signupProcess, shippingSpeed] = splitAndParseInt(libraryContext);
    const books: number[] = splitAndParseInt(libraryBooks);

    return new Library(
        totalBooks, signupProcess, shippingSpeed, books
    );
}

function splitAndParseInt(input: string): number[] {
    return input
        .split(' ')
        .map((part: string) => Number.parseInt(part, 10));
}
