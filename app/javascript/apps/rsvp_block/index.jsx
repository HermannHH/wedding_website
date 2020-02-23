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

function ActionsBlock({
  confirmed
}) {

{/* <div className="flex w-full flex-grow-0 flex-shrink-0 flex-wrap">
      <button className="bg-transparent w-1/2 hover:bg-green-200 text-green-300 font-semibold hover:text-green-500 py-2 px-4 hover:border-transparent">
        Confirm
      </button>
      <button className="bg-transparent w-1/2 hover:bg-red-200 text-red-300 font-semibold hover:text-red-500 py-2 px-4 hover:border-transparent">
        Decline
      </button>
    </div> */}
  return (
    <div className="pb-3 px-3">
      <button class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Button
      </button>
    </div>
  );
}

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
    <div className=" border border-gray-300 bg-white rounded flex flex-col justify-between leading-normal">
      <div className="p-4">
        <div className="text-gray-800 font-semibold text-lg p-2 rounded w-full text-center">
          {data.full_name}
        </div>
      </div>
      <div>
        <ActionsBlock confirmed={confirmed} />
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
