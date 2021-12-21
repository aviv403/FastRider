import React from "react";
import { InstructionProps } from "./interface";
import style from "./style.module.css";

const Instruction: React.FC<InstructionProps> = ({ instData }) => {
  const { icon, content } = instData;

  return (
    <div className={style.container}>
      <div className={style.icon}>
        <img alt="" src={icon} width="100%" />
      </div>
      <div className={style.text}>{content}</div>
    </div>
  );
};

export default Instruction;
