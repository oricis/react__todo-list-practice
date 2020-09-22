/// <reference types="cypress" />

// Clear local storage after all specs:

beforeEach(() => {
    cy.clearLocalStorageCache();
});

describe('Create 2 lists & deleted the selected', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  const lists = require('../../fixtures/lists')
  it('Add lists', () => {

    cy.get('#input-title')
      .type(lists.one.text)
    cy.contains('.btn','Añadir')
      .click()
    cy.get('#input-title')
      .clear()

    cy.get('#input-title')
      .type(lists.two.text)
    cy.get('#input-description')
      .type(lists.two.description)
    cy.contains('.btn', 'Añadir')
      .click()
    cy.get('#input-title')
      .clear()
  })

  it('Delete first list (selected card)', () => {

    cy.contains('.cards .card.card-selected .btn', 'Eliminar')
      .click()
  })
})
