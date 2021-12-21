import React from "react";
import Instructions from "./components/Indtructions";
import Title from "./components/Title";
import SubmitForm from "./components/SubmitForm";
import RideList from "./components/RiderList";
import RideAccess from "./components/RideAccess";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { IState } from "./store/types";
import { useMediaQuery } from "react-responsive";

const App: React.FC = () => {
  const selectedRide = useSelector((state: IState) => state.selectedRide);
  const isMobile = useMediaQuery({ query: `(max-width: 580px)` });

  const styles = {
    margin: "auto",
    width: isMobile ? "90%" : "50%",
  };

  return (
    <div className="App" style={styles}>
      <Title />
      {selectedRide?.id ? (
        <RideAccess />
      ) : (
        <>
          <Instructions />
          <SubmitForm />
          <RideList />
        </>
      )}
    </div>
  );
};

export default App;
