import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { useRegisterStyles } from "./RegisterStyle";
import { Formik, Form } from "formik";

import { MyTextField } from "../../common/formValidation/FormHelper";
import { CreateValidionSchema } from "../../common/formValidation/FieldValidation";
import * as constantValidtion from "../../common/formValidation/ConstantValidtion";
import {PostBaseUrl} from '../../common/services/service'
export default function Register() {

  const classes = useRegisterStyles();
  const formParmaters ={
    email: "", password: "",firstName:"",lastName:"",username:""
   }
  const validationSchema = CreateValidionSchema([
    { password: constantValidtion.PASSWORD_SCHEMA },
    { email: constantValidtion.EMAIL_SCHEMA },
    { firstName: constantValidtion.FIRSTNAME_SCHEMA },
    { lastName: constantValidtion.LASTNAME_SCHEMA },
    { username: constantValidtion.username_SCHEMA }
  ]);

  const submit = async(values, { setSubmitting }) => {
    console.log(values);
    let res = await PostBaseUrl("user/register",values);
    alert(JSON.stringify(res, null, 2));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
          </Typography>
        <Formik
          validateOnChange={true}
          initialValues={formParmaters}
          validationSchema={validationSchema}
          onSubmit={(data, { setSubmitting }) => submit(data, setSubmitting)}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <MyTextField
                    variant="outlined"
                    
                    fullWidth
                    label="firs Name"
                    name="firstName"             
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <MyTextField
                    variant="outlined"
                    
                    fullWidth
                    label="Last Name"
                    name="lastName"
                 
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    variant="outlined"
                    
                    fullWidth
                    label="user name"
                    name="username"
                   
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    variant="outlined"
                    
                    fullWidth
                    label="Email Address"
                    name="email"
                   
                  />
                </Grid>
                <Grid item xs={12}>
                  <MyTextField
                    variant="outlined"
                    
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                   
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
            </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>

    </Container>
  );
}