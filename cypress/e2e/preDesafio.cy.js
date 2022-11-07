import { RegisterPage } from "../support/pages/registerPage";
import { LoginPage } from "../support/pages/loginPage";
import { HomePage } from "../support/pages/homePage";
import { ProductsPage } from "../support/pages/productsPage";
import { CartPage } from "../support/pages/cartPage";

describe("Preentrega desafio PushingIt", () => {
  let datosLogin, datosProducts;
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const productsPage = new ProductsPage();
  const cartPage = new CartPage();

  before("Asociando archivos Json", () => {
    cy.fixture("userData").then((dato) => {
      datosLogin = dato;

      cy.fixture("productsData").then((datos) => {
        datosProducts = datos;
      });
    });
  });

  it("Deberia verificar productos del carrito de compras y su suma total", () => {
    let suma = datosProducts.product2.price + datosProducts.product4.price;

    cy.visit("");

    //registerPage
    registerPage.ingresarLoginPage();

    //loginPage
    loginPage.ingresarUsuario(datosLogin.user);
    loginPage.ingresarPassword(datosLogin.pass);
    loginPage.botonIngresar();

    //homePage
    homePage.ingresarProductsPage();

    //productsPage
    productsPage.seleccionarProducto(datosProducts.product2.name);
    productsPage.agregarProductoAlCart();
    productsPage.seleccionarProducto(datosProducts.product4.name);
    productsPage.agregarProductoAlCart();
    productsPage.irAlCarrito();

    //cartPage
    cartPage
      .verificarProducto(datosProducts.product2.name)
      .should("have.text", datosProducts.product2.name);
    cartPage
      .verificarPrecio(
        datosProducts.product2.name,
        datosProducts.product2.price
      )
      .should("have.text", `$${datosProducts.product2.price}`);
    cartPage
      .verificarProducto(datosProducts.product4.name)
      .should("have.text", datosProducts.product4.name);
    cartPage
      .verificarPrecio(
        datosProducts.product4.name,
        datosProducts.product4.price
      )
      .should("have.text", `$${datosProducts.product4.price}`);
    cartPage.buttonImporteTotal();
    cartPage.verificarImporte().should("have.text", suma);
  });
});
