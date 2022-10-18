/// <reference types="cypress" />

class LessonPage {
    visit(courseId, lessonId) {
        cy.visit('http://localhost:3000/course/' + courseId + '/lesson/' + lessonId)
    }

    //Tabs
    getStepTab(index) {
        return cy.get(`[data-cy="tab"]`).eq(index)
    }

    getSectionTab(step, section) {
        const tabs = {
            'description': { side: 'left', index: 0 },
            'test': { side: 'left', index: 1 },
            'template': { side: 'right', index: 0 },
            'solution': { side: 'right', index: 1 },
        }
        return cy.get(`[data-cy="step-${step}"] [data-cy="${tabs[section].side}Block"] [data-cy="tab-${tabs[section].index}"]`)
    }

    //Buttons
    getSaveButton(step, section) {
        return cy.get(`[data-cy="step-${step}"] [data-cy="${section}"] [data-cy="ide"] [data-cy="saveBtn"]`)
    }

    getRunButton(step, section) {
        return cy.get(`[data-cy="step-${step}"] [data-cy="${section}"] [data-cy="ide"] [data-cy="runBtn"]`)
    }

    //Lines
    getMonacoEditor(step, section) {
        return cy.get(`[data-cy="step-${step}"] [data-cy="${section}"] [data-cy="ide"] [data-cy="editor"] .view-line`).eq(0)
    }

    getConsoleLog(step, section, index) {
        return cy.get(`[data-cy="step-${step}"] [data-cy="${section}"] [data-cy="ide"] [data-cy="console"] [data-cy="log"]`).eq(index)
    }
}

const page = new LessonPage();

//Scenes (On fixtures folder)
const setUpScene = (name) => {
    cy.fixture(name).then((scene) => {
        cy.request('POST', 'http://localhost:8080/api/v1/testing/reset')
        cy.request('POST', 'http://localhost:8080/api/v1/testing/scene', scene)
            .then((res) => {
                const course = res.body.courses[0]
                const lesson = course.lessons[0]
                const step = lesson.steps[0]
                cy.wrap({ course: course.id, lesson: lesson.id, step: step.id }).as('ids')
                page.visit(course.id, lesson.id)
            })
    })
}

