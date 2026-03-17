import { test, expect } from '@playwright/test';

test('navigate to pawn structure minigame and check content', async ({ page }) => {
  await page.goto('http://localhost:3000/minigames/pawn-structure');
  await expect(page.locator('h2', { hasText: 'Ruptura de Peones' })).toBeVisible();
});

test('navigate to knight outposts minigame and check content', async ({ page }) => {
  await page.goto('http://localhost:3000/minigames/knight-outposts');
  await expect(page.locator('h2', { hasText: 'Puesto Avanzado de Caballo' })).toBeVisible();
});

test('play memorize positions minigame', async ({ page }) => {
  await page.goto('http://localhost:3000/minigames/memorize-positions');
  await expect(page.locator('h2', { hasText: 'Visión del Tablero' })).toBeVisible();
  await expect(page.locator('text=Encuentra la casilla:')).toBeVisible();

  // Try clicking a square to ensure it registers (even if incorrect)
  await page.locator('div[data-square="e4"]').click();
  // Expect either Correcto or Incorrecto to appear
  await expect(page.locator('text=Racha actual:')).toBeVisible();
});
