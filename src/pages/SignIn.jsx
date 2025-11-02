import React, { useState } from "react";
import KraubexLogo from "../assets/kraubex-logo.png"; // adjust path
import { Link } from "react-router-dom";


const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [skip2FA, setSkip2FA] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();
    // Replace this with your sign-in logic
    console.log("Signing in with email:", email, "Skip 2FA:", skip2FA);
    alert(`Signed in with ${email}`);
  };

  const handleGoogleSignIn = () => {
    alert("Google Sign-In clicked");
  };

  const handleMicrosoftSignIn = () => {
    alert("Microsoft Sign-In clicked");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"  style={{ backgroundColor: "#f5f1e8" }}>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
       {/* Logo centered */}
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={KraubexLogo} alt="Kraubex Logo" className="h-12" />
        </Link>
      </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          Sign in to your Kraubex account
        </h2>

        {/* Email form */}
        <form onSubmit={handleSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Skip 2FA */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={skip2FA}
              onChange={(e) => setSkip2FA(e.target.checked)}
              className="h-4 w-4 text-orange-500 border-gray-300 rounded"
            />
            <span>Skip two-factor authentication on this device for 30 days</span>
          </label>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg"
          >
            Sign In
          </button>
        </form>

        {/* OR divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-sm">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Social sign-in buttons */}
        <div className="space-y-2">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            Sign in with Google
          </button>
          <button
            onClick={handleMicrosoftSignIn}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-2 hover:bg-gray-100"
          >
            Sign in with Microsoft
          </button>
        </div>

        {/* Sign up link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New to Kraubex?{" "}
          <a href="/signup" className="text-orange-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
