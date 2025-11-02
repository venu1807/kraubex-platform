import React, { useState } from "react";
import KraubexLogo from "../assets/kraubex-logo.png"; // adjust path if needed
import { Link } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    countryCode: "",
    mobileNumber: "",
    employees: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "This field is required.";
    if (!formData.lastName.trim()) newErrors.lastName = "This field is required.";
    if (!formData.companyName.trim()) newErrors.companyName = "This field is required.";
    if (!formData.email.trim()) newErrors.email = "Please provide a valid email address.";
    if (!formData.mobileNumber.trim()) newErrors.mobileNumber = "Mobile number is required.";
    if (!formData.employees) newErrors.employees = "Please select the number of employees.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    console.log("Sign up data:", formData);
    alert(`Sign up successful! Mobile: ${formData.countryCode} ${formData.mobileNumber}`);

    setFormData({
      firstName: "",
      lastName: "",
      companyName: "",
      email: "",
      countryCode: "+1",
      mobileNumber: "",
      employees: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#f5f1e8" }}>
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        {/* Logo centered */}
      <div className="flex justify-center mb-6">
        <Link to="/">
          <img src={KraubexLogo} alt="Kraubex Logo" className="h-12" />
        </Link>
      </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center mb-6">
          {"Let's start with the basics"}
        </h2>

        {/* SignUp Form */}
        <form onSubmit={handleSignUp} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
          </div>

          {/* Company Name */}
          <div>
            <input
              type="text"
              name="companyName"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
          </div>

          {/* Work Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Work Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* Mobile Number with Country Code */}
          <div className="flex space-x-2">
            <select
              name="countryCode"
              value={formData.countryCode}
              onChange={handleChange}
              className="w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="+49">Germany (+49)</option>
              <option value="+1">US (+1)</option>
              <option value="+44">UK (+44)</option>
              <option value="+91">India (+91)</option>
              {/* Add more countries if needed */}
            </select>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="123-45678-910"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-2/3 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}

          {/* Number of Employees */}
          <div>
            <select
              name="employees"
              value={formData.employees}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Number of Employees</option>
              <option value="1-10">1-10</option>
              <option value="11-50">11-50</option>
              <option value="51-200">51-200</option>
              <option value="201-500">201-500</option>
              <option value="501-1000">501-1000</option>
              <option value="1000+">1000+</option>
            </select>
            {errors.employees && <p className="text-red-500 text-sm mt-1">{errors.employees}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-lg"
          >
            Sign Up
          </button>
        </form>

        {/* Sign in link */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <a href="/signin" className="text-orange-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
