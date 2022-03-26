import React from "react";
import Select from "react-select";

const Offering = ({ setOffering, offering, offeringList, isDisabled }) => {
  const onChange = (offering) => {
    setOffering(offering);
  };

  return (
    <div style={{width:"200px", position: "relative" , float:"left", margin:"10px"}}>
      <Select isDisabled={isDisabled} options={offeringList} value={offering} onChange={onChange} />
      <img
        style={{ maxWidth:"100%", position: "absolute", top: 38, left: 0}}
        src={require(`../${offering.image}`)}
        alt=""
      />
      <img style={{maxWidth:'100%'}} src={require(`../UI/Icons/Perks/backItem.png`)} alt="" />
    </div>
  );
};

export default Offering;