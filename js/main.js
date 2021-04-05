var app = new Vue({
  el: '#app',
  data: {
    products: [
      { id: 1, title: 'Almaz', short_text: 'short_text', image: 'images/eggplant/1almaz.jpg', descr: 'Full descr' },
      { id: 2, title: 'Epic F1', short_text: 'short_text', image: 'images/eggplant/2epicf1.jpg', descr: 'Full descr' },
      { id: 3, title: 'Swan', short_text: 'short_text', image: 'images/eggplant/3lebed.jpg', descr: 'Full descr' },
      { id: 4, title: 'Ping Pong', short_text: 'short_text', image: 'images/eggplant/4ping-pong.jpg', descr: 'Full descr' },
      { id: 5, title: 'White', short_text: 'short_text', image: 'images/eggplant/5white.jpg', descr: 'Full descr' },
    ],
    product: [{}],
    btnVisible: 0,
    cart: [],
    contactFields: [],
    formVisible: 1
  },
  mounted:
    function () {
      this.getProduct()
      this.checkInCart()
      this.getCart()
    },
  methods: {
    getProduct() {
      if (window.location.hash) {
        var id = window.location.hash.replace('#', '');
        if (this.products && this.products.length > 0) {
          for (i in this.products) {
            if (this.products[i] && this.products[i].id && id == this.products[i].id)
              this.product = this.products[i];
          }
        }
      }
    },

    addToCart(id) {
      var cart = [];
      if (localStorage.getItem('cart')) {
        cart = localStorage.getItem('cart').split(',');
      }

      if (cart.indexOf(String(id)) == -1) {
        cart.push(id);
        localStorage.setItem('cart', cart.join());
        this.btnVisible = 1;
      }
    },

    checkInCart() {
      if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1)
        this.btnVisible = 1;
    },

    getCart() {
      let localCart = localStorage.getItem('cart').split(',')
      for (i of this.products) {
        if (localCart.indexOf(String(i.id)) != -1) {
          this.cart.push(i);
        }
      }
    },

    removeFromCart(id) {
      this.cart = this.cart.filter(product => product.id != id);
      localStorage.setItem('cart', this.cart.join());
    },

    makeOrder() {
      this.cart = []
      localStorage.clear()
      this.formVisible = 0;
    }
  }
})