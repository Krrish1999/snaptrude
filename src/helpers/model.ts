// pages/helpers/modal.ts
import { Page, expect } from '@playwright/test';

export const productWalkthroughModalLocator = 'div[role="dialog"][aria-label="Product Walkthrough Modal"]';

export async function closeProductWalkthroughModal(page: Page) {
  const modal = page.locator(productWalkthroughModalLocator).first();
  const continueButton = page.getByRole('button', { name: 'Continue' }).nth(1);

  if (await modal.isVisible({ timeout: 5000 }).catch(() => false)) {
    while (await modal.isVisible()) {
      await expect(continueButton).toBeVisible();
      await continueButton.click();
      await page.waitForTimeout(300);
    }
  }
}
