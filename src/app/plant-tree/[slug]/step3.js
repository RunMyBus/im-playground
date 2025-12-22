"use client";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Step3({ resData = {}, purchaseInfo = {} }) {
    const session = useSessionStorage();
    const router = useRouter();

    // Session values
    const purchaseBy = session?.name || "";
    const userId = session?.userId || null;

    // Env values
    const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;
    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY;

    // Local state
    const [newOrderId, setNewOrderId] = useState("");
    const [projectName, setProjectName] = useState("");
    const [incomingCoupon, setIncomingCoupon] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(""); // will store coupon._id (string)
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [data, setData] = useState(null); // backend order object
    const [openCoupon, setOpenCoupon] = useState(false);
    const [treeQty, setTreeQty] = useState(Number(resData?.qty || 1));
    const [isMobile, setIsMobile] = useState(false);

    // coupon list (fetched from /couponlist)
    const [couponList, setCouponList] = useState([]);

    // loading states
    const [loadingCoupons, setLoadingCoupons] = useState(false);
    const [loadingUpdate, setLoadingUpdate] = useState(false); // for qty / coupon update
    const [paymentLoading, setPaymentLoading] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // ----------------------------------------------------------------
    // Fetch initial order details (purchasedetail endpoint)
    // ----------------------------------------------------------------
    useEffect(() => {
        if (!userId || !apiRoute) return;

        const fetchNewOrderId = async () => {
            try {
                const response = await fetch(`${apiRoute}/purchasedetail`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId }),
                });

                const result = await response.json();
                console.log("order detailsss",result)
                const d = result?.Data || result?.data || result;

                if (d) {
                    // Normalize fields to safe structure. Backend should provide finalAmount, item_price/amount, qty etc.
                    const perTree = Number(d.per_tree || d.per_tree_cost || 0);
                    const initialQty = Number(resData?.qty || d.qty || 1);
                    const item_price = Number(d.item_price ?? d.amount ?? perTree * initialQty);
                    const finalAmount = Number(d.finalAmount ?? d.final_amount ?? item_price);

                    const normalized = {
                        ...d,
                        per_tree: perTree,
                        qty: initialQty,
                        item_price,
                        finalAmount,
                        discountAmount: Number(d.discountAmount ?? d.discount_amount ?? 0),
                        couponId: d.couponId ?? d.coupon_id ?? "",
                    };

                    setData(normalized);
                    setNewOrderId(d.order_id || d.orderId || "");
                    setProjectName(d.project_name || d.projectName || "");
                    setIncomingCoupon(d.coupon || "");
                    setTreeQty(initialQty);
                    setAppliedCoupon(normalized.couponId || "");
                }
            } catch (err) {
                console.error("Error fetching order:", err);
                setError("Failed to fetch order details.");
            }
        };

        fetchNewOrderId();
    }, [userId, apiRoute, resData]);

    const refreshPurchasedDetail = async () => {
        try {
            const response = await fetch(`${apiRoute}/purchasedetail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            const result = await response.json();
            const d = result?.Data || result?.data || result;

            if (!d) return null;

            const perTree = Number(d.per_tree || d.per_tree_cost || 0);
            const item_price = Number(d.item_price ?? d.amount ?? perTree * (d.qty || 1));
            const finalAmount = Number(d.finalAmount ?? d.final_amount ?? item_price);

            const normalized = {
                ...d,
                per_tree: perTree,
                qty: Number(d.qty),
                item_price,
                finalAmount,
                discountAmount: Number(d.discountAmount ?? 0),
                couponId: d.couponId ?? "",
            };

            setData(normalized);
            setNewOrderId(d.order_id);
            setProjectName(d.project_name);
            setAppliedCoupon(normalized.couponId || "");
            setTreeQty(normalized.qty);

            return normalized;
        } catch (err) {
            console.error("Failed to refresh purchasedetail:", err);
            return null;
        }
    };


    // ----------------------------------------------------------------
    // Fetch coupons
    // ----------------------------------------------------------------
    const fetchCoupons = useCallback(async () => {
        if (!apiRoute) return;
        setLoadingCoupons(true);
        try {
            const body = {
                userId: userId || "IGM00000811",
                activeOnly: true,
            };
            const res = await axios.post(`${apiRoute}/couponlist`, body);
            const list = res?.data?.data || res?.data || [];
            setCouponList(Array.isArray(list) ? list : []);
        } catch (err) {
            console.error("Error fetching coupons:", err);
            setCouponList([]);
        } finally {
            setLoadingCoupons(false);
        }
    }, [apiRoute, userId]);

    useEffect(() => {
        if (!apiRoute) return;
        fetchCoupons();
    }, [apiRoute, fetchCoupons]);

    // ----------------------------------------------------------------
    // Razorpay loader
    // ----------------------------------------------------------------
    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    // ----------------------------------------------------------------
    // Razorpay Payment (display)
    // ----------------------------------------------------------------
    async function displayRazorpay() {
        console.log(data.finalAmount, '=====================')
        if (!apiRoute) {
            setError("Payment not available: missing API route.");
            return;
        }
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const options = {
            key: razorpayKey,
            amount: Math.round((data.finalAmount) * 100), // in paise
            currency: "INR",
            name: purchaseBy,
            description: purchaseBy,
            image: "/images/logo-black.png",
            order_id: newOrderId,
            handler: async function (response) {
                setPaymentLoading(true);
                try {
                    const payload = {
                        userId,
                        orderId: resData?.orderId,
                        type: "project",
                        seeds_redeem: 0,
                        to_pay: Number(data?.finalAmount),
                        order_id: newOrderId,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    };

                    const result = await axios.post(`${apiRoute}/buytree`, payload);
                    if (result?.data?.Status === true) {
                        router.push("/thank-you-orders");
                    } else {
                        setError("Payment failed or not confirmed by server.");
                    }
                } catch (err) {
                    console.error("Payment handler error:", err);
                    setError("Payment failed.");
                } finally {
                    setPaymentLoading(false);
                }
            },
            prefill: {
                name: purchaseBy,
                email: purchaseInfo?.email,
                contact: purchaseInfo?.phone,
            },
            notes: { address: "" },
            theme: { color: "#61dafb" },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    // ----------------------------------------------------------------
    // Coupon-only Payment (no razorpay)
    // ----------------------------------------------------------------
    async function noDisplayRazorpay() {
        if (!apiRoute) {
            setError("Payment not available: missing API route.");
            return;
        }

        setPaymentLoading(true);
        try {
            const payload = {
                userId,
                orderId: resData?.orderId,
                type: "project",
                seeds_redeem: 0,
                to_pay: Number(data?.finalAmount || 0),
                coupon: appliedCoupon,
            };

            const result = await axios.post(`${apiRoute}/buytree`, payload);
            if (result?.data?.Status === true) {
                setAppliedCoupon("");
                router.push("/thank-you-orders");
            } else {
                setError("Payment failed or not confirmed by server.");
            }
        } catch (err) {
            console.error("Coupon-only payment error:", err);
            setError("Payment failed.");
        } finally {
            setPaymentLoading(false);
        }
    }

    // ----------------------------------------------------------------
    // Proceed to pay (decide path)
    // ----------------------------------------------------------------
    const ProceedAction = () => {
        setError("");
        // if (appliedCoupon) {
        //     noDisplayRazorpay();
        // } else {
            displayRazorpay();
        // }
    };

    // ----------------------------------------------------------------
    // Centralized helper: normalize backend response
    // Accepts axios response object or raw object
    // ----------------------------------------------------------------
    const normalizeBackendOrder = (resp) => {
        const raw = resp?.data?.Data || resp?.data || resp;
        if (!raw) return null;
        return {
            ...raw,
            qty: Number(raw.qty || raw.Qty || 0),
            item_price: Number(raw.item_price ?? raw.itemPrice ?? 0),
            finalAmount: Number(raw.finalAmount ?? raw.final_amount ?? raw.finalAmount ?? raw.amount ?? 0),
            discountAmount: Number(raw.discountAmount ?? raw.discount_amount ?? 0),
            couponId: (raw.couponId ?? raw.coupon_id ?? raw.coupon) || "",
        };
    };

    // ----------------------------------------------------------------
    // updateQty: call backend and let backend return calculations
    // ----------------------------------------------------------------
    const updateQty = async (type) => {
        if (!apiRoute || !userId) {
            setError("Missing user or API route.");
            return;
        }

        let qty = Number(treeQty || 1);
        if (type === "inc") qty++;
        if (type === "dec" && qty > 1) qty--;

        // optimistically set UI qty for responsiveness
        setTreeQty(qty);
        setLoadingUpdate(true);
        setError("");
        setSuccess("");

        try {
            const payload = {
                userId,
                qty,
                couponId: appliedCoupon || "",
            };

            const response = await axios.post(`${apiRoute}/updatetreeorder/${resData?.orderId}`, payload);

            const updated = normalizeBackendOrder(response);
            await refreshPurchasedDetail();

            if (updated) {
                setData(updated);
                setTreeQty(updated.qty);
                setAppliedCoupon(updated.couponId || "");
                setSuccess("Quantity updated");
            } else {
                // fallback - if backend didn't return expected body, keep local values
                setError("Unexpected server response while updating quantity.");
            }
        } catch (err) {
            console.error("Failed to update quantity:", err);
            setError("Failed to update quantity. Please try again.");
        } finally {
            setLoadingUpdate(false);
        }
    };

    // ----------------------------------------------------------------
    // applyCoupon: send coupon._id to backend and get recalculated amounts
    // ----------------------------------------------------------------
    const applyCoupon = async (coupon) => {
        if (!coupon || !apiRoute || !userId) return { ok: false, message: "Missing data" };

        setError("");
        setSuccess("");
        setLoadingUpdate(true);

        try {
            const payload = {
                userId,
                qty: Number(treeQty || 1),
                couponId: coupon._id,
            };

            const response = await axios.post(`${apiRoute}/updatetreeorder/${resData?.orderId}`, payload);

            // if backend says failed → return error to UI
            if (response?.data?.Status === false) {
                return { ok: false, message: response?.data?.Message || "Coupon failed" };
            }

            const updated = normalizeBackendOrder(response);
            await refreshPurchasedDetail();

            if (updated) {
                setData(updated);
                setTreeQty(updated.qty);
                setAppliedCoupon(updated.couponId || "");
                return { ok: true };
            }

            return { ok: false, message: "Unexpected server response" };

        } catch (err) {
            return { ok: false, message: "Failed to apply coupon" };
        } finally {
            setLoadingUpdate(false);
        }
    };


    // ----------------------------------------------------------------
    // removeCoupon: tell backend to remove coupon (couponId = "")
    // ----------------------------------------------------------------
    const removeCoupon = async () => {
        if (!apiRoute || !userId) {
            setError("Missing user or API route.");
            return;
        }

        setError("");
        setSuccess("");
        setLoadingUpdate(true);

        try {
            const payload = {
                userId,
                qty: Number(treeQty || 1),
                couponId: "",
            };

            const response = await axios.post(`${apiRoute}/updatetreeorder/${resData?.orderId}`, payload);

            const updated = normalizeBackendOrder(response);
            await refreshPurchasedDetail();

            if (updated) {
                setData(updated);
                setTreeQty(updated.qty);
                setAppliedCoupon(updated.couponId || "");
                setSuccess("Coupon removed");
            } else {
                setError("Unexpected server response while removing coupon.");
            }
        } catch (err) {
            console.error("Failed to remove coupon:", err);
            setError("Failed to remove coupon. Please try again.");
        } finally {
            setLoadingUpdate(false);
        }
    };

    // ----------------------------------------------------------------
    // Coupon Drawer component
    // ----------------------------------------------------------------
    const CouponDrawer = ({ open, onClose }) => {
        const [manualCode, setManualCode] = useState("");
        const [drawerError, setDrawerError] = useState("");
        const [drawerSuccess, setDrawerSuccess] = useState("");

        // useEffect(() => {
        //     if (!open) return;
        //     setDrawerError("");
        //     setDrawerSuccess("");
        //     if (!couponList || couponList.length === 0) {
        //         fetchCoupons();
        //     }
        // }, [open]);

        const handleManualApply = async () => {
            setDrawerError("");
            setDrawerSuccess("");

            if (!manualCode.trim()) {
                setDrawerError("Please enter a coupon code");
                return;
            }

            const found = (couponList || []).find(
                (x) => x.couponCode?.toLowerCase() === manualCode.toLowerCase()
            );

            if (!found) {
                setDrawerError("Invalid coupon code");
                return;
            }

            // call backend to apply coupon (uses _id)
            await applyCoupon(found);

            // reflect drawer messages based on global success/error
            if (!error) {
                setDrawerSuccess("Coupon Applied Successfully");
                setTimeout(() => {
                    onClose();
                }, 300);
            } else {
                setDrawerError(error);
            }
        };

        if (!open) return null;

        return (
            <div
                style={{
                    position: "fixed",
                    top: isMobile ? "0" : "130px",
                    right: "0",
                    width: isMobile ? "100vw" : "420px",
                    height: isMobile ? "100vh" : "calc(100vh - 130px)",
                    background: "#fff",
                    padding: isMobile ? "16px" : "20px",
                    zIndex: 999999,
                    overflowY: "auto",
                    boxShadow: isMobile ? "0 -4px 12px rgba(0,0,0,0.2)" : "-4px 0 12px rgba(0,0,0,0.2)",
                    borderRadius: isMobile ? "12px 12px 0 0" : "12px 0 0 12px",
                    transition: "0.3s ease",
                }}
            >
                <div style={{ textAlign: "right" }}>
                    <button
                        onClick={onClose}
                        style={{
                            background: "none",
                            border: "none",
                            fontSize: "22px",
                            cursor: "pointer",
                        }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                    <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={manualCode}
                        onChange={(e) => {
                            setManualCode(e.target.value);
                            setDrawerError("");
                            setDrawerSuccess("");
                        }}
                        style={{
                            flex: 1,
                            padding: "10px",
                            borderRadius: "8px",
                            outline: "none",
                            border: drawerError ? "1px solid red" : "1px solid #ccc",
                        }}
                    />

                    <button
                        onClick={handleManualApply}
                        style={{
                            background: "#FF6B00",
                            border: "none",
                            padding: "10px 18px",
                            color: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontWeight: 600,
                        }}
                        disabled={loadingUpdate}
                    >
                        APPLY
                    </button>
                </div>

                {drawerError && (
                    <p style={{ color: "red", fontSize: "13px", marginTop: "6px", fontWeight: 600 }}>
                        {drawerError}
                    </p>
                )}

                {drawerSuccess && (
                    <p style={{ color: "green", fontSize: "13px", marginTop: "6px", fontWeight: 600 }}>
                        {drawerSuccess}
                    </p>
                )}

                <h3 style={{ marginTop: "20px" }}>Available Coupons</h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    {(couponList || []).map((c) => {
                        const totalPrice = Number(data?.item_price || 0);
                        const minAmount = Number(c.minRequirementValue ?? c.minPurchaseAmount ?? 0);

                        // dates
                        const now = new Date();
                        const start = c.startDate ? new Date(c.startDate) : null;
                        const end = c.endDate ? new Date(c.endDate) : null;
                        const isExpired =
                            (start && now < start) || // not started yet
                            (end && now > end);       // already ended

                        // requirement check (amount / qty)
                        const meetsRequirement =
                            c.minRequirementType === "QUANTITY"
                                ? treeQty >= Number(c.minRequirementValue ?? 0)
                                : totalPrice >= minAmount;

                        const isApplied = appliedCoupon === c._id;

                        // card is visually disabled & not clickable when:
                        //  - NOT applied
                        //  - AND (expired OR requirement not met)
                        const isCardDisabled = !isApplied && (isExpired || !meetsRequirement);

                        // button can apply coupon only when:
                        const canApply = !isApplied && !isExpired && meetsRequirement && !loadingUpdate;

                        const ribbonText =
                            c.discountType === "PERCENTAGE"
                                ? `${c.discountConfig?.value}% OFF`
                                : c.discountType === "FIXED_AMOUNT"
                                    ? `₹${c.discountConfig?.value} OFF`
                                    : `BUY ${c.discountConfig?.buyQty} GET ${c.discountConfig?.getQty}`;

                        const saveText =
                            c.discountType === "PERCENTAGE"
                                ? `Save ${c.discountConfig?.value}% on this order!`
                                : c.discountType === "FIXED_AMOUNT"
                                    ? `Save ₹${c.discountConfig?.value} on this order!`
                                    : `Buy ${c.discountConfig?.buyQty} get ${c.discountConfig?.getQty}!`;

                        const detailLine =
                            c.discountType === "PERCENTAGE"
                                ? `Use code ${c.couponCode} & get ${c.discountConfig.value}% off (Max ₹${c.discountConfig.maxDiscount}) on orders above ₹${minAmount}.`
                                : c.discountType === "FIXED_AMOUNT"
                                    ? `Use code ${c.couponCode} & get flat ₹${c.discountConfig.value} off on orders above ₹${minAmount}.`
                                    : `Buy ${c.discountConfig.buyQty} get ${c.discountConfig.getQty} free with code ${c.couponCode}.`;

                        return (
                            <div
                                key={c._id}
                                style={{
                                    display: "flex",
                                    background: "#fff",
                                    borderRadius: "14px",
                                    overflow: "hidden",
                                    border: "1px solid #eee",
                                    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                                    opacity: isCardDisabled ? 0.4 : 1,
                                    pointerEvents: isCardDisabled ? "none" : "auto", // <-- whole card not clickable
                                }}
                            >
                                {/* Ribbon */}
                                <div
                                    style={{
                                        background: isCardDisabled ? "#ccc" : "#FF6B00",
                                        color: isCardDisabled ? "#666" : "#fff",
                                        writingMode: "vertical-rl",
                                        transform: "rotate(180deg)",
                                        padding: "12px 6px",
                                        fontSize: "13px",
                                        fontWeight: 700,
                                        textAlign: "center",
                                        minWidth: "45px",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center"
                                    }}
                                >
                                    {ribbonText}
                                </div>

                                {/* Body */}
                                <div style={{ flex: 1, padding: "14px 16px" }}>
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <span style={{ fontWeight: 700, fontSize: "18px" }}>{c.couponCode}</span>

                                        {isApplied ? (
                                            <button
                                                onClick={async () => {
                                                    await removeCoupon();
                                                    setCouponList((prev) =>
                                                        prev.map((x) => ({ ...x, _msg: "", _err: "" }))
                                                    );
                                                    setAppliedCoupon("");
                                                }}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    color: "#ff3b30",
                                                    fontWeight: 700,
                                                    cursor: loadingUpdate ? "not-allowed" : "pointer",
                                                    fontSize: "14px",
                                                }}
                                                disabled={loadingUpdate}
                                            >
                                                REMOVE
                                            </button>
                                        ) : (
                                            <button
                                                disabled={!canApply}
                                                onClick={async () => {
                                                    // clear previous coupon messages
                                                    setCouponList((prev) =>
                                                        prev.map((x) => ({ ...x, _msg: "", _err: "" }))
                                                    );

                                                    const resp = await applyCoupon(c);

                                                    setCouponList((prev) =>
                                                        prev.map((x) =>
                                                            x._id === c._id
                                                                ? {
                                                                    ...x,
                                                                    _msg: resp.ok ? "Coupon Applied Successfully" : "",
                                                                    _err: resp.ok ? "" : resp.message || "",
                                                                }
                                                                : { ...x }
                                                        )
                                                    );
                                                }}
                                                style={{
                                                    border: "none",
                                                    background: "none",
                                                    color: canApply ? "#FF6B00" : "#aaa",
                                                    fontWeight: 700,
                                                    cursor: canApply ? "pointer" : "not-allowed",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                APPLY
                                            </button>
                                        )}
                                    </div>

                                    {/* coupon-level messages */}
                                    {c._err && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "13px",
                                                margin: "2px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {c._err}
                                        </p>
                                    )}

                                    {c._msg && (
                                        <p
                                            style={{
                                                color: "green",
                                                fontSize: "13px",
                                                margin: "2px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            {c._msg}
                                        </p>
                                    )}

                                    <p style={{ color: "#0A9A40", fontWeight: 600, marginBottom: "3px" }}>{saveText}</p>

                                    <hr style={{ borderTop: "1px dashed #ccc", margin: "1px 0" }} />

                                    <p style={{ color: "#444", fontSize: "14px" }}>{detailLine}</p>

                                    {/* reasons text */}
                                    {isExpired && !isApplied && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                                marginTop: "6px",
                                            }}
                                        >
                                            Coupon expired.
                                        </p>
                                    )}

                                    {!isExpired && !meetsRequirement && !isApplied && (
                                        <p
                                            style={{
                                                color: "red",
                                                fontSize: "12px",
                                                marginTop: "2px",
                                            }}
                                        >
                                            {c.minRequirementType === "QUANTITY"
                                                ? `Add ${
                                                    Number(c.minRequirementValue ?? 0) - treeQty
                                                } more trees to use this coupon`
                                                : `Add ₹${minAmount - totalPrice} more to use this coupon`}
                                        </p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>


            </div>
        );
    };

    // ----------------------------------------------------------------
    // If still loading data, show simple loading text
    // ----------------------------------------------------------------
    if (!data) return <div style={{ padding: 24 }}>Loading...</div>;

    return (
        <div
            className="plant_cover_box"
            style={{
                backgroundColor: "white",
                padding: "10px",
                borderRadius: "15px",
                display: "flex",
                alignItems: "flex-start",
                columnGap: "16px",
                rowGap: "16px",
                flexWrap: "wrap",
                maxWidth: "1200px",
                margin: "0 auto",
                width: "100%",
            }}
        >
            {/* LEFT SIDE */}
            <div style={{ flex: isMobile ? "1 1 100%" : "1 1 55%", minWidth: isMobile ? "100%" : "360px" }}>
                <div className="order-left-image" style={{ position: "relative", height: 220 }}>
                    <Image src="/images/gift-tree.png" alt="plant tree" fill style={{ objectFit: "cover" }} />
                </div>

                <div className="order-details" style={{ marginTop: 12 }}>
                    <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                        <span className="info-label">Order ID</span>
                        <span className="info-value">{resData?.orderId}</span>
                    </div>

                    <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                        <span className="info-label">Purchased Date</span>
                        <span className="info-value">{resData?.today}</span>
                    </div>

                    <div className="info-row" style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                        <span className="info-label">Project</span>
                        <span className="info-value">{projectName}</span>
                    </div>

                    {/* Coupon Box */}
                    <div
                        onClick={() => setOpenCoupon(true)}
                        style={{
                            width: "100%",
                            border: "1px solid #E5E5E5",
                            borderRadius: 16,
                            padding: 14,
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        {/* Fake Input */}
                        <div
                            style={{
                                width: "100%",
                                border: "1px solid #ddd",
                                borderRadius: 12,
                                padding: "12px 14px",
                                fontSize: 15,
                                color: appliedCoupon ? "#19A245" : "#999",
                                fontWeight: 500,
                                background: "#fafafa",
                            }}
                        >
                            {appliedCoupon
                                ? `Applied: ${couponList.find((c) => c._id === appliedCoupon)?.couponCode}`
                                : "Enter coupon code"}
                        </div>

                        {/* Bottom row */}
                        <div
                            style={{
                                marginTop: 12,
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    fontSize: 14,
                                    color: "#333",
                                }}
                            >
                                {/* Small coupon icon */}
                                <span
                                    style={{
                                        width: 18,
                                        height: 18,
                                        border: "2px solid #666",
                                        borderRadius: "50%",
                                        fontSize: 11,
                                        lineHeight: "14px",
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
        %
      </span>

                                {couponList?.length || 0} coupons available
                            </div>

                            <span
                                style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: "#000",
                                }}
                                onClick={async () => {
                                    await fetchCoupons(); // always refresh before open
                                    setOpenCoupon(true);
                                }}
                            >View All
    </span>
                        </div>
                    </div>


                    {/* Error & Success Messages */}
                    {error && <p className="error-text" style={{ color: "red", marginTop: 8 }}>{error}</p>}
                    {appliedCoupon && success && <p className="success-text" style={{ color: "green", marginTop: 8 }}>{success}</p>}
                </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="step3_right" style={{ padding: "10px", flex: "0 0 380px", maxWidth: "100%" }}>
                <div className="step3_right_treeDetail" style={{ marginBottom: 12 }}>
                    <div className="detail-header"><p><b>Tree Detail</b></p></div>

                    <div className="detail-body">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", lineHeight: 1 }}>
                            <span>Total Trees :</span>

                            <div style={{ display: "flex", alignItems: "center", border: "1px solid #ccc", borderRadius: "6px", padding: "6px 12px", background: "#fff", gap: "10px", minWidth: "120px" }}>
                                <button
                                    onClick={() => updateQty("dec")}
                                    style={{ border: "none", background: "transparent", fontSize: "20px", cursor: loadingUpdate ? "not-allowed" : "pointer", color: "#777", minWidth: "20px" }}
                                    disabled={loadingUpdate}
                                >
                                    −
                                </button>

                                <span style={{ fontSize: "18px", fontWeight: "600", minWidth: "20px", textAlign: "center" }}>{treeQty}</span>

                                <button
                                    onClick={() => updateQty("inc")}
                                    style={{ border: "none", background: "transparent", fontSize: "20px", cursor: loadingUpdate ? "not-allowed" : "pointer", color: "green", minWidth: "20px" }}
                                    disabled={loadingUpdate}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="step3_right_treeDetail" style={{ marginBottom: 12 }}>
                    <div className="detail-header"><p><b>Owner Details</b></p></div>
                    <div className="detail-body">
                        <p><span>Purchased By :</span><b style={{ marginLeft: 8 }}>{purchaseBy}</b></p>
                        <p><span>Purchased For :</span><b style={{ marginLeft: 8 }}>{purchaseInfo?.name}</b></p>
                        <p><span>Mobile Number :</span><b style={{ marginLeft: 8 }}>+91 {purchaseInfo?.phone}</b></p>
                        <p><span>Email Address :</span><b style={{ marginLeft: 8 }}>{purchaseInfo?.email}</b></p>
                    </div>
                </div>

                <div className="step3_right_total" style={{ background: "#fff", padding: 12, borderRadius: 8 }}>
                    <p>Total Price : ₹ {Number(data?.item_price || 0)}</p>

                    {Number(data?.discountAmount || 0) > 0 && (
                        <p style={{ color: "green", fontWeight: "600" }}>
                            Coupon Discount : -₹{Number(data.discountAmount || 0)}
                        </p>
                    )}

                    <p><b>To be Paid : ₹ {Number(data?.finalAmount ?? data?.item_price ?? 0)}</b></p>
                </div>

                <button
                    className="btn-default"
                    style={{ maxWidth: "170px", marginTop: 12, cursor: paymentLoading ? "not-allowed" : "pointer" }}
                    onClick={ProceedAction}
                    disabled={paymentLoading}
                >
                    {paymentLoading ? "Processing..." : "Proceed to Pay"}
                </button>

                {/* Remove coupon button (visible when a coupon is applied) */}
                {/*{appliedCoupon && (*/}
                {/*    <div style={{ marginTop: 12 }}>*/}
                {/*        <button*/}
                {/*            onClick={removeCoupon}*/}
                {/*            style={{*/}
                {/*                background: "transparent",*/}
                {/*                color: "#ff3b30",*/}
                {/*                border: "1px solid #ff3b30",*/}
                {/*                padding: "8px 12px",*/}
                {/*                borderRadius: 8,*/}
                {/*                cursor: loadingUpdate ? "not-allowed" : "pointer",*/}
                {/*            }}*/}
                {/*            disabled={loadingUpdate}*/}
                {/*        >*/}
                {/*            {loadingUpdate ? "Removing..." : "Remove Coupon"}*/}
                {/*        </button>*/}
                {/*    </div>*/}
                {/*)}*/}
            </div>

            {/* COUPON DRAWER */}
            <CouponDrawer open={openCoupon} onClose={() => setOpenCoupon(false)} />
        </div>
    );
}
