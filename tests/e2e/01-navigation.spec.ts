import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('landing page shows quick start panel when no profile is set', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Welcome to Trajectory AI')).toBeVisible()
    await expect(page.getByText('Load a demo flow to get started')).toBeVisible()
  })

  test('all demo flows are listed on the landing page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('QE → DevOps Engineer')).toBeVisible()
    await expect(page.getByText('Backend → AI/ML Eng')).toBeVisible()
    await expect(page.getByText('Content → Prompt Eng')).toBeVisible()
  })

  test('sidebar navigation links are present (expanded or collapsed)', async ({ page }) => {
    await page.goto('/')
    // Sidebar links render as <a> tags. When expanded they have text content;
    // when collapsed they have a title attribute — both are matched by getByRole.
    await expect(page.getByRole('link', { name: /Career Analysis/i })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('link', { name: /Roadmap/i })).toBeVisible({ timeout: 5000 })
    await expect(page.getByRole('link', { name: /Progress/i })).toBeVisible({ timeout: 5000 })
  })

  test('/analysis route loads the profile form when no profile exists', async ({ page }) => {
    await page.goto('/analysis')
    // Section header is always rendered
    await expect(page.getByRole('heading', { name: /Career Analysis/i }).first()).toBeVisible({ timeout: 5000 })
    // Form card heading — only visible when no profile
    await expect(page.getByText('Your Career Profile', { exact: true })).toBeVisible({ timeout: 5000 })
  })

  test('/roadmap route loads without crashing', async ({ page }) => {
    await page.goto('/roadmap')
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('/interview route loads without crashing', async ({ page }) => {
    await page.goto('/interview')
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('/transition route loads without crashing', async ({ page }) => {
    await page.goto('/transition')
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('/industry route loads without crashing', async ({ page }) => {
    await page.goto('/industry')
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('/progress route loads without crashing', async ({ page }) => {
    await page.goto('/progress')
    await expect(page).not.toHaveTitle(/error/i)
  })

  test('"Enter your own profile" button navigates to /analysis', async ({ page }) => {
    await page.goto('/')
    await page.getByText('Enter your own profile').click()
    await expect(page).toHaveURL('/analysis')
    await expect(page.getByText('Your Career Profile')).toBeVisible()
  })
})
