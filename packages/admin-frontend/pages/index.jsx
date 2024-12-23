// pages/index.jsx

// import React from 'react';
import AdminLayout from '@components/common/AdminLayout';
import { BarChart } from '@mui/icons-material';
import RecipeReviewCard from '@shared/RecipeReviewCard';
import StolenTable from '../components/table/StolenTable';
const RootPage = () => {
  return (
    // <div className="App">
    //   <RecipeReviewCard>Click me!</RecipeReviewCard>
    // </div>
    // <DashboardLayoutBasic/>
    <>
    <StolenTable/>
    </>
  );
};

export default RootPage;
