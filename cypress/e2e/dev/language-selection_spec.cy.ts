describe('energy dashboard web app', () => {
    beforeEach(() => {
        cy.visit('/dashboard');
    });
    it('displays at least 4 language buttons in ul class "header__lang-select" ', () => {
        cy.get('ul.header__lang-select')
            .children()
            .should('have.lengthOf.least', 4);
    });
    it('has DE, FR, IT, EN as the first four li in its ul ', () => {
        cy.get('ul.header__lang-select li')
            .first()
            .should('have.text', 'DE')
            .next()
            .should('have.text', 'FR')
            .next()
            .should('have.text', 'IT')
            .next()
            .should('have.text', 'EN');
    });
    it('has lang EN upon start ', () => {
        cy.get('html').invoke('attr', 'lang').should('eq', 'en');
    });
});
