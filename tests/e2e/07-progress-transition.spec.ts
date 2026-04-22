import { test, expect, Page } from '@playwright/test'

async function loadQeDevopsFlow(page: Page) {
  await page.goto('/')
  await page.getByText('QE → DevOps Engineer').click()
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })
}

test.describe('Transition & Progress', () => {
  test('transition page loads after demo flow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/transition')
    const text = await page.locator('body').innerText()
    expect(text.length).toBeGreaterThan(50)
  })

  test('transition page shows strategy content', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/transition')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/strategy|plan|step|milestone|gap|skill/i)
  })

  test('progress page shows readiness score', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/progress')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/readiness|progress|module|score/i)
  })

  test('industry shift page loads and shows role data', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.goto('/industry')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/skill|trend|AI|rising|declining|impact/i)
  })

  test('dashboard shows critical skill gaps (not empty)', async ({ page }) => {
    await loadQeDevopsFlow(page)
    // Client-side nav preserves Zustand state
    await page.getByRole('link', { name: /Dashboard/i }).first().click()
    await expect(page.getByText('Critical Skill Gaps')).toBeVisible({ timeout: 5000 })
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/critical|moderate|minor/i)
  })

  test('dashboard shows transition role header', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await page.getByRole('link', { name: /Dashboard/i }).first().click()
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/QE\/SDET|DevOps Engineer/)
  })
})