//Tests
describe('Lesson screen', () => {
    context('As a teacher I want to set a template for the step so that I can define a starting point for my students', () => {
        it('Create template', () => {
            setUpScene('scene1')

            page.getSectionTab(0, 'template').click()
            page.getMonacoEditor(0, 'template').type('print("Hello!")')
            page.getSaveButton(0, 'template').click()

            cy.wait(1000)
            cy.reload()
            cy.wait(1000)

            page.getSectionTab(0, 'template').click()
            page.getMonacoEditor(0, 'template').should('have.text', 'print("Hello!")')
        })

        it('Update template', () => {
            setUpScene('scene2')

            page.getSectionTab(0, 'template').click()
            page.getMonacoEditor(0, 'template').type('{moveToEnd}!')
            page.getSaveButton(0, 'template').click()

            cy.wait(1000)
            cy.reload()
            cy.wait(1000)

            page.getSectionTab(0, 'template').click()
            page.getMonacoEditor(0, 'template').should('have.text', 'print("Hello")!')
        })
    })

    context('As a teacher I want to set a possible solution for the step so that if my students have no clue of how to resolve the exercise, they can see how the teacher solved it', () => {
        it('Create solution', () => {
            setUpScene('scene1')

            page.getSectionTab(0, 'solution').click()
            page.getMonacoEditor(0, 'solution').type('print("Hello!")')
            page.getSaveButton(0, 'solution').click()

            cy.wait(1000)
            cy.reload()
            cy.wait(1000)

            page.getSectionTab(0, 'solution').click()
            page.getMonacoEditor(0, 'solution').should('have.text', 'print("Hello!")')
        })

        it('Update solution', () => {
            setUpScene('scene2')

            page.getSectionTab(0, 'solution').click()
            page.getMonacoEditor(0, 'solution').type('{moveToEnd}!')
            page.getSaveButton(0, 'solution').click()

            cy.wait(1000)
            cy.reload()
            cy.wait(1000)

            page.getSectionTab(0, 'solution').click()
            page.getMonacoEditor(0, 'solution').should('have.text', 'print("Hello")!')
        })
    })

    context('As a user, I want to be able to run my Python code in the app, so that I can solve my assignments', () => {
        before(() => {
            setUpScene('scene1')
        })

        beforeEach(() => {
            cy.reload()
        })

        context('As a user, I want to be able to view the console output, so that I can see the results of my code', () => {
            it('Normal', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').type('a = 10{enter}b = 5{enter}print(a + b)')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should('have.text', '15\n')
            })

            it('Loop', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').addLines(2)
                page.getMonacoEditor(0, 'template').type(
                    'hola = "hola"{downArrow}' +
                    'for x in hola:{downArrow}' +
                    '\tprint(x)')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should('have.text', 'h\no\nl\na\n')
            })

            it('Recursion', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').addLines(4)
                page.getMonacoEditor(0, 'template').type(
                    'def fibonacci(n):{downArrow}' +
                    '\tif n in {{}0,1}:{downArrow}' +
                    '\t\treturn n{downArrow}' +
                    '\treturn fibonacci(n-1) + fibonacci(n-2){downArrow}' +
                    'print(fibonacci(14))')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should('have.text', '377\n')
            })
        })

        context('As a user, I want to be able to see the compiling errors, so I can be sure there arent any syntax errors or exceptions in my code', () => {
            it('Infinite loop [Timeout]', () => {
                page.getSectionTab(0, 'template', 0).click()

                page.getMonacoEditor(0, 'template').addLines(2)
                page.getMonacoEditor(0, 'template').type(
                    'i = 0{downArrow}' +
                    'while True:{downArrow}' +
                    '\ti=i+1')

                page.getRunButton(0, 'template').click()
                cy.wait(3000)
                page.getConsoleLog(0, 'template', 0).should(($log) => {
                    expect($log).to.have.text('Connection timed out')
                    expect($log).to.have.css('color', 'rgb(241, 196, 15)')
                })
            })

            it('EOFError', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').type('a = input()')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should(($log) => {
                    expect($log).to.have.text('Traceback (most recent call last):\n  File "/usr/src/app/main.py", line 1, in <module>\n    a = input()\nEOFError: EOF when reading a line\n')
                    expect($log).to.have.css('color', 'rgb(231, 76, 60)')
                })
            })

            it('SyntaxError', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').type("this shouldn't work!")

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should(($log) => {
                    expect($log).to.have.text(`  File "/usr/src/app/main.py", line 1\n    this shouldn't work!\n                ^\nSyntaxError: unterminated string literal (detected at line 1)\n`)
                    expect($log).to.have.css('color', 'rgb(231, 76, 60)')
                })
            })

            it('ModuleNotFoundError', () => {
                page.getSectionTab(0, 'template', 0).click()

                page.getMonacoEditor(0, 'template').addLines(1)
                page.getMonacoEditor(0, 'template').type(
                    'import numpy as np{downArrow}' +
                    'print(np.array([1, 2, 3]))')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should(($log) => {
                    expect($log).to.have.text(`Traceback (most recent call last):\n  File "/usr/src/app/main.py", line 1, in <module>\n    import numpy as np\nModuleNotFoundError: No module named 'numpy'\n`)
                    expect($log).to.have.css('color', 'rgb(231, 76, 60)')
                })
            })

            it('Type Error', () => {
                page.getSectionTab(0, 'template', 0).click()
                page.getMonacoEditor(0, 'template').type('print(1+"string")')

                page.getRunButton(0, 'template').click()
                page.getConsoleLog(0, 'template', 0).should(($log) => {
                    expect($log).to.have.text(`Traceback (most recent call last):\n  File "/usr/src/app/main.py", line 1, in <module>\n    print(1+"string")\nTypeError: unsupported operand type(s) for +: 'int' and 'str'\n`)
                    expect($log).to.have.css('color', 'rgb(231, 76, 60)')
                })
            })
        })
    })
})