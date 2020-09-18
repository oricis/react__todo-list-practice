/// <reference types="cypress" />

describe('Attemps to create a list then clear form fields...', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  it('Write text for list three and clear inputs', () => {

    cy.get('#input-title')
      .type('My other list')

    cy.get('#input-description')
      .type('Some description text')

    cy.contains('.btn', 'Limpiar')
      .click()
  })

  it('Checking if no cards were added...', () => {

    cy.get('.cards .card')
      .should('have.length', 0)
  })
})
