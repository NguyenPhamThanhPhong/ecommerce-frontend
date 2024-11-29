import { Inter, Lato, Montserrat } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
import CommonLayout from '@components/CommonLayout';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });


function MyApp({ Component, pageProps, router }) {
  const noLayoutRoutes = ['/login', '/register', '/auth'];
  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className={`${inter.className} ${lato.className} ${monsterrat.className}`}>
        {isNoLayout ? (
          <Component {...pageProps} />
        ) : (
          <CommonLayout>
            <Component {...pageProps} />
          </CommonLayout>
        )}
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
