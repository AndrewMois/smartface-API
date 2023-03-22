const handleSignIn = (req, res, knex, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }

  knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        knex
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(400).json("unable to get user"));
      } else {
        // password isn't valid
        res.status(400).json("wrong credentials");
      }
    })
    // email isn't valid
    .catch((err) => res.status(400).json("wrong credentials"));
};

module.exports = {
  handleSignIn: handleSignIn,
};
