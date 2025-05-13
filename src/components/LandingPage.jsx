import React from 'react';
import {Link} from 'react-router-dom'
// import AnimationD3 from './Animations/Arrow';
import IntroComponent from './LandingPageComponents/introComponent';

const Pagefornt = () => {
    return (
        <>
            {/* Landing Page For an Chat and Video Calls */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-12">
        
                {/* Left: Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:p-12">
                    <h2 className="text-5xl  font-bold text-blue-300 p-12">
                        Start Your Private Video Chat
                    </h2>
                    <p className="text-2xl text-blue-300">
                        Secure. Fast. No downloads needed. Just click and connect.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-12 ">
                        <button className="px-6 py-3 bg-black-800 text-blue-100 rounded-lg hover:bg-blue-700 transition">
                            <Link to='/Room'> 
                                Try Free Video Chat
                            </Link>
                        </button>

                        <button className="px-6 py-3 bg-blue-100 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                            <Link to='/chatroom'>
                                Online Browsing Chat
                            </Link>
                        </button>
                    </div>
                </div>

                {/* Right: SVG/Image */}
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0 lg:p-12">
                    <img src="/punkeyes.svg" alt="Hero" className="w-full h-auto" /> 
                </div>

            </div>

            <hr className='text-blue-600' />

            <IntroComponent />

        </>
    )
}

export default Pagefornt;