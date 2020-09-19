/// <reference types="cypress" />

// Clear local storage after all specs:

beforeEach(() => {
    cy.clearLocalStorageCache();
});

describe('Swap between the app\'s modes: lists and tasks views', () => {
    it('Opening the ' + Cypress.config().appName + '...', () => {

        cy.visit(Cypress.config().baseUrl)
    })

    it('Add one list', () => {

        cy.get('#input-title')
            .type('fake list')
        cy.contains('.btn', 'Añadir')
            .click()
        cy.get('#input-title')
            .clear()
    })

    it('Moving to tasks view...', () => {

        cy.get('.config-actions > .image-btn > img')
            .click()
    })

    it('Adding tasks...', () => {

        cy.get('#input-title')
            .type('First task')
        cy.contains('.btn', 'Añadir')
            .click()
        cy.get('#input-title')
            .clear()

        cy.get('#input-title')
            .type('My second task')
        cy.contains('.btn', 'Añadir')
            .click()
        cy.get('#input-title')
            .clear()
    })

    it('Complete task', () => {

        cy.get('.cards .card:nth-child(1) > .card-footer')
            .contains('.btn', 'Completada')
            .click()
    })
})
