import prisma from "../db";

// get all updates for user
export const getUpdates = async (req, res) => {
  const userId = req.user.id;
  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      updates: true,
    },
  });

  // const updates = products.reduce((productUpdates, product) => {
  //   return [...productUpdates, ...product.updates];
  // }, []);

  const updates = products.flatMap((product) => product.updates);

  res.json({ data: updates });
};

// get one update by id
export const getUpdateById = async (req, res) => {
  const id = req.params.id;
  const update = await prisma.update.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: update });
};

// create new update for a product
export const createUpdate = async (req, res) => {
  const { productId, title, body, version } = req.body;
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!product) {
    return res.json({ message: "You can't create update for this product" });
  }

  const update = await prisma.update.create({
    data: {
      title,
      body,
      productId,
      version,
    },
  });

  res.json({ data: update });
};

// update existing data of update
// export const updateUpdate = async (req, res) => {
//   const userId = req.user.id;
//   const id = req.params.id;

//   // get all product from current user
//   const userProducts = await prisma.product.findMany({
//     where: {
//       userId,
//     },
//     include: {
//       updates: true,
//     },
//   });

//   // reduce the updates from all user products
//   const allUpdates = userProducts.flatMap((product) => product.updates);

//   // check if update that want to be update is in allUpdates
//   const isMatch = allUpdates.find((update) => update.id === id);

//   // if not found give message to user
//   if (!isMatch) {
//     return res.json({ message: "nope" });
//   }

//   // if found, update the update
//   const updated = await prisma.update.update({
//     where: {
//       id,
//     },
//     data: req.body,
//   });

//   res.json({ data: updated });
// };

export const updateUpdate = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const existingUpdate = await prisma.update.findFirst({
    where: {
      id,
      product: {
        userId,
      },
    },
  });

  if (!existingUpdate) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this item" });
  }

  const updated = await prisma.update.update({
    where: { id },
    data: req.body,
  });

  res.json({ data: updated });
};

// delete one update record
export const deleteUpdate = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const existingUpdate = await prisma.update.findFirst({
    where: {
      id,
      product: {
        userId,
      },
    },
  });

  if (!existingUpdate) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this item" });
  }

  const deleted = await prisma.update.delete({
    where: { id },
  });

  res.json({ data: deleted });
};
