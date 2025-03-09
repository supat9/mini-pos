const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orderdetails
const getOrderDetails = async (req, res) => {
    try {
      const orderdetails = await prisma.orderdetail.findMany({
        include: {
          orders: true,
          products: true,
        },
      });
      res.status(200).json({ message: "Order details fetched successfully", orderdetails });
    } catch (error) {
      console.error("Error fetching order details:", error.message);
      res.status(400).json({ error: error.message });
    }
  };

// Get orderdetail by ID
const getOrderDetailById = async (req, res) => {
  const { id } = req.params;
  try {
    const orderdetail = await prisma.orderdetail.findUnique({
      where: { orderdetail_id: parseInt(id) },
      include: {
        orders: true,
        products: true,
      },
    });
    if (!orderdetail) {
      return res.status(404).json({ message: "Order detail not found" });
    }
    res.status(200).json({ message: "Order detail fetched successfully", orderdetail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new orderdetail
// Create new orderdetail
const addOrderDetail = async (req, res) => {
    const { order_id, product_id, quantity, price } = req.body;
    try {
      // Check if the required fields are provided
      if (!order_id || !product_id || !quantity || !price) {
        return res.status(400).json({ error: "Missing required fields." });
      }
  
      // Create the order detail in the database
      const orderdetail = await prisma.orderdetail.create({
        data: {
          order_id,
          product_id,
          quantity,
          price,
        },
      });
      res.status(201).json({ message: "Order detail created successfully", orderdetail });
    } catch (error) {
      console.error("Error in creating order detail:", error.message);
      res.status(400).json({ error: error.message });
    }
  };
  

// Update orderdetail by ID
const updateOrderDetail = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  try {
    const orderdetail = await prisma.orderdetail.update({
      where: { orderdetail_id: parseInt(id) },
      data: {
        quantity,
        price,
      },
    });
    res.status(200).json({ message: "Order detail updated successfully", orderdetail });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete orderdetail by ID
const deleteOrderDetail = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orderdetail.delete({
      where: { orderdetail_id: parseInt(id) },
    });
    res.status(200).json({ message: "Order detail deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrderDetails, getOrderDetailById, addOrderDetail, updateOrderDetail, deleteOrderDetail };
