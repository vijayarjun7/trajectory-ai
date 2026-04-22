/**
 * Mobile responsiveness tests.
 * All tests run at 390×844 (iPhone 14 viewport).
 */
import { test, expect, Page } from '@playwright/test'

test.use({ viewport: { width: 390, height: 844 } })

// ── Helpers ──────────────────────────────────────────────────────────────────

async function openSidebar(page: Page) {
  await page.getByRole('button', { name: /open menu/i }).click()
  // Use toBeInViewport — sidebar links are translated off-screen when closed,
  // so toBeVisible() alone does not prove the sidebar is open
  await expect(page.getByRole('link', { name: /Career Analysis/i })).toBeInViewport({ timeout: 3000 })
}

async function loadQeDevopsFlow(page: Page) {
  await page.goto('/')
  await page.getByText('QE → DevOps Engineer').click()
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 6000 })
}

// ── Sidebar / Navigation ──────────────────────────────────────────────────────

test.describe('Mobile — Sidebar & Navigation', () => {
  test('sidebar is hidden on load (not overlapping content)', async ({ page }) => {
    await page.goto('/')
    // Sidebar is closed via CSS translate on mobile — use toBeInViewport which
    // correctly detects off-screen elements (unlike toBeVisible which ignores transforms)
    await expect(page.getByRole('link', { name: /Career Analysis/i })).not.toBeInViewport()
  })

  test('hamburger button is visible on mobile', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible()
  })

  test('tapping hamburger opens the sidebar overlay', async ({ page }) => {
    await page.goto('/')
    await openSidebar(page)
    await expect(page.getByRole('link', { name: /Roadmap/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /Progress/i })).toBeVisible()
  })

  test('tapping a nav link closes the sidebar', async ({ page }) => {
    await page.goto('/')
    await openSidebar(page)
    await page.getByRole('link', { name: /Career Analysis/i }).click()
    await expect(page).toHaveURL('/analysis')
    // Sidebar translates off-screen after navigation — check with toBeInViewport
    await expect(page.getByRole('link', { name: /Roadmap/i })).not.toBeInViewport({ timeout: 3000 })
  })

  test('tapping the backdrop closes the sidebar', async ({ page }) => {
    await page.goto('/')
    await openSidebar(page)
    // Tap the right side of screen (outside the 256px sidebar width)
    await page.mouse.click(360, 400)
    await expect(page.getByRole('link', { name: /Career Analysis/i })).not.toBeInViewport({ timeout: 3000 })
  })

  test('close (X) button inside sidebar closes it', async ({ page }) => {
    await page.goto('/')
    await openSidebar(page)
    await page.getByRole('button', { name: /close menu/i }).click()
    await expect(page.getByRole('link', { name: /Career Analysis/i })).not.toBeInViewport({ timeout: 3000 })
  })

  test('can navigate to all main routes via mobile sidebar', async ({ page }) => {
    const routes = [
      { label: /Career Analysis/i, url: '/analysis' },
      { label: /Roadmap/i, url: '/roadmap' },
      { label: /Transition Strategy/i, url: '/transition' },
      { label: /Industry Shift/i, url: '/industry' },
      { label: /Progress/i, url: '/progress' },
    ]
    for (const { label, url } of routes) {
      await page.goto('/')
      await openSidebar(page)
      await page.getByRole('link', { name: label }).click()
      await expect(page).toHaveURL(url)
    }
  })
})

// ── Layout / Overflow ─────────────────────────────────────────────────────────

test.describe('Mobile — Layout & Overflow', () => {
  test('landing page fits within mobile viewport without horizontal scroll', async ({ page }) => {
    await page.goto('/')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2) // 2px tolerance
  })

  test('career analysis page fits within mobile viewport', async ({ page }) => {
    await page.goto('/analysis')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('demo flows are tap-friendly on mobile (sufficient height)', async ({ page }) => {
    await page.goto('/')
    const flowCard = page.getByText('QE → DevOps Engineer').locator('..')
    const box = await flowCard.boundingBox()
    // Touch targets should be at least 44px tall
    if (box) expect(box.height).toBeGreaterThanOrEqual(44)
  })

  test('analysis result cards stack vertically on mobile', async ({ page }) => {
    await loadQeDevopsFlow(page)
    // With grid-cols-2 md:grid-cols-4, cards should stack in 2 columns on mobile
    // Verify the page doesn't overflow horizontally
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('roadmap page is usable on mobile after demo flow load', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await openSidebar(page)
    await page.getByRole('link', { name: /Roadmap/i }).click()
    await expect(page).toHaveURL('/roadmap')
    await expect(page.getByText(/Foundation|Application|Mastery/i).first()).toBeVisible({ timeout: 5000 })
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('transition strategy page renders on mobile without overflow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await openSidebar(page)
    await page.getByRole('link', { name: /Transition Strategy/i }).click()
    await expect(page).toHaveURL('/transition')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('progress page renders on mobile without overflow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await openSidebar(page)
    await page.getByRole('link', { name: /Progress/i }).click()
    await expect(page).toHaveURL('/progress')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })
})

// ── TopBar ────────────────────────────────────────────────────────────────────

test.describe('Mobile — TopBar', () => {
  test('topbar shows hamburger menu button', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('button', { name: /open menu/i })).toBeVisible()
  })

  test('topbar shows readiness % after loading a flow', async ({ page }) => {
    await loadQeDevopsFlow(page)
    await expect(page.locator('header').getByText(/%/)).toBeVisible({ timeout: 3000 })
  })

  test('topbar does not overflow horizontally', async ({ page }) => {
    await page.goto('/')
    const header = page.locator('header').first()
    const box = await header.boundingBox()
    if (box) expect(box.width).toBeLessThanOrEqual(390 + 2)
  })
})

// ── Forms ─────────────────────────────────────────────────────────────────────

test.describe('Mobile — Profile Form', () => {
  test('profile form is usable on mobile', async ({ page }) => {
    await page.goto('/analysis')
    await expect(page.getByText('Your Career Profile')).toBeVisible({ timeout: 5000 })
    // Form should be within viewport
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('role dropdowns are selectable on mobile', async ({ page }) => {
    await page.goto('/analysis')
    await page.selectOption('select:near(:text("Current Role"))', 'Backend Engineer')
    await page.selectOption('select:near(:text("Target Role"))', 'Frontend Engineer')
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })

  test('full analysis flow works end-to-end on mobile', async ({ page }) => {
    await page.goto('/analysis')
    await page.selectOption('select:near(:text("Current Role"))', 'Backend Engineer')
    await page.selectOption('select:near(:text("Target Role"))', 'Frontend Engineer')
    await page.fill('input[type="number"]:near(:text("Years of Experience"))', '4')
    await page.fill('input[placeholder*="Transition"]', 'Moving to frontend')
    await page.getByText('Run Career Analysis').click()
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 10000 })
    // Results should not overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth)
    expect(bodyWidth).toBeLessThanOrEqual(390 + 2)
  })
})
