/// <reference types="cypress" />

describe('lesson screen', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')

        cy.request('POST', 'http://localhost:8000/api/v1/testing/reset')
        const step = {
            "description": "Print hello world!",
            "template": {
                "name": "main.py",
                "content": "print('hello!')"
            },
            "solution": {
                "name": "main.py",
                "content": "print('hello world!')"
            }
        }

        cy.request('POST', 'http://localhost:8000/api/v1/steps', step)
    })

    it("Hola", () => {

    })
})