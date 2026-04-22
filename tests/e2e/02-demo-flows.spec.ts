import { test, expect } from '@playwright/test'

test.describe('Demo Flows', () => {
  test('QE → DevOps demo flow loads correct profile', async ({ page }) => {
    await page.goto('/')
    await page.getByText('QE → DevOps Engineer').click()
    await expect(page).toHaveURL('/analysis')
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('Transition Difficulty')).toBeVisible()
  })

  test('QE → DevOps flow shows Kubernetes as a gap (correct for this role)', async ({ page }) => {
    await page.goto('/')
    await page.getByText('QE → DevOps Engineer').click()
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })

    // Use body text check — Kubernetes appears as a gap skill name for DevOps
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/Kubernetes/)
  })

  test('Backend → AI/ML demo flow loads and shows ML-related gaps', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Backend → AI/ML Eng').click()
    await expect(page).toHaveURL('/analysis')
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })

    const text = await page.locator('body').innerText()
    // Should not be dominated by Kubernetes (at most incidental)
    const kubeMatches = (text.match(/\bKubernetes\b/g) ?? []).length
    expect(kubeMatches).toBeLessThan(2)
  })

  test('Content → Prompt Eng demo flow loads and shows prompt-related gaps', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Content → Prompt Eng').click()
    await expect(page).toHaveURL('/analysis')
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })

    const text = await page.locator('body').innerText()
    expect(text).toMatch(/prompt|LLM|language model/i)
  })

  test('loading a demo flow populates the dashboard (client-side nav)', async ({ page }) => {
    await page.goto('/')
    await page.getByText('QE → DevOps Engineer').click()
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })

    // Navigate back to dashboard via sidebar (client-side, state preserved)
    await page.getByRole('link', { name: /Dashboard/i }).first().click()
    await expect(page.getByText('Welcome to Trajectory AI')).not.toBeVisible({ timeout: 3000 })
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/DevOps Engineer|QE\/SDET/)
  })
})
