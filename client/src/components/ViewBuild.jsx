import React, { useState, useEffect } from "react";
import Perk from "./Perk";
import Survivor from "./Survivor";
import Item from "./Item";
import Addon from "./Addon";
import Offering from "./Offering";
import { useParams } from "react-router-dom";

const ViewBuild = () => {
  const axios = require("axios");

  const { id } = useParams();
  const [data, setData] = useState();

  const getBuild = async () => {
    const response = await axios.get(`/api/builds/${id}`);
    console.log(response.data)
    setData(response.data);
  };
  

  useEffect(() => {
    getBuild();
  }, [id]);


  if (data === undefined) {
    return <>Still loading...</>;
  }

  return (
    <>
      <div style={{ width: "50%" }}>
        <div
          style={{
            float: "left",
            backgroundColor: "grey",
            margin: "5px",
            textAlign: "center",
          }}
        >
          <h2>Perks</h2>
          <Perk perk={data.perk1} isDisabled={true} />
          <Perk perk={data.perk2} isDisabled={true} />
          <Perk perk={data.perk3} isDisabled={true} />
          <Perk perk={data.perk4} isDisabled={true} />
        </div>
        <div
          style={{
            float: "left",
            backgroundColor: "gray",
            margin: "5px",
            textAlign: "center",
          }}
        >
          <h2>Item + Addons</h2>
          <Item item={data.item} isDisabled={true} />
          <Addon addon={data.addon1} isDisabled={true} />
          <Addon addon={data.addon2} isDisabled={true} />
        </div>

        <div
          style={{
            float: "left",
            backgroundColor: "gray",
            margin: "5px",
            textAlign: "center",
          }}
        >
          <h2>Offering</h2>
          <Offering offering={data.offering} isDisabled={true} />
        </div>
      </div>
      <div
        style={{
          display: "inline-block",
          backgroundColor: "gray",
          margin: "5px",
          textAlign: "center",
        }}
      >
        <h2>Survivor</h2>
        <Survivor survivor={data.character} isDisabled={true} />
      </div>
      <div
        style={{
          float: "left",
          backgroundColor: "gray",
          margin: "5px",
          textAlign: "center",
        }}
      >
        <h2>Description</h2>
        <textarea
          disabled
          style={{ margin: "10px", resize: "none" }}
          value={data.description}
          name="description"
          id="description"
          cols="50"
          rows="4"
        >
          Write a description for your build...
        </textarea>
      </div>
    </>
  );
};

export default ViewBuild;
