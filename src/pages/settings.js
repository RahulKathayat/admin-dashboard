import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useAuth } from 'src/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
const Page = () => {
  const router = useRouter();
  const auth = useAuth();
  useEffect(()=>{
    auth.signOut();
    toast.success('Logged out');
    router.push('/auth/login');
  },[]);
  return null;
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
