import Animes from "./components/Animes";

it("contains the correct number of todos", () => {
  cy.mount(<Animes />);
  // the component starts running like a mini web app
  cy.get('#anime-list').should("have.length", 4);
});

