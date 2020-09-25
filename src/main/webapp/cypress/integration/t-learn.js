describe('t-learn app', () => {
    it('Creates a new course', () => {
        cy.visit('http://localhost:8080');
        cy.findByText('Erstellen').click();

        // navigate to create page
        cy.url().should('include', '/create');
        cy.findAllByText('Veranstaltung erstellen').should('exist');

        cy.findByLabelText('Titel / Thema')
            .click()
            .type('Titel der Veranstaltung');

        cy.findByLabelText('Veranstalter*in')
            .click()
            .type('Viktor Veranstalter');

        cy.findByLabelText('Veranstaltungsart')
            .select('Extern')
            .type('Viktor Veranstalter');

        cy.findByRole('button', { name: 'ERSTELLEN' }).click();

        // navigate to details page
        cy.url().should('include', '/details/');

        cy.findAllByTestId('courseDetailsTitle').should(
            'contain',
            'Titel der Veranstaltung'
        );
        cy.findByLabelText('Typ:').should('contain', 'Extern');
        cy.findByLabelText('Veranstalter*in:').should(
            'contain',
            'Viktor Veranstalter'
        );
    });
});
