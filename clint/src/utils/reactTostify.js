
// create tostify

import { toast } from "react-toastify";

const createTost = ( msg, type="error") => {
  toast[type](msg);
};


export default createTost;
