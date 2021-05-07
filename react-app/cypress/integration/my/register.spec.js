/// <reference types="cypress" />

context('Register page', () => {
    beforeEach(() => {
        cy.visit('localhost:3000/login')
    })

    it('Register into system', () => {
        cy.get('a[href="/register"]').click();
        cy.get('input#login')
            .type(`test${Cypress._.random(0, 1e6)}`, { delay: 100 })
        cy.get('input#password').focus()
            .type('test', { delay: 100 })
        cy.get('input#email').focus()
            .type('test@mail.ru', { delay: 100 })
        cy.get('button[type="submit"]')
            .should('not.be.disabled')
        cy.get('button[type="submit"]').click();
        cy.url().should('eq', 'http://localhost:3000/')
    })
})
