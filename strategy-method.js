class DiscountStrategy {
  calculateDiscount(originalPrice) {
    // To be implemented by concrete strategies.
  }
}

class NoDiscount extends DiscountStrategy {
  calculateDiscount(originalPrice) {
    return 0;
  }
}

class SmallDiscount extends DiscountStrategy {
  calculateDiscount(originalPrice) {
    return originalPrice * 0.1;
  }
}

class BigDiscount extends DiscountStrategy {
  calculateDiscount(originalPrice) {
    return originalPrice < 1000 ? originalPrice * 0.5 : 500;
  }
}

class ShoppingCart {
  constructor(discountStrategy) {
    this.discountStrategy = discountStrategy;
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  calculateTotal() {
    const originalTotal = this.items.reduce(
      (total, item) => total + item.price,
      0
    );
    return (
      originalTotal - this.discountStrategy.calculateDiscount(originalTotal)
    );
  }
}

// The strategy method pattern is useful when a logic (or part of it) should be flexible.
// Strategy method uses polimorfism to provide that flexibility.
// Also, it mades the code cleaner by keeping separate the context logic (ShoppingCart calculateTotal method)
// from the specific strategies logic.

const bigDiscount = new BigDiscount();
const cart1 = new ShoppingCart(bigDiscount);
cart1.addItem({ name: "item1", price: 200 });
cart1.addItem({ name: "item2", price: 1300 });
console.log(cart1.calculateTotal());

// Another adventage of the strategy method pattern is that the strategy can be changed on run time.

const smallDiscount = new SmallDiscount();
cart1.discountStrategy = smallDiscount;
console.log(cart1.calculateTotal());
