import React from "react";
import Select from "react-select";

const Perk = ({ setPerk, perk, perkList, isDisabled }) => {
  const onChange = (perk) => {
    setPerk(perk);
  };

  return (
    <div style={{width:"200px", position: "relative" , float:"left", margin:"10px"}}>
      <Select isDisabled={isDisabled} options={perkList} value={perk} onChange={onChange} />
      <img
        style={{ maxWidth:"100%", position: "absolute", top: 38, left: 0}}
        src={require(`../${perk.image}`)}
        alt=""
      />
      <img style={{maxWidth:"100%"}} src={require(`../UI/Icons/Perks/back.png`)} alt="" />
    </div>
  );
};

export default Perk;
