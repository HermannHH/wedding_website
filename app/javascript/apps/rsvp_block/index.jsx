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

function RsvpBlock({ update_path, name, rsvp_path, hasConfirmed }) {

  const [confirmed, setConfirmed] = useState(hasConfirmed);
  const [showDietaryForm, setShowDietaryForm] = useState(false);

  async function handleRsvp() {
    try {
      await axios.patch(rsvp_path);
      setConfirmed(true);
    } catch (error) {
      console.error('error', error);
    }
  }

  async function handleUpdate({ dietary_preference }) {
    try {
      await axios.patch(update_path, {
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
        {name}
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


// -#   .mb-8
// -#     .text-gray-900.font-bold.text-xl.mb-2="#{member.first_name} #{member.last_name}"
// -#     - if member.rsvp_confirmed?
// -#       %span="Thank you for RSVP'ing"
// -#     - else
// -#       = link_to "RSVP", rsvp_group_member_path(group_token: member.group.token, token: member.token ), method: :patch, remote: true
// -#     -#  %p.text-gray-700.text-base Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
