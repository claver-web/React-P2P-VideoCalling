import { useEffect } from "react"

export default function Payment(){

    const options = {
        key: "rzp_test_iCH0a2VWgHJ2Ac",
        amount: 80000,
        currency: "INR",
        name: "My StoreBitch.com",
        description: "Test Transaction",
        order_id: "order_QEhGJ5uTM9mCmq",
        handler: function (response) {
            console.log(response);
            fetch("http://127.0.0.1:3000/payment/payment_verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
            })
            .then((res) => res.json())
            .then((data) => alert("Payment Successful!"));
        },
        theme: { color: "#3399cc" },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();


    return (
        <button onClick={() => window.Razorpay.open()}>Pay Now</button>
    )
}