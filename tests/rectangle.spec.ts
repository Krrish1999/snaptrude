import { test, expect } from '@playwright/test';
import { Canvas } from '../src/pages/Canvas';
import { Dashboard } from '../src/pages/Dashboard';
import { closeProductWalkthroughModal, productWalkthroughModalLocator } from '../src/helpers/model';
import { assertFootprintAreaFromDimensions } from '../src/components/sidepanel/objectProperties';


test.describe('Rectangle Creation - Free Form Mode', () => {
  let canvas: Canvas
  let dashboard : Dashboard

  test.beforeEach(async ({ page }) => {
    
    await page.goto('/dashboard');
    await page.waitForLoadState('domcontentloaded')

    canvas = new Canvas(page)
    dashboard = new Dashboard(page)

    await dashboard.verifyDashboard()
    await dashboard.selectProject()

   
    await page.waitForSelector(productWalkthroughModalLocator, { timeout: 5000 }).catch(() => {});
    await closeProductWalkthroughModal(page)
    
  });

  
  test('TC001: Create rectangle using two diagonal corner points', async ({page}) => {

   
    await canvas.elements.reactangleIcon.click()

    const x1=495, y1=286, x2=600, y2=350
    await canvas.drawRectangle(x1,y1,x2,y2)

    await canvas.openObjectPropertiesPanel(x1,y1)

    
    await assertFootprintAreaFromDimensions(page);

  });

  test('TC002: Draw a Rectangle with Specific Dimensions (Metric)', async ({page}) => {
    
    
    await canvas.elements.pointer.click()
    await page.keyboard.press('r');
   
    await canvas.elements.reactangleIcon.click()

    const x1=495, y1=286, x2=600, y2=350

    await canvas.drawRectangle(x1,y1,x2,y2)

    await canvas.openObjectPropertiesPanel(x1,y1)

    await canvas.setDimensions(5700,9000)


    await canvas.assertRectangleByScreenshot('TC002')

  });

  test('TC003: Draw a Rectangle in Offset Mode - Center', async ({page}) => {

   
    await canvas.elements.reactangleIcon.click()
    const offset = 4000
    await canvas.setOffsetModeAndValue('center', offset)

    const x1 = 740, y1 = 335, x2 = 964, y2 = 428;
    await canvas.drawRectangle(x1, y1, x2, y2);

    await canvas.openObjectPropertiesPanel(x1, y1);
   

    await canvas.assertRectangleByScreenshot('TC003')
  })

  test('TC004: Draw a Rectangle in Offset Mode - Internal', async ({page}) => {

   
    await canvas.elements.reactangleIcon.click()
    const  offset = 4000
    await canvas.setOffsetModeAndValue('internal', offset)

    const x1 = 672, y1 = 175, x2 = 911, y2 = 277;
    await canvas.drawRectangle(x1, y1, x2, y2);

    await canvas.openObjectPropertiesPanel(x1, y1);
    

    await canvas.assertRectangleByScreenshot('TC004')

  })

  test('TC005: Draw a Rectangle in Offset Mode - External', async ({page}) => {

    
    await canvas.elements.reactangleIcon.click()
    const offset = 4000
    await canvas.setOffsetModeAndValue('external', offset)

    const x1 = 386, y1 = 390, x2 = 709, y2 = 493;
    await canvas.drawRectangle(x1, y1, x2, y2);

    await canvas.openObjectPropertiesPanel(x1, y1);
   

    await canvas.assertRectangleByScreenshot('TC005')

  })
  

  
});
