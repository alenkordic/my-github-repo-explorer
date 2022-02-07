// @ts-nocheck

describe("Main init UI.", () => {
  it("Navbar renders correctly", () => {
    cy.visit("http://localhost:3000/");
    cy.get("[data-cy=navbar]").should("exist");
    cy.get("[data-cy=switchButton]").should("exist");
    cy.get("[data-testid=GitHubIcon]").should("exist");
    cy.get("[data-cy=authButtonGroup]").should("exist");
    cy.get("[data-cy=userNameText]").should("exist");
  });

  it("Search input renders correctly", () => {
    cy.get("[data-cy=searchInputField]").should("exist");
    cy.get("[data-cy=searchInputField] input").should("be.empty");
  });
});

describe("Search for repositories.", () => {
  it("Search for repositories as guest.", () => {
    cy.visit("http://localhost:3000/repositories");
    cy.get("[data-cy=searchInputField] input").clear();
    cy.get("[data-cy=searchInputField] input").should("be.empty");
    cy.get("[data-cy=tableContainer]").should("not.exist");
    cy.get("[data-cy=searchInputField] input").type("testing");
    const defaultPagesPerPage = 25;
    cy.server();
    cy.request(
      `https://api.github.com/search/repositories?q=testing%20in%3Aname&per_page=${defaultPagesPerPage}&page=1`
    ).then((response: any) => {
      expect(response.status).to.eq(200);
      expect(response).to.have.property("headers");
      expect(response.body).to.have.property("total_count");
      expect(response.body).to.have.property("incomplete_results");
      expect(response.body).to.have.property("items");
      expect(response.body.items).to.have.length(defaultPagesPerPage);
    });
    cy.get("[data-cy=tableContainer]").should("exist");
    cy.get("[data-cy=tableRowItem]").should("exist");
  });
});
