import React from "react";
import Select from "react-select";

const Item = ({ setItem, item, itemList, isDisabled }) => {
  const onChange = (item) => {
    setItem(item);
  };

  return (
    <div style={{ width: "200px", position: "relative", margin:"10px", float:"left"}}>
      <Select isDisabled={isDisabled} options={itemList} value={item} onChange={onChange} />
      <img
        style={{ maxWidth:"100%", position: "absolute", top: 38, left: 0 }}
        src={require(`../${item.image}`)}
        alt=""
      />
      <img style={{maxWidth:'100%'}} src={require(`../UI/Icons/Perks/backItem.png`)} alt="" />
    </div>
  );
};

export default Item;