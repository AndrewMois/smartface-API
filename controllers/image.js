const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .then((entries) => {
      knex
        .select("entries")
        .from("users")
        .where("id", "=", id)
        .then((user) => {
          res.json(user[0].entries);
        });
    })
    .catch((err) => {
      res.status(400).json("unable to get entries");
    });
};

module.exports = {
  handleImage: handleImage,
};
