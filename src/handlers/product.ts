import prisma from "../db";

// get all products for user
export const getProducts = async (req, res) => {
  console.log(req.user);

  const userId = req.user.id;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// get one product by id
export const getProductById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      userId,
    },
    include: {
      updates: true,
    },
  });

  res.json({ data: product });
};

// create new product for a user
export const createProduct = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        userId,
      },
    });
    res.json({ message: "Product succesfully created", data: product });
  } catch (e) {
    next(e);
  }
};

// update existing data of product
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const updated = await prisma.product.update({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
    data: {
      name: req.body.name,
    },
  });

  res.json({ data: updated });
};

// delete one product record
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const deleted = await prisma.product.delete({
    where: {
      id_userId: {
        id,
        userId,
      },
    },
  });

  res.json({ data: deleted });
};
