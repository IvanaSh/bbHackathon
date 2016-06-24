app.factory('loyaltyDiscountService', function() {
  return {
    hasLoyaltyDiscount: function() {
      return (Math.random()*10 > 5) ? true : false;
    },
    getLoyalDiscount: function() {
      var discountRange = [5, 10, 15, 20, 25, 50];
      var index = Math.ceil(Math.random() * 5)
      return discountRange[index];
    }
  }
});
