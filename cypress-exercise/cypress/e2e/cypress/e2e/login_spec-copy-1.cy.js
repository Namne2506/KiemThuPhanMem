describe('Login Test', () => {

  it('Should login successfully with valid credentials', () => {
    // Truy cập trang đăng nhập
    cy.visit('https://www.saucedemo.com');

    // Nhập username
    cy.get('#user-name').type('standard_user');

    // Nhập password
    cy.get('#password').type('secret_sauce');

    // Click nút Login
    cy.get('#login-button').click();

    // Kiểm tra URL có chuyển sang trang inventory
    cy.url().should('include', '/inventory.html');
  });

  it('Should show error message with invalid credentials', () => {
    // Truy cập trang đăng nhập
    cy.visit('https://www.saucedemo.com');

    // Nhập username sai
    cy.get('#user-name').type('invalid_user');

    // Nhập password sai
    cy.get('#password').type('wrong_password');

    // Click Login
    cy.get('#login-button').click();

    // Kiểm tra thông báo lỗi
    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Username and password do not match');
  });

});
