import AdminTable from '@components/table/AdminTable';
import {
  ToggleButtonGroup, ToggleButton,

  Box, Stack, Typography, Avatar, Divider,
  useTheme
} from '@mui/material'
import { v4 } from 'uuid';

// Function to create data
function createData(id, name, calories, fat, carbs, protein) {
  return {
    id: id,
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

// Server-side function to fetch or generate static data
export async function getServerSideProps() {
  // Simulate fetching static data for the table
  const staticData = [
    createData(v4(), 'Product 1', 100, 10, 20, 'In Progress'),
    createData(v4(), 'Product 2', 200, 20, 30, 'Completed'),
    createData(v4(), 'Product 3', 300, 30, 40, 'Pending'),
  ];

  return {
    props: { staticData },
  };
}
const columns = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'OrderId',
    width: 150,
    resizable: true,
  },
  {
    id: 'calories',
    numeric: false,
    disablePadding: false,
    label: 'Product',
    width: 150,
    resizable: true,

  },
  {
    id: 'fat',
    numeric: false,
    disablePadding: false,
    label: 'Total',
    width: 150,
    resizable: true,

  },
  {
    id: 'carbs',
    numeric: false,
    disablePadding: false,
    label: 'Status',
    width: 150,
    resizable: true,

  },
  {
    id: 'protein',
    numeric: false,
    disablePadding: false,
    label: 'Date',
    width: 150,
    resizable: true,

  },
  {
    id: 'none',
    numeric: false,
    disablePadding: false,
    label: '',
    width: 10,
  },
];

export default function index({ staticData }) {
  const theme = useTheme();
  const variants = [
    {
      id: 'All',
      display: 'All Status',
    },
    {
      id: 'Processing',
      display: 'Processing',
    },
    {
      id: 'Shipped',
      display: 'Shipped',
    },
    {
      id: 'Delivered',
      display: 'Delivered',
    },
    {
      id: 'Cancelled',
      display: 'Cancelled',
    },

  ]
  const [variant, setVariant] = React.useState("All");
  const textColor = '#00B074'
  return (
    <Box>
      <ToggleButtonGroup
        value={variant}
        exclusive
        onChange={(e, newVariant) => setVariant(newVariant)}
        sx={{
          bgcolor: 'white',
          fontFamily:theme.fontFamily.publicSans,
          mb: 2,
          // gap: 4,
        }}>
        {
          variants.map((item, index) => (
            <ToggleButton key={item.id} value={item.id} sx={{
              py: '5px',
              backgroundColor: theme.palette.background.paper,
              // color: theme.palette.success.secondary,
              color: 'secondary',
              fontWeight: theme.fontWeight.medium,
              border: 'none',
              '&.Mui-selected': {
                backgroundColor: '#F5F5F7',
                color: theme.palette.success.secondary,
                fontWeight:'bold',
                borderRadius: '10px',
              },
              '&:hover': {
                backgroundColor: '#F5F5F7',
                borderRadius: '10px',
                color: theme.palette.success.secondary,
                fontWeight:'bold',
              },
            }}>{item.display}</ToggleButton>
          ))
        }
        {/* <ToggleButton value="512GB">512GB ROM & 8GB RAM</ToggleButton> */}
      </ToggleButtonGroup>
      <AdminTable data={staticData} columns={columns}/>

    </Box>
  )
}
