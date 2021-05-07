// <reference types="cypress" />

context('Tasks page (as admin)', () => {
    let user

    before(function fetchUser () {
        cy.request('POST', 'http://localhost:3006/api/users/login', {
            login: 'admin',
            password: 'admin',
        })
            .its('body')
            .then((res) => {
                user = res
            })
    })

    beforeEach(function setUser () {
        cy.visit('localhost:3000/tasks', {
            onBeforeLoad (win) {
                win.localStorage.setItem('token', user.token)
            },
        })
    })

    it(`Add task button exists`, () => {
        cy.get('button[aria-label="Add new task"]').should('exist')
    })


    it(`Create new task has title 'New task'`, () => {
        cy.visit(`http://localhost:3000/tasks/new`)
        cy.contains('h5', 'New task')
    })

    it(`Create task button should be disabled if title is empty`, () => {
        cy.visit(`http://localhost:3000/tasks/new`)
        cy.get('textarea').focus()
            .type(`content${Cypress._.random(0, 1e6)}`, { delay: 50 })
        cy.get('input#flag').focus()
            .type(`flag${Cypress._.random(0, 1e6)}`, { delay: 50 })
        cy.get('button[type="submit"]').should('be.disabled')
    })

    it(`Try to create new task`, () => {
        cy.visit(`http://localhost:3000/tasks/new`)
        cy.get('input#title').focus()
            .type(`test${Cypress._.random(0, 1e6)}`, { delay: 100 })
        cy.get('textarea').focus()
            .type(`content${Cypress._.random(0, 1e6)}`, { delay: 100 })
        cy.get('input#flag').focus()
            .type(`flag${Cypress._.random(0, 1e6)}`, { delay: 100 })
        cy.get('input#score').focus()
            .type(12, { delay: 100 })
        cy.get('button[type="submit"]').click();
    })

    it(`Try to edit task`, () => {
        cy.visit(`http://localhost:3000/tasks`)
        cy.wait(1000)
        cy.get('span').contains('EDIT').click();
        cy.get('input#title').invoke('val').should('not.be.empty')
    })
})


context('Tasks page (as user)', () => {
    let user

    before(function fetchUser () {
        cy.request('POST', 'http://localhost:3006/api/users/login', {
            login: 'test',
            password: 'test',
        })
            .its('body')
            .then((res) => {
                user = res
            })
    })

    beforeEach(function setUser () {
        cy.visit('localhost:3000/tasks', {
            onBeforeLoad (win) {
                win.localStorage.setItem('token', user.token)
            },
        })
    })

    it(`'Tasks' page contains tasks and header`, () => {
        cy.contains('h5', 'Tasks')
        cy.contains('a', 'CTFNode')
        cy.get('span.MuiButton-label').should('have.length.at.least', 1)
    })


    it(`Task page contains 'score'`, () => {
        cy.visit(`http://localhost:3000/tasks/5fd3571a025b6a3138d16f96`)
        cy.contains('h6', 'Score')
    })

    it(`Try to solve task`, () => {
        cy.visit(`http://localhost:3000/tasks/5fd3571a025b6a3138d16f96`)
        cy.get('input#flag')
            .type('test', { delay: 100 }).type('{enter}')
        cy.get('.MuiAlert-root').should('exist')
    })
})

context('Header and sidebar', () => {
    let user

    before(function fetchUser () {
        cy.request('POST', 'http://localhost:3006/api/users/login', {
            login: 'test',
            password: 'test',
        })
            .its('body')
            .then((res) => {
                user = res
            })
    })

    beforeEach(function setUser () {
        cy.visit('localhost:3000/tasks', {
            onBeforeLoad (win) {
                win.localStorage.setItem('token', user.token)
            },
        })
    })

    it(`In menu should be 3 links`, () => {
        cy.get('.MuiDrawer-paper a').should('have.length', 3)
    })

    it(`Header should have user login`, () => {
        cy.get('header span').contains(user.login).should('exist')
    })

    it(`Logout button should redirect to '/login'`, () => {
        cy.get('header a[href="/profile"]').next().click();
        cy.url().should('contain', '/login')
    })
})





