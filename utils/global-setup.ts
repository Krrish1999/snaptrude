// global-setup.ts
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { chromium } from '@playwright/test';
import { Login } from '../src/pages/Login' 

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const STORAGE_PATH = path.resolve(process.cwd(), 'auth', 'storageState.json');

export default async function globalSetup() {
 
  const authDir = path.dirname(STORAGE_PATH);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  
  if (fs.existsSync(STORAGE_PATH)) {
    console.log('Using existing storage state:', STORAGE_PATH);
    return;
  }

  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const loginUrl = process.env.URL || 'https://app.snaptrude.com/login' ; 

  if (!email || !password || !loginUrl) {
    throw new Error('EMAIL, PASSWORD and URL must be set in .env for global-setup');
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('Global setup: navigating to login page...');
  await page.goto(loginUrl, { waitUntil: 'load' });

  const login = new Login(page);
  await login.login(email, password);



  // Save storage state
  await context.storageState({ path: STORAGE_PATH });
  console.log(`Saved storage state to ${STORAGE_PATH}`);

  await browser.close();
}
