/// <reference types="cypress" />

Cypress.Commands.add(
    'addLines',
    {
        prevSubject: true,
    },
    (subject, times) => {
        var enters = ''
        for (var i = 0; i < times; i++) {
            enters += '{enter}' 
        }

        cy.get(subject).type(enters)

        return undefined
    }
)