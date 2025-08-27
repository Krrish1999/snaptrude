import { Locator, Page, expect, test } from "@playwright/test";

type OffsetMode = 'internal' | 'external' | 'center';

export class Canvas{
    readonly page: Page
    readonly elements:{
        reactangleIcon: Locator;
        canvas: Locator;
        pointer: Locator;

        //Offset mode
        internalOffsetMode: Locator;
        externalOffsetMode: Locator;
        centerOffsetMode: Locator;
        slider: Locator;

        //Object properties panel
        lengthInput: Locator;
        widthInput: Locator;
    }

    constructor(page){
        this.page = page
        this.elements = {
            canvas : page.locator('#canvas'),

            //Tools icons
            reactangleIcon: page.getByRole('img', { name: 'rectangle' }),
            pointer:  page.getByRole('img', { name: 'pointer' }),

            //Offset mode
            internalOffsetMode: page.getByRole('img', { name: 'Internal' }),
            externalOffsetMode: page.getByRole('img', { name: 'External' }),
            centerOffsetMode: page.getByRole('img', { name: 'Centre' }),
            slider: page.getByRole('slider'),

            //Object properties panel
            lengthInput: page.locator('[data-property-id="length-property"] input'),
            widthInput: page.locator('[data-property-id="width-property"] input'),

            
        }
    }

    async setOffsetModeAndValue(mode: OffsetMode, offset: number) {
        await this.elements[`${mode}OffsetMode`].click();
        await this.elements.slider.click();
        await this.elements.slider.fill(offset.toString());
    }

    async setDimensions(length: number, width: number) {

        await expect(this.elements.lengthInput).toBeVisible();
        await this.elements.lengthInput.click();
        await this.page.keyboard.press('ControlOrMeta+A'); 
        await this.page.keyboard.press('Backspace');
        await this.elements.lengthInput.pressSequentially(length.toString());
        await expect(this.elements.lengthInput).toHaveValue(length.toString());

        await expect(this.elements.widthInput).toBeVisible();
        await this.elements.widthInput.click();
        await this.page.keyboard.press('ControlOrMeta+A'); 
        await this.page.keyboard.press('Backspace');
        await this.elements.widthInput.pressSequentially(width.toString());
        await expect(this.elements.widthInput).toHaveValue(width.toString());

    }


    async drawRectangle(start_position_x: number, start_position_y:number, end_position_x:number,  end_position_y:number ){

        await this.elements.canvas.click({
            position:{
                x:start_position_x,
                y:start_position_y
            }
        })

        await this.elements.canvas.click({
            position:{
                x:end_position_x,
                y:end_position_y
            }
        })
    }

    async openObjectPropertiesPanel(start_position_x: number, start_position_y:number){
        await this.elements.pointer.click()
        await this.elements.canvas.click({
            position:{
                x:start_position_x,
                y:start_position_y
            }
        })

        await expect(this.page.locator('section').filter({ hasText: 'Properties' })).toBeVisible();
    
    }

  
    async assertCanvasHasContent() {
        const hasContent = await this.elements.canvas.evaluate((canvas: HTMLCanvasElement) => {
            const ctx = canvas.getContext('2d');
            if (!ctx) return false;
            
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            
            // Check if any pixel is not transparent (alpha > 0)
            for (let i = 3; i < data.length; i += 4) {
                if (data[i] > 0) return true;
            }
            return false;
        });
        
        expect(hasContent).toBe(true);
    }

    async assertRectangleByScreenshot(testName: string) {
        await this.page.screenshot({path:`${testName}-canvas.png`, fullPage: true});
    }



    
      


}