import { useState } from "react";

const FormManageHooks = (initalState) => {
  const [input, setInput] = useState(initalState);

  // handleInputChange
  const handleInputChange = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  // handle Form Reset
  const formReset = () =>{
    setInput(initalState)

  }

  return { input, handleInputChange, formReset };
};

export default FormManageHooks;
