import Item from "./Item";
import User from './User'

class Shop {
  private items: Item[];
  public static myUser: User | undefined;
  
  constructor() {
    this.items = [];  
    const item1 = new Item('chicken', 12, 'chicken breast');
    const item2 = new Item('pasta', 4, 'barilla penne');
    const item3 = new Item('marinara sauce', 5, 'prego');  
    const item4 = new Item('broccoli', 5, 'chopped frozen broccoli crowns');
    const item5 = new Item('eggs', 3, 'dozen farm fresh eggs');
    const item6 = new Item('chocolate milk', 5, 'fairlife chocolate milk');  
    this.items.push(item1, item2, item3, item4, item5, item6);
  }

  public getitems(): Item[] {
    return this.items;
  }

  public showItems(): void {
    const shopDiv = document.getElementById('shop') as HTMLDivElement;
    this.items.forEach((item) => {
      const itemElement = item.itemElement();
      shopDiv.appendChild(itemElement);
    });
  }

  public updateCart(): void {
    console.log('Updating cart display');
    const cartDiv = document.getElementById('cart') as HTMLDivElement;
    cartDiv.innerHTML = '';

    if (!Shop.myUser || Shop.myUser.getCart().length === 0) {
      cartDiv.textContent = 'Cart is empty';
    } else {
      const cartItems = Shop.myUser.cartHTMLElement();
      cartDiv.appendChild(cartItems);
      Shop.myUser.addRemoveEventListeners();
    }
  }

  public static loginUser(event: Event): void {
    event.preventDefault();
    const user = User.loginUser();
    if (user) {
      Shop.myUser = user;
      const shop = new Shop();
      shop.showItems();
      shop.updateCart();
    }
  }
}
export default Shop;