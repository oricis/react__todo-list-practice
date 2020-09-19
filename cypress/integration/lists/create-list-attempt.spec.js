/// <reference types="cypress" />

// Clear local storage after all specs:

beforeEach(() => {
    cy.clearLocalStorageCache();
});

describe('Attemps to create a list then clear form fields...', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  const lists = require('../../fixtures/lists')
  it('Write text for list three and clear inputs', () => {

    cy.get('#input-title')
      .type(lists.one.text)

    cy.get('#input-description')
      .type(lists.one.description)

    cy.contains('.btn', 'Limpiar')
      .click()
  })

  it('Checking if no cards were added...', () => {

    cy.get('.cards .card')
      .should('have.length', 0)
  })
})
