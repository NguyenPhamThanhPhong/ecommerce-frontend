// pages/_app.js
import NonLoginLayout from '@components/AuthenticatedLayout';


function MyApp(params) {
  const noLayoutRoutes = ['/login', '/register', '/auth']; // Add your login-related routes here

  const { Component, pageProps, router } = params;
  

  const isNoLayout = noLayoutRoutes.includes(router.pathname);

  // If the page is a login-related page, don't wrap it in the layout
  if (isNoLayout) {
    return <Component {...pageProps} />;
  }

  // For non-login pages, wrap with the layout
  return (
    <NonLoginLayout>
      <Component {...pageProps} />
    </NonLoginLayout>
  );
}

export default MyApp;
