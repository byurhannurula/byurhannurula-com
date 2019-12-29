import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required!'),
  email: Yup.string()
    .email('Please enter a valid Email!')
    .required('Email is required!'),
  message: Yup.string().required('Message is required!'),
})
