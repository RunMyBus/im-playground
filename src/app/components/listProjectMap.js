"use client";
import { useRef , useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"; //google map function imported
import S3Image from "./S3Image";

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "100vh" };

export default function Projectmap(props) {
  const stores = props.treeLoc;
  const center = {
    lat: +stores[0]?.latitude, // default latitude
    lng: +stores[0]?.longitude, // default longitude
  };

  //google api key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA_dXMMRGiyEUD-xKXLlZ8B6cVqG3v1FHE",
    libraries,
  });

  const [selected, setSelected] = useState(null); // variable for location selection
  const mapRef = useRef();

  //location selection function
  const onSelect = useCallback((store) => {
    setSelected(store);
    smoothZoomPan(mapRef.current, 10, {
      lat: +store.latitude,
      lng: +store.longitude,
    });
  }, []);

  //map close pop up function execution
  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);

  //map click function execution
  const handleMapClick = useCallback(() => {
    if (selected) {
      setSelected(null);
      // console.log("Map clicked, closing InfoWindow"); // Log for debugging
    }
  }, [selected]);
  //onload function called
  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      map.addListener("click", handleMapClick);
    },
    [handleMapClick]
  );

  //map pinch zoom effect
  const smoothZoomPan = (map, targetZoom, targetCenter) => {
    const zoomIncrements = 0.9;
    const panSpeed = 0.09;

    const animateZoomPan = () => {
      const currentZoom = map.getZoom();
      const currentCenter = map.getCenter();

      if (currentZoom < targetZoom) {
        map.setZoom(currentZoom + zoomIncrements);
      }

      const lat =
        currentCenter.lat() +
        (targetCenter.lat - currentCenter.lat()) * panSpeed;
      const lng =
        currentCenter.lng() +
        (targetCenter.lng - currentCenter.lng()) * panSpeed;

      map.panTo({ lat, lng });

      if (
        currentZoom < targetZoom ||
        Math.abs(currentCenter.lat() - targetCenter.lat) > 0.001 ||
        Math.abs(currentCenter.lng() - targetCenter.lng) > 0.001
      ) {
        requestAnimationFrame(animateZoomPan);
      }
    };

    requestAnimationFrame(animateZoomPan);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }
  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4.5}
        center={center}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {stores.map((store, index) => (
          <Marker
            key={index}
            position={{ lat: +store.latitude, lng: +store.longitude }}
            icon={{
              url: "/images/map-marker.png",
              scaledSize: new window.google.maps.Size(50, 50), // scale the image
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(25, 25),
            }}
            onClick={() => onSelect(store)}
          />
        ))}

        {selected && (
          <InfoWindow
            position={{ lat: +selected.latitude, lng: +selected.longitude }}
            onCloseClick={onCloseClick}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <S3Image
                src={selected.image}
                alt={selected.species}
                style={{
                  width: "100%",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
                fill
              />
              <h2 style={{ textAlign: "center" }}>{selected.name}</h2>
              <h4 style={{ textAlign: "center" }}>
                {selected.plantedTree} out of {selected.totalTree} Trees Planted
              </h4>
              <p style={{ textAlign: "center" }}>
                {selected.district} {selected.area} {selected.pincode}
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
