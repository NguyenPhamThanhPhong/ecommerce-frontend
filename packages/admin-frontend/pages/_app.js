import { Inter, Lato, Montserrat, Public_Sans, Barlow } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
import AdminLayout from '@components/common/AdminLayout';
import { MyProvider } from '@data/MyContext';
import SnackbarManager from '@shared-src/SnackbarManager';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';
import { useEffect } from 'react';
// import CommonLayout from '@components/common/CommonLayout';
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });
const public_sans = Public_Sans({ subsets: ['latin'], });
const barlow = Barlow({ subsets: ['latin'], weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'] });

function MyApp({ Component, pageProps, router }) {
  const noLayoutRoutes = ['/login', '/register', '/auth'];
  const isNoLayout = noLayoutRoutes.includes(router.pathname);
  const { loadAccount } = useGlobalAccountContext();
  const pub = useSnackbarStore(state => state.pub);
  useEffect(() => {
    if (loadAccount) {
      loadAccount(pub);
      // loadStatistics(pub);
    }

  }, [loadAccount]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className={`${barlow.className} ${inter.className} ${lato.className} ${monsterrat.className} ${public_sans.className} `}>
        <AdminLayout>
          <SnackbarManager />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Component {...pageProps} />
          </LocalizationProvider>
        </AdminLayout>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
