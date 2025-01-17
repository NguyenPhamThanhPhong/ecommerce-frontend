import { Inter, Lato, Montserrat, Public_Sans } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
import CommonLayout from '@components/common/CommonLayout';
import SnackbarManager from '@shared/SnackbarManager';
import { useEffect } from 'react';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import "react-quill/dist/quill.snow.css"; // Import styles
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { LocalizationProvider } from '@mui/x-date-pickers';



const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });
const public_sans = Public_Sans({ subsets: ['latin'], });

function MyApp({ Component, pageProps, router }) {
  console.warn = () => { };
  const noLayoutRoutes = ['/login', '/register', '/sign-up'];
  const isNoLayout = noLayoutRoutes.includes(router.pathname);
  const { loadAccount, loadStatistics } = useGlobalAccountContext();
  const pub = useSnackbarStore(state => state.pub);


  useEffect(() => {
    if (loadAccount) {
      loadAccount(pub);
      // loadStatistics(pub);
    }

  }, [loadAccount, loadStatistics]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className={`${inter.className} ${lato.className} ${monsterrat.className} ${public_sans.className}`}>
        <CommonLayout isLogin={isNoLayout}>
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
            <SnackbarManager />
            <Component {...pageProps} />
          </LocalizationProvider>
        </CommonLayout>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
