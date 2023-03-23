const handleRegister = (req, res, knex, bcrypt) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json("incorrect form submission");
  }
  const hash = bcrypt.hashSync(password);
  knex.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into("login")
      .then(() => {
        return trx("login")
          .where({ email: email })
          .select("email")
          .then((loginEmail) => {
            return trx("users")
              .insert({
                email: loginEmail[0].email,
                name: name,
                joined: new Date(),
              })
              .then(() => {
                return trx("users")
                  .where({ email: loginEmail[0].email })
                  .select("id", "name", "email", "entries")
                  .then((users) => {
                    trx.commit();
                    res.json(users[0]);
                  });
              })
              .catch((err) => {
                trx.rollback();
                res.status(400).json("unable to register");
              });
          });
      })
      .catch((err) => {
        trx.rollback();
        res.status(400).json("unable to register");
      });
  });
};

module.exports = {
  handleRegister: handleRegister,
};
