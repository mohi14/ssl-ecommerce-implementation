const express = require("express");
const cors = require("cors");
const app = express();

const SSLCommerzPayment = require("sslcommerz-lts");
const store_id = "test647f203f1a70c";
const store_passwd = "test647f203f1a70c@ssl";
const is_live = false; //true for live, false for sandbox

const port = 3030;
app.use(cors());
app.use(express.json());

//sslcommerz init
app.post("/order", async (req, res) => {
  const { name, currency, postCode, address, number } = req.body;
  const tran_id = "REF123";
  const data = {
    total_amount: 100,
    currency: "BDT",
    tran_id: tran_id, // use unique tran_id for each api call
    success_url: `http://localhost:3030/payment/success/${tran_id}`,
    fail_url: `http://localhost:3030/payment/fail/${tran_id}`,
    cancel_url: "http://localhost:3030/cancel",
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  sslcz.init(data).then((apiResponse) => {
    // Redirect the user to payment gateway
    let GatewayPageURL = apiResponse.GatewayPageURL;
    // res.redirect(GatewayPageURL);
    res.send({ url: GatewayPageURL });

    // insert payment history

    // const finalOrder = {
    //   product,
    //   paidStatus: false,
    //   tranjectionId: tran_id,
    // };

    // const result = orderCollection.insertOne(finalOrder);

    // insert payment history

    console.log("Redirecting to: ", GatewayPageURL);
  });

  app.post("/payment/success/:tranId", async (req, res) => {
    console.log(req.params.tranId);

    // update payment history after successfull payment
    // const result = await orderCollection.updateOne(
    //   {
    //     tranjectionId: req.params.tranId,
    //   },
    //   {
    //     $set: {
    //       paidStatus: true,
    //     },
    //   }
    // );
    // if (result.modifiedCount > 0) {

    res.redirect(`http://localhost:3000/payment/success/${req.params.tranId}`);
    // }

    // update payment history after successfull payment
  });

  app.post("/payment/fail/:tranId", async (req, res) => {
    // update payment history after failed payment

    // const result = await orderCollect.deleteOne({ tranjectionId: req.params.tranId });

    // if (result.deletedCount) {
    res.redirect(`http://localhost:3000/payment/fail/${req.params.tranId}`);
    // }

    // update payment history after failed payment
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
