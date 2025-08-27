import { expect, Page } from '@playwright/test'

    // get footprint area value from UI
    async function getFootprintAreaValue(page: Page): Promise<string> {
   
        const footprintElement = page.locator('[data-property-id="footprint-area-property"]');
        await expect(footprintElement).toBeVisible();
        return await footprintElement.innerText() || '';
    }

    // get length value from UI  
    async function getLengthValue(page: Page): Promise<string> {
        const lengthElement = page.locator('[data-property-id="length-property"] input');
        await expect(lengthElement).toBeVisible();
        return await lengthElement.inputValue() || '';
    }

    // get width value from UI
    async function getWidthValue(page: Page): Promise<string> {
        const widthElement = page.locator('[data-property-id="width-property"] input');
        await expect(widthElement).toBeVisible();
        return await widthElement.inputValue() || '';
    }

    // parse numeric value from text (removes units like "sq.m.", "mm", etc.)
      function parseNumericValue(valueText: string): number {
        // Remove common units and extract number
        const cleanValue = valueText.replace(/[^\d.-]/g, '');
        return parseFloat(cleanValue) || 0;
    }

   
      function calculateExpectedArea(length: number, width: number): number {
        return length * width;
    }


    export async function assertFootprintAreaFromDimensions(page: Page, digits: number = 1) {
  
        const lengthText = await getLengthValue(page);
        const widthText = await getWidthValue(page);
        const footprintText = await getFootprintAreaValue(page);

        console.log("lengthText",lengthText)
        console.log("widthText",widthText)
        console.log("footprintText",footprintText)

       
        const length = parseNumericValue(lengthText);
        const width = parseNumericValue(widthText);
        const actualArea = parseNumericValue(footprintText);

        console.log("length",length)
        console.log("width",width)
        console.log("actualArea",actualArea)


        let expectedArea = calculateExpectedArea(length, width);

        const footprintRaw = footprintText.toLowerCase();
        const isSquareMeters = footprintRaw.includes('sq.m') || footprintRaw.includes('m²') || footprintRaw.includes('sqm');
        const isSquareMillimeters = footprintRaw.includes('sq.mm') || footprintRaw.includes('mm²') || footprintRaw.includes('sqmm');
        const isSquareCentimeters = footprintRaw.includes('sq.cm') || footprintRaw.includes('cm²') || footprintRaw.includes('sqcm');

        if (isSquareMeters) {
      
            expectedArea = expectedArea / 1_000_000;
        } else if (isSquareCentimeters) {

            expectedArea = expectedArea / 100;
        } else if (isSquareMillimeters) {
           
        } else {

            if (expectedArea > 10_000 && actualArea < 10_000) {
                expectedArea = expectedArea / 1_000_000;
            }
        }

        
        console.log('ecepct',expectedArea )
        console.log('actual',actualArea )
        expect(actualArea).toBeCloseTo(expectedArea, digits);
        
        console.log(`Length: ${length}, Width: ${width}, Expected Area: ${expectedArea}, Actual Area: ${actualArea}`);
    }

    