import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  // Get the plan details from location state or use default
  const plan = location.state?.plan || {
    name: "Pro",
    price: "$10",
    period: "/month"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically handle the payment processing
    console.log('Processing payment:', paymentDetails);
    // Simulate successful payment
    setTimeout(() => {
      alert('Payment successful!');
      navigate('/courses');
    }, 1500);
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <div className="plan-summary">
          <h2>Complete Your Purchase</h2>
          <div className="selected-plan">
            <h3>{plan.name} Plan</h3>
            <div className="plan-price">
              <span className="amount">{plan.price}</span>
              <span className="period">{plan.period}</span>
            </div>
          </div>
        </div>

        <form className="payment-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="1234 5678 9012 3456"
              value={paymentDetails.cardNumber}
              onChange={handleInputChange}
              maxLength="19"
              required
            />
          </div>

          <div className="form-group">
            <label>Card Holder Name</label>
            <input
              type="text"
              name="cardHolder"
              placeholder="John Doe"
              value={paymentDetails.cardHolder}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={paymentDetails.expiryDate}
                onChange={handleInputChange}
                maxLength="5"
                required
              />
            </div>

            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={paymentDetails.cvv}
                onChange={handleInputChange}
                maxLength="3"
                required
              />
            </div>
          </div>

          <div className="payment-summary">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>{plan.price}</span>
            </div>
            <div className="summary-row">
              <span>Tax</span>
              <span>$0</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>{plan.price}</span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-pay">
            Pay Now
          </button>
        </form>

        <div className="secure-notice">
          <span className="lock-icon">🔒</span>
          <p>Your payment information is secure and encrypted</p>
        </div>
      </div>
    </div>
  );
}

export default Payment; 