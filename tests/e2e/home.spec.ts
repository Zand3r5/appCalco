import { expect, test } from "@playwright/test"

test.describe("home", () => {
  test("loads the page with a visible h1", async ({ page }) => {
    const response = await page.goto("/")

    expect(response?.ok()).toBe(true)
    await expect(page.locator("h1").first()).toBeVisible()
  })

  test("renders the 3D carousel with at least one card", async ({ page }) => {
    await page.goto("/")

    await expect(page.getByRole("button", { name: /^Ver / }).first()).toBeAttached()
  })

  test("updates the cart counter after adding a single sticker", async ({ page }) => {
    await page.goto("/")
    const cartLink = page.getByRole("link", { name: /^Carrito: / })
    await expect(cartLink).toHaveAttribute("aria-label", "Carrito: 0 productos")

    const addButton = page.getByRole("button", { name: "Sumar", exact: true }).first()
    await addButton.scrollIntoViewIfNeeded()
    await addButton.click()

    await expect(cartLink).toHaveAttribute("aria-label", "Carrito: 1 producto")
  })
})
