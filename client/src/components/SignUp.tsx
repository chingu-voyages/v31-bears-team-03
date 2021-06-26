//@ts-nocheck
import React, { useRef } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function SignUp({
  showSignUpModal,
  setShowSignUpModal,
  setNavbarOpen,
}) {
  const modalRef = useRef();

  const closeModal = () => {
    setShowSignUpModal(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      console.log('handleOutsideClick runs');
      closeModal();
      setNavbarOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // register user

    // if success
    setShowSignUpModal(false);
    setNavbarOpen(false);
  };

  return (
    <>
      <button
        className="bg-white text-white font-bold uppercase ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowSignUpModal(true)}
      >
        <div
          className={`px-3 py-2 flex text-base uppercase font-medium leading-snug text-gray-800 hover:opacity-75`}
        >
          <div className="mx-4">Sign Up</div>
        </div>
      </button>
      {showSignUpModal ? (
        <>
          <div
            ref={modalRef}
            onClick={handleOutsideClick}
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto sm:w-96 my-6 mx-auto max-w-3xl">
              <div className="">
                <div className="flex"></div>
                <Formik
                  initialValues={{
                    username: '',
                    email: '',
                    password: '',
                  }}
                  validationSchema={Yup.object({
                    username: Yup.string().required('Username cannot be empty'),
                    email: Yup.string()
                      .email('Looks like this is not an email')
                      .required('Email cannot be empty'),
                    password: Yup.string().required('Password cannot be empty'),
                  })}
                  onSubmit={(values, actions) => {
                    setTimeout(() => {
                      actions.resetForm();
                    }, 1000);
                  }}
                >
                  <Form className="flex flex-col p-5 mt-5 stext-black bg-white rounded-lg shadow-xl lg:p-10 ">
                    <div className="pt-3 pb-9 text-center">
                      <h1 className="text-3xl">Sign Up</h1>
                    </div>

                    <div className="py-3">
                      <Field name="username">
                        {({ field, form }) => (
                          <div className="relative">
                            <label
                              htmlFor="username"
                              aria-label="Username"
                              className="hidden"
                            >
                              Username
                            </label>
                            <input
                              {...field}
                              className="w-full p-4 font-semibold placeholder-gray-500 border rounded-lg outline-none lg:px-8 focus:ring-accent-blue focus:ring-1"
                              placeholder="Username"
                              type="text"
                              name="username"
                              id="username"
                              style={
                                form.touched.username && form.errors.username
                                  ? { border: '2px solid red' }
                                  : null
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="absolute text-xs italic text-right text-primary-red"
                      />
                    </div>
                    <div className="py-3">
                      <Field name="email">
                        {({ field, form }) => (
                          <div className="relative">
                            <label
                              htmlFor="email"
                              aria-label="Email"
                              className="hidden"
                            >
                              Email
                            </label>
                            <input
                              {...field}
                              className="w-full p-4 font-semibold placeholder-gray-500 border rounded-lg outline-none lg:px-8 focus:ring-accent-blue focus:ring-1"
                              placeholder="Email"
                              type="text"
                              name="email"
                              id="email"
                              style={
                                form.touched.email && form.errors.email
                                  ? { border: '2px solid red' }
                                  : null
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="absolute text-xs italic text-right text-primary-red"
                      />
                    </div>
                    <div className="py-3">
                      <Field name="password">
                        {({ field, form }) => (
                          <div className="relative">
                            <label
                              htmlFor="password"
                              aria-label="Password"
                              className="hidden"
                            >
                              Password
                            </label>
                            <input
                              {...field}
                              className="w-full p-4 font-semibold placeholder-gray-500 border rounded-lg outline-none lg:px-8 focus:ring-accent-blue focus:ring-1"
                              placeholder="Password"
                              type="password"
                              name="password"
                              id="password"
                              style={
                                form.touched.password && form.errors.password
                                  ? { border: '2px solid red' }
                                  : null
                              }
                            />
                          </div>
                        )}
                      </Field>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="absolute text-xs italic text-right text-primary-red"
                      />
                    </div>
                    <div className="mb-5 mt-9">
                      <button
                        type="submit"
                        className="bg-blue-900 opacity-90 p-2 w-full rounded-full text-white transition duration-300 hover:opacity-100"
                        onClick={handleSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
