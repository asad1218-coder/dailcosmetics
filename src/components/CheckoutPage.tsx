import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import { PAKISTAN_CITIES } from '../data/products';
import {
  ShieldCheck,
  ArrowLeft,
  CheckCircle,
  Truck,
  Printer,
  Tag,
  Phone,
  FileText
} from 'lucide-react';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    getCartSubtotal,
    getCartDiscount,
    getShippingFee,
    getCartTotal,
    appliedVoucher,
    discountPercentage,
    applyVoucher,
    removeVoucher,
    createOrder,
    setCurrentPage,
    storeSettings
  } = useStore();

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    province: 'Pakistan',
    notes: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'jazzcash' | 'easypaisa' | 'bank_transfer'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [checkoutVoucher, setCheckoutVoucher] = useState('');
  const [voucherMsg, setVoucherMsg] = useState<string | null>(null);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [createdOrderDetails, setCreatedOrderDetails] = useState<any>(null);

  const subtotal = getCartSubtotal();
  const discount = getCartDiscount();
  const shipping = getShippingFee();
  const total = getCartTotal();

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="max-w-md mx-auto py-24 text-center px-4 space-y-4">
        <div className="text-4xl">🧴</div>
        <h2 className="font-serif-luxury text-2xl font-bold text-stone-900">Your shopping bag is empty</h2>
        <p className="text-stone-500 text-xs sm:text-sm">Please add Dail herbal products before checking out.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="px-6 py-2.5 rounded-full bg-[#7b3e1d] text-white text-xs font-bold"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutVoucher.trim()) return;
    const res = applyVoucher(checkoutVoucher);
    setVoucherMsg(res.message);
    if (res.success) setCheckoutVoucher('');
    setTimeout(() => setVoucherMsg(null), 4000);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.address.trim()) {
      alert('Please fill in your name, phone number, and delivery address.');
      return;
    }

    const orderData = {
      customerName: formData.fullName,
      email: formData.email || 'customer@dailcosmetics.pk',
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      province: formData.province,
      paymentMethod,
      items: cart.map((i) => ({
        productId: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        image: i.product.image,
      })),
      subtotal,
      shippingFee: shipping,
      discount,
      total,
    };

    const newOrder = createOrder(orderData);
    setCreatedOrderDetails(newOrder);
    setOrderCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Order Confirmed Screen
  if (orderCompleted && createdOrderDetails) {
    return (
      <div className="w-full bg-[#fbf9f5] min-h-screen py-12 px-4 sm:px-8">
        <div className="max-w-xl mx-auto bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-10 shadow-sm text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto text-2xl">
            <CheckCircle className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#c59b27]">
              Order Confirmed & Allocated
            </span>
            <h1 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Shukriya, {createdOrderDetails.customerName}!
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 mt-1">
              Your order has been allocated and sent to our Karachi / Lahore warehouse for priority packing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2.5 text-xs">
            <div className="flex justify-between border-b border-stone-200 pb-2">
              <span className="text-stone-500">Official Order ID:</span>
              <strong className="font-mono text-stone-900 text-sm font-bold">{createdOrderDetails.orderId}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Payment Method:</span>
              <span className="font-semibold text-stone-900 uppercase">{createdOrderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Total Payable at Doorstep:</span>
              <strong className="text-[#7b3e1d] text-base font-bold">Rs. {createdOrderDetails.total.toLocaleString()}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Tracking Number:</span>
              <span className="font-mono text-stone-700 font-bold">{createdOrderDetails.trackingNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Courier Partner:</span>
              <span className="text-stone-700">{createdOrderDetails.courierName}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => setCurrentPage('track-order')}
              className="flex-1 py-3.5 rounded-xl bg-[#7b3e1d] hover:bg-[#622f14] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              Track Order Live
            </button>
            <button
              onClick={() => window.print()}
              className="px-4 py-3.5 rounded-xl bg-white border border-stone-300 text-stone-700 hover:text-stone-900 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
          </div>

          <button
            onClick={() => setCurrentPage('home')}
            className="text-xs text-[#7b3e1d] hover:underline font-bold block mx-auto pt-2"
          >
            Return to Storefront
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#fbf9f5] min-h-screen py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-[#7b3e1d] mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Shopping</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Form: Delivery & Payment Details */}
          <form onSubmit={handleSubmitOrder} className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Contact */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                1. Contact & Shipping Details
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-stone-700 font-bold mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ayesha Khan"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">WhatsApp Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="0300-1234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Email Address (Optional)</label>
                  <input
                    type="email"
                    placeholder="name@gmail.com (For invoice & tracking updates)"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 font-bold mb-1">Complete Street Address *</label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat #, Street, Sector, Area Landmark"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">
                    City / Town (Pura Pakistan) *
                  </label>
                  <input
                    type="text"
                    required
                    list="pakistan-cities-list"
                    placeholder="Apna shehar ya ilaqa likhein (e.g. Lahore, Daska, Swat...)"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                  <datalist id="pakistan-cities-list">
                    {PAKISTAN_CITIES.map((c) => (
                      <option key={c} value={c} />
                    ))}
                  </datalist>
                </div>

                <div>
                  <label className="block text-stone-700 font-bold mb-1">Special Delivery Note</label>
                  <input
                    type="text"
                    placeholder="Call before arrival, ring bell..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-stone-900 focus:outline-hidden focus:border-[#7b3e1d]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Options */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-4">
              <h2 className="font-serif-luxury text-xl font-bold text-stone-900">
                2. Select Payment Method
              </h2>

              <div className="space-y-3 text-xs">
                {/* Cash On Delivery */}
                <label className={`p-4 rounded-2xl border-2 flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'cod' ? 'border-[#7b3e1d] bg-amber-50/50' : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="text-[#7b3e1d] focus:ring-[#7b3e1d]"
                    />
                    <div>
                      <strong className="text-stone-900 block font-bold text-sm">Cash on Delivery (COD)</strong>
                      <span className="text-stone-500">Pay cash directly to courier rider upon doorstep delivery</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                    Recommended
                  </span>
                </label>

                {/* JazzCash */}
                <label className={`p-4 rounded-2xl border-2 flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'jazzcash' ? 'border-[#7b3e1d] bg-amber-50/50' : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'jazzcash'}
                        onChange={() => setPaymentMethod('jazzcash')}
                        className="text-[#7b3e1d] focus:ring-[#7b3e1d]"
                      />
                      <div>
                        <strong className="text-stone-900 block font-bold text-sm">JazzCash Mobile Account</strong>
                        <span className="text-stone-500">Send Rs. {total.toLocaleString()} to JazzCash: <strong>{storeSettings.whatsappNumber}</strong></span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-700">JazzCash</span>
                  </div>
                  {paymentMethod === 'jazzcash' && (
                    <div className="pt-2 border-t border-amber-200/60">
                      <label className="block text-stone-700 font-bold mb-1">Enter JazzCash Transaction ID (TID):</label>
                      <input
                        type="text"
                        placeholder="e.g. 19284710928"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                      />
                    </div>
                  )}
                </label>

                {/* EasyPaisa */}
                <label className={`p-4 rounded-2xl border-2 flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'easypaisa' ? 'border-[#7b3e1d] bg-amber-50/50' : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'easypaisa'}
                        onChange={() => setPaymentMethod('easypaisa')}
                        className="text-[#7b3e1d] focus:ring-[#7b3e1d]"
                      />
                      <div>
                        <strong className="text-stone-900 block font-bold text-sm">EasyPaisa Mobile Account</strong>
                        <span className="text-stone-500">Send Rs. {total.toLocaleString()} to EasyPaisa: <strong>{storeSettings.whatsappNumber}</strong></span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-700">EasyPaisa</span>
                  </div>
                  {paymentMethod === 'easypaisa' && (
                    <div className="pt-2 border-t border-amber-200/60">
                      <label className="block text-stone-700 font-bold mb-1">Enter EasyPaisa Transaction ID (TID):</label>
                      <input
                        type="text"
                        placeholder="e.g. 4829104928"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                      />
                    </div>
                  )}
                </label>

                {/* Bank Transfer */}
                <label className={`p-4 rounded-2xl border-2 flex flex-col gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'bank_transfer' ? 'border-[#7b3e1d] bg-amber-50/50' : 'border-stone-200 bg-white hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'bank_transfer'}
                        onChange={() => setPaymentMethod('bank_transfer')}
                        className="text-[#7b3e1d] focus:ring-[#7b3e1d]"
                      />
                      <div>
                        <strong className="text-stone-900 block font-bold text-sm">Direct Bank Transfer (Meezan Bank)</strong>
                        <span className="text-stone-500">Account: Dail Cosmetics • IBAN: PK42MEZN00019284719284</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-stone-700">Bank Transfer</span>
                  </div>
                  {paymentMethod === 'bank_transfer' && (
                    <div className="pt-2 border-t border-amber-200/60">
                      <label className="block text-stone-700 font-bold mb-1">Enter Reference / Sender Account Name:</label>
                      <input
                        type="text"
                        placeholder="e.g. Ayesha Khan - Meezan Bank"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                        className="w-full bg-white border border-stone-200 rounded-xl p-2.5 text-stone-900"
                      />
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              className="w-full btn-gp-primary py-4 px-8 rounded-xs text-sm sm:text-base font-heading font-extrabold tracking-[0.16em] shadow-md transition-all cursor-pointer"
            >
              CONFIRM ORDER • RS. {total.toLocaleString()} ({paymentMethod === 'cod' ? 'CASH ON DELIVERY' : 'PREPAID'})
            </button>

          </form>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-xs space-y-6">
            <h3 className="font-serif-luxury text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
              Order Summary ({cart.reduce((s, i) => s + i.quantity, 0)} items)
            </h3>

            {/* Item list */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto divide-y divide-stone-100">
              {cart.map((item) => (
                <div key={item.product.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded-xl bg-stone-50 border border-stone-200 p-0.5"
                    />
                    <div>
                      <h4 className="font-bold text-stone-900 line-clamp-1">{item.product.name}</h4>
                      <span className="text-stone-500 text-[11px]">Qty: {item.quantity} • {item.product.volume}</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#7b3e1d]">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code in Checkout */}
            <div className="pt-3 border-t border-stone-100">
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon code (Try: ORGANIC10)"
                    value={checkoutVoucher}
                    onChange={(e) => setCheckoutVoucher(e.target.value)}
                    className="w-full bg-stone-50 border border-stone-200 rounded-xl pl-8 pr-3 py-2 text-xs text-stone-800"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-black cursor-pointer"
                >
                  Apply
                </button>
              </form>

              {appliedVoucher && (
                <div className="flex items-center justify-between text-xs bg-emerald-50 text-emerald-800 px-3 py-1.5 rounded-lg border border-emerald-200 mt-2">
                  <span>Code <strong>{appliedVoucher}</strong> active ({discountPercentage}% off)</span>
                  <button onClick={removeVoucher} className="text-rose-500 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              )}

              {voucherMsg && !appliedVoucher && (
                <span className="text-[11px] text-rose-500 block mt-1">{voucherMsg}</span>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-2 pt-2 border-t border-stone-200 text-xs text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">Rs. {subtotal.toLocaleString()}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-bold">
                  <span>Voucher Discount</span>
                  <span>-Rs. {discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Courier Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700 font-bold">FREE</strong> : `Rs. ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-stone-900 pt-3 border-t border-stone-200">
                <span>Total Amount Payable</span>
                <span className="text-xl text-[#7b3e1d]">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-stone-500 space-y-1.5 bg-stone-50 p-3 rounded-xl border border-stone-100">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#7b3e1d]" />
                <span>2-4 Working Days Delivery via TCS / Trax</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Sealed Products • Return Guaranteed</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
