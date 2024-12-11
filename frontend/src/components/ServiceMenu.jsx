import React from 'react';
import { services_data } from '../assets/assets';
import { Link } from 'react-router-dom';

const ServiceMenu = () => {
    return (
        <div id="services" className="flex flex-col items-center gap-6 py-16 text-gray-800">
            <h1 className="text-3xl font-semibold">Find Services by Specialty</h1>
            <p className="text-center text-sm sm:w-2/3">
                Browse our wide range of professional home services and find the perfect solution for your needs. Hassle-free booking guaranteed!
            </p>
            <div className="flex sm:justify-center gap-6 pt-5 w-full overflow-scroll px-4">
                {services_data.map((service, index) => (
                    <Link
                        to={`/workers/${service.service.toLowerCase()}`}
                        onClick={() => window.scrollTo(0, 0)}
                        key={index}
                        className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-transform duration-300"
                    >
                        <img
                            className="w-12 sm:w-16 lg:w-20 mb-2"
                            src={service.image}
                            alt={service.service}
                        />
                        <p className="text-center font-medium">{service.service}</p>
                    </Link>
                ))}
            </div>            
        </div>
    );
};

export default ServiceMenu;
