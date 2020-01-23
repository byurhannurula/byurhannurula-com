import React from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { navigate } from 'gatsby'
import { Formik, Form } from 'formik'
import { Icon } from 'components/common'

import { InputField } from './inputField'
import { Row, Group, Button } from './styles'

const ContactForm = () => (
  <Formik
    initialValues={{
      _subject: 'Message from byurhanbeyzat.com!',
      name: '',
      email: '',
      message: '',
    }}
    validateOnChange
    validationSchema={Yup.object().shape({
      name: Yup.string().required('Name is required!'),
      email: Yup.string()
        .email('Please enter a valid Email!')
        .required('Email is required!'),
      message: Yup.string().required('Message is required!'),
    })}
    onSubmit={async (data, { setSubmitting, resetForm }) => {
      try {
        await axios({
          data,
          method: 'POST',
          url: `${process.env.GATSBY_EMAIL_ENDPOINT}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        setSubmitting(false)
        resetForm()
        navigate('/thanks')
      } catch (error) {
        setSubmitting(false)
        alert(error)
      }
    }}
  >
    {({ touched, errors, isSubmitting }) => (
      <Form>
        <Row>
          <Group>
            <InputField
              type="text"
              name="name"
              id="name"
              label="Your Name"
              placeholder="John Doe"
              error={touched.name && errors.name ? 1 : 0}
            />
          </Group>
          <Group>
            <InputField
              type="email"
              name="email"
              id="email"
              label="Your Email"
              placeholder="john.doe@gmail.com"
              error={touched.email && errors.email ? 1 : 0}
            />
          </Group>
        </Row>
        <Row>
          <Group style={{ width: '100%' }}>
            <InputField
              component="textarea"
              name="message"
              id="message"
              label="Your Message"
              placeholder="Please enter your message..."
              error={touched.message && errors.message ? 1 : 0}
            />
          </Group>
        </Row>
        <Button type="submit" disabled={isSubmitting}>
          Send
          <Icon icon="ArrowRight" />
        </Button>
      </Form>
    )}
  </Formik>
)

export { ContactForm }
