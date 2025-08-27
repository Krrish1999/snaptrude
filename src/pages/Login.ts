import {Page, Locator} from '@playwright/test';

export class Login {
    readonly page: Page;
    readonly elements: {
        username: Locator;
        password: Locator;
        signInButton: Locator;
        userImage : Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            username: page.getByPlaceholder('username@company.com'),
            password: page.locator('input[type="password"]'),
            signInButton: page.getByRole('button', { name: "Sign In" }),

            userImage: page.getByRole('img', { name: 'avatar' }),
        };
    }

    async login(username: string, password: string) {
        await this.elements.username.fill(username);
        await this.elements.password.fill(password);
        await Promise.all([
            this.page.waitForLoadState('networkidle').catch(() => {}),
            this.elements.signInButton.click()
          ]);
    }

   
}