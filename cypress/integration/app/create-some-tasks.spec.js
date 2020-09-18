/// <reference types="cypress" />

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
})
