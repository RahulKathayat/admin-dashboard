import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const states = [
  {
    value:' ',
    label: '' 
  },
  {
    value: 'shopify',
    label: 'Shopify'
  },
  {
    value: 'non-shopify',
    label: 'Non Shopify'
  },
];

export const AddSubscription = () => {
  const formikAddSubscription = useFormik({
    initialValues: {
      title: '',
      description: '',
      pricing: '',
      state: '',
      features: '',
      submit: null
    },
    validationSchema: Yup.object({
      title: Yup
        .string()
        .max(255)
        .required('Title is required'),
      description: Yup
        .string()
        .max(255)
        .required('Description is required'),
      pricing: Yup
        .number()
        .max(255)
        .required('Pricing is required'),
      state: Yup
        .string()
        .max(255)
        .required('Type is required'),
      features: Yup
        .string()
        .max(255)
        // .required('Features is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
          console.log(values);
          const subscription = {title:values.title,description:values.description,pricing:values.pricing,type:values.state,features:values.features,status:true};
          const res=await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/admin/addSubscription`,subscription).then((res)=>{
            console.log(res);
            alert("Successfully added subscription");
            formikAddSubscription.resetForm();
          })
          .catch((err)=>{
            console.log(err);
            alert("Error while adding subscription");
          });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });
  return (
    <form
      autoComplete="off"
      noValidate
      onSubmit={formikAddSubscription.handleSubmit}
    >
      <Card>
        <CardHeader
          title="Add Subscription"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  error={!!(formikAddSubscription.touched.title && formikAddSubscription.errors.title)}
                  helperText={formikAddSubscription.touched.title && formikAddSubscription.errors.title}
                  onBlur={formikAddSubscription.handleBlur}
                  onChange={formikAddSubscription.handleChange}
                  value={formikAddSubscription.values.title}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  error={!!(formikAddSubscription.touched.description && formikAddSubscription.errors.description)}
                  helperText={formikAddSubscription.touched.description && formikAddSubscription.errors.description}
                  onBlur={formikAddSubscription.handleBlur}
                  onChange={formikAddSubscription.handleChange}
                  value={formikAddSubscription.values.description}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Features"
                  name="features"
                  error={!!(formikAddSubscription.touched.features && formikAddSubscription.errors.features)}
                  helperText={formikAddSubscription.touched.features && formikAddSubscription.errors.features}
                  onBlur={formikAddSubscription.handleBlur}
                  onChange={formikAddSubscription.handleChange}
                  value={formikAddSubscription.values.features}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Pricing"
                  name="pricing"
                  error={!!(formikAddSubscription.touched.pricing && formikAddSubscription.errors.pricing)}
                  helperText={formikAddSubscription.touched.pricing && formikAddSubscription.errors.pricing}
                  onBlur={formikAddSubscription.handleBlur}
                  onChange={formikAddSubscription.handleChange}
                  value={formikAddSubscription.values.pricing}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Select Type"
                  name="state"
                  required
                  select
                  SelectProps={{ native: true }}
                  error={!!(formikAddSubscription.touched.state && formikAddSubscription.errors.state)}
                  helperText={formikAddSubscription.touched.state && formikAddSubscription.errors.state}
                  onBlur={formikAddSubscription.handleBlur}
                  onChange={formikAddSubscription.handleChange}
                  value={formikAddSubscription.values.state}
                >
                  {states.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        {formikAddSubscription.errors.submit && (
          <Typography
            color="error"
            sx={{ mt: 3 }}
            variant="body2"
          >
            {formikAddSubscription.errors.submit}
          </Typography>
        )}
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type='submit'>
           Save details
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
