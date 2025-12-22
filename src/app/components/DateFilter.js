import React, { useState } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
  Button,
  Paper,
  Typography,
  Grid
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FilterList, DateRange, Today, CalendarToday } from '@mui/icons-material';
import dayjs from 'dayjs';

const DateFilter = ({ onFilterChange, loading = false, currentFilter = 'all' }) => {
  const [selectedFilter, setSelectedFilter] = useState(currentFilter);
  const [customStartDate, setCustomStartDate] = useState(null);
  const [customEndDate, setCustomEndDate] = useState(null);
  const [showCustomPicker, setShowCustomPicker] = useState(false);

  const filterOptions = [
    { value: 'all', label: 'All Time', icon: <CalendarToday fontSize="small" /> },
    { value: 'today', label: 'Today', icon: <Today fontSize="small" /> },
    { value: 'this_week', label: 'This Week', icon: <DateRange fontSize="small" /> },
    { value: 'previous_week', label: 'Previous Week', icon: <DateRange fontSize="small" /> },
    { value: 'this_month', label: 'This Month', icon: <DateRange fontSize="small" /> },
    { value: 'last_6_months', label: 'Last 6 Months', icon: <DateRange fontSize="small" /> },
    { value: 'this_year', label: 'This Year', icon: <DateRange fontSize="small" /> },
    { value: 'custom', label: 'Custom Range', icon: <FilterList fontSize="small" /> }
  ];

  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    setSelectedFilter(filterValue);
    
    if (filterValue === 'custom') {
      setShowCustomPicker(true);
      return;
    }
    
    setShowCustomPicker(false);
    setCustomStartDate(null);
    setCustomEndDate(null);
    
    // Notify parent component immediately for non-custom filters
    if (onFilterChange) {
      onFilterChange({
        filter: filterValue,
        startDate: null,
        endDate: null
      });
    }
  };

  const handleCustomDateApply = () => {
    if (!customStartDate || !customEndDate) {
      alert('Please select both start and end dates for custom range.');
      return;
    }

    if (customStartDate > customEndDate) {
      alert('Start date cannot be later than end date.');
      return;
    }

    // Notify parent component with custom date range
    if (onFilterChange) {
      onFilterChange({
        filter: 'custom',
        startDate: customStartDate.format('YYYY-MM-DD'),
        endDate: customEndDate.format('YYYY-MM-DD')
      });
    }
  };

  const handleCustomDateClear = () => {
    setCustomStartDate(null);
    setCustomEndDate(null);
    setSelectedFilter('all');
    setShowCustomPicker(false);
    
    if (onFilterChange) {
      onFilterChange({
        filter: 'all',
        startDate: null,
        endDate: null
      });
    }
  };

  const getFilterDescription = () => {
    const selectedOption = filterOptions.find(option => option.value === selectedFilter);
    
    if (selectedFilter === 'custom' && customStartDate && customEndDate) {
      return `${customStartDate.format('MMM DD, YYYY')} - ${customEndDate.format('MMM DD, YYYY')}`;
    }
    
    return selectedOption ? selectedOption.label : 'Select Filter';
  };

  return (
    <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <FilterList color="primary" />
        <Typography variant="h6" component="h2">
          Date Filter
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
          {getFilterDescription()}
        </Typography>
      </Box>
      
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth size="small">
            <InputLabel id="date-filter-label">Filter Period</InputLabel>
            <Select
              labelId="date-filter-label"
              value={selectedFilter}
              label="Filter Period"
              onChange={handleFilterChange}
              disabled={loading}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {option.icon}
                    {option.label}
                  </Box>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {showCustomPicker && (
          <>
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Start Date"
                  value={customStartDate}
                  onChange={setCustomStartDate}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      size="small" 
                      fullWidth
                      disabled={loading}
                    />
                  )}
                  maxDate={dayjs()}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="End Date"
                  value={customEndDate}
                  onChange={setCustomEndDate}
                  renderInput={(params) => (
                    <TextField 
                      {...params} 
                      size="small" 
                      fullWidth
                      disabled={loading}
                    />
                  )}
                  maxDate={dayjs()}
                  minDate={customStartDate}
                />
              </LocalizationProvider>
            </Grid>
            
            <Grid item xs={12} sm={2}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleCustomDateApply}
                  disabled={loading || !customStartDate || !customEndDate}
                  size="small"
                  fullWidth
                >
                  Apply
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCustomDateClear}
                  disabled={loading}
                  size="small"
                  fullWidth
                >
                  Clear
                </Button>
              </Box>
            </Grid>
          </>
        )}
      </Grid>

      {loading && (
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Loading filtered metrics...
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default DateFilter;