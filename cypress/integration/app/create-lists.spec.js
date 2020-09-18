/// <reference types="cypress" />

describe('Create 2 lists', () => {
  it('Opening the TODO-List...', () => {
    cy.visit('http://localhost:3000')
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
})
