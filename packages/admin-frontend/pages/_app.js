import { Inter, Lato, Montserrat, Public_Sans, Barlow } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
import AdminLayout from '@components/common/AdminLayout';
import { MyProvider } from '@data/MyContext';
import SnackbarManager from '@shared-src/SnackbarManager';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "react-quill/dist/quill.snow.css"; // Import styles
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useRouter } from 'next/router';

dayjs.extend(customParseFormat);

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });
const public_sans = Public_Sans({ subsets: ['latin'], });
const barlow = Barlow({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

function MyApp({ Component, pageProps, router }) {
  const noLayoutRoutes = ['/login', '/change-password', '/new-password'];
  const isNoLayout = noLayoutRoutes.some((route) => router.pathname.includes(route));
  const { loadAccount } = useGlobalAccountContext();
  const pub = useSnackbarStore(state => state.pub);
  useEffect(() => {
    if (loadAccount) {
      const result = loadAccount(pub);
      if (result === false) {
        router.push('/login');
      }
      // loadStatistics(pub);
    }

  }, [loadAccount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className={`${barlow.className} ${inter.className} ${lato.className} ${monsterrat.className} ${public_sans.className} `}>
        <SnackbarManager />
        {
          isNoLayout ?
            <Component {...pageProps} /> :
            (
              <AdminLayout>
                <LocalizationProvider dateAdapter={AdapterDayjs}
                  adapterLocale="en"
                  dateFormats={{
                    keyboardDate: 'DD/MM/YYYY', // For keyboard input and display
                    normalDate: 'DD/MM/YYYY', // Default format for display
                    dayOfMonth: 'DD', // Used for the day of the month in picker
                    month: 'MMM', // Used for month in picker
                    year: 'YYYY', // Used for year in picker
                    monthAndYear: 'MMM YYYY', // Used for month and year in picker
                    monthAndDate: 'MMM DD', // Used for month and date in picker
                    monthAndYearAndDate: 'MMM DD, YYYY', // Used for month and year and date in picker
                    minutes: 'mm', // Used for minutes in time picker
                  }}
                >
                  <Component {...pageProps} />
                </LocalizationProvider>
              </AdminLayout>
            )
        }
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
