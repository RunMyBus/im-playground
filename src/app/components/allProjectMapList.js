"use client";
import { useRef, useState, useCallback } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";

const libraries = ["places"];
const mapContainerStyle = { width: "100%", height: "100vh" };

export default function AllProjectmap(props) {
  const stores = props.treeLoc;
  const center = {
    lat: +stores[0]?.latitude,
    lng: +stores[0]?.longitude,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyA_dXMMRGiyEUD-xKXLlZ8B6cVqG3v1FHE",
    libraries,
  });

  const [selected, setSelected] = useState(null);
  const mapRef = useRef();

  const onSelect = useCallback((store) => {
    setSelected(store);
    smoothZoomPan(mapRef.current, 10, {
      lat: +store.latitude,
      lng: +store.longitude,
    });
  }, []);

  const onCloseClick = useCallback(() => {
    setSelected(null);
  }, []);

  const handleMapClick = useCallback(() => {
    if (selected) {
      setSelected(null);
      // console.log("Map clicked, closing InfoWindow");
    }
  }, [selected]);

  const onLoad = useCallback(
    (map) => {
      mapRef.current = map;
      map.addListener("click", handleMapClick);
    },
    [handleMapClick]
  );

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
    <div className="pro-map-view">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={4.5}
        center={center}
        onLoad={onLoad}
        onClick={handleMapClick}
      >
        {stores.map((store, index) => {
          const iconUrl =
            store.type === "CSR"
              ? "/images/map-marker.png" // Path to CSR marker icon
              : "/images/map-marker.png"; // Path to Project marker icon

          return (
            <Marker
              key={index}
              position={{ lat: +store.latitude, lng: +store.longitude }}
              icon={{
                url: iconUrl,
                scaledSize: new window.google.maps.Size(50, 50),
                origin: new window.google.maps.Point(0, 0),
                anchor: new window.google.maps.Point(25, 25),
              }}
              onClick={() => onSelect(store)}
            />
          );
        })}

        {selected && (
          <InfoWindow
            position={{ lat: +selected.latitude, lng: +selected.longitude }}
            onCloseClick={onCloseClick}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <h3
                style={{
                  textAlign: "center",
                  color: "#777",
                  fontWeight: "bold",
                }}
              >
                {selected?.type}
              </h3>
              <Image
                src={selected?.image}
                alt={selected?.image}
                style={{
                  width: "100%",
                  maxHeight: "100px",
                  objectFit: "cover",
                }}
                fill
              />
              <h2 style={{ textAlign: "center" }}>{selected?.name}</h2>
              <h4 style={{ textAlign: "center" }}>
                {selected?.totalTreePlant} out of {selected?.totalTree} Trees
                Planted
              </h4>
              <p style={{ textAlign: "center" }}>{selected?.address}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
}
