it('adds todos', () => {
  cy.visit('http://localhost:3000/')
  cy.get('section > *').should('have.length', 4)
  // confirm the application is showing two items
})
