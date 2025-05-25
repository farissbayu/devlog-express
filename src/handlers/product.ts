import prisma from "../db";

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

export const getProductById = async (req, res) => {
  const id = req.params.id;
  const userId = req.user.id;
  const product = await prisma.product.findFirst({
    where: {
      id,
      userId,
    },
  });

  res.json({ data: product });
};

export const createProduct = async (req, res) => {
  const userId = req.user.id;
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      userId,
    },
  });

  if (!product) {
    res.status(400);
    res.json({ message: "Product failed to create" });
  }

  res.json({ message: "Product succesfully created" });
};

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

export const deleteProdcut = async (req, res) => {
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
