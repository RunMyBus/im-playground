"use client";

import React from "react";
import { Skeleton, Box, Grid, Container } from "@mui/material";

/**
 * Material-UI Skeleton component for Blogs Page
 * Uses MUI Skeleton for loading states
 */
export default function BlogsPageSkeleton({ count = 6 }) {
  const items = Array.from({ length: count });

  return (
    <Container maxWidth="lg">
      <Box sx={{ pt: 3, pb: 6 }}>
        {/* Page Title Skeleton */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Skeleton 
            variant="text" 
            sx={{ 
              fontSize: "2.5rem", 
              width: "200px", 
              margin: "0 auto",
              mb: 2
            }} 
          />
          <Skeleton 
            variant="text" 
            sx={{ 
              fontSize: "1rem", 
              width: "80%", 
              maxWidth: "900px",
              margin: "0 auto",
              mb: 1
            }} 
          />
          <Skeleton 
            variant="text" 
            sx={{ 
              fontSize: "1rem", 
              width: "70%", 
              maxWidth: "800px",
              margin: "0 auto"
            }} 
          />
        </Box>

        {/* Blog Cards Grid */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          {items.map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  overflow: "hidden",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Image Skeleton */}
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={240}
                  animation="wave"
                />

                {/* Content Section */}
                <Box sx={{ p: 2, height: "240px" }}>
                  {/* Title Skeleton - 3 lines */}
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.25rem", mb: 0.5 }}
                    width="95%"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.25rem", mb: 0.5 }}
                    width="90%"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "1.25rem", mb: 2 }}
                    width="70%"
                  />

                  {/* Description Skeleton - 4 lines */}
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", mb: 0.5 }}
                    width="100%"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", mb: 0.5 }}
                    width="98%"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", mb: 0.5 }}
                    width="95%"
                  />
                  <Skeleton
                    variant="text"
                    sx={{ fontSize: "0.875rem", mb: 2 }}
                    width="60%"
                  />
                </Box>

                {/* Footer Section with Date and Read Time */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 2,
                    pb: 2,
                  }}
                >
                  <Skeleton variant="text" width="80px" height={20} />
                  <Skeleton variant="text" width="100px" height={20} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
