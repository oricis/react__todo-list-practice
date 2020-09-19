/// <reference types="cypress" />

// Preserve local storage between specs:
// https://blog.liplex.de/keep-local-storage-in-cypress/
let LOCAL_STORAGE_MEMORY = {};

Cypress.Commands.add("clearLocalStorageCache", () => {
    localStorage.clear();
    LOCAL_STORAGE_MEMORY = {};
});
Cypress.Commands.add("saveLocalStorageCache", () => {
    Object.keys(localStorage).forEach(key => {
        LOCAL_STORAGE_MEMORY[key] = localStorage[key];
    });
});
Cypress.Commands.add("restoreLocalStorageCache", () => {
    Object.keys(LOCAL_STORAGE_MEMORY).forEach(key => {
        localStorage.setItem(key, LOCAL_STORAGE_MEMORY[key]);
    });
});

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
        cy.contains('.cards .card', 'fake list')
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
