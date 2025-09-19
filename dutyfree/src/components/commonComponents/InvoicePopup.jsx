import { useState } from "react";
import { Button, Modal, Table, Space } from "antd";
import { FaDownload } from "react-icons/fa6";
import logo from "../../assets/LOGO-Africa-Duty-free-def-WEB.png"

const InvoicePopup = ({ order }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDownload = () => {
        const invoice = document.getElementById("invoice-content").innerHTML;

        // wrap as a full HTML page
        const fullHtml = `
    <html>
      <head>
        <title>Invoice</title>
        <Style>
        @media print {
  th {
    background-color: #a1a0a5 !important; /* Your desired background color */
    -webkit-print-color-adjust: exact !important; /* For Chrome, Safari */
    color-adjust: exact !important; /* Standard property */
  }

}

        </Style>
      </head>
      <body>
        ${invoice}
        <script>
          window.print(); // auto open print dialog, user can save as PDF
        </script>
      </body>
    </html>
  `;

        const blob = new Blob([fullHtml], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank");
        win.focus();
    };



    return (
        <>
            <Button type="link" onClick={() => setIsOpen(true)}>
                <FaDownload size={19} className="text-color-danger" />
            </Button>

            <Modal
                title={`Invoice #${order.orderId}`}
                open={isOpen}
                onCancel={() => setIsOpen(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsOpen(false)}>
                        Close
                    </Button>,
                    <Button key="download" type="primary" onClick={handleDownload}>
                        Download Invoice
                    </Button>,
                ]}
                width={700}
            >
                {/* Styled Invoice HTML */}
                <div id="invoice-content" style={{ fontFamily: "Arial, sans-serif" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px", marginTop: "20px" }}>
                        <div>
                            <img src={logo} width={200} height={50} alt="brandlogo" />
                        </div>
                        <div>
                            <h6 style={{ margin: "0px", fontFamily: "bold", fontSize: "20px" }}>Tax Invoice/Bill of Supply/Cash Memo</h6>
                            <p style={{ margin: "0px", fontFamily: "bold", fontSize: "20px" }}>(Original for Recipient)</p>
                        </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>
                            <strong>Sold By:</strong>
                            <p style={{ margin: "0px" }}>Africa Duty Free</p>
                            <p style={{ margin: "0px" }}>123 Market Street</p>
                            <p style={{ margin: "0px" }}>Africa</p>
                            <p style={{ margin: "0px" }}>GST: 29AAICA3918J1ZE</p>
                        </div>
                        <div>
                            <div style={{ marginBottom: "10px" }}>
                                <strong>Billing Address:</strong>
                                <p style={{ margin: "0px" }}>{order.orderedBy}</p>
                                <p style={{ margin: "0px" }}>{order.DeliveryAddress}</p>
                            </div>
                            <div>
                                <strong>Shipping Address:</strong>
                                <p style={{ margin: "0px" }}>{order.orderedBy}</p>
                                <p style={{ margin: "0px" }}>{order.DeliveryAddress}</p>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <table
                        style={{
                            width: "100%",
                            borderCollapse: "collapse",
                            marginTop: "15px",
                        }}
                        border="1"
                    >
                        <thead>
                            <tr>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Sl. No</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Description</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Unit Price</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Qty</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Net Amount</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Tax Rate</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Tax Type</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Tax Amount</th>
                                <th style={{ textAlign: "center", background: "#a1a0a5" }}>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.products.map((p, i) => {
                                let tax = ((p.qty * p.productPrice) / 12).toFixed(2)
                                return (
                                    <tr key={i}>
                                        <td style={{ textAlign: "center" }}>{i + 1}</td>
                                        <td style={{ textAlign: "center" }}>{p.productName}</td>
                                        <td style={{ textAlign: "center" }}> $ {p.productPrice}</td>
                                        <td style={{ textAlign: "center" }}>{p.qty}</td>
                                        <td style={{ textAlign: "center" }}> $ {p.qty * p.productPrice}</td>
                                        <td style={{ textAlign: "center" }}> 12% </td>
                                        <td style={{ textAlign: "center" }}> GST </td>
                                        <td style={{ textAlign: "center" }}> {tax} </td>
                                        <td style={{ textAlign: "center" }}> {(((p.qty * p.productPrice) / 12).toFixed(2) + (p.qty * p.productPrice))} </td>
                                    </tr>
                                )
                            }
                            )}
                        </tbody>
                    </table>

                    <h3 style={{ textAlign: "right", marginTop: "10px" }}>
                        Total: $ {order.totalAmount}
                    </h3>

                    <p style={{ textAlign: "center", marginTop: "30px" }}>
                        Thank you for shopping with us!
                    </p>
                </div>
            </Modal>
        </>
    );
};

export default InvoicePopup;
