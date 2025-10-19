const Banner = () => {
  return (
    <div className="lg:relative bg-[url('https://i.pinimg.com/1200x/fb/a6/ad/fba6adc34711997b82a6c670befd6a14.jpg')] bg-cover bg-center lg:py-[320px] lg:mb-10">
      <div className="lg:absolute inset-0 bg-gradient-to-b from-[#261b16] to-transparent py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-[90%] lg:w-[80%] mx-auto text-white ">
          <div></div>
          <div>
            <h1 className="text-[36px] font-bold">
              Would you like a Cup of Delicious Coffee?
            </h1>
            <p className="mt-7 mb-5 text-[20px]">
              It's coffee time - Sip & Savor - Relaxation in every sip! Get the
              nostalgia back!! Your companion of every moment!!! Enjoy the
              beautiful moments and make them memorable.
            </p>
            <button className="bg-[#e3b577] text-[#242222] font-bold px-3 py-2 border-2 border-[#e3b577] hover:bg-transparent duration-300 hover:text-[#e3b577] cursor-pointer">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
