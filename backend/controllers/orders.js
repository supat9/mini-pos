const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all orders
const getOrders = async (req, res) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        customers: true,
        orderdetail: true,
        payments: true,
      },
    });
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get order by ID
const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await prisma.orders.findUnique({
      where: { order_id: parseInt(id) },
      include: {
        customers: true,
        orderdetail: true,
        payments: true,
      },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    res.status(200).json({ message: "Order fetched successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new order
const addOrder = async (req, res) => {
    const { customer_id, total_amount, order_status } = req.body;
  
    try {
      // แปลงค่า customer_id และ total_amount ให้เป็นตัวเลข
      const parsedCustomerId = parseInt(customer_id); // แปลงเป็น Int
      const parsedTotalAmount = parseFloat(total_amount); // แปลงเป็น Float หรือ Decimal
  
      // ตรวจสอบว่าค่าที่แปลงแล้วเป็นตัวเลขหรือไม่
      if (isNaN(parsedCustomerId) || isNaN(parsedTotalAmount)) {
        return res.status(400).json({ error: "Invalid input for customer_id or total_amount" });
      }
  
      // สร้างคำสั่งซื้อใหม่ในฐานข้อมูล
      const order = await prisma.orders.create({
        data: {
          customer_id: parsedCustomerId,  // ส่ง customer_id ที่เป็น Int
          total_amount: parsedTotalAmount,  // ส่ง total_amount ที่เป็น Float
          order_status,
          order_date: new Date(),
        },
      });
  
      res.status(201).json({ message: "Order created successfully", order });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

// Update order by ID
const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { total_amount, order_status } = req.body;
  try {
    const order = await prisma.orders.update({
      where: { order_id: parseInt(id) },
      data: {
        total_amount,
        order_status,
      },
    });
    res.status(200).json({ message: "Order updated successfully", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete order by ID
const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.orders.delete({
      where: { order_id: parseInt(id) },
    });
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getOrders, getOrderById, addOrder, updateOrder, deleteOrder };
