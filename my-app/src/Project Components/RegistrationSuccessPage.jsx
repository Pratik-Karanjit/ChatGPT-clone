import React from 'react';

const RegistrationSuccessPage = () => {
  return (
    <div className="container text-center mt-5"> {/* Add 'container' class for centering content */}
      <h1 className="display-4 text-success mb-4">Registration Successful!</h1> {/* Apply Bootstrap text and margin classes */}
      <p className="lead">Please check your email for verification.</p> {/* Apply Bootstrap lead class for larger text */}
    </div>
  );
};

export default RegistrationSuccessPage;
