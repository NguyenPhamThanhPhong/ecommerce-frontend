import { Inter, Lato, Montserrat,Public_Sans } from 'next/font/google';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme, GlobalStyles } from '../styles/GlobalStyles';
// import CommonLayout from '@components/common/CommonLayout';

const inter = Inter({ subsets: ['latin'] });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });
const monsterrat = Montserrat({ subsets: ['latin'], weight: '400' });
const public_sans = Public_Sans({ subsets: ['latin'],  });

function MyApp({ Component, pageProps, router }) {
  const noLayoutRoutes = ['/login', '/register', '/auth'];
  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <div className={`${inter.className} ${lato.className} ${monsterrat.className} ${public_sans.className}`}>
      <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}

export default MyApp;
