import React from "react";
import style from "./style.module.css";
import v_img from "../../assets/v.png";
import { IState } from "../../store/types";
import { useSelector, useDispatch } from "react-redux";
import { getFormattedTime } from "../RiderList/Ride";
import { useMediaQuery } from "react-responsive";
import { SET_SELECTED_RIDE } from "../../store/actions";

const RideAccess: React.FC = () => {
  const dispatch = useDispatch();
  const selectedRide = useSelector((state: IState) => state.selectedRide);
  const isMobile = useMediaQuery({ query: `(max-width: 580px)` });
  
  const footerStyle = {
    borderTop: `${isMobile ? '1.2vw' : '.3vw'} solid ${selectedRide?.ride.zone.color}`,
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div className={style.icon}>
          <img alt="V" src={v_img} width="100%" />
        </div>
        <div className={style.headerContent}>
          Thank you for using The Jungle™ FastRider ticket system - your access
          code is now ready!
        </div>
      </div>
      <div className={style.footer} style={footerStyle}>
        <div className={style.names}>
          <div className={style.rideName}>{selectedRide?.ride.name}</div>
          <div className={style.zoneName}>{selectedRide?.ride.zone.name}</div>
        </div>
        <div className={style.returnTime}>
          <div className={style.label}>Return At</div>
          <div className={style.time}>
            {getFormattedTime(selectedRide?.return_time)}
          </div>
        </div>
        <div className={style.accessCode}>
          <div className={style.label}>Use Access Code</div>
          <div className={style.code}>{selectedRide?.access_code}</div>
        </div>
      </div>
      <button onClick={() => dispatch({type: SET_SELECTED_RIDE, payload: null})}>Close</button>
    </div>
  );
};

export default RideAccess;
