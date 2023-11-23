import { useState } from "react";
import PaystackPop from "@paystack/inline-js";

const PaystackIntegration = () => {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  //const testPublicKey = process.env.REACT_APP_TEST_PUBLIC_KEY;

  const payWithPaystack = (e) => {
    e.preventDefault();
    //alert("Paying with PayStack");

    const payStack = new PaystackPop();
    payStack.newTransaction({
      key: "pk_test_886853aa22df06838fa70dec177c5d1c8103b39a",
      amount: amount * 100, //hint:everything is in kobo, thus * 100
      email,
      firstName,
      lastName,

      onSuccess(transaction) {
        let message = `Payment complete! Reference ${transaction.reference}`;
        alert(message);

        setEmail("");
        setAmount("");
        setFirstName("");
        setLastName("");
      },

      onCancel() {
        alert("You want to Canceled the transaction");
      },
    });
  };

  return (
    <div>
      <form id="paymentForm" className="form_Container">
        <div className="form_Group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email-address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form_Input"
          />
        </div>
        <div className="form_Group">
          <label htmlFor="amount">Amount</label>
          <input
            type="tel"
            id="amount"
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form_Input"
          />
        </div>
        <div className="form_Group">
          <label htmlFor="first-name">First Name</label>
          <input
            type="text"
            id="first-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="form_Input"
          />
        </div>
        <div className="form_Group">
          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="form_Input"
          />
        </div>
        <div className="">
          <button
            type="submit"
            onClick={payWithPaystack}
            className="form_Button"
          >
            Pay
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaystackIntegration;
