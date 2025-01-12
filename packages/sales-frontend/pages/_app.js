import { Inter, Lato, Montserrat, Public_Sans } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
import CommonLayout from '@components/common/CommonLayout';
import SnackbarManager from '@shared/SnackbarManager';
import { useEffect } from 'react';
import { useGlobalAccountContext } from '@shared-conntext/AccountContext';
import { useSnackbarStore } from '@shared-conntext/SnackbarContext';

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
          <SnackbarManager />
          <Component {...pageProps} />
        </CommonLayout>
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
