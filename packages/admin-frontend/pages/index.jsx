// pages/index.jsx

// import React from 'react';
import DashboardLayoutBasic from '@components/common/DashboardFrame';
import Sidebar, { SidebarItem } from '@components/common/Sidebar';
import MiniDrawer from '@components/common/SidebarCore';
import { BarChart } from '@mui/icons-material';
import RecipeReviewCard from '@shared/RecipeReviewCard';
const RootPage = () => {
  return (
    // <div className="App">
    //   <RecipeReviewCard>Click me!</RecipeReviewCard>
    // </div>
    // <DashboardLayoutBasic/>
    <MiniDrawer/>
  );
};

export default RootPage;
