import React, { useEffect, useRef } from "react";
import Ride from "./Ride";
import style from "./style.module.css";
import { IState } from "../../store/types";
import { useSelector, useDispatch } from "react-redux";
import { getRides, SET_RIDES_VIEW_PORT } from "../../store/actions";
import { useInViewport } from "react-in-viewport";

const RideList: React.FC = () => {
  const dispatch = useDispatch();
  const rides = useSelector((state: IState) => state.rides);
  const rideListRef = useRef<HTMLDivElement>(null);
  const { inViewport } = useInViewport(rideListRef);

  //fetch all rides when component mounted (make an async action) 
  useEffect(() => {
    dispatch(getRides());
  }, []);

  //viewport (for mobile option)
  useEffect(() => {
    dispatch({ type: SET_RIDES_VIEW_PORT, payload: inViewport });
  }, [inViewport]);

  return (
    <div className={style.container} ref={rideListRef}>
      {rides?.length
        ? rides.map((rideData: any) => {
            return (
              <React.Fragment key={rideData.id}>
                <Ride rideData={rideData} />
              </React.Fragment>
            );
          })
        : null}
    </div>
  );
};

export default RideList;
