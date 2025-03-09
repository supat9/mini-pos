const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Get all payments
const getPayments = async (req, res) => {
  try {
    const payments = await prisma.payments.findMany({
      include: {
        orders: true,
      },
    });
    res.status(200).json({ message: "Payments fetched successfully", payments });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;
  try {
    const payment = await prisma.payments.findUnique({
      where: { payment_id: parseInt(id) },
      include: {
        orders: true,
      },
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.status(200).json({ message: "Payment fetched successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create new payment
const addPayment = async (req, res) => {
  const { order_id, amount, payment_status } = req.body;
  try {
    const payment = await prisma.payments.create({
      data: {
        order_id,
        amount,
        payment_status,
        payment_date: new Date(),
      },
    });
    res.status(201).json({ message: "Payment created successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update payment status by ID
const updatePayment = async (req, res) => {
  const { id } = req.params;
  const { payment_status } = req.body;
  try {
    const payment = await prisma.payments.update({
      where: { payment_id: parseInt(id) },
      data: {
        payment_status,
      },
    });
    res.status(200).json({ message: "Payment updated successfully", payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete payment by ID
const deletePayment = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.payments.delete({
      where: { payment_id: parseInt(id) },
    });
    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getPayments, getPaymentById, addPayment, updatePayment, deletePayment };
