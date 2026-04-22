/**
 * Regression tests for the "always shows Kubernetes" bug.
 * Any non-DevOps/SRE/Cloud/Platform target role must NOT have Kubernetes
 * appear as a listed skill gap.
 */
import { test, expect, Page } from '@playwright/test'

async function runAnalysis(page: Page, currentRole: string, targetRole: string, years = 3) {
  await page.goto('/analysis')
  await page.selectOption('select:near(:text("Current Role"))', currentRole)
  await page.selectOption('select:near(:text("Target Role"))', targetRole)
  await page.fill('input[type="number"]:near(:text("Years of Experience"))', String(years))
  await page.fill('input[placeholder*="Transition from"]', `Transitioning from ${currentRole} to ${targetRole}`)
  await page.getByText('Run Career Analysis').click()
  // Wait for loading skeleton to disappear and results to appear
  await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 8000 })
}


test.describe('Role Regression — No Kubernetes leaking into unrelated roles', () => {
  test('Frontend Engineer target role does NOT show Kubernetes as a gap', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Frontend Engineer')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\bKubernetes\b/)
  })

  test('Frontend Engineer target role shows React/TypeScript gaps', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Frontend Engineer')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/React|TypeScript|CSS|Frontend/i)
  })

  test('AI/ML Engineer target role does NOT show Kubernetes as a primary gap', async ({ page }) => {
    await runAnalysis(page, 'Frontend Engineer', 'AI/ML Engineer')
    const gapsSection = await page.locator('body').innerText()

    // Kubernetes should not appear in gap skill names for this role
    const lines = gapsSection.split('\n').map(l => l.trim())
    const kubernetesGap = lines.find(l => l === 'Kubernetes')
    expect(kubernetesGap).toBeUndefined()
  })

  test('AI/ML Engineer target role shows Python/ML related gaps', async ({ page }) => {
    await runAnalysis(page, 'Frontend Engineer', 'AI/ML Engineer')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/Python|Machine Learning|PyTorch|TensorFlow|ML/i)
  })

  test('Data Scientist target role does NOT show Kubernetes as a gap', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Data Scientist')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\bKubernetes\b/)
  })

  test('Data Scientist target role shows statistics/data gaps', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Data Scientist')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/Python|Statistics|Pandas|Machine Learning|SQL/i)
  })

  test('Engineering Manager target role does NOT show Kubernetes as a gap', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Engineering Manager')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\bKubernetes\b/)
  })

  test('Engineering Manager target role shows people management gaps', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Engineering Manager')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/People Management|1:1|Roadmap|Hiring|OKR|feedback/i)
  })

  test('Prompt Engineer target role does NOT show Kubernetes as a gap', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Prompt Engineer')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\bKubernetes\b/)
  })

  test('Prompt Engineer target role shows LLM/prompt gaps', async ({ page }) => {
    await runAnalysis(page, 'Backend Engineer', 'Prompt Engineer')
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/Prompt|LLM|RAG|language model/i)
  })

  test('Full Stack Engineer target role shows web stack gaps not Kubernetes', async ({ page }) => {
    await runAnalysis(page, 'QE/SDET', 'Full Stack Engineer')
    const text = await page.locator('body').innerText()
    expect(text).not.toMatch(/\bKubernetes\b/)
    expect(text).toMatch(/Node\.js|React|TypeScript|Database|API/i)
  })

  test('DevOps Engineer DOES correctly show Kubernetes (control case via demo flow)', async ({ page }) => {
    // Use the pre-built demo flow — deterministic, no API call, always has Kubernetes
    await page.goto('/')
    await page.getByText('QE → DevOps Engineer').click()
    await expect(page.getByText('Readiness Score')).toBeVisible({ timeout: 5000 })
    const text = await page.locator('body').innerText()
    expect(text).toMatch(/Kubernetes/)
  })
})
