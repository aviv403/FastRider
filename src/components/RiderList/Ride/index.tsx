import React from "react";
import style from "./style.module.css";
import { IRideProps, ITimeFormat } from "./interface";
import clock from "../../../assets/gray_clock.png";
import ticket from "../../../assets/gray_ticket.png";
import { useSelector, useDispatch } from "react-redux";
import { IState } from "../../../store/types";
import { SET_SELECTED_RIDE } from "../../../store/actions";
import { useMediaQuery } from "react-responsive";

export const getFormattedTime: ITimeFormat = (time) => {
  let date;
  let mins: number = 0;
  let hours;

  if (time) {
    date = new Date(time);
    mins = date.getMinutes();
    hours = date.getHours();
  }

  return time
    ? `${hours === 0 ? "00" : hours}:${mins <= 9 ? `0${mins}` : mins}`
    : "--:--";
};

const Ride: React.FC<IRideProps> = ({ rideData }) => {
  const dispatch = useDispatch();
  const selectedRide = useSelector((state: IState) => state.selectedRide);
  const { name, remaining_tickets, return_time, zone } = rideData;
  const isMobile = useMediaQuery({ query: `(max-width: 580px)` });

  const rideStyles = {
    borderTop: `${isMobile ? "1.2vw" : ".3vw"} solid ${zone.color}`,
    backgroundColor:
      selectedRide?.ride.id === rideData.id ? zone.color : `var(--cubeBgColor)`,
  };

  const handleRideClick = () => {
    dispatch({ type: SET_SELECTED_RIDE, payload: { ride: rideData } });
  };

  return (
    <div
      className={style.container}
      style={rideStyles}
      onClick={handleRideClick}
    >
      <div className={style.header}>{zone.name}</div>
      <div className={style.content}>{name}</div>
      <div className={style.footer}>
        <div className={style.time} title="Return Time">
          <img alt="" src={clock} width={isMobile ? "25%" : "20%"} />
          {getFormattedTime(return_time)}
        </div>
        <div className={style.ticket} title="Remaining Tickets">
          <img alt="" src={ticket} width={isMobile ? "30%" : "25%"} />
          {remaining_tickets}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Ride);
