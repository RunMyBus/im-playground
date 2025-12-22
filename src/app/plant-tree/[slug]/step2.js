"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import axios from "axios";
import OptimizedImage from "@/app/components/OptimizedImage";
console.log("✅ Step2 component loaded");

export default function Step2({ ...props }) {
  const resp=useSessionStorage();
  console.log("resp",resp);
  const userId = useSessionStorage()?.userId; //user id
  console.log("userId", userId);
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE;//api base url
  console.log("apiRoutegfgfgf", apiRoute);
  const {
    proId,
    giftStatus,
    setResData,
    setShowStep3,
    setGiftStatus,
    setPurchaseInfo,
  } = props;
  const name = useSessionStorage()?.name; //user name
  const phone = useSessionStorage()?.phone; //user phone
  const email = useSessionStorage()?.email; //user email
  const occasion = useSessionStorage()?.occasion; //user email
  const [message, setMessage] = useState(""); //user message
  const [occasionData, setOccasionData] = useState([]);
  //for myself tree
  const [myTree, setMyTree] = useState("");
  const [validNo, setValidNo] = useState(true); //no of trees
  //for myself tree

  useEffect(() => {
    function getNews() {
      const data = JSON.stringify({ userId: userId });
      const configNewsRoom = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/giftcatlist`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      console.log("configNewsRoom", configNewsRoom);

      axios.request(configNewsRoom)
        .then((response) => {
          setOccasionData(response.data.Data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        })

    }

    if (userId) {
      getNews();
    }
  }, [apiRoute, userId]);


  //formik fields validation
  const validate = (values) => {
    const errors = {};
    if (!values.phone) {
      errors.phone = "Required";
    } else if (values.phone.toString().length < 10) {
      errors.phone = "Number must be 10 digits";
    } else if (values.phone.toString().length > 10) {
      errors.phone = "Number must be 10 digits";
    }

    if (!values.fullName) {
      errors.fullName = "Required";
    }

    if (!values.email) {
      errors.email = "Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.trees) {
      errors.trees = "Required";
    } else if (values.trees.toString().length < 1) {
      errors.trees = "Enter min 1 value";
    }

    // if (!values.occasion) {
    //   errors.occasion = "Required";
    // }

    return errors;
  };
//   const qty=Number(values.trees)
// console.log("qty",typeof qty,qty)
  // formik field initial value
  const formik = useFormik({
    initialValues: {
      fullName: name,
      email: email,
      phone: phone,
      trees: "",
      // occasion: "",
    },
    validate,
    // formik field submit function
    onSubmit: async (values) => {
      try {
        console.log("Form submitted with values:", values);
        const qty = Number(values.trees);
        console.log("Quantity:", qty);

        const payload = {
          userId: userId,
          gitfStatus: giftStatus,
          message: message,
          proId: proId.toUpperCase(),
          qty: qty,
          name: values.fullName,
          email: values.email,
          phone: values.phone,
          // occasion:values.occasion,
          type: "project",
          giftType: "",
          zodiacName: "Aries",
          treeSpecies: "Sapling",
        };

        console.log("Sending request to:", `${apiRoute}/addtreeorder`);
        console.log("Request payload:", payload);

        const response = await fetch(`${apiRoute}/addtreeorder`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const text = await response.text();
        let result;
        try {
          result = JSON.parse(text);
        } catch (e) {
          throw new Error(`Unexpected response (${response.status}): ${text?.slice(0,200)}`);
        }

        console.log("API Response:", result);

        if (!response.ok || !result?.Status) {
          const msg = result?.Message || `Request failed (${response.status})`;
          console.error("API error:", msg);
          alert(`Error: ${msg}`);
          return;
        }

        // Success
        setResData(result.Data);
        setGiftStatus(0);
        setShowStep3(true);
        setPurchaseInfo({
          name: values.fullName,
          email: values.email,
          phone: values.phone,
        });
      } catch (error) {
        console.log("Fetch Error:", error);
        alert("Request failed. Please try again in a moment.");
      }
    },
  });

  //for myself tree-----------------------------------------------------------------------------------------------------------------------
  const submitMyself = async () => {
    const qty = Number(myTree);
    if (qty <= 0) {
      setValidNo(false);
      return;
    }
    setValidNo(true);

    try {
      const payload = {
        userId: userId,
        gitfStatus: giftStatus,
        message: message,
        proId: proId.toUpperCase(),
        qty: qty,
        name: name,
        email: email,
        phone: phone,
        // occasion:occasion,
        type: "project",
        giftType: "",
        zodiacName: "Aries",
        treeSpecies: "Sapling",
      };

      const response = await fetch(`${apiRoute}/addtreeorder`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await response.text();
      let result;
      try {
        result = JSON.parse(text);
      } catch (e) {
        throw new Error(`Unexpected response (${response.status}): ${text?.slice(0,200)}`);
      }

      console.log("API Response:", result);

      if (!response.ok || !result?.Status) {
        const msg = result?.Message || `Request failed (${response.status})`;
        console.error("API error:", msg);
        alert(`Error: ${msg}`);
        return;
      }

      setResData(result.Data);
      setShowStep3(true);
      setPurchaseInfo({ name, email, phone });
    } catch (error) {
      console.log("Fetch Error:", error);
      alert("Request failed. Please try again in a moment.");
    }
  };

  //for myself tree--------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="plant_cover_box">
        <div className="step2_left">
          <div className="step2_left_img">
            {giftStatus == 2 ? (
              <OptimizedImage src="/images/gift-tree.png" alt="plant tree" fill />
            ) : (
              <OptimizedImage src="/images/myself-tree.png" alt="plant tree" fill />
            )}
          </div>
          <div className="step2_message">
            <p> {giftStatus == 2 ? <>It&#39;s a Gift</> : ""}</p>
            {giftStatus == 2 ? (
              <textarea
                placeholder="Greeting Message"
                rows="3"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            ) : (
              ""
            )}
          </div>
        </div>

        {giftStatus == 2 ? (
          <div className="step2_right">
            <p>Receiver&#39;s Detail</p>
            <div className="step2_field">
              <input
                type="text"
                placeholder="Name"
                id="fullName"
                name="fullName"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.fullName === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.errors.fullName ? (
                <span style={{ fontWeight: 600, color: "red", fontSize: 13 }}>
                  {formik.errors.fullName}
                </span>
              ) : null}
            </div>
            <div className="step2_field">
              <input
                type="text"
                placeholder="Mobile No."
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                value={formik.values.phone}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.phone === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.errors.phone ? (
                <span style={{ fontWeight: 600, color: "red", fontSize: 13 }}>
                  {formik.errors.phone}
                </span>
              ) : null}
            </div>
            <div className="step2_field">
              <input
                type="text"
                placeholder="Email Id"
                id="contactemail"
                name="email"
                onChange={formik.handleChange}
                value={formik.values.email}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.email === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.errors.email ? (
                <span style={{ fontWeight: 600, color: "red", fontSize: 13 }}>
                  {formik.errors.email}
                </span>
              ) : null}
            </div>
            <div className="step2_field">
              <input
                type="number"
                placeholder="No of Trees"
                id="trees"
                name="trees"
                onChange={formik.handleChange}
                value={formik.values.trees}
                onKeyDown={(e) => {
                  if (e.key === " " && formik.values.trees === "") {
                    e.preventDefault(); // Prevent space if it's the first character
                  }
                }}
              />
              {formik.errors.trees ? (
                <span style={{ fontWeight: 600, color: "red", fontSize: 13 }}>
                  {formik.errors.trees}
                </span>
              ) : null}
            </div>
            {/* <div className="step2_field">
              <select
                style={{ background: "none", borderRadius: "20px", borderColor: "black" }}
                name="occasion"
                id="occasion"
                onChange={formik.handleChange}
                value={formik.values.occasion || ""}>
                <option value="" disabled>Select an Occasion</option>
                {occasionData && occasionData.map((item, index) => (
                  <option key={index} value={item.title}>{item.title}</option>
                ))}
              </select>
              {formik.errors.occasion && <span style={{ fontWeight: 600, color: "red", fontSize: 13 }}>{formik.errors.occasion}</span>}
            </div> */}

            <div className="step2_field">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="btn-default"
              >
                Proceed
              </button>
            </div>
          </div>
        ) : (
          <div className="step2_right">
            <p style={{ color: "#009933" }}>It&#39;s for Myself</p>
            <div className="step2_field">
              <input
                type="number"
                placeholder="No of Trees"
                id="trees"
                name="trees"
                onChange={(e) => {
                  setMyTree(e.target.value);
                }}
                value={myTree}
              />
              {validNo ? "" : <span>Fill the valid Quantity</span>}
            </div>
            <div className="step2_field">
              <button
                type="submit"
                onClick={submitMyself}
                className="btn-default"
              >
                Proceed
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
