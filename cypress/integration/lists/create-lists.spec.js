/// <reference types="cypress" />

// Clear local storage after all specs:

beforeEach(() => {
    cy.clearLocalStorageCache();
});

describe('Create 2 lists', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  const lists = require('../../fixtures/lists')
  it('Add list one', () => {

    cy.get('#input-title')
      .type(lists.one.text)

    cy.contains('.btn','Añadir')
      .click()

    cy.get('#input-title')
      .clear()
  })

  it('Add list two', () => {

    cy.get('#input-title')
      .type(lists.two.text)

    cy.get('#input-description')
      .type(lists.two.description)

    cy.contains('.btn', 'Añadir')
      .click()

    cy.get('#input-title')
      .clear()
  })

  it('Checking if some card was added...', () => {

    cy.get('.cards .card')
  })

  it('Checking if two cards were added...', () => {

    cy.get('.cards .card')
      .should('have.length', 2)
  })
})
