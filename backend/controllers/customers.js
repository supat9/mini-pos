const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// add customer
const addCustomer = async (req, res) => {
  const { name, email, phone_number, address } = req.body;
  try {
    const customer = await prisma.customers.create({
      data: {
        name,
        email,
        phone_number,
        address
      },
    });
    res.status(201).json({ message: "Customer added successfully", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get all customers
const getCustomers = async (req, res) => {
  try {
    const customers = await prisma.customers.findMany();
    res.status(200).json({ message: "Customers fetched successfully", customers });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get customer by id
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customers.findUnique({
      where: {
        customer_id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Customer fetched successfully", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update customer
const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, address } = req.body;
  try {
    const customer = await prisma.customers.update({
      where: {
        customer_id: parseInt(id),
      },
      data: {
        name,
        email,
        phone_number,
        address
      },
    });
    res.status(200).json({ message: "Customer updated successfully", customer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete customer
const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customers.delete({
      where: {
        customer_id: parseInt(id),
      },
    });
    res.status(204).json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { addCustomer, getCustomers, getCustomerById, updateCustomer, deleteCustomer };
