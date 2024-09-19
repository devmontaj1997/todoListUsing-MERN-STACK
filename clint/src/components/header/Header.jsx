import logo from "../../assets/images/devmontaj.png";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOffCanvas = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="mainDiv bg-[#ffffff] border-b-2 shadow-lg sticky xxxsm:py-4 lg:py-0 ">
        <div className="container">
          <header className=" grid lg:grid-cols-[20%_70%_10%] items-center ">
            <div className="logoArea">
              <img className="xxxsm:w-72" src={logo}  alt="" />
            </div>
            <div className="menuArea hidden lg:block ">
              <ul className=" flex justify-center">
                <li>
                  <a href="#" className="font-medium text-2xl">
                   Todo List MERN Stack Project
                  </a>
                </li>
              </ul>
            </div>

            <div className="relative lg:hidden">
              {/* Hamburger Menu Button */}
              <button className="text-3xl p-2 text-[#FF014F] border-2 border-[#FF014F] rounded-lg" onClick={toggleOffCanvas}>
                <RxHamburgerMenu />
              </button>

              {/* Off-Canvas Menu */}
              <div
                className={`fixed top-0 left-0 h-full w-64 z-10 bg-white shadow-lg transform transition-transform duration-300 ${
                  isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                {" "}
                <div className="flex justify-between items-start p-4 ">
                <div className="logoArea">
              <img className="" src={logo} alt="" />
            </div>
                  <button className="text-5xl" onClick={toggleOffCanvas}>
                    &times;
                  </button>
                </div>
                <div className="p-4 " >
                  
                <div className="menuArea pb-4">
              <ul>
                <li>
                  <a href="#" className="font-medium text-xl">
                    Form Manage MERN Stack Project
                  </a>
                </li>
              </ul>
            </div>
                  <div className="lightDarkBTN ">
              <button className="font-normal text-2xl border-[#FF014F] border-[1px] w-28 py-1 rounded-lg ">
                
                Light
              </button>
            </div>

                  
                </div>
              </div>

              {/* Overlay */}
              {isOpen && (
                <div
                  className="fixed inset-0 z-0 bg-slate-900 opacity-20"
                  onClick={toggleOffCanvas}
                ></div>
              )}
            </div>


            <div className="lightDarkBTN ">
              <button className="font-normal text-2xl  hidden lg:block border-[#FF014F] border-[1px] w-28 py-1 rounded-lg ">
                {" "}
                Light
              </button>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
