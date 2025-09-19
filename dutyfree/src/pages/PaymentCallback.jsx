import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import common from "../commonMethod/common.js";

const PaymentCallback = () => {
    const navigate = useNavigate();
    const { apiRequest, getUserCartlist } = common();

    const query = useMemo(() => new URLSearchParams(window.location.search), []);
    const status = query.get("status");
    const txRef = query.get("tx_ref");
    const transactionId = query.get("transaction_id");

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState({ success: false, message: "" });

    useEffect(() => {
        const verify = async () => {
            try {
                // If status is not successful, short-circuit
                if (status !== "successful") {
                    setResult({ success: false, message: "Payment was not successful." });
                    return;
                }
                console.log("status", status)
                const res = await apiRequest("POST", "/payment/verify", {
                    status,
                    tx_ref: txRef,
                    transaction_id: transactionId,
                });

                const verified = res?.status === true || res?.verified === true || res?.success === true;
                setResult({
                    success: verified,
                    message: verified ? "Payment verified successfully." : (res?.message || "Payment verification failed."),
                });

                // refresh cart on success
                if (verified) {
                    await getUserCartlist();
                }
            } catch (e) {
                setResult({ success: false, message: "Verification error. Please contact support." });
            } finally {
                setLoading(false);
            }
        };

        verify();
    }, [ status, txRef, transactionId]);

    if (loading) {
        return (
            <div className="container py-5" style={{ minHeight: "50vh" }}>
                <h4 className="text-center">Processing your payment...</h4>
            </div>
        );
    }

    return (
        <div className="container py-5" style={{ minHeight: "60vh" }}>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div
                        className="p-4"
                        style={{
                            border: "1px solid #eee",
                            borderRadius: 8,
                            textAlign: "center",
                            background: "#fff",
                        }}
                    >
                        {result.success ? (
                            <>
                                <h3 className="mb-2" style={{ color: "#2e7d32" }}>Payment Successful</h3>
                                <p className="mb-3">{result.message}</p>
                                <div className="mb-3" style={{ fontSize: 14, color: "#555" }}>
                                    <div>Reference: <strong>{txRef}</strong></div>
                                    <div>Transaction ID: <strong>{transactionId}</strong></div>
                                </div>
                                <div className="d-flex gap-2 justify-content-center">
                                    <Link to="/" className="btn btn-warning">Continue Shopping</Link>
                                    <Link to="/my-account/orders" className="btn btn-outline-secondary">View Orders</Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <h3 className="mb-2" style={{ color: "#c62828" }}>Payment Failed</h3>
                                <p className="mb-3">{result.message}</p>
                                <div className="mb-3" style={{ fontSize: 14, color: "#555" }}>
                                    {txRef && (
                                        <div>Reference: <strong>{txRef}</strong></div>
                                    )}
                                    {transactionId && (
                                        <div>Transaction ID: <strong>{transactionId}</strong></div>
                                    )}
                                </div>
                                <div className="d-flex gap-2 justify-content-center">
                                    <Link to="/checkout" className="btn btn-warning">Try Again</Link>
                                    <Link to="/" className="btn btn-outline-secondary">Back to Home</Link>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentCallback;


