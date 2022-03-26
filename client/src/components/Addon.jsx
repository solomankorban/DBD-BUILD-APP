import React from "react";
import Select from "react-select";

const Addon = ({ setAddon, addon, addonList, isDisabled }) => {
  const onChange = (addon) => {
    setAddon(addon);
  };

  return (
    <div style={{width:"150px", position: "relative" , float:"left", margin:"10px"}}>
      <Select isDisabled={isDisabled} options={addonList} value={addon} onChange={onChange} />
      <img
        style={{ maxWidth:"100%", position: "absolute", top: 38, left: 0}}
        src={require(`../${addon.image}`)}
        alt=""
      />
      <img style={{maxWidth:"100%"}} src={require(`../UI/Icons/Perks/backItem.png`)} alt="" />
    </div>
  );
};

export default Addon;