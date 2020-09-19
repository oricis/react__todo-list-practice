/// <reference types="cypress" />

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

        cy.get('#input-title')
            .type('Other task')
        cy.contains('.btn', 'Añadir')
            .click()
        cy.get('#input-title')
            .clear()
    })

    it('Edit tasks', () => {

        cy.get('.cards .card:nth-child(1) > .card-header > .image-btn > img')
            .click()
            .get('.card-body .card-title > [type="text"]')
            .clear()
            .type('xxx{enter}')

        cy.get('.cards .card:nth-child(2) > .card-header > .image-btn > img')
            .click()
            .get('.card-body .card-title > [type="text"]')
            .clear()
            .type('zzz{enter}')
    })
})
