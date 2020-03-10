import { FormHelperText } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import {
  Field,
  Form,
  withFormik
} from 'formik';
import {
  CheckboxWithLabel,
  TextField
} from 'formik-material-ui';
import React from 'react';
import * as Yup from 'yup';

function MyForm( {values, errors, } ) {
  return (
    <Container fluid maxWidth='xs'>
      <Form>
        <Field
          type="text"
          name="name"
          component={TextField}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='name'
          label='Name'
          autoFocus
          autoComplete='off'
        />
        <Field
          type="email"
          name="email"
          component={TextField}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='email'
          label='Email Address'
          autoComplete='off'
        />
        <Field
          type="password"
          name="password"
          component={TextField}
          variant='outlined'
          margin='normal'
          required
          fullWidth
          id='password'
          label='Password'
          autoComplete='off'
        />
        <Field type="checkbox"
               name="terms"
               component={CheckboxWithLabel}
               checked={values.terms}
               Label={{label: 'Do you agree with the terms and conditions?'}} />
        {errors.terms && <FormHelperText>{errors.terms}</FormHelperText>}
        <Button variant='contained'
                color="primary"
                size="large"
                component='button'
                type="submit">Submit</Button>
      </Form>
    </Container>
  );
}

const formikConfig = ({
  mapPropsToValues( {name, email, password, terms} ) {
    return {
      name    : name || '',
      email   : email || '',
      password: password || '',
      terms   : terms || false,
    };
  },
  validationSchema: Yup.object()
                       .shape( {
                         name    : Yup.string()
                                      .min( 5, 'Name must be at least five characters' )
                                      .max( 20, 'Name can\'t be over 20 characters' )
                                      .required( 'Name is required' ),
                         email   : Yup.string()
                                      .email( 'Email is not valid' )
                                      .required( 'Email is required' ),
                         password: Yup.string()
                                      .min( 6, 'Password must be 6 characters or longer' )
                                      .required( 'Password is required' ),
                         terms   : Yup.boolean()
                                      .label( 'Terms' )
                                      .test( 'is-true', 'Must agree to terms to continue', value => value === true ),
                       } ),
  handleSubmit( values ) {
    console.log( values );
    axios.post( 'https://reqres.in/api/users', values )
         .then( res => alert( 'Welcome to Lambda Advanced Form Management Project' ) )
         .catch( err => alert( err.response ) );
  }
});

export default withFormik( formikConfig )( MyForm );