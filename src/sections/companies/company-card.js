import PropTypes from "prop-types";
import ArrowDownOnSquareIcon from "@heroicons/react/24/solid/ArrowDownOnSquareIcon";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import {
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
  Button,
  Modal,
  CardActions,
  CardHeader,
  TextField,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const states = [
  {
    value: " ",
    label: "",
  },
  {
    value: "shopify",
    label: "Shopify",
  },
  {
    value: "non-shopify",
    label: "Non Shopify",
  },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: "25px",
};
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  // border: '1px solid #000',
  boxShadow: 24,
  // p: 1,
  borderRadius: "25px",
};
export const CompanyCard = (props) => {
  const { company, subscription, setSubscription } = props;

  //states for deleting subscriptions
  const [openDelete, setOpenDelete] = useState(false);
  const handleOpenDelete = () => setOpenDelete(true);
  const handleCloseDelete = () => setOpenDelete(false);

  //states for updating subscriptions
  const [openUpdate, setOpenUpdate] = useState(false);
  const handleOpenUpdate = () => setOpenUpdate(true);
  const handleCloseUpdate = () => setOpenUpdate(false);

  const handleDeleteSubscription = async () => {
    try {
      const data = { id: company.id };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/v1/admin/deleteSubscription`,
        data
      );
      console.log(res);
      setSubscription(subscription.filter((obj) => obj.id !== company.id));
      handleCloseDelete();
    } catch (e) {
      console.log("error deleting subscription", e);
    }
  };

  const formikUpdateSubscription = useFormik({
    initialValues: {
      title: company.title,
      description: company.description,
      pricing: company.pricing,
      state: company.type,
      features: company.features,
      submit: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("Title is required"),
      description: Yup.string().max(255).required("Description is required"),
      pricing: Yup.number().max(255).required("Pricing is required"),
      state: Yup.string().max(255).required("Type is required"),
      features: Yup.string().max(255),
      // .required('Features is required'),
    }),
    onSubmit: async (values, helpers) => {
      try {
        console.log(values);
        const value = {
          id:company.id,
          title: values.title,
          description: values.description,
          pricing: values.pricing,
          type: values.state,
          features: values.features,
          status:true
        };
        await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/v1/admin/updateSubscription`, value)
        .then((res) => {
          console.log(res);
          alert("Subscription updated successfully");
          subscription.forEach(element => {
            if(element.id === company.id){
              // console.log("hiii", element.title);
              element.title = values.title;
              element.description = values.description;
              element.pricing = values.pricing;
              element.type = values.type;
              element.features = values.features;
            }
          });
          setSubscription(subscription);
          handleCloseUpdate();
        })
        .catch(err => console.log(err));
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    },
  });
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <CardContent>
        <Typography align="center" gutterBottom variant="h6">
          {company.title}
        </Typography>
        <Typography align="center" gutterBottom variant="h4">
          {`$${company.pricing}/month`}
        </Typography>
        <Typography align="center" variant="body1">
          {company.description}
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" onClick={handleOpenUpdate}>
            Edit Subscription
          </Button>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" color="error" onClick={handleOpenDelete}>
            Delete Subscription
          </Button>
        </Box>
        <Modal
          open={openDelete}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you sure you want to permanently Delete this Subscription ?
            </Typography>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginTop: "20px",
              }}
            >
              <Button variant="contained" onClick={handleCloseDelete}>
                No
              </Button>
              <Button variant="contained" color="error" onClick={handleDeleteSubscription}>
                Yes
              </Button>
            </Box>
          </Box>
        </Modal>
        <Modal open={openUpdate} onClose={handleCloseUpdate}>
          <Box sx={style2}>
            <form autoComplete="off" noValidate onSubmit={formikUpdateSubscription.handleSubmit}>
              <Card>
                <CardHeader title="Add Subscription" />
                <CardContent sx={{ pt: 0 }}>
                  <Box sx={{ m: -1.5 }}>
                    <Grid container spacing={3}>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Title"
                          name="title"
                          error={
                            !!(
                              formikUpdateSubscription.touched.title &&
                              formikUpdateSubscription.errors.title
                            )
                          }
                          helperText={
                            formikUpdateSubscription.touched.title &&
                            formikUpdateSubscription.errors.title
                          }
                          onBlur={formikUpdateSubscription.handleBlur}
                          onChange={formikUpdateSubscription.handleChange}
                          value={formikUpdateSubscription.values.title}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Description"
                          name="description"
                          error={
                            !!(
                              formikUpdateSubscription.touched.description &&
                              formikUpdateSubscription.errors.description
                            )
                          }
                          helperText={
                            formikUpdateSubscription.touched.description &&
                            formikUpdateSubscription.errors.description
                          }
                          onBlur={formikUpdateSubscription.handleBlur}
                          onChange={formikUpdateSubscription.handleChange}
                          value={formikUpdateSubscription.values.description}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Features"
                          name="features"
                          error={
                            !!(
                              formikUpdateSubscription.touched.features &&
                              formikUpdateSubscription.errors.features
                            )
                          }
                          helperText={
                            formikUpdateSubscription.touched.features &&
                            formikUpdateSubscription.errors.features
                          }
                          onBlur={formikUpdateSubscription.handleBlur}
                          onChange={formikUpdateSubscription.handleChange}
                          value={formikUpdateSubscription.values.features}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Pricing"
                          name="pricing"
                          error={
                            !!(
                              formikUpdateSubscription.touched.pricing &&
                              formikUpdateSubscription.errors.pricing
                            )
                          }
                          helperText={
                            formikUpdateSubscription.touched.pricing &&
                            formikUpdateSubscription.errors.pricing
                          }
                          onBlur={formikUpdateSubscription.handleBlur}
                          onChange={formikUpdateSubscription.handleChange}
                          value={formikUpdateSubscription.values.pricing}
                        />
                      </Grid>
                      <Grid xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Select Type"
                          name="state"
                          required
                          select
                          SelectProps={{ native: true }}
                          error={
                            !!(
                              formikUpdateSubscription.touched.state &&
                              formikUpdateSubscription.errors.state
                            )
                          }
                          helperText={
                            formikUpdateSubscription.touched.state &&
                            formikUpdateSubscription.errors.state
                          }
                          onBlur={formikUpdateSubscription.handleBlur}
                          onChange={formikUpdateSubscription.handleChange}
                          value={formikUpdateSubscription.values.state}
                        >
                          {states.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>
                  </Box>
                </CardContent>
                <Divider />
                {formikUpdateSubscription.errors.submit && (
                  <Typography color="error" sx={{ mt: 3 }} variant="body2">
                    {formikUpdateSubscription.errors.submit}
                  </Typography>
                )}
                <CardActions sx={{ justifyContent: "space-evenly" }}>
                  <Button variant="contained" onClick={handleCloseUpdate}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={formikUpdateSubscription.handleSubmit}
                  >
                    Update
                  </Button>
                </CardActions>
              </Card>
            </form>
          </Box>
        </Modal>
      </CardContent>
      <Box sx={{ flexGrow: 1 }} />
    </Card>
  );
};

CompanyCard.propTypes = {
  company: PropTypes.object.isRequired,
};
