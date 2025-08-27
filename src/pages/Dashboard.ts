import {Page, Locator, expect} from '@playwright/test';

export class Dashboard {
    readonly page: Page;
    readonly elements: {
        personalHeading: Locator;
        project: Locator;
        newProjectButton : Locator;
        projactName : Locator;
        projectMesurment: Locator;
        nextButton : Locator;
        blankCanvasButton : Locator;
    };

    constructor(page: Page) {
        this.page = page;
        this.elements = {
            personalHeading: page.locator('#team-Personal'),
            project: page.locator('#project-card-A6RY0O'),

            // new project input fields
            newProjectButton : page.locator('#new-project-button'),
            projactName : page.locator('#create-project-name'),
            projectMesurment : page.getByText('mm',{exact:true}),
            nextButton : page.getByRole('button',{name: "Next", exact:true}),
            blankCanvasButton : page.locator('#start-on-blank-canvas')
        
        };
    }

    async verifyDashboard(){
        await expect(this.elements.personalHeading).toBeVisible()
        await expect(this.page).toHaveURL(/.*dashboard/); 
    }

    async selectProject(){
        await expect(this.elements.project).toBeVisible()
        await this.elements.project.click()
    }

    async newProject(name: string, mesurment:string){
        await this.elements.newProjectButton.click()
        await this.elements.projactName.fill(name)
        await this.page.getByText(mesurment,{exact:true}).click()
        await this.elements.nextButton.click()
        await this.elements.blankCanvasButton.click()

    }
    

   
}