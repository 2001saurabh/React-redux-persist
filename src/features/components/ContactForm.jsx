// @ts-nocheck
import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addContact } from '../slices/contactSlice';


function ContactForm() {
    const dispatch = useDispatch()

    const validationSchema = Yup.object({
        name: Yup.string().required("Please enter name!"),
        email: Yup.string().email("Please enter a valid email!").required("Please enter email!"),
        phoneNo: Yup.string().required("Please enter phone no!")
    })
  
    const {handleSubmit, values,touched, resetForm, handleChange, errors, setErrors, handleBlur} = useFormik({
        initialValues:{
            name:"",
            email:"",
            phoneNo:""
        },
        validationSchema,
        onSubmit:(values,{resetForm}) => {
            const newContact = {id: uuidv4(), ...values};
            dispatch(addContact(newContact))
            resetForm()
        }

    })

    console.log(values)
  return (
     <div style={{margin:'auto', minHeight:"40vh",width:'30vw' }}>
    <div>ContactForm</div>
    <form onSubmit={handleSubmit}>
    <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={ values.name}
          onChange={ handleChange}
          onBlur={ handleBlur}
        />
        { touched.name &&  errors.name ? (
          <div>{ errors.name}</div>
        ) : null}

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={ values.email}
          onChange={ handleChange}
          onBlur={ handleBlur}
        />
        { touched.email &&  errors.email ? (
          <div>{ errors.email}</div>
        ) : null}

        <label htmlFor="phone">Phone:</label>
        <input
          type="tel"
          id="phoneNo"
          name="phoneNo"
          value={values.phoneNo}
          onChange={ handleChange}
          onBlur={ handleBlur}
        />
        {touched.phoneNo &&  errors.phoneNo ? (
          <div>{ errors.phoneNo}</div>
        ) : null}

        <button type="submit">Add Contact</button>
    </form>

    </div>
  )
}

export default ContactForm