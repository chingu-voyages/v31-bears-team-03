//@ts-nocheck
import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import colorService from '../services/colorService';
import SignUp from './SignUp';
import SignIn from './SignIn';

export default function Navbar({ colors }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const isLoggedIn = false;

  let location = useLocation();
  const targetRef = useRef();

  useLayoutEffect(() => {
    if (targetRef.current) {
      setDimensions({
        width: targetRef.current.offsetWidth,
        height: targetRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    setNavbarOpen(false);
  }, [location]);

  return (
    <>
      <nav
        ref={targetRef}
        className="relative flex flex-wrap items-center justify-between z-50 px-2 py-3 bg-white mb-3 shadow-lg"
      >
        <div className="flex w-full px-4  flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <div className="mx-4 self-center">
              <h1 className="text-2xl">
                <NavLink to="/">UNNAMED APP</NavLink>
              </h1>
            </div>
            <button
              className="text-gray-800 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-9 h-9"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
          <div
            className={
              ' lg:flex flex-grow items-center right-0 ' +
              (navbarOpen
                ? ` absolute lg:flex bg-white border-t border-gray-200 shadow-md `
                : ' hidden ')
            }
            style={{
              top: navbarOpen ? dimensions.height : 0,
            }}
          >
            <ul
              className={`flex flex-col lg:flex-row list-none lg:ml-auto ${
                navbarOpen ? ' ' : 'items-center'
              }`}
            >
              <li className="text-left">
                <NavLink to={`/palette/${colorService.getColorSlug(colors)}`}>
                  <div
                    className={`px-3 py-2 flex items-center text-base uppercase font-medium leading-snug text-gray-800 hover:opacity-75`}
                  >
                    <div className="mx-4">Palette</div>
                  </div>
                </NavLink>
              </li>
              <li className="text-left">
                <NavLink to="/demo">
                  <div
                    className={`px-3 py-2 flex items-center text-base uppercase font-medium leading-snug text-gray-800 hover:opacity-75`}
                  >
                    <div className="mx-4">Demo</div>
                  </div>
                </NavLink>
              </li>
              <li className="text-left">
                <NavLink to="/explore">
                  <div
                    className={`px-3 py-2 flex items-center text-base uppercase font-medium leading-snug text-gray-800 hover:opacity-75`}
                  >
                    <div className="mx-4">Explore</div>
                  </div>
                </NavLink>
              </li>

              {isLoggedIn ? (
                <li className="text-left">
                  <div
                    className={`px-3 py-2 flex items-center text-base uppercase font-medium leading-snug text-gray-800 hover:opacity-75`}
                  >
                    <div className="mx-4">
                      <p>Logout</p>
                    </div>
                  </div>
                </li>
              ) : (
                <>
                  <li className="text-left">
                    <SignUp
                      showSignUpModal={showSignUpModal}
                      setShowSignUpModal={setShowSignUpModal}
                      setNavbarOpen={setNavbarOpen}
                    />
                  </li>
                  <li className="text-left">
                    <SignIn
                      showSignInModal={showSignInModal}
                      setShowSignInModal={setShowSignInModal}
                      setNavbarOpen={setNavbarOpen}
                    />
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
