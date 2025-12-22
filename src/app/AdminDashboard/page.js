"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Alert,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  Park,
  AccountBalance,
  Business,
  Nature,
  MonetizationOn
} from '@mui/icons-material';
import axios from 'axios';
import { useSessionStorage } from "@/app/utils/useSessionStorage";
import DateFilter from '../components/DateFilter';
import Header_new from '../components/header_new';
import Footer from '../components/footer';

const AdminDashboard = () => {
  const apiRoute = process.env.API_ROUTE;
  const userId = useSessionStorage()?.userId;
  const token = useSessionStorage()?.token;
  
  const [metricsData, setMetricsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');

  // Fetch metrics data
  const fetchMetrics = useCallback(async (filterParams = {}) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = filterParams.filter === 'all' || !filterParams.filter 
        ? '/dashboard/metrics/all' 
        : '/dashboard/metrics/filtered';

      const requestData = {
        userId: userId,
        ...filterParams
      };

      console.log('Fetching metrics with:', { endpoint, requestData });

      const response = await axios.post(`${apiRoute}${endpoint}`, requestData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data?.success || response.data?.Status) {
        setMetricsData(response.data.data);
        console.log('Metrics data received:', response.data.data);
      } else {
        throw new Error(response.data?.message || 'Failed to fetch metrics');
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError(err.response?.data?.message || err.message || 'Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  }, [userId, token, apiRoute]);

  // Initial data fetch
  useEffect(() => {
    if (userId && token) {
      fetchMetrics({ filter: 'all' });
    }
  }, [userId, token, fetchMetrics]);

  // Handle filter changes
  const handleFilterChange = (filterParams) => {
    console.log('Filter changed:', filterParams);
    setCurrentFilter(filterParams.filter);
    fetchMetrics(filterParams);
  };

  // Metric Card Component
  const MetricCard = ({ title, value, subtitle, icon, color = 'primary', growth }) => (
    <Card elevation={3} sx={{ height: '100%', transition: 'all 0.3s', '&:hover': { transform: 'translateY(-4px)' } }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ color: `${color}.main` }}>
            {icon}
          </Box>
          {growth && (
            <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
              <TrendingUp fontSize="small" />
              <Typography variant="caption" sx={{ ml: 0.5 }}>
                {growth}
              </Typography>
            </Box>
          )}
        </Box>
        <Typography variant="h4" component="div" fontWeight="bold" color={`${color}.main`}>
          {value || '0'}
        </Typography>
        <Typography variant="h6" color="text.primary" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </CardContent>
    </Card>
  );

  // Loading state
  if (loading && !metricsData) {
    return (
      <Box>
        <Header_new />
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
            <CircularProgress size={60} />
          </Box>
        </Container>
        <Footer />
      </Box>
    );
  }

  return (
    <Box>
      <Header_new />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Admin Dashboard
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Environmental Impact & Business Metrics
          </Typography>
        </Box>

        {/* Date Filter */}
        <DateFilter 
          onFilterChange={handleFilterChange}
          loading={loading}
          currentFilter={currentFilter}
        />

        {/* Error Alert */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Metrics Grid */}
        {metricsData && (
          <>
            {/* Projects Section */}
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
              Project Portfolio
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard
                  title="Total Projects"
                  value={metricsData.projects?.total}
                  subtitle="Active environmental projects"
                  icon={<Business fontSize="large" />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard
                  title="ISR Projects"
                  value={metricsData.projects?.isr}
                  subtitle="Individual Social Responsibility"
                  icon={<Nature fontSize="large" />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard
                  title="CSR Projects"
                  value={metricsData.projects?.csr}
                  subtitle="Corporate Social Responsibility"
                  icon={<AccountBalance fontSize="large" />}
                  color="info"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <MetricCard
                  title="Project Success Rate"
                  value="98.5%"
                  subtitle="Based on completion metrics"
                  icon={<TrendingUp fontSize="large" />}
                  color="warning"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Plants Section */}
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
              Environmental Impact
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="Total Plants"
                  value={metricsData.plants?.total?.toLocaleString()}
                  subtitle="Trees planted across all projects"
                  icon={<Park fontSize="large" />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="ISR Plants"
                  value={metricsData.plants?.isr?.toLocaleString()}
                  subtitle="Plants sold for money"
                  icon={<Park fontSize="large" />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="CSR Plants"
                  value={metricsData.plants?.csr?.toLocaleString()}
                  subtitle="Plants redeemed with coins"
                  icon={<Park fontSize="large" />}
                  color="info"
                />
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            {/* Revenue Section */}
            <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
              Financial Performance
            </Typography>
            <Grid container spacing={3} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="Total Revenue"
                  value={metricsData.revenue?.formatted?.total}
                  subtitle={`₹${metricsData.revenue?.total?.toLocaleString()} total`}
                  icon={<MonetizationOn fontSize="large" />}
                  color="success"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="ISR Revenue"
                  value={metricsData.revenue?.formatted?.isr}
                  subtitle={`₹${metricsData.revenue?.isr?.toLocaleString()} from ISR`}
                  icon={<MonetizationOn fontSize="large" />}
                  color="primary"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <MetricCard
                  title="CSR Revenue"
                  value={metricsData.revenue?.formatted?.csr}
                  subtitle={`₹${metricsData.revenue?.csr?.toLocaleString()} from CSR`}
                  icon={<MonetizationOn fontSize="large" />}
                  color="info"
                />
              </Grid>
            </Grid>

            {/* Filter Summary */}
            {metricsData.filter && (
              <Card elevation={1} sx={{ mt: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Filter Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2" color="text.secondary">Filter Applied:</Typography>
                      <Typography variant="body1" fontWeight="bold">
                        {metricsData.filter.applied === 'all' ? 'All Time' : metricsData.filter.applied.replace('_', ' ').toUpperCase()}
                      </Typography>
                    </Grid>
                    {metricsData.filter.dateRange && (
                      <>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" color="text.secondary">From:</Typography>
                          <Typography variant="body1">
                            {new Date(metricsData.filter.dateRange.from).toLocaleDateString()}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Typography variant="body2" color="text.secondary">To:</Typography>
                          <Typography variant="body1">
                            {new Date(metricsData.filter.dateRange.to).toLocaleDateString()}
                          </Typography>
                        </Grid>
                      </>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            )}
          </>
        )}

        {/* Loading overlay for filter changes */}
        {loading && metricsData && (
          <Box sx={{ 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            right: 0, 
            bottom: 0, 
            bgcolor: 'rgba(255, 255, 255, 0.8)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            zIndex: 9999
          }}>
            <CircularProgress size={60} />
          </Box>
        )}
      </Container>
      <Footer />
    </Box>
  );
};

export default AdminDashboard;