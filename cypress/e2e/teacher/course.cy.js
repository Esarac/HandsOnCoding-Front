/// <reference types="cypress" />

class CoursePage {
    visit(courseId) {
        cy.visit('http://localhost:3000/')
    }

    getLesson(index) {
        return cy.get(`[data-cy="lesson-${index}"]`)
    }
}

const page = new CoursePage();

//Scenes (On fixtures folder)
const setUpScene = (name) => {
    cy.fixture(name).then((scene) => {
        cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
        cy.request('POST', 'http://localhost:8080/api/v1/testing/scene', scene)
            .then((res) => {
                const course = res.body.courses[0]
                cy.wrap({ course: course.id }).as('ids')
                page.visit(course.id)
            })
    })
}

describe('Course screen', () => {
    context('As an user I want to view all my assignments so that I can interact with them', ()=>{
        it('Navagation', ()=>{
            setUpScene('courseNormal')

            page.getLesson(0).click()
            cy.wait(2000)

            cy.contains('Loops').should('be.visible')
        })
    })
})