import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/');
});

const validPlaceCommands = [
    'PLACE 0,0,NORTH,WHITE',
    'PLACE 7,4,SOUTH,BLACK',
    'PLACE 2,2,EAST,WHITE',
    'PLACE 3,1,WEST,BLACK'
];

const rotationMap = {
    'NORTH': '0',
    'EAST': '90',
    'SOUTH': '-180',
    'WEST': '-90'
}

test.describe('Valid PLACE Commands', () => {
    for (const command of validPlaceCommands) {
        test(`should place pawn correctly with command: ${command}`, async ({ page }) => {
            const inputBox = page.getByPlaceholder('e.g. PLACE 0,1,NORTH,WHITE');
            await inputBox.fill(command);
            await page.click('button:has-text("Submit")');
            
            const args = command.split(' ')[1].split(',');
            const x = args[0];
            const y = args[1];
            const direction = args[2];
            const targetSquare = page.getByTestId(`square-${x}-${y}`)
            await expect(targetSquare).toBeVisible();

            const pawnImg = targetSquare.locator('img');
            await expect(pawnImg).toBeVisible();
            await expect(pawnImg).toHaveCSS('rotate', `${rotationMap[direction]}deg`); // Check if rotated correctly
        });
    }

    test('should not place multiple pawns on the board', async ({ page }) => {
        const inputBox = page.getByPlaceholder('e.g. PLACE 0,1,NORTH,WHITE');
        await inputBox.fill('PLACE 1,1,NORTH,WHITE');
        await page.click('button:has-text("Submit")');

        await inputBox.fill('PLACE 2,2,SOUTH,BLACK');
        await page.click('button:has-text("Submit")');

        const firstPawnSquare = page.getByTestId('square-1-1').locator('img');
        const secondPawnSquare = page.getByTestId('square-2-2').locator('img');

        await expect(firstPawnSquare).not.toBeVisible();
        await expect(secondPawnSquare).toBeVisible();
    }); 
});

const invalidPlaceCommands = [
    'PLACE 8,0,NORTH,WHITE',
    'PLACE -1,4,SOUTH,BLACK',
    'PLACE 2,2,UP,WHITE',
    'PLACE 3,1,WEST,BLUE',
    'PLACE 3,1,WEST',
    'PLACE 3,1'
];

test.describe('Invalid PLACE Commands', () => {
    for (const command of invalidPlaceCommands) {
        test(`should show alert for invalid command: ${command}`, async ({ page }) => {
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('Invalid'); // Can test for specific error messages if needed
                await dialog.dismiss();
            });

            const inputBox = page.getByPlaceholder('e.g. PLACE 0,1,NORTH,WHITE');
            await inputBox.fill(command);
            await page.click('button:has-text("Submit")');
        });
    }
});


const validMoveCommands = [
    { place: 'PLACE 0,1,NORTH,WHITE', move: 'MOVE 2', expectedPos: '0,3' },
    { place: 'PLACE 4,4,SOUTH,BLACK', move: 'MOVE 1', expectedPos: '4,3' },
    { place: 'PLACE 2,2,EAST,WHITE', move: 'MOVE 2', expectedPos: '4,2' },
    { place: 'PLACE 5,5,WEST,BLACK', move: 'MOVE', expectedPos: '4,5' }
];

test.describe('Valid MOVE Commands', () => {
    for (const command of validMoveCommands) {
        test(`should move pawn correctly with commands: ${command.place} and ${command.move}`, async ({ page }) => {
            const inputBox = page.getByPlaceholder('e.g. PLACE 0,1,NORTH,WHITE');
            await inputBox.fill(command.place);
            await page.click('button:has-text("Submit")');

            await inputBox.fill(command.move);
            await page.click('button:has-text("Submit")');

            const args = command.expectedPos.split(',');
            const x = args[0];
            const y = args[1];
            const targetSquare = page.getByTestId(`square-${x}-${y}`);
            await expect(targetSquare).toBeVisible();

            const pawnImg = targetSquare.locator('img');
            await expect(pawnImg).toBeVisible();
        });
    }
});

const invalidMoveCommands = [
    { move: 'MOVE 10'},
    { move: 'MOVE -3'},
    { move: 'MOVE 0'}
]

test.describe('Invalid MOVE Commands', () => {
    for (const command of invalidMoveCommands) {
        test(`should show alert for invalid move command: ${command.move}`, async ({ page }) => {
            page.on('dialog', async dialog => {
                expect(dialog.message()).toContain('Invalid'); // Can test for specific error messages if needed
                await dialog.dismiss();
            });

            const inputBox = page.getByPlaceholder('e.g. PLACE 0,1,NORTH,WHITE');
            await inputBox.fill('PLACE 3,3,NORTH,WHITE');
            await page.click('button:has-text("Submit")');

            await inputBox.fill(command.move);
            await page.click('button:has-text("Submit")');
        });
    }
});