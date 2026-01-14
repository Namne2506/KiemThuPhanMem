describe('Cart Test', () => {

  beforeEach(() => {
    // Truy cập trang đăng nhập
    cy.visit('https://www.saucedemo.com');

    // Đăng nhập
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();

    // Đảm bảo đã vào trang inventory
    cy.url().should('include', '/inventory.html');
  });

  it('Should add a product to the cart', () => {
    cy.get('.inventory_item')
      .first()
      .find('.btn_inventory')
      .click();

    cy.get('.shopping_cart_badge')
      .should('have.text', '1');
  });

  it('Should sort products by price low to high', () => {
    cy.get('.product_sort_container').select('lohi');

    cy.get('.inventory_item_price')
      .first()
      .should('have.text', '$7.99');
  });

  it('Should remove product from the cart', () => {
    // Thêm sản phẩm vào giỏ
    cy.get('.inventory_item')
      .first()
      .find('.btn_inventory')
      .click();

    cy.get('.shopping_cart_badge')
      .should('have.text', '1');

    // Remove sản phẩm (nút đổi từ Add -> Remove)
    cy.get('.inventory_item')
      .first()
      .find('.btn_inventory')
      .click();

    // Giỏ hàng không còn hiển thị số lượng
    cy.get('.shopping_cart_badge')
      .should('not.exist');
  });
    it('Should proceed to checkout step two successfully', () => {
    // Thêm sản phẩm đầu tiên vào giỏ hàng
    cy.get('.inventory_item')
        .first()
        .find('.btn_inventory')
        .click();

    // Vào trang giỏ hàng
    cy.get('.shopping_cart_link').click();

    // Nhấn Checkout
    cy.get('#checkout').click();

    // Nhập thông tin thanh toán
    cy.get('#first-name').type('John');
    cy.get('#last-name').type('Doe');
    cy.get('#postal-code').type('12345');

    // Nhấn Continue
    cy.get('#continue').click();

    // Xác minh chuyển sang trang xác nhận thanh toán
    cy.url().should('include', '/checkout-step-two.html');
    });


});
