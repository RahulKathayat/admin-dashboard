import Head from 'next/head';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import {
  Box,
  Button,
  Container,
  Pagination,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CompanyCard } from 'src/sections/companies/company-card';
import { CompaniesSearch } from 'src/sections/companies/companies-search';
import { useRouter } from 'next/router';
import { useEffect,useState } from 'react';
import axios from 'axios';
const companies = [
  {
    id: '2569ce0d517a7f06d3ea1f24',
    createdAt: '27/03/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    logo: '/assets/logos/logo-dropbox.png',
    title: 'Dropbox',
    downloads: '594',
    price:'$9.99/month',
    plan:'Basic Plan',
  },
  {
    id: 'ed2b900870ceba72d203ec15',
    createdAt: '31/03/2019',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    logo: '/assets/logos/logo-medium.png',
    title: 'Medium Corporation',
    downloads: '625',
    price:'$19.99/month',
    plan:'Standard Plan',
  },
];

const Page = () => {
    const router = useRouter();
    const [subscription,setSubscription] = useState([]);
    useEffect( ()=> {
      const handleFetch = async ()=>{
        try{
          const data = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/admin/fetchSubscription`);
          // console.log(data.data.data);
          setSubscription(data.data.data);
          console.log("here is subscription listss:",data.data.data);
        }
        catch(e){
          console.log(e,"error fetching subscriptions");
        }
      };
      handleFetch();
    },[]);
    return (
      <>
        <Head>
          <title>
            Companies | Devias Kit
          </title>
        </Head>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8
          }}
        >
          <Container maxWidth="xl">
            <Stack spacing={3}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <Stack spacing={1}>
                  <Typography variant="h4">
                    Subscription
                  </Typography>
                </Stack>
                <div>
                  <Button
                    startIcon={(
                      <SvgIcon fontSize="small">
                        <PlusIcon />
                      </SvgIcon>
                    )}
                    variant="contained"
                    onClick={()=>router.push('/addsubscription')}
                  >
                    Add Subscription
                  </Button>
                </div>
              </Stack>
              <Typography variant='h4' align='center'>Plan</Typography>
              <Grid
                container
                spacing={3}
              >
                {subscription.map((company) => (
                  <Grid
                    xs={12}
                    md={6}
                    lg={4}
                    key={company.id}
                  >
                    <CompanyCard company={company} subscription={subscription} setSubscription = {setSubscription} />
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Container>
        </Box>
      </>
    );
}; 

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
