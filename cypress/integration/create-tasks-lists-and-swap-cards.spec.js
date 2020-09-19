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

describe('Create lists & tasks and swap between cards', () => {
  it('Opening the ' + Cypress.config().appName + '...', () => {

    cy.visit(Cypress.config().baseUrl)
  })

  it('Add one list', () => {

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

  it('Moving to lists view...', () => {

      cy.get('.config-actions > .image-btn > img')
        .click()
  })

  it('Add other list and select', () => {

    cy.get('#input-title')
      .type('My second list')
    cy.contains('.btn', 'Añadir')
      .click()
    cy.get('#input-title')
      .clear()

    cy.contains('.cards .card', 'My second list')
      .contains('.btn', 'Seleccionar')
      .click()
  })

  it('Moving to tasks view...', () => {

    cy.get('.config-actions > .image-btn > img')
      .click()
  })

  it('Adding task with auto-title...', () => {

    cy.contains('.btn', 'Añadir')
      .click()
    cy.get('#input-title')
      .clear()
  })

  it('Moving to lists view...', () => {

    cy.get('.config-actions > .image-btn > img')
      .click()
  })

  it('Change selected list card', () => {
    cy.contains('.cards .card', 'fake list')
      .contains('.btn', 'Seleccionar')
      .click()
  })

  it('Moving to tasks view...', () => {

    cy.get('.config-actions > .image-btn > img')
      .click()
  })

  it('Delete the task labeled "My second task"', () => {

    cy.contains('.cards .card', 'My second task')
      .contains('.btn', 'Eliminar')
      .click()
  })
})
