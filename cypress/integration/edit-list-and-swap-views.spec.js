/// <reference types="cypress" />

// Preserve local storage between specs:

afterEach(() => {
    cy.saveLocalStorageCache();
});
before(function () {
    cy.clearLocalStorageCache();
});
beforeEach(() => {
    cy.restoreLocalStorageCache();
});

// Start tests

describe('Swap between the app\'s modes: lists and tasks views', () => {
    it('Opening the ' + Cypress.config().appName + '...', () => {

        cy.visit(Cypress.config().baseUrl)
    })

    const lists = require('../fixtures/lists')
    it('Add one list', () => {

        cy.get('#input-title')
            .type(lists.one.text)
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
    })

    it('Movind to lists view...', () => {

        cy.get('.config-actions > .image-btn > img')
            .click()
    })

    it('Edit the list', () => {
        // Select the list when it's the only one:
        // cy.get('.cards .card .card-header > .image-btn > [alt="Editar"]')
        //     .click()
        //     .get('.card-body .card-title > [type="text"]')
        //     .type('The Number One{enter}')

        // select list card by text
        cy.contains('.cards .card', lists.one.text)
            .get('.image-btn > [alt="Editar"]')
            .click()
            .get('.card-body .card-title > [type="text"]')
            .clear()
            .type('The Number One{enter}')
    })

    it('Moving to tasks view...', () => {

        cy.get('.config-actions > .image-btn > img')
            .click()
    })

    it('Check actual list', () => {

        cy.get('.config-actions h2')
            .should('text', 'The Number One')
    })
})
