"use-strict"
class Shop {
    constructor(name, specials){
        this.name = name;
        this.specials = [...specials];
    }
}
class Special {
    constructor(name, price){
        this.name = name;
        this.price = price;
    }
}
class Menu {
    constructor(){
        this.shops = [];
        this.selectedShop = null; 
    }
    start(){
        let menuSelection = this.showMainMenu();
        while(menuSelection != 0){
            switch(menuSelection){
                case '1':
                    this.createShop();
                    break;
                case '2':
                    this.viewShop();
                    break;
                case '3':
                    this.deleteShop()
                    break;
                case '4':
                    this.displayShops()
                    break;
                default:
                    menuSelection = 0; 
                    break;

            }
            menuSelection = this.showMainMenu();
        }
    }
    showShopMenuOptions(shopDescription){
        return prompt(`
        0) Back
        1) Create Special
        2) Delete Special
        ------------------------
        ${shopDescription}
        `);
    }
    showMainMenu(){
        return prompt(`
        0) Quit Menu
        1) Create A Shop
        2) View A Shop
        3) Delete A Shop
        4) Display All Shops
        `);
    }
    createShop(){
        let name = prompt('What is the name of the shop?');
        let numberOfItems = prompt('How many specials do they have?');
        let specialItems = [];
        for(let i = 0; i < numberOfItems; i++){
            let specialName = prompt(`What is the #${i +1} item name?`);
            let specialPrice = prompt(`What is the price of the ${specialName}?`);

            specialItems.push(new Special(specialName, specialPrice));
        }
        this.shops.push(new Shop(name, specialItems))
    }
    viewShop(){
        let selectedShop = prompt(`Whats the index of the shop that you would like to view? [0-${this.shops.length-1}]`);
        if(selectedShop > -1 && selectedShop < this.shops.length ){
            this.selectedShop = this.shops[selectedShop];
            let shopDescription = `Shop Name: ${this.selectedShop.name}\n
            Special Options: \n
            ${this.selectedShop.specials.reduce((acc, next, index)=>acc + `${index}) ${next.name}: ${next.price}\n`,'')}`;
            let selection = this.showShopMenuOptions(shopDescription);
            switch(selection){
                case '1':
                    this.createSpecial();
                    break;
                case '2':
                    this.deleteSpecial();
                
            }

        }

    }
    deleteShop(){
        let index = prompt('What is the index of the shop you would like to delete?');
        let shopToDelete = this.shops[index];
        this.shops = this.shops.filter((element)=>element.name !== shopToDelete.name);
    }
    displayShops(){
        let stringToDisplay = this.shops.reduce((acc, next, index)=>{
            return acc + `${index}) ${next.name} - \nSandwich Specials: ${next.specials.reduce((acc, next)=>{return acc+', '+next.name},'')}\n`
        },'');

        alert(stringToDisplay);
    }
    deleteSpecial(){
        let index = prompt('Which special would you like to delete?');
        if(index > -1 && index <= this.selectedShop.specials.length){
            let specialToDelete = this.selectedShop.specials[index].name;
            this.selectedShop.specials = this.selectedShop.specials.filter((element, index)=>element.name !== specialToDelete);
            console.log(this.selectedShop.specials)
        }
    }
    createSpecial(){
        let name = prompt('What is the name of the special you would like to create?');
        let price = prompt('How much does that cost?');
        this.selectedShop.specials.push(new Special(name, price));
    }
    
}

let menu = new Menu();
menu.start();