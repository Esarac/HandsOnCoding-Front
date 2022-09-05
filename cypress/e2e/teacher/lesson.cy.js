/// <reference types="cypress" />

describe('Lesson screen', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
        cy.request('POST', 'http://localhost:8080/api/v1/testing/default')
            .then((res) => {
                const stepId = res.body.id
                cy.wrap(stepId).as('stepId')
                cy.visit('http://localhost:3000/course/1/lesson/' + stepId)
            })
    })

    it('Save Step (Template, Solution)', function () {
        cy.contains('Template').click()
        cy.get('.view-line').eq(0).type('print("Hello!")')

        cy.contains('Solution').click()
        cy.get('.view-line').eq(1).type('print("Hello world!")')

        cy.contains('Save').click()

        //Reload 1
        cy.wait(1000)
        cy.visit('http://localhost:3000/course/1/lesson/' + this.stepId)
        cy.wait(1000)

        cy.contains('Template').click()
        cy.get('.view-line').eq(0).should('have.text', 'print("Hello!")')
            .type(' print("Hello2!")')

        cy.contains('Solution').click()
        cy.get('.view-line').eq(1).contains('print("Hello world!")').should('exist')//should don't accept white spaces
        cy.get('.view-line').eq(1).type(' print("Hello World2!")')

        cy.contains('Save').click()

        //Reload 2
        cy.wait(1000)
        cy.visit('http://localhost:3000/course/1/lesson/' + this.stepId)
        cy.wait(1000)

        cy.contains('Template').click()
        cy.get('.view-line').eq(0).contains('print("Hello!") print("Hello2!")').should('exist')//should don't accept white spaces

        cy.contains('Solution').click()
        cy.get('.view-line').eq(1).contains('print("Hello world!") print("Hello World2!")').should('exist')//should don't accept white spaces
    })

    describe('Execude code', () => {
        it('Normal', () => {
            cy.contains('Template').click()
            cy.get('.view-line').eq(0).type('a = 10{enter}b = 5{enter}print(a + b)')
            cy.get('[data-cy="run"]').eq(0).click()
            cy.get('[data-cy="log"]').eq(0).should('have.text', '15\n')
        })

        it('Loop', () => {
            cy.contains('Template').click()
            cy.get('.view-line').eq(0).type('hola = "hola"{enter}for x in hola:{enter}print(x)')
            cy.get('[data-cy="run"]').eq(0).click()
            cy.get('[data-cy="log"]').eq(0).should('have.text', 'h\no\nl\na\n')
        })

        it('Recursion', () => {
            cy.contains('Template').click()
            cy.get('.view-line').eq(0).type(
                'def fibonacci(n):{enter}'+
                'if n in {{}0,1}:{enter}'+
                'return n{enter}'+
                '{backspace}return fibonacci(n-1) + fibonacci(n-2){enter}'+
                '{backspace}print(fibonacci(14))'
            )
            cy.get('[data-cy="run"]').eq(0).click()
            cy.get('[data-cy="log"]').eq(0).should('have.text', '377\n')
        })

        it('Infinite loop'
        // , () => {//[NO]
        //     cy.contains('Template').click()
        //     cy.get('.view-line').eq(0).type(
        //         'i = 0{enter}'+
        //         'while True:{enter}'+
        //         'i=i+1{enter}'
        //     )
        //     cy.get('[data-cy="run"]').eq(0).click()
        //     cy.get('[data-cy="log"]').eq(0).contains('have.text', 'EXECUTION ERROR\n').should('exist')
        // }
        )

        it('Input'
        // , () => {//[NO]
        //     assert.fail('not implemented')
        // }
        )

        it('File security'
        // , () => {//[NO]
        //     assert.fail('not implemented')
        // }
        )
    })
})