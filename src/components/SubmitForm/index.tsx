import React, { useRef, useEffect } from "react";
import style from "./style.module.css";
import { IHandleSubmit } from "./interface";
import { ticketApiResponse } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { SET_SELECTED_RIDE } from "../../store/actions";
import { IState } from "../../store/types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useMediaQuery } from "react-responsive";

const getLetter = (str: string): string | null => {
  const regex = /^[0-9][0-9][0-9][0-9]$/
  const isDigits = regex.test(str)

  if(!isDigits) return null;

  let sumDigits = 0;
  for(let i=0 ; i<str.length ; i++){
      let digit = parseInt(str[i])
      const digitIndex = i+1;

      //if index is even
      if(digitIndex % 2 === 0){
          digit *= 2

          if(digit>9){
              const a = Math.floor(digit/10)
              const b = digit % 10

              digit = a+b;
          }
      }
      sumDigits += digit;
  }

  return String.fromCharCode(((sumDigits % 26) + 65));
}

const SubmitForm: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ query: `(max-width: 580px)` });
  const selectedRide = useSelector((state: IState) => state.selectedRide);
  const inViewPort = useSelector((state: IState) => state.inViewPort);
  const inputRef = useRef<HTMLInputElement>(null);

  //Receives a PIN stored in local storage and displayed in the text field
  useEffect(() => {
    const savedPinCode = localStorage.getItem("pin");
    if (savedPinCode && inputRef.current) {
      inputRef.current.value = savedPinCode;
    }
  }, []);

  //validate PIN (Bonus question)
  const pinValid = () => {
    let isPattern = false; //JN-xxxx-xxxx-AA
    let isLettersValid = false; //last tow letters (AA)

    if (inputRef.current) {
      const regex = /^JN-[0-9][0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]-[A-Z][A-Z]$/;
      isPattern = regex.test(inputRef.current.value);

      if (isPattern) {
        const first4Digits = inputRef.current.value.slice(3, 7);
        const last4Digits = inputRef.current.value.slice(8, 12);
        const firstLetter = getLetter(first4Digits)
        const lastLetter = getLetter(last4Digits)

        if(firstLetter === inputRef.current.value[13] && lastLetter === inputRef.current.value[14]){
          isLettersValid = true;
        }
      }
    }

    return isPattern && isLettersValid;
  };

  //submit form
  const handleSubmit: IHandleSubmit = async (e) => {
    e.preventDefault();

    if (!pinValid()){
      toast.error("Invalid park ticket PIN number", {
        position: "top-center",
      });
      return;
    }

    if (inputRef.current) {
      if (selectedRide) {
        const resp = await ticketApiResponse(
          inputRef.current.value,
          selectedRide.ride.id
        );
        resp && localStorage.setItem("pin", inputRef.current.value);
        dispatch({ type: SET_SELECTED_RIDE, payload: resp });
      } else {
        toast.error("Please select the desired ride", {
          position: "top-center",
        });
      }
    }
  };

  return (
    <div className={style.container}>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="#PIN" ref={inputRef} />
        {!isMobile || (isMobile && inViewPort) ? (
          <button type="submit">SUBMIT</button>
        ) : null}
        <ToastContainer />
      </form>
    </div>
  );
};

export default SubmitForm;
