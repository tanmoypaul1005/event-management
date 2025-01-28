import React from 'react';

const Footer = () => {
    return (
        <footer className="font-sans tracking-wide bg-gray-900 px-10 pt-12 pb-6">
            <div className="flex flex-wrap justify-between gap-10">
                <div className="max-w-md">
                   <div  className='text-white text-[20px] font-bold'>Event Management</div>
                    <div className="mt-6">
                        <p className="text-white leading-relaxed text-sm">ReadymadeUI is a library of pre-designed UI components built for Tailwind CSS. It offers a collection of versatile, ready-to-use components that streamline the development process by providing a wide range of UI elements.</p>
                    </div>
                    
                </div>

                <div className="max-lg:min-w-[140px]">
                    <h4 className="text-white font-semibold text-base relative max-sm:cursor-pointer">Services</h4>

                    <ul className="mt-6 space-y-4">
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Web Development</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Pricing</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Support</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Client Portal</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Resources</a>
                        </li>
                    </ul>
                </div>

                <div className="max-lg:min-w-[140px]">
                    <h4 className="text-white font-semibold text-base relative max-sm:cursor-pointer">Platforms</h4>
                    <ul className="space-y-4 mt-6">
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Hubspot</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Integration Services</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Marketing Glossar</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>UIPath</a>
                        </li>
                    </ul>
                </div>

                <div className="max-lg:min-w-[140px]">
                    <h4 className="text-white font-semibold text-base relative max-sm:cursor-pointer">Company</h4>

                    <ul className="space-y-4 mt-6">
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>About us</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Careers</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Blog</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Portfolio</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Events</a>
                        </li>
                    </ul>
                </div>

                <div className="max-lg:min-w-[140px]">
                    <h4 className="text-white font-semibold text-base relative max-sm:cursor-pointer">Additional</h4>

                    <ul className="space-y-4 mt-6">
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>FAQ</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Partners</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Sitemap</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Contact</a>
                        </li>
                        <li>
                            <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>News</a>
                        </li>
                    </ul>
                </div>
            </div>

            <hr className="mt-10 mb-6 border-gray-300" />

            <div className="flex flex-wrap max-md:flex-col gap-4">
                <ul className="md:flex md:space-x-6 max-md:space-y-2">
                    <li>
                        <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Terms of Service</a>
                    </li>
                    <li>
                        <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Privacy Policy</a>
                    </li>
                    <li>
                        <a href='javascript:void(0)' className='hover:text-white text-white text-sm'>Security</a>
                    </li>
                </ul>

                <p className='text-white text-sm md:ml-auto'>© Event Management . All rights reserved.</p>
            </div>
        </footer>

    );
};

export default Footer;