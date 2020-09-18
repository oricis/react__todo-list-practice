/// <reference types="cypress" />

describe('Create 2 lists', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  it('Add list one', () => {

    cy.get('#input-title')
      .type('fake list')

    cy.contains('.btn','Añadir')
      .click()

    cy.get('#input-title')
      .clear()
  })

  it('Add list two', () => {

    cy.get('#input-title')
      .type('My second list')

    cy.get('#input-description')
      .type('Description text')

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
