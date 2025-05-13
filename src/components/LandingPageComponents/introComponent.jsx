const IntroComponent = () => {
    return(
        <>
        <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-12 ">
        
            {/* Left: Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 p-10">
                <h2 className="text-3xl sm:text-3xl font-bold text-blue-300">
                    Study Read With people Who Visit Here 
                </h2>

                <p className="text-2xl sm:text-1xl text-blue-300">
                    You can connect Group Call with people With Discuss!!!
                </p>
                

                
            </div>

            {/* Right: SVG/Image */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 p-12">
                <img src="/videoCall.png" alt="Hero" className="w-full h-auto" /> 
            </div>

        </div>

        <hr className="color-blue" />

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center px-6 py-12 p-12">

            {/* Right: SVG/Image */}
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0 p-12">
                <img src="/chat.png" alt="Hero" className="w-full h-auto" /> 
            </div>
        
            {/* Left: Content */}
            <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 ">
                <h2 className="text-3xl sm:text-3xl font-bold text-blue-300">
                    Chat and share With people Study Who Visit Here 
                </h2>

                <p className="text-2xl sm:text-1xl text-blue-300">
                    You can connect Group Chat with people With Discuss!!!
                </p>
            </div>

        </div>
        
        </>
    )
}

export default IntroComponent;