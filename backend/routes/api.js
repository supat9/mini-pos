const express = require("express");
const rateLimit = require("express-rate-limit");

const apiLimit = rateLimit({
  windowMs: 1000 * 60 * 3, // 3 minutes
  max: 100,
  message: "You have exceeded the 100 requests in 3 minutes limit!",
});

const router = express.Router();
const customerController = require("../controllers/customers");
const productController = require("../controllers/products");
const orderController = require("../controllers/orders");
const orderDetailController = require("../controllers/orderDetails");
const paymentController = require("../controllers/payments");

router.get("/customers", apiLimit, customerController.getCustomers);
router.get("/customers/:id", apiLimit, customerController.getCustomerById);
router.post("/customers", apiLimit, customerController.addCustomer);
router.put("/customers/:id", apiLimit, customerController.updateCustomer);
router.delete("/customers/:id", apiLimit, customerController.deleteCustomer);

router.get("/products", apiLimit, productController.getProducts);
router.get("/products/:id", apiLimit, productController.getProductById);
router.post("/products", apiLimit, productController.addProduct);
router.put("/products/:id", apiLimit, productController.updateProduct);
router.delete("/products/:id", apiLimit, productController.deleteProduct);

router.get("/orders", apiLimit, orderController.getOrders);
router.get("/orders/:id", apiLimit, orderController.getOrderById);
router.post("/orders", apiLimit, orderController.addOrder);
router.put("/orders/:id", apiLimit, orderController.updateOrder);
router.delete("/orders/:id", apiLimit, orderController.deleteOrder);

router.get("/orderdetails", apiLimit, orderDetailController.getOrderDetails);
router.get("/orderdetails/:id", apiLimit, orderDetailController.getOrderDetailById);
router.post("/orderdetails", apiLimit, orderDetailController.addOrderDetail);
router.put("/orderdetails/:id", apiLimit, orderDetailController.updateOrderDetail);
router.delete("/orderdetails/:id", apiLimit, orderDetailController.deleteOrderDetail);

router.get("/payments", apiLimit, paymentController.getPayments);
router.get("/payments/:id", apiLimit, paymentController.getPaymentById);
router.post("/payments", apiLimit, paymentController.addPayment);
router.put("/payments/:id", apiLimit, paymentController.updatePayment);
router.delete("/payments/:id", apiLimit, paymentController.deletePayment);

module.exports = router;