/// <reference types="cypress" />

class LessonPage{
    visit(courseId, lessonId) {
        cy.visit('http://localhost:3000/course/'+courseId+'/lesson/'+lessonId)
    }

    //Tabs
    getTemplateTab(){
        return cy.contains('Template')
    }

    getSolutionTab(){
        return cy.contains('Solution')
    }

    //Buttons
    getSaveButton(){
        return cy.contains('Save')
    }

    getRunButtonTemplate(){
        return cy.get('[data-cy="run"]').eq(0)
    }

    //Lines
    getMonacoLine(index){
        return cy.get('.view-line').eq(index)
    }
    
    getConsoleLog(index){
        return cy.get('[data-cy="log"]').eq(index)
    }
}

const page = new LessonPage();

describe('Lesson screen', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
        cy.request('POST', 'http://localhost:8080/api/v1/testing/default')
            .then((res) => {
                const stepId = res.body.id
                cy.wrap(stepId).as('stepId')
                page.visit(1,stepId)
            })
    })

    it('Save Step (Template, Solution)', function () {
        page.getTemplateTab().click()
        page.getMonacoLine(0).type('print("Hello!")')

        page.getSolutionTab().click()
        page.getMonacoLine(1).type('print("Hello world!")')

        page.getSaveButton().click()

        //Reload 1
        cy.wait(1000)
        page.visit(1,this.stepId)
        cy.wait(1000)

        page.getTemplateTab().click()
        page.getMonacoLine(0).should('have.text', 'print("Hello!")')
            .type(' print("Hello2!")')

        page.getSolutionTab().click()
        page.getMonacoLine(1).contains('print("Hello world!")').should('exist')//should don't accept white spaces
        page.getMonacoLine(1).type(' print("Hello World2!")')

        page.getSaveButton().click()

        //Reload 2
        cy.wait(1000)
        page.visit(1,this.stepId)
        cy.wait(1000)

        page.getTemplateTab().click()
        page.getMonacoLine(0).contains('print("Hello!") print("Hello2!")').should('exist')//should don't accept white spaces

        page.getSolutionTab().click()
        page.getMonacoLine(1).contains('print("Hello world!") print("Hello World2!")').should('exist')//should don't accept white spaces
    })

    describe('Execude code', () => {
        it('Normal', () => {
            page.getTemplateTab().click()
            page.getMonacoLine(0).type('a = 10{enter}b = 5{enter}print(a + b)')
            page.getRunButtonTemplate().click()
            page.getConsoleLog(0).should('have.text', '15\n')
        })

        it('Loop', () => {
            page.getTemplateTab().click()
            page.getMonacoLine(0).type('hola = "hola"{enter}for x in hola:{enter}print(x)')
            page.getRunButtonTemplate().click()
            page.getConsoleLog(0).should('have.text', 'h\no\nl\na\n')
        })

        it('Recursion', () => {
            page.getTemplateTab().click()
            page.getMonacoLine(0).type(
                'def fibonacci(n):{enter}'+
                'if n in {{}0,1}:{enter}'+
                'return n{enter}'+
                '{backspace}return fibonacci(n-1) + fibonacci(n-2){enter}'+
                '{backspace}print(fibonacci(14))'
            )
            page.getRunButtonTemplate().click()
            page.getConsoleLog(0).should('have.text', '377\n')
        })

        it('Infinite loop', () => {//TIMEOUT
            page.getTemplateTab().click()
            page.getMonacoLine(0).type(
                'i = 0{enter}'+
                'while True:{enter}'+
                'i=i+1{enter}'
            )
            page.getRunButtonTemplate().click()
            cy.wait(3000)
            page.getConsoleLog(0).should('have.text', 'TIMEOUT')
        })

        it('Input', () => {//TIMEOUT
            page.getTemplateTab().click()
            page.getMonacoLine(0).type(
                'a = input()'
            )
            page.getRunButtonTemplate().click()
            cy.wait(3000)
            page.getConsoleLog(0).should('have.text', 'TIMEOUT')
        })
    })
})