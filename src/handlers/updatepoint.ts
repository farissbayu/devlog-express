import prisma from "../db";

// get all update points for update
export const getUpdatePoints = async (req, res) => {
  const userId = req.user.id;

  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      updates: {
        include: {
          updatePoints: true,
        },
      },
    },
  });

  const allUpdatePoints = products.flatMap((product) =>
    product.updates.flatMap((update) => update.updatePoints)
  );

  res.json({ data: allUpdatePoints });
};

// get one update point by id
export const getUpdatePointById = async (req, res) => {
  const id = req.params.id;
  const updatePoint = await prisma.updatePoint.findUnique({
    where: {
      id,
    },
  });

  res.json({ data: updatePoint });
};

// create new update point for an update
export const createUpdatePoint = async (req, res) => {
  const { updateId, name, description } = req.body;

  const update = await prisma.update.findUnique({
    where: {
      id: updateId,
    },
  });

  if (!update) {
    return res.json({ message: "nope" });
  }

  const newUpdatePoint = await prisma.updatePoint.create({
    data: {
      name,
      description,
      updateId,
    },
  });

  res.json({ data: newUpdatePoint });
};

// update existing data of update point
export const updateUpdatePoint = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const products = await prisma.product.findMany({
    where: {
      userId,
    },
    include: {
      updates: {
        include: {
          updatePoints: true,
        },
      },
    },
  });

  const allUpdatePoints = products.flatMap((product) =>
    product.updates.flatMap((update) => update.updatePoints)
  );

  const isMatch = allUpdatePoints.find((updatePoint) => updatePoint.id === id);

  if (!isMatch) {
    return res.json({ message: "nope" });
  }

  const updatedUpdatePoint = await prisma.updatePoint.update({
    where: {
      id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdatePoint });
};

// delete one update point record
export const deleteUpdatePoint = async (req, res) => {
  const id = req.params.id;
  const deleted = await prisma.updatePoint.delete({
    where: { id },
  });

  res.json({ data: deleted });
};
