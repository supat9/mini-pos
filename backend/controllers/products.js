const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// get all products
const getProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// get product by id
const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await prisma.products.findUnique({
      where: {
        product_id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Product fetched successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// add product
const addProduct = async (req, res) => {
  const { product_name, price, stock_quantity } = req.body;

  try {
    // Check if the required fields are present
    if (!product_name || !price || !stock_quantity) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Convert price and stock_quantity to the correct data type
    const parsedPrice = parseFloat(price);  // Convert price to a number (Decimal)
    const parsedStockQuantity = parseInt(stock_quantity);  // Convert stock_quantity to an integer

    // Check if parsed values are valid
    if (isNaN(parsedPrice) || isNaN(parsedStockQuantity)) {
      return res.status(400).json({ error: "Invalid number format for price or stock quantity" });
    }

    // Create the product in the database
    const product = await prisma.products.create({
      data: {
        product_name,
        price: parsedPrice,  // Use the converted price
        stock_quantity: parsedStockQuantity  // Use the converted stock_quantity
      },
    });

    res.status(201).json({ message: "Product added successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// update product
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const product = await prisma.products.update({
      where: {
        product_id: parseInt(id),
      },
      data: {
        name,
        price,
        description
      },
    });
    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete product

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.products.delete({
      where: {
        product_id: parseInt(id),
      },
    });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };