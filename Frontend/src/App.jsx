import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const name = form.name.value;
    const currency = form.currency.value;
    const postCode = form.postCode.value;
    const address = form.address.value;
    const number = form.number.value;

    const data = {
      name,
      currency,
      postCode,
      address,
      number,
    };

    fetch("http://localhost:3030/order", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        window.location.replace(data.url);
        console.log(data);
      });
  };

  return (
    <>
      <section>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name</label>
            <input type="text" name="name" />
          </div>
          <div>
            <select name="currency">
              <option value="BDT">BDT</option>
              <option value="Doller">Doller</option>
              <option value="Euro">Euro</option>
            </select>
          </div>
          <div>
            <label>Post Code</label>
            <input type="number" name="postCode" />
          </div>
          <div>
            <label>Address</label>
            <input type="text" name="address" />
          </div>
          <div>
            <label>Phone Number</label>
            <input type="number" name="number" />
          </div>
          <button type="submit">Pay</button>
        </form>
      </section>
    </>
  );
}

export default App;
