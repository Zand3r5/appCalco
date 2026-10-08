import { expect, test } from "@playwright/test"

import { PAGE_SECTIONS } from "@/lib/navigation"

test.describe("header navigation", () => {
  test.use({ viewport: { width: 1280, height: 860 } })

  test("opens a dropdown with sub-links from the nav bar", async ({ page }) => {
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Principal" })

    await nav.getByRole("button", { name: "Planchas" }).click()

    await expect(nav.getByRole("link", { name: /Ver el carrete/ })).toBeVisible()
  })

  test("closes the dropdown with Escape", async ({ page }) => {
    await page.goto("/")
    const nav = page.getByRole("navigation", { name: "Principal" })
    const trigger = nav.getByRole("button", { name: "Ayuda" })

    await trigger.click()
    await page.keyboard.press("Escape")

    await expect(trigger).toHaveAttribute("aria-expanded", "false")
  })
})

test.describe("search", () => {
  test("opens with Ctrl+K, finds a sheet and jumps to it", async ({ page }) => {
    await page.goto("/")
    const dialog = page.getByRole("dialog", { name: "Buscar" })

    // The shortcut listener attaches on hydration, which can lag behind `load` in dev mode.
    await expect(async () => {
      await page.keyboard.press("Control+k")
      await expect(dialog).toBeVisible({ timeout: 1_000 })
    }).toPass({ timeout: 15_000 })

    await dialog.getByRole("combobox").fill("crew")
    await expect(dialog.getByRole("option", { name: /Crew/ }).first()).toBeVisible()

    await page.keyboard.press("Enter")
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/#catalogo$/)
  })

  test("opens from the header button and says when nothing matches", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("button", { name: /Buscar/ }).first().click()
    const dialog = page.getByRole("dialog", { name: "Buscar" })
    await dialog.getByRole("combobox").fill("zzzz")

    await expect(dialog.getByText(/No encontramos nada/)).toBeVisible()
  })
})

test.describe("footer", () => {
  test("shows copyright, business data and the legal links", async ({ page }) => {
    await page.goto("/")
    const footer = page.getByRole("contentinfo")

    await expect(footer.getByText(`© ${new Date().getFullYear()} Uknow Calcos`)).toBeVisible()
    await expect(footer.getByText("CUIT", { exact: true })).toBeVisible()
    await expect(footer.getByRole("link", { name: "Botón de arrepentimiento" })).toBeVisible()
  })
})

test.describe("legal pages", () => {
  test("renders a legal page with the site header and footer", async ({ page }) => {
    await page.goto("/legales/arrepentimiento")

    await expect(page.getByRole("heading", { level: 1, name: /Botón de arrepentimiento/i })).toBeVisible()
    await expect(page.getByRole("contentinfo")).toBeVisible()
  })

  test("returns 404 for an unknown legal page", async ({ page }) => {
    const response = await page.goto("/legales/no-existe")

    expect(response?.status()).toBe(404)
  })
})

test("every section the navigation links to exists on the home page", async ({ page }) => {
  await page.goto("/")

  for (const id of PAGE_SECTIONS) {
    await expect(page.locator(`[id="${id}"]`), `missing #${id}`).toHaveCount(1)
  }
})
