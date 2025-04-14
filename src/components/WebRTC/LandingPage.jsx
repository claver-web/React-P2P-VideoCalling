import React from 'react';

const Pagefornt = () => {
    return (
        <>
            {/* Landing Page For an Chat and Video Calls */}
            <div className="flex flex-col-reverse lg:flex-row items-center justify-center min-h-screen px-6 py-12 ">
        
                {/* Left: Content */}
                <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
                <h1 className="text-4xl sm:text-5xl font-bold text-white-900">
                    Start Your Private Video Chat
                </h1>
                <p className="text-lg text-gray-300">
                    Secure. Fast. No downloads needed. Just click and connect.
                </p>
                <div className="flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-4">
                    <button className="px-6 py-3 bg-black-800 text-white rounded-lg hover:bg-blue-700 transition">
                    Start Chat
                    </button>
                    <button className="px-6 py-3 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                    Learn More
                    </button>
                </div>
                </div>

                {/* Right: SVG/Image */}
                <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
                
                <img src="/punkeyes.svg" alt="Hero" className="w-full h-auto" /> 
                </div>

            </div>

            {/* More Info...*/}
        </>
    )
}

export default Pagefornt;