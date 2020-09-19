/// <reference types="cypress" />

// Clear local storage after all specs:

beforeEach(() => {
    cy.clearLocalStorageCache();
});

describe('Swap between the app\'s modes: lists and tasks views', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  it('Add lists', () => {

    cy.get('#input-title')
      .type('fake list')
    cy.contains('.btn', 'Añadir')
      .click()
    cy.get('#input-title')
      .clear()

    cy.get('#input-title')
      .type('My second list')
    cy.get('#input-description')
      .type('Description text')
    cy.contains('.btn', 'Añadir')
      .click()
    cy.get('#input-title')
      .clear()
  })

  it('Movind to tasks view...', () => {

      cy.get('.config-actions > .image-btn > img')
        .click()
  })
})
