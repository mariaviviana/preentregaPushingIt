export class CartPage{

    constructor(){
    this.verTotal = "//button[text()='Show total price']";
    this.importeTotal = "#price";
    };

    verificarProducto(producto){
        return cy.get(`p[name='${producto}']`);
    };

    verificarPrecio(producto,precio){
        return cy.xpath(`//p[@name='${producto}']//following-sibling::p[@name=${precio}]`);
    }
    
    buttonImporteTotal(){
        cy.xpath(this.verTotal).click()
    }

    verificarImporte(){
        return cy.get(this.importeTotal);
    }
}