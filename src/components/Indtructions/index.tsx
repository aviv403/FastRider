import React from "react";
import Instruction from "./Instruction";
import ticket from "../../assets/ticket.png";
import arrow from "../../assets/arrow.png";
import clock from "../../assets/clock.png";
import style from './style.module.css'

const instructionsData = [
  {
    id: 1,
    icon: ticket,
    content:
      "Enter your park ticket #PIN number, then select the desired ride while nothing the stated return time",
  },
  {
    id: 2,
    icon: arrow,
    content: "Press 'submit' to confirm and retrieve your access code",
  },
  {
    id: 3,
    icon: clock,
    content:
      "When the time comes, use the special FastRider line to cut out a considerable wait time",
  },
];

const Indtructions: React.FC = () => {
  return (
    <div className={style.container}>
      {instructionsData.map((instData) => {
        return (
          <React.Fragment key={instData.id}>
            <Instruction instData={instData} />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Indtructions;
