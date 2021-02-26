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

import { useLoginStyles } from "./LoginStyle";
import { Formik, Form } from "formik";

import { MyTextField } from "../../common/formValidation/FormHelper";
import { CreateValidionSchema } from "../../common/formValidation/FieldValidation";
import * as constantValidtion from "../../common/formValidation/ConstantValidtion";
import {PostBaseUrl} from '../../common/services/service'
// import background from "./pexels-viktoria-alipatova-2130134.jpg"

export default function Login() {
  const classes = useLoginStyles();
  const validationSchema = CreateValidionSchema([
    { password: constantValidtion.PASSWORD_SCHEMA },
    { email: constantValidtion.EMAIL_SCHEMA },
  ]);
 
  const submit = async (values ) => {
   
  let res =  await PostBaseUrl("user/login",values);
    alert(JSON.stringify(res, null, 2));
  };

  return (
      <div 
  >
    <Container component="main" maxWidth="xs" >
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Formik
          validateOnChange={true}
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={ (data) => submit(data)}
        >
          {({ isSubmitting }) => (
            <Form className={classes.form} autoComplete="off">
              <MyTextField
                variant="outlined"
                margin="normal"
                name="email"
                placeholder="Enter your eamil"
                fullWidth
              />
              <MyTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password"
                type="password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/Register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
    </div>
  );
}
