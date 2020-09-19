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

  it('Movind to lists view...', () => {

      cy.get('.config-actions > .image-btn > img')
        .click()
  })
})
