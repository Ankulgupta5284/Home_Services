import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="bg-white text-gray-700 px-4 md:px-20 py-10">
      {/* Header */}
      <div className="text-center text-2xl font-semibold mb-10">
        <p>
          CONTACT <span className="text-primary">US</span>
        </p>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 mb-20">
        {/* Image */}
        <img
          className="w-full max-w-sm md:max-w-[400px] rounded-lg shadow-lg"
          src={assets.contect_us}
          alt="Contact Us"
        />

        {/* Contact Details */}
        <div className="flex flex-col gap-6">
          {/* Office Address */}
          <div>
            <p className="font-bold text-lg text-gray-800">OUR OFFICE</p>
            <p className="text-gray-600">
              54709 Willms Station <br />
              Suite 350, Washington, USA
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <p className="font-bold text-lg text-gray-800">CONTACT INFO</p>
            <p className="text-gray-600">
              Tel: (415) 555-0132 <br />
              Email: greatstackdev@gmail.com
            </p>
          </div>

          {/* Careers */}
          <div>
            <p className="font-bold text-lg text-gray-800">
              CAREERS AT YOUR COMPANY
            </p>
            <p className="text-gray-600">
              Learn more about our teams and job openings.
            </p>
            <button className="mt-4 border border-primary text-primary px-6 py-3 rounded hover:bg-primary hover:text-white transition duration-300">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="bg-gray-100 p-8 rounded-lg shadow-lg">
        <p className="text-center text-xl font-semibold mb-6">SEND US A MESSAGE</p>
        <form action="#" method="post">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Message:
            </label>
            <textarea
              id="message"
              name="message"
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <input
              type="submit"
              value="Submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
