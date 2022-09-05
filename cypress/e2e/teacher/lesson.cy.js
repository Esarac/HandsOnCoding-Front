/// <reference types="cypress" />

const { clear } = require("console")

describe('lesson screen', () => {
    beforeEach(() => {
        cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
        cy.request('POST', 'http://localhost:8080/api/v1/testing/default')
            .then((res) => {
                const stepId = res.body.id
                cy.wrap(stepId).as('stepId')
                cy.visit('http://localhost:3000/course/1/lesson/' + stepId)
            })
    })

    //Fallos: Cuando cambio de tab, se borra el contenido. 
    it("Save template", function () {
        cy.contains('Template').click()
        cy.get('.view-line').type('print("Hello!")')

        cy.contains('Solution').click()
        cy.get('.view-line').type('print("Hello world!")')

        cy.contains('Save').click()
        cy.wait(1000)

        cy.visit('http://localhost:3000/course/1/lesson/' + this.stepId)

        cy.contains('Template').click()
        cy.wait(2000)
        cy.get('.view-line').should('have.text', 'print("Hello!")')
        .type(' print("Hello2!")')

        cy.contains('Save').click()
        cy.wait(1000)

        cy.contains('Solution').click()
        cy.wait(2000)
        cy.get('.view-line').contains('print("Hello world!")')//should don't accept white spaces
        cy.get('.view-line').type(' print("Hello World2!")')

        cy.contains('Save').click()
        cy.wait(1000)

        cy.visit('http://localhost:3000/course/1/lesson/' + this.stepId)

        cy.contains('Template').click()
        cy.wait(2000)
        cy.get('.view-line').contains('print("Hello!") print("Hello2!")')//should don't accept white spaces

        cy.contains('Solution').click()
        cy.wait(2000)
        cy.get('.view-line').contains('print("Hello world!") print("Hello world2!")')//should don't accept white spaces
    })
})