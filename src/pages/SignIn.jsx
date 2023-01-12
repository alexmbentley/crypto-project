import React, { useEffect } from 'react';
import { GoogleButton } from 'react-google-button';
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signin = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn().then(() => navigate('/account'));
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (user != null) {
  //     navigate('/account');
  //   }
  // }, [user]);

  useEffect(() => {
    if (user && Object.keys(user).length !== 0) {
      navigate('/account');
    }
  }, [navigate, user]);

  // return to the useEffect, currently not working correctly
  return (
    <div>
      <h1 className="text-center text-3xl font-bold py-8">Sign in</h1>
      <div className="max-w-[240px] m-auto py-4">
        <GoogleButton onClick={handleGoogleSignIn} />
        {console.log(user, '<< user')}
      </div>
    </div>
  );
};

export default Signin;
