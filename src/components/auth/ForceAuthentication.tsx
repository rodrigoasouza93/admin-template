import Head from 'next/head';
import Image from 'next/image';
import router from 'next/router';

import loadingImage from '../../../public/images/loading.gif';
import useAuth from '../../data/hook/useAuth';

interface ForceAuthenticationProps {
  children: any;
}

export function ForceAuthentication({ children }: ForceAuthenticationProps) {
  const { user, loading } = useAuth();

  function renderContent() {
    return (
      <>
        <Head>
          <script 
            dangerouslySetInnerHTML={{
              __html: `
                if (!document.cookie?.includes("admin-template-auth")) {
                  window.location.href = "/authentication"
                }
              `,
            }}
          />
        </Head>
        {children}
      </>
    )
  }

  function renderLoading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <Image src={loadingImage} alt="Loading..." />
      </div>
    )
  }

  if (!loading && user?.email) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push('/authentication');
    return null;
  }
}