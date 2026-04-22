import { test, expect, Page } from '@playwright/test'

async function loadQeDevopsFlow(page: Page) {
  await page.goto('/')
  await page.getByText('QE → DevOps Engineer').click()
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })
}

test.describe('Roadmap', () => {
  test('roadmap page shows phase content after loading a demo flow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    // Client-side navigate to roadmap to preserve state
    await page.getByRole('link', { name: /Roadmap/i }).first().click()
    await expect(page).toHaveURL('/roadmap')
    // QE→DevOps flow phases are labeled Foundation / Application / Mastery
    await expect(page.getByText(/Foundation|Application|Mastery/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('roadmap shows tasks in the first phase', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.getByRole('link', { name: /Roadmap/i }).first().click()
    // At least one task type badge visible
    await expect(page.getByText(/learn|build|practice|network/i).first()).toBeVisible({ timeout: 5000 })
  })

  test('roadmap page has meaningful content length', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.getByRole('link', { name: /Roadmap/i }).first().click()
    const text = await page.locator('body').innerText()
    expect(text.length).toBeGreaterThan(200)
  })

  test('dashboard 30-day quick wins shows roadmap tasks', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.getByRole('link', { name: /Dashboard/i }).first().click()
    await expect(page.getByText('30-Day Quick Wins')).toBeVisible()
  })

  test('roadmap content is role-specific for Frontend Engineer (no Kubernetes)', async ({ page }) => {
    await page.goto('/analysis')
    await page.selectOption('select:near(:text("Current Role"))', 'Backend Engineer')
    await page.selectOption('select:near(:text("Target Role"))', 'Frontend Engineer')
    await page.fill('input[type="number"]:near(:text("Years of Experience"))', '4')
    await page.fill('input[placeholder*="Transition"]', 'Moving into frontend')
    await page.getByText('Run Career Analysis').click()
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 8000 })

    // Client-side navigate to roadmap
    await page.getByRole('link', { name: /Roadmap/i }).first().click()
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/React|TypeScript|CSS|Frontend|Vite|Tailwind/i)
    expect(text).not.toMatch(/\bKubernetes\b/)
  })
})
