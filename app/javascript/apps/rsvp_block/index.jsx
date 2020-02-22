import React, { useState } from 'react';
import axios from 'axios';
import { Formik } from 'formik';


const Form = ({ handleUpdate }) => (
  <div>
    <Formik
      initialValues={{ dietary_preference: '' }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          handleUpdate({ dietary_preference: values.dietary_preference })
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
          <textarea
            name="dietary_preference"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
          />
          {errors.email && touched.email && errors.email}
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </form>
      )}
    </Formik>
  </div>
);

function RsvpBlock({ data }) {

  console.log('data', data)
  const [confirmed, setConfirmed] = useState(data.has_confirmed);
  const [showDietaryForm, setShowDietaryForm] = useState(false);

  async function handleRsvp() {
    try {
      await axios.patch(data.rsvp_path);
      setConfirmed(true);
    } catch (error) {
      console.error('error', error);
    }
  }

  async function handleUpdate({ dietary_preference }) {
    try {
      await axios.patch(data.update_path, {
        member: {
          dietary_preference
        }
      });
      setConfirmed(true);
    } catch (error) {
      console.error('error', error);
    }
  }

  return(
    <div className=" border border-gray-400 bg-white rounded p-4 flex flex-col justify-between leading-normal">
      <div className="text-gray-900 font-bold text-xl mb-2">
        {data.full_name}
      </div>
      <div>
        {confirmed ?
        <h1>Thank you for rsvp'ing</h1>
        :
        <button onClick={() => handleRsvp()}>
          RSVP
        </button>
        }
      </div>
      {confirmed &&
        <div>
          {showDietaryForm ?
            <div>
              <p>Please tell us if you have any food allergies, are vegan or vegetarian</p>
              <a onClick={() => setShowDietaryForm(false)}>Close</a>
              <Form handleUpdate={handleUpdate}/>
            </div>
            :
            <a onClick={() => setShowDietaryForm(true)}>Provide dietary requirements</a>
          }


        </div>
      }
    </div>
  );
};

export default RsvpBlock;
