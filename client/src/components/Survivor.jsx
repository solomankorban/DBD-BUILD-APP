import React from "react";
import Select from "react-select";

const Survivor = ({ setSurvivor, survivor, survivorList, isDisabled }) => {
  const onChange = (survivor) => {
    setSurvivor(survivor);
  };

  return (
    <div style={{width:"400px", display:'inline-block', margin:"10px"}}>
      <Select isDisabled={isDisabled} options={survivorList} value={survivor} onChange={onChange} />
      <img style={{maxWidth:"100%"}} src={require(`../${survivor.image}`)} alt="" />
    </div>
  );
};

export default Survivor;
