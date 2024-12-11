import React from 'react'
import { assets } from '../assets/assets' // Assuming you have a similar folder for assets

const About = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* Header Section */}
      <div className="relative bg-primary text-white py-20 px-8 sm:px-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-center">About Us</h1>
        <p className="text-center mt-4 text-lg sm:text-xl">
          Learn more about our mission, vision, and the team behind our success.
        </p>
      </div>

      {/* Mission and Vision Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 py-16 px-8 sm:px-16">
        <div className="flex flex-col items-center text-center">
          <img src={assets.mission_icon} alt="Mission" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-primary mb-2">Our Mission</h2>
          <p className="text-gray-600">
            To provide top-notch services that empower our clients to achieve their goals through innovation and dedication.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <img src={assets.vision_icon} alt="Vision" className="w-20 h-20 mb-6" />
          <h2 className="text-2xl font-semibold text-primary mb-2">Our Vision</h2>
          <p className="text-gray-600">
            To be a global leader in our field by constantly pushing the boundaries of excellence and innovation.
          </p>
        </div>
      </div>


      {/* Why Choose Us Section */}
      <div className="py-16 px-8 sm:px-16">
        <h2 className="text-3xl font-bold text-center text-gray-800">Why Choose Us</h2>
        <p className="text-center text-gray-600 mt-4">
          Here's why we stand out in the industry.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-10">
          <div className="text-center">
            <img src={assets.quality_icon} alt="Quality" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary">Quality Services</h3>
            <p className="text-gray-600">We ensure the highest standards in every project.</p>
          </div>
          <div className="text-center">
            <img src={assets.innovation_icon} alt="Innovation" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary">Innovation</h3>
            <p className="text-gray-600">We bring creativity and innovation to the table.</p>
          </div>
          <div className="text-center">
            <img src={assets.support_icon} alt="Support" className="w-20 h-20 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-primary">24/7 Support</h3>
            <p className="text-gray-600">Our team is always ready to assist you.</p>
          </div>
        </div>
      </div>

      {/* Dynamic Testimonials Section */}
      <div className="bg-primary text-white py-16 px-8 sm:px-16">
        <h2 className="text-3xl font-bold text-center">What Our Clients Say</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-10">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="bg-white text-gray-800 rounded-lg p-6 shadow-lg">
              <p className="text-sm text-gray-600 italic">
                "This is the best service I've ever used! Highly recommend to anyone looking for quality."
              </p>
              <h3 className="text-primary font-semibold mt-4">Client {index + 1}</h3>
              <p className="text-xs text-gray-500">Position</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default About
