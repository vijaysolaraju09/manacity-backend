const Cart = require("../models/Cart"); // adjust this path based on your actual file
const Product = require("../models/Product");

exports.addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();
    res.status(200).json({ msg: "Added to cart", cart });
  } catch (err) {
    res.status(500).json({ msg: "Error adding to cart", error: err.message });
  }
};

exports.getMyCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate({
      path: "items.product",
      populate: { path: "shop", select: "name location phone" },
    });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const grouped = {};

    cart.items.forEach((item) => {
      const product = item.product;
      if (!product || !product.shop) return;

      const shopId = product.shop._id;

      if (!grouped[shopId]) {
        grouped[shopId] = {
          shop: product.shop,
          products: [],
        };
      }

      grouped[shopId].products.push({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
        quantity: item.quantity,
      });
    });

    res.json({ cartByShop: Object.values(grouped) });
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch cart", error: err.message });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find((i) => i.product.toString() === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.status(200).json({ msg: "Quantity updated", cart });
    } else {
      res.status(404).json({ msg: "Item not found in cart" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Failed to update quantity", error: err.message });
  }
};

exports.removeItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.id;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ msg: "Item removed", cart });
  } catch (err) {
    res.status(500).json({ msg: "Failed to remove item", error: err.message });
  }
};
