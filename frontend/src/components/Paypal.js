import React, { useRef, useEffect } from "react";

export default function Paypal({ orderData, onPaymentSuccess }) {
    const paypal = useRef();
    useEffect(() => {
        window.paypal.Buttons({
            createOrder: (data, actions, err) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: "USD",
                                value: orderData.totalPrice,
                            },
                        },
                    ]
                })
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture()
                onPaymentSuccess();
                alert("Thanh toán thành công");
            },
            onError: (err) => {
                alert("Thanh toán chưa thành công")
                console.log(err)
            }
        }).render(paypal.current)
    }, [])
    return (
        <div>
            <div ref={paypal}></div>
        </div>
    );
}