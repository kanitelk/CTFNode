/// <reference types="cypress" />

context('Login page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/login')
    })

    it('Login input', () => {
        cy.get('input#login')
            .type('test', { delay: 100 })
            .should('have.value', 'test')
    })

    it('Password input', () => {
        cy.get('input#password').focus()
            .type('test', { delay: 100 })
            .should('have.value', 'test')
    })

    it('Login into system', () => {
        cy.get('input#login')
            .type('test', { delay: 100 })
        cy.get('input#password').focus()
            .type('test', { delay: 100 })
        cy.get('button[type="submit"]')
            .should('not.be.disabled')
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/')
    })
})
