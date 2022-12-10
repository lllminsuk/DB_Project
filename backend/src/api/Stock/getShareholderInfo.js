export default async (app, connection) => {
  app.get("/getShareholderInfo", async (req, res, next) => {
    const { stockcode } = req.query;
    await connection.query(
      "SELECT * FROM stock_O WHERE code= ?;",
      [stockcode],
      (error, data) => {
       
        if (error) console.log(error);
        return res.send(data);
      }
    );
  });
};
