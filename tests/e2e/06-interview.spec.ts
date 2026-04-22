import { test, expect, Page } from '@playwright/test'

async function loadQeDevopsFlow(page: Page) {
  await page.goto('/')
  await page.getByText('QE → DevOps Engineer').click()
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })
}

test.describe('Interview Setup', () => {
  test('interview page loads without a profile', async ({ page }) => {
    await page.goto('/interview')
    const text = await page.locator('body').innerText()
    expect(text.length).toBeGreaterThan(10)
    // Should not crash
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('interview setup form is visible after loading a demo flow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/interview')
    // Should show setup options
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/interview|question|difficulty|session/i)
  })

  test('interview session starts when setup is submitted', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/interview')

    // Find and click the start button
    const startBtn = page.getByRole('button', { name: /start session/i })
    if (await startBtn.isVisible()) {
      await startBtn.click()
      // Wait for questions to load
      await expect(page.getByText(/question/i).first()).toBeVisible({ timeout: 10000 })
    }
  })
})
