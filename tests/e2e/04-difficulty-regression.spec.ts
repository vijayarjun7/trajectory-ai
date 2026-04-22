/**
 * Regression tests for the "always shows Challenging" transition difficulty bug.
 * Difficulty must vary based on years of experience.
 */
import { test, expect, Page } from '@playwright/test'

async function runAnalysisWithYears(page: Page, years: number) {
  await page.goto('/analysis')
  await page.selectOption('select:near(:text("Current Role"))', 'Backend Engineer')
  await page.selectOption('select:near(:text("Target Role"))', 'Frontend Engineer')
  await page.fill('input[type="number"]:near(:text("Years of Experience"))', String(years))
  await page.fill('input[placeholder*="Transition from"]', 'Switching to frontend development')
  await page.getByText('Run Career Analysis').click()
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 8000 })
}

test.describe('Transition Difficulty Regression', () => {
  test('transition difficulty is visible on the analysis page', async ({ page }) => {
    await runAnalysisWithYears(page, 3)
    await expect(page.getByText('Transition Difficulty')).toBeVisible()
  })

  test('1 year experience shows very-challenging or challenging', async ({ page }) => {
    await runAnalysisWithYears(page, 1)
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/very-challenging|challenging/i)
  })

  test('3 years experience shows challenging', async ({ page }) => {
    await runAnalysisWithYears(page, 3)
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/challenging/i)
  })

  test('8 years experience shows moderate', async ({ page }) => {
    await runAnalysisWithYears(page, 8)
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/moderate/i)
  })

  test('difficulty changes between 1-year and 8-year profiles', async ({ page }) => {
    await runAnalysisWithYears(page, 1)
    const lowExpText = await page.locator('body').innerText()

    await runAnalysisWithYears(page, 8)
    const highExpText = await page.locator('body').innerText()

    const lowDiff = lowExpText.match(/very-challenging|challenging|moderate|easy/i)?.[0]
    const highDiff = highExpText.match(/very-challenging|challenging|moderate|easy/i)?.[0]

    // They must differ
    expect(lowDiff).not.toEqual(highDiff)
  })

  test('difficulty also shows on the dashboard after analysis', async ({ page }) => {
    await runAnalysisWithYears(page, 5)
    // Client-side nav preserves Zustand state (full reload would reset it)
    await page.getByRole('link', { name: /Dashboard/i }).first().click()
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/transition difficulty/i)
  })
})
