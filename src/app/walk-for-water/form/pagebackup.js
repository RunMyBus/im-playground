"use client";
import { useState } from "react";
import Footer from "@/app/components/footer"; //footer component
import Header_new from "@/app/components/header_new"; //header component
import { useRouter } from "next/navigation";
import LoadingButton from "@/app/components/ui/LoadingButton";

export default function WalkforwaterForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState();
  const [formValues, setFormValues] = useState({
    name: "",
    mobile: "",
    village: "",
    district: "",
    state: "",
    pincode: "",
    lat: "",
    long: "",
    boredry: "",
    years: "",
    previnches: "",
    aferinches: "",
    acres: "",
    waterbodies: "",
    afterwaterbodiesfull: "",
    boreinrainyseason: "",
    sitephoto: [],
    averagerainfall: "",
    soilreport: "",
  });
  const apiRoute = process.env.API_ROUTE;
  //function for selecting the gallery images
  const onSelectGallery = async (e) => {
    setFormValues({ ...formValues, sitephoto: Array.from(e.target.files) });
    // console.log(formValues.sitephoto, typeof formValues.sitephoto);
  };
  //submitting the form
  const submitForm = (e) => {
    e.preventDefault();
    if (formValues.mobile.toString().length < 10) {
      setError("Number must be 10 digits");
      setShowError(true);
    } else if (formValues.mobile.toString().length > 10) {
      setError("Number must be 10 digits");
      setShowError(true);
    } else {
      setLoading(true);
      // console.log(formValues);
      setLoading(true);

      var myHeaders = new Headers();
      const formdata = new FormData();
      formValues.sitephoto.forEach((image, index) => {
        formdata.append("site_image", image);
      });
      formdata.append("name", formValues.name); //
      formdata.append("phone", formValues.mobile); //
      //formdata.append("site_image", formValues.sitephoto, "[PROXY]");
      formdata.append("village", formValues.village); //
      formdata.append("district", formValues.district); //
      formdata.append("state", formValues.state); //
      formdata.append("pincode", formValues.pincode); //
      formdata.append("latitude", formValues.lat); //
      formdata.append("longitude", formValues.long); //
      formdata.append("reduceWater", formValues.boredry); //
      formdata.append("yearsBore", formValues.years); //
      formdata.append("inchBore", formValues.previnches); //
      formdata.append("inchPour", formValues.aferinches);
      formdata.append("acersBore", formValues.acres); //
      formdata.append("nearPond", formValues.waterbodies); //
      formdata.append("pourFull", formValues.afterwaterbodiesfull); //
      formdata.append("rainPour", formValues.boreinrainyseason); //
      formdata.append("averageRain", formValues.averagerainfall); //
      formdata.append("soilReport", formValues.soilreport); //

      const requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      //adding the form on the server
      fetch(`${apiRoute}/addsiteform`, requestOptions)
        .then((response) => console.log(response.status) || response) // output the status and return response
        .then((response) => response.text()) // send response body to next then chain
        .then((body) => {
          const data = JSON.parse(body);
          if (JSON.stringify(data.Status) == "true") {
            router.push("/thankyou");
            setLoading(false);
          } else {
            // console.log(data.Status);
          }
        })
        .catch((error) => console.log("error", error));
    }
  };

  return (
    <>
      <div id="handler-first"></div>
      <div
        style={{
          position: "sticky",
          top: "0", // Adjust to where you want it to stick relative to the viewport
          zIndex: 1000, // Ensure it stays above other content
          backgroundColor: "#fff", // Optional: Set background to avoid transparency issues
        }}
      >
        {/* header */}
        <Header_new />
      </div>

  <section className="walk-for-water-banner fade-in">
        <div className="container">
          <div className="walk-for-water-form-cover">
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
            >
              <div className="row">
                <div className="col-md-12">
                  <div className="walk-for-water-banner-head">
                    We will help you to restore your Dried-up Bore wells.
                  </div>
                </div>

                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Eg: Aakash Sharma"
                      name="fullname"
                      value={formValues.name}
                      onChange={(e) => {
                        setFormValues({ ...formValues, name: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Mobile Number</label>
                    <input
                      type="number"
                      required
                      name="mobile"
                      placeholder="Eg: 98726XXXXX"
                      value={formValues.mobile}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          mobile: e.target.value,
                        });
                      }}
                    />
                    {showError ? (
                      <span
                        style={{
                          color: "Red",
                          position: "absolute",
                          bottom: "37px",
                          left: "0",
                          fontSize: "13px",
                        }}
                      >
                        {error}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Village / Town</label>
                    <input
                      type="text"
                      required
                      name="village"
                      placeholder="Eg: Ameerpet Bahlookhanguda Somajiguda"
                      value={formValues.village}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          village: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Dist</label>
                    <input
                      type="text"
                      value={formValues.district}
                      placeholder="Eg: Kamareddy"
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          district: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>State / Union Territory</label>
                    <input
                      type="text"
                      placeholder="Eg: Telangana"
                      required
                      name="state"
                      value={formValues.state}
                      onChange={(e) => {
                        setFormValues({ ...formValues, state: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Pin Code</label>
                    <input
                      type="number"
                      required
                      name="pincode"
                      max="999999"
                      min="000000"
                      placeholder="Eg: 123456"
                      value={formValues.pincode}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          pincode: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Latitude</label>
                    <input
                      type="text"
                      placeholder="Eg: 12.3456"
                      value={formValues.lat}
                      onChange={(e) => {
                        setFormValues({ ...formValues, lat: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Longitude</label>
                    <input
                      type="text"
                      placeholder="Eg: 12.3456"
                      value={formValues.long}
                      onChange={(e) => {
                        setFormValues({ ...formValues, long: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      Whether the Bore was dry / reduced water level :
                    </label>
                    <input
                      type="text"
                      value={formValues.boredry}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          boredry: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>How many years did the Bore work ?</label>
                    <input
                      type="text"
                      value={formValues.years}
                      onChange={(e) => {
                        setFormValues({ ...formValues, years: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="walk-for-water-banner-head">
                    If water reduced-
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      How many inches did the Bore used to pour in the
                      beginning:
                    </label>
                    <input
                      type="text"
                      value={formValues.previnches}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          previnches: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Now how many inches its pouring :</label>
                    <input
                      type="text"
                      value={formValues.aferinches}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          aferinches: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      How many acres is being cultivated under this Bore ? :
                    </label>
                    <input
                      type="text"
                      value={formValues.acres}
                      onChange={(e) => {
                        setFormValues({ ...formValues, acres: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      Near to the Bore are there any water bodies like pond /
                      tank / rivulets /wells.
                    </label>
                    <input
                      type="text"
                      value={formValues.waterbodies}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          waterbodies: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      When there is water in the water bodies is your Bore
                      pouring full ? :
                    </label>
                    <input
                      type="text"
                      value={formValues.afterwaterbodiesfull}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          afterwaterbodiesfull: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>
                      Is your Bore pouring only in the rainy season? :
                    </label>
                    <input
                      type="text"
                      value={formValues.boreinrainyseason}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          boreinrainyseason: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Site Photo</label>
                    <input
                      type="file"
                      accept="image/png , image/jpeg, image/webp"
                      multiple
                      onChange={
                        // setFormValues({...formValues, sitephoto: e.target.files[0]}),
                        onSelectGallery
                      }
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Average Rainfall Annually :</label>
                    <input
                      type="text"
                      value={formValues.averagerainfall}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          averagerainfall: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="walk-for-water-banner-fieldBox">
                    <label>Soil Report / Soil Type brief</label>
                    <textarea
                      rows="1"
                      value={formValues.soilreport}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          soilreport: e.target.value,
                        });
                      }}
                    ></textarea>
                  </div>
                </div>

                <div className="col-md-12" style={{ textAlign: "center" }}>
                      <LoadingButton type="submit" loading={!!loading}>
                        Submit
                      </LoadingButton>
                </div>
              </div>
            </form>
          </div>
          <p style={{ fontSize: "12px", color: "red", marginTop: "10px" }}>
            Please note that fields marked with an asterisk (*) are required for
            form submission.
          </p>
        </div>
      </section>

      <div className="desktop-div">
        {/* footer */}

        <Footer isVisible="false" />
      </div>
    </>
  );
}
