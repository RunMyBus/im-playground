"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Footer from "@/app/components/footer"; //footer component
import Image from "next/image";
import axios from "axios";
import Header_new from "@/app/components/header_new"; //header component
import { toast } from "react-toastify"; //react toast component
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import Menu from "@/app/components/Dashboardmenu"; //dashboard menu component
import EditIcon from "@mui/icons-material/Edit"; //edit icon
import { FormControl, Select as MuiSelect, MenuItem } from "@mui/material"; //mui select for consistent mobile sizing

import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function Dashboard() {
  const apiRoute = process.env.NEXT_PUBLIC_API_ROUTE?.replace(/\/$/, ""); //api base url
  const toastId = useRef(null);
  //const userImg = useSessionStorage()?.userImage;
  const sessionData = useSessionStorage();
  const userId = sessionData?.userId || sessionData?._id; //user id - use fallback to _id for OAuth users
  const [isLoaded, setIsLoaded] = useState(true);
  const [userdata, setUserData] = useState({});
  const [data, setData] = useState(null);
  const [userImg, setUserImg] = useState(); //user image
  const [dob, setDob] = useState(""); //date of birth
  const [doa, setDoa] = useState("");
  
  console.log('Dashboard - Session data:', sessionData);
  console.log('Dashboard - Using userId:', userId);
  const convertDate = useCallback((dateString) => {
    if (!dateString) {
      return "";
    }
    const [day, month, year] = dateString.split("/");
    if (!day || !month || !year) {
      return "";
    }
    const futureDate = new Date(Number(year), Number(month) - 1, Number(day));
    const formattedYear = futureDate.getFullYear().toString().padStart(4, "0");
    const formattedMonth = (futureDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const formattedDay = futureDate.getDate().toString().padStart(2, "0");
    return `${formattedYear}/${formattedMonth}/${formattedDay}`;
  }, []);

  const buildHeaders = useCallback((useJson = true) => {
    const headers = {};
    if (useJson) {
      headers["Content-Type"] = "application/json";
    }
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }
    return headers;
  }, []);

  const mergeProfileIntoStorage = useCallback((profile) => {
    if (typeof window === 'undefined' || !profile) {
      return;
    }
    try {
      const stored = localStorage.getItem('webloginData');
      const parsed = stored && stored !== 'undefined' ? JSON.parse(stored) : {};
      const merged = { ...parsed, ...profile };
      localStorage.setItem('webloginData', JSON.stringify(merged));
      if (profile.userImage) {
        const normalizedImage = profile.userImage.startsWith('/') || profile.userImage.startsWith('http')
          ? profile.userImage
          : `/${profile.userImage}`;
        localStorage.setItem('profileImage', normalizedImage);
      }
    } catch (storageError) {
      console.error('Dashboard - Failed to sync profile cache:', storageError);
    }
  }, []);

  const formatUserImage = (rawImage) => {
    if (!rawImage) {
      return '/defaultImages/profileImage/profilePic.png';
    }
    if (rawImage.startsWith('/') || rawImage.startsWith('http')) {
      return rawImage;
    }
    return `/${rawImage}`;
  };

  const getProfile = useCallback(async () => {
    if (!apiRoute || !userId) {
      return;
    }
    try {
      setIsLoaded(true);
      console.log('Dashboard - Fetching profile for userId:', userId);
      const response = await axios.post(
        `${apiRoute}/userprofile`,
        { userId, viewId: userId },
        {
          headers: buildHeaders(),
          maxBodyLength: Infinity,
        }
      );
      console.log('Dashboard - Profile response:', response?.data);
      const profile = response?.data?.Data;
      if (!profile) {
        throw new Error('Missing profile payload');
      }
      setUserData(profile);
      setUserImg(formatUserImage(profile.userImage));
      setData({
        userId,
        name: profile?.name,
        about: profile?.about,
        facebook: profile?.facebook,
        twitter: profile?.twitter,
        instagram: profile?.instagram,
        youtube: profile?.youtube,
        linkedin: profile?.linkedin,
        snapchat: profile?.snapchat,
        gender: profile?.gender,
        phone: profile?.phone || "",
        age: profile?.age || "",
        dob: profile?.dob,
        anniversary: profile?.anniversary,
        maritalStatus: profile?.maritalStatus,
      });
      console.log('Dashboard - Data set:', {
        name: profile?.name,
        phone: profile?.phone,
        age: profile?.age,
        gender: profile?.gender
      });
      setDob(convertDate(profile?.dob));
      setDoa(convertDate(profile?.anniversary));
      mergeProfileIntoStorage(profile);
    } catch (error) {
      console.error('Dashboard - Failed to load profile:', error);
      toast.error('Unable to load your profile. Please try again.');
    } finally {
      setIsLoaded(false);
    }
  }, [apiRoute, userId, buildHeaders, convertDate, mergeProfileIntoStorage]);

  useEffect(() => {
    if (!apiRoute || !userId) {
      return;
    }
    getProfile();
  }, [apiRoute, getProfile, userId]);

  //user profile image change function
  const changeImg = async (e) => {
    const file = e.target.files[0];
    if (!file || !apiRoute || !userId) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setUserImg(previewUrl);

    const formdata = new FormData();
    formdata.append("userId", userId);
    formdata.append("profile_image", file);

    try {
      const response = await axios.post(`${apiRoute}/updateprofileimage`, formdata, {
        headers: buildHeaders(false),
        maxBodyLength: Infinity,
      });
      if (response.data.Status === true) {
        if (response.data.newImage) {
          localStorage.setItem("profileImage", response.data.newImage);
        }
        toast.success("Profile image updated");
        await getProfile();
      } else {
        toast.error(response.data.Message || 'Failed to update profile image');
      }
    } catch (error) {
      console.log(error);
      toast.error('Unable to update profile image');
    }
  };
  //update user profile information
  const pendingPopup = () => {
    toastId.current = toast.loading("Updating");
  };

  const submitUpdate = async () => {
    if (!apiRoute) {
      toast.error('Profile service unavailable. Please try again later.');
      return;
    }
    if (!data) {
      toast.error('No profile changes to save.');
      return;
    }
    console.log('Dashboard - Submitting update with data:', data);
    pendingPopup();
    try {
      const response = await axios.post(`${apiRoute}/updateprofile`, data, {
        headers: buildHeaders(),
        maxBodyLength: Infinity,
      });
      const data1 = response.data;
      console.log('Dashboard - Update response:', data1);
      if (data1.Status === true) {
        toast.success(`${data1.Message}`);
        await getProfile();
      } else {
        toast.error(`${data1.Message}`);
      }
    } catch (error) {
      console.error('Dashboard - Update error:', error);
      toast.error('Failed to update profile');
    } finally {
      if (toastId.current) {
        toast.dismiss(toastId.current);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target; // Destructure name and value
    setData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific key-value pair
    }));
  };
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(userdata?.name);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setData((prevData) => ({
      ...prevData,
      name: newName,
    }));
  };

  const saveName = async () => {
    setIsEditing(false);
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${apiRoute}/updateprofile`,
        headers: { "Content-Type": "application/json" },
        data: data, // Updated `data` state with the new name
      };

      const response = await axios.request(config);

      if (response.data.Status) {
        toast.success("Name updated successfully!");
        setUserData((prevUserData) => ({
          ...prevUserData,
          name: data.name,
        }));
      } else {
        toast.error("Failed to update name.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while updating the name.");
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const toggleMobileMenu = () => {
    const menu = document.querySelector('.dashboard_left_menu');
    if (menu) {
      menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
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
        {/* header component */}
        <Header_new />
      </div>
      <h1 className='sec-headk' style={{ color: '#777',textAlign:'center' }}>Profile</h1>
      <h2 style={{ color: '#777',fontSize:'15px',textAlign:'center' }}>Manage your profile</h2>

      {/* Loading state: show skeleton that resembles actual dashboard structure */}
      {isLoaded && (
        <section className="dashboard_wrapper fade-in">
          <div className="container">
            <div className="row">
              <div className="col-md-12 for-mobile">
                <div className="dashboard_mobile_icon_wrapper">
                  <div className="dashboard_profile_head">
                    <div className="skeleton" style={{ width: 20, height: 20, borderRadius: 4, display: 'inline-block', marginRight: 8 }} />
                    <div className="skeleton" style={{ width: 60, height: 16, borderRadius: 4, display: 'inline-block' }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Side menu skeleton */}
              <div className="col-md-3">
                <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} style={{ marginBottom: 12 }}>
                      <div className="skeleton" style={{ height: 16, width: '80%', borderRadius: 6 }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-md-9">
                <div className="dashboard_right_box_cover">
                  {/* Profile section skeleton */}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="dashboard_right_box" style={{ background: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                          {/* Profile picture skeleton */}
                          <div className="skeleton" style={{ width: 100, height: 100, borderRadius: '50%' }} />
                          {/* Update button skeleton */}
                          <div className="skeleton" style={{ width: 100, height: 36, borderRadius: 18 }} />
                        </div>
                        <div className="skeleton" style={{ height: 12, width: '60%', borderRadius: 6, marginTop: 10 }} />
                      </div>
                    </div>
                  </div>

                  {/* User info and form skeleton */}
                  <div className="row">
                    <div className="col-md-6">
                      {/* Name and stats skeleton */}
                      <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        <div className="skeleton" style={{ height: 24, width: '50%', borderRadius: 8, marginBottom: 8 }} />
                        <div className="skeleton" style={{ height: 14, width: '35%', borderRadius: 6, marginBottom: 16 }} />
                        
                        {/* Stats row */}
                        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                              <div className="skeleton" style={{ height: 20, width: '60%', borderRadius: 6, margin: '0 auto 6px' }} />
                              <div className="skeleton" style={{ height: 12, width: '80%', borderRadius: 6, margin: '0 auto' }} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* About section skeleton */}
                      <div style={{ background: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        <div className="skeleton" style={{ height: 16, width: '30%', borderRadius: 6, marginBottom: 12 }} />
                        <div className="skeleton" style={{ height: 120, borderRadius: 8 }} />
                      </div>
                    </div>

                    <div className="col-md-6">
                      {/* Form fields skeleton */}
                      <div style={{ background: '#fff', borderRadius: 12, padding: 16, boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <div key={i} style={{ marginBottom: 20 }}>
                            <div className="skeleton" style={{ height: 14, width: '40%', borderRadius: 6, marginBottom: 8 }} />
                            <div className="skeleton" style={{ height: 39, borderRadius: 10 }} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {!isLoaded && (
        <section className="dashboard_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-12 for-mobile">
                <div className="dashboard_mobile_icon_wrapper" onClick={toggleMobileMenu} style={{ cursor: 'pointer' }}>
                  <div className="dashboard_profile_head">
                    <Image src="/images/profile-icon.png" alt="profile" fill />{" "}
                    Profile
                  </div>
                  <span className="	fa fa-caret-down"></span>
                </div>
              </div>
            </div>

            <div className="row">
              {/* side menu */}
              <Menu />

              <div className="col-md-9">
                <div className="dashboard_right_box_cover">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="dashboard_right_box">
                        <div
                          className="dashboard_user_pic"
                          style={{
                            width: "100px",
                            display: "inline-block",
                            borderRadius: "50%",
                          }}
                          onClick={() => {
                            // Scroll to the bottom of the screen
                            window.scrollTo({
                              top: document.body.scrollHeight,
                              behavior: "smooth", // Smooth scrolling effect
                            });
                          }}
                        >
                          <div
                            style={{
                              position: "relative",
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          >
                            {/* Image Preview */}
                            <Image
                              src={userImg || '/defaultImages/profileImage/profilePic.png'}
                              alt="profile"
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                        </div>

                        <button
                          className="btn-default"
                          onClick={submitUpdate}
                          style={{
                            display: "inline-block",
                            marginTop: "25px",
                            float: "right",
                          }}
                        >
                          Update
                        </button>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "gray",
                            marginTop: "10px",
                            // cursor: "pointer",
                          }}
                        >
                          You can change your profile picture only through the
                          mobile app.{" "}
                          <span
                            onClick={() => {
                              // Scroll to the bottom of the screen
                              window.scrollTo({
                                top: document.body.scrollHeight,
                                behavior: "smooth", // Smooth scrolling effect
                              });
                            }}
                            style={{
                              fontWeight: "bold", // Make the text bold
                              cursor: "pointer", // Indicate interactivity
                              color: "blue", // Highlight color (adjust as needed)
                              textDecoration: "underline", // Add an underline
                              fontSize: "1.1rem", // Slightly larger font size
                              transition: "color 0.3s ease", // Smooth hover effect
                            }}
                            onMouseEnter={(e) =>
                              (e.target.style.color = "#0056b3")
                            } // Hover effect: change color
                            onMouseLeave={(e) =>
                              (e.target.style.color = "#007bff")
                            } // Revert color on mouse leave
                          >
                             Click here
                          </span>{" "}
                          to download our app.{" "}
                        </p>

                        {/* Download button */}
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="dashboard_userinfo">
                        {isEditing ? (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: "10px",
                            }}
                          >
                            <input
                              type="text"
                              value={data.name || ""}
                              onChange={handleNameChange}
                              autoFocus
                              style={{
                                padding: "8px 12px",
                                fontSize: "14px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                flex: "1 1 auto",
                                minWidth: "120px",
                                maxWidth: "100%",
                              }}
                            />
                            <button
                              onClick={saveName}
                              style={{
                                padding: "8px 12px",
                                fontSize: "14px",
                                backgroundColor: "#4CAF50",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={toggleEdit}
                              style={{
                                padding: "8px 12px",
                                fontSize: "14px",
                                backgroundColor: "#f44336",
                                color: "#fff",
                                border: "none",
                                borderRadius: "4px",
                                cursor: "pointer",
                                transition: "background-color 0.3s",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span>{data?.name || userdata?.name}</span>
                            <EditIcon
                              className="userpic_edit"
                              onClick={toggleEdit}
                            />
                          </div>
                        )}
                        <p>Joined on {userdata?.joinedDate}</p>
                      </div>

                      <div className="dashboard_user_box_data1">
                        <div className="dashboard_user_box_data">
                          <span>{userdata?.activities} </span>
                          <br className="for-mobile" />
                          Activities
                        </div>
                        <div className="dashboard_user_box_data">
                          <span>{userdata?.followers} </span>
                          <br className="for-mobile" />
                          Followers
                        </div>
                        <div className="dashboard_user_box_data">
                          <span>{userdata?.following} </span>
                          <br className="for-mobile" />
                          Following
                        </div>
                      </div>
                      <div className="dashboard_user_box">
                        <label>About</label>
                        <textarea
                          rows="6"
                          value={data?.about}
                          name="about"
                          onChange={handleChange}
                        ></textarea>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="dashboard_user_box1">
                        {/* <div className="dashboard_user_box">
                        <label>Gender</label>
                        <select
                          value={data?.gender}
                          onChange={handleChange}
                          // defaultValue={data.gender}
                          name="gender"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div> */}
                        <div className="dashboard_user_box">
                          <label>Gender</label>
                          <FormControl fullWidth size="small">
                            <MuiSelect
                              id="gender"
                              name="gender"
                              value={data?.gender || ""}
                              onChange={handleChange}
                              displayEmpty
                              renderValue={(selected) =>
                                selected || "Select Gender"
                              }
                              inputProps={{ "aria-label": "Gender" }}
                              sx={{
                                "& .MuiSelect-select": { fontSize: "15px" },
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    maxHeight: 48 * 4.5 + 8,
                                    "& .MuiMenuItem-root": { fontSize: "15px" },
                                  },
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Select Gender</em>
                              </MenuItem>
                              <MenuItem value="Male">Male</MenuItem>
                              <MenuItem value="Female">Female</MenuItem>
                              <MenuItem value="Other">Other</MenuItem>
                              <MenuItem value="Prefer not to say">
                                Prefer not to say
                              </MenuItem>
                            </MuiSelect>
                          </FormControl>
                        </div>

                        <div className="dashboard_user_box">
                          <label>Phone Number</label>
                          <input
                            type="tel"
                            value={data?.phone || ""}
                            onChange={handleChange}
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            maxLength={10}
                          />
                        </div>

                        <div className="dashboard_user_box">
                          <label>Age</label>
                          <input
                            type="number"
                            value={data?.age || ""}
                            onChange={handleChange}
                            name="age"
                            placeholder="Enter your age"
                            min="1"
                            max="120"
                          />
                        </div>

                        <div className="dashboard_user_box">
                          <label>Marital Status</label>
                          <FormControl fullWidth size="small">
                            <MuiSelect
                              id="maritalStatus"
                              name="maritalStatus"
                              value={data?.maritalStatus || ""}
                              onChange={(e) => {
                                const status = e.target.value;
                                setData((prevData) => ({
                                  ...prevData,
                                  maritalStatus: status,
                                  anniversary: status === "Married" ? prevData.anniversary : "",
                                }));
                                if (status !== "Married") {
                                  setDoa("");
                                }
                              }}
                              displayEmpty
                              renderValue={(selected) =>
                                selected || "Select Status"
                              }
                              inputProps={{ "aria-label": "Marital Status" }}
                              sx={{
                                "& .MuiSelect-select": { fontSize: "15px" },
                              }}
                              MenuProps={{
                                PaperProps: {
                                  sx: {
                                    maxHeight: 48 * 4.5 + 8,
                                    "& .MuiMenuItem-root": { fontSize: "15px" },
                                  },
                                },
                              }}
                            >
                              <MenuItem value="">
                                <em>Select Status</em>
                              </MenuItem>
                              <MenuItem value="Married">Married</MenuItem>
                              <MenuItem value="Single">Single</MenuItem>
                            </MuiSelect>
                          </FormControl>
                        </div>

                        <div className="dashboard_user_box">
                          <label>Date of Birth</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={dob ? dayjs(dob) : null} // Show previous value if exists, otherwise allow to select
                              onChange={(newValue) => {
                                if (newValue) {
                                  const formattedDate =
                                    newValue.format("DD/MM/YYYY");
                                  const [d, m, y] = formattedDate.split('/');
                                  setDob(`${y}/${m}/${d}`);
                                  setData((prevData) => ({
                                    ...prevData,
                                    dob: formattedDate, // Update the specific key-value pair
                                  }));
                                }
                              }}
                              futureDate={false}
                              format="DD/MM/YYYY"
                              sx={{
                                "& .MuiInputBase-input": {
                                  padding: "0 15px",
                                  height: "39px",
                                  width: "100%",
                                  fontSize: "17px",
                                  border: "none",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#000 !important",
                                  borderRadius: "10px",
                                },
                              }}
                              disableFuture // Disable future dates
                            />
                          </LocalizationProvider>
                        </div>

                        {data?.maritalStatus === "Married" && (
                        <div className="dashboard_user_box">
                          <label>Date of Marriage Anniversary</label>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={doa ? dayjs(doa) : null} // Show previous value if exists, otherwise allow to select
                              onChange={(newValue) => {
                                if (newValue) {
                                  const formattedDate =
                                    newValue.format("DD/MM/YYYY");
                                  const [d, m, y] = formattedDate.split('/');
                                  setDoa(`${y}/${m}/${d}`);
                                  setData((prevData) => ({
                                    ...prevData,
                                    anniversary: formattedDate, // Update the specific key-value pair
                                  }));
                                }
                              }}
                              futureDate={false}
                              format="DD/MM/YYYY"
                              sx={{
                                "& .MuiInputBase-input": {
                                  padding: "0 15px",
                                  height: "39px",
                                  width: "100%",
                                  fontSize: "17px",
                                  border: "none",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                  borderColor: "#000 !important",
                                  borderRadius: "10px",
                                },
                              }}
                              disableFuture // Disable future dates
                            />
                          </LocalizationProvider>
                        </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}
