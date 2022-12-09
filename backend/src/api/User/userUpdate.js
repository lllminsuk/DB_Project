import auth from "../modules/auth.js";
export const privateUpdate = async (app, connection) => {
  app.post("/privateUpdate", auth, async (req, res, next) => {
    const { id } = req.query;
    const { email, phone, age } = req.body;
    await connection.query(
      "UPDATE user SET email = ?, phone = ?, age = ? WHERE id = ?;",
      [email, phone, age, id],
      (error, data) => {
        console.log(data);
        if (error) {
          console.log(error);
          res.send({ result: false, error: error });
        } else res.send({ result: true });
      }
    );
  });
};

export const passwordUpdate = async (app, connection) => {
  app.post("/passwordUpdate", auth, async (req, res, next) => {
    const { id } = req.query;
    const { origin_pw, new_pw, confirm_pw } = req.body;

    await connection.query(
      "SELECT pw FROM user WHERE id = ?;",
      [id],
      (error, data) => {
        console.log(data);
        if (error) {
          console.log(error);
          res.send({ result: false, error: "error" });
        } else if (origin_pw == data[0].pw) {
          connection.query(
            "UPDATE user SET pw = ? WHERE id = ?;",
            [new_pw, id],
            (error, data) => {
              console.log(data);
              if (error) {
                console.log(error);
                res.send({ result: false, error: error });
              } else res.send({ result: true });
            }
          );
        } else res.send({ result: false, error: "비밀번호 불일치" });
      }
    );
  });
};
