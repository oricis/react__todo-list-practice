/// <reference types="cypress" />

describe('Create 2 lists & deleted the selected', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  it('Add lists', () => {

    cy.get('#input-title')
      .type('fake list')
    cy.contains('.btn','Añadir')
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

  it('Delete first list (selected card)', () => {

    cy.contains('.cards .card.card-selected .btn', 'Eliminar')
      .click()
  })
})
