import React, { useState, useEffect } from "react";
import Perk from "./Perk";
import Survivor from "./Survivor";
import Item from "./Item";
import Addon from "./Addon";
import Offering from "./Offering";

const axios = require("axios");
const perkList = [];
const survivorList = [];
const itemList = [];
const addonList = [];
const offeringList = [];

const getPerks = async () => {
  const response = await axios.get(
    "https://dbd.onteh.net.au/api/perks"
  );
  for (var key in response.data) {
    if (response.data[key].role === "survivor")
      perkList.push({
        ...response.data[key],
        value: key,
        label: response.data[key].name,
      });
  }
};

const getSurvivors = async () => {
  const response = await axios.get(
    "https://dbd.onteh.net.au/api/characters"
  );
  for (var key in response.data) {
    if (response.data[key].role === "survivor")
      survivorList.push({
        ...response.data[key],
        value: key,
        label: response.data[key].name,
      });
  }
};

const getItems = async () => {
  const response = await axios.get(
    "https://dbd.onteh.net.au/api/items?role=survivor"
  );
  for (var key in response.data) {
    if (
      response.data[key].rarity !== "specialevent" &&
      response.data[key].bloodweb === "1"
    )
      itemList.push({
        ...response.data[key],
        value: key,
        label: response.data[key].name,
      });
  }
};

const getAddons = async (item) => {
  const response = await axios.get(
    `https://dbd.onteh.net.au/api/addons?role=survivor&item=${item}`
  );
  for (var key in response.data) {
    addonList.push({
      ...response.data[key],
      value: key,
      label: response.data[key].name,
    });
  }
};

const getOfferings = async () => {
  const response = await axios.get(
    "https://dbd.onteh.net.au/api/offerings"
  );
  for (var key in response.data) {
    if (
      response.data[key].role === "survivor" ||
      response.data[key].role === null
    )
      offeringList.push({
        ...response.data[key],
        value: key,
        label: response.data[key].name,
      });
  }
};

getPerks();
getSurvivors();
getItems();
getOfferings();

const BuildForm = () => {
  const [perk1, setPerk1] = useState({
    value: "Adrenaline",
    label: "Adrenaline",
    image: "UI/Icons/Perks/iconPerks_adrenaline.png",
  });

  const [perk2, setPerk2] = useState({
    value: "Adrenaline",
    label: "Adrenaline",
    image: "UI/Icons/Perks/iconPerks_adrenaline.png",
  });

  const [perk3, setPerk3] = useState({
    value: "Adrenaline",
    label: "Adrenaline",
    image: "UI/Icons/Perks/iconPerks_adrenaline.png",
  });

  const [perk4, setPerk4] = useState({
    value: "Adrenaline",
    label: "Adrenaline",
    image: "UI/Icons/Perks/iconPerks_adrenaline.png",
  });

  const [survivor, setSurvivor] = useState({
    image: "UI/Icons/CharPortraits/DF_charSelect_portrait.png",
    label: "Dwight Fairfield",
    value: 0,
  });

  const [item, setItem] = useState({
    image: "UI/Icons/Items/iconItems_toolboxAlexs.png",
    value: "Item_Camper_AlexsToolbox",
    label: "Alex's Toolbox",
  });

  const [addon, setAddon] = useState({
    type: "itemaddon",
    name: "Battery",
    description:
      "A standard battery of unknown brand.<br><br>Adds <b>2 seconds</b> of use to the Flashlight.",
    role: "survivor",
    modifier: "Battery",
    bloodweb: "1",
    rarity: "common",
    image: "UI/Icons/ItemAddons/iconAddon_battery.png",
    label:"Battery"
  });

  const [addon2, setAddon2] = useState({
    type: "itemaddon",
    name: "Battery",
    description:
      "A standard battery of unknown brand.<br><br>Adds <b>2 seconds</b> of use to the Flashlight.",
    role: "survivor",
    modifier: "Battery",
    bloodweb: "1",
    rarity: "common",
    image: "UI/Icons/ItemAddons/iconAddon_battery.png",
    label:"Battery"
  });

  const [offering, setOffering] = useState({
    name: "Gruesome Gateau",
    role: null,
    rarity: "specialevent",
    retired: "0",
    image: "UI/Icons/Favors/Anniversary/iconFavors_gruesomeGateau.png",
    label:"Gruesome Gateau"
  });

  const [description, setDescription] = useState("");

  const handleChange = (evt) => {
    setDescription(evt.target.value);
  }

  const createBuild = async (evt) => {
    const data = {
      description,
      role:"survivor",
      character:JSON.stringify(survivor),
      perk1:JSON.stringify(perk1),
      perk2:JSON.stringify(perk2),
      perk3:JSON.stringify(perk3),
      perk4:JSON.stringify(perk4),
      item:JSON.stringify(item),
      addon1:JSON.stringify(addon),
      addon2:JSON.stringify(addon2),
      offering:JSON.stringify(offering),
    }
    axios.post(
      `/api/builds`, {data}
    ).then(function (response){
      setBuildId(window.location.href + response.data.build_id);
      evt.target.disabled = true;
    })
  }

  useEffect(() => {
    addonList.length = 0;
    getAddons(item.value);
  }, [item]);

  const [buildId, setBuildId] = useState("");

  return (
    <>
      {/* left div */}
      <div style={{width:"50%"}}>
        <div style={{ float: "left", backgroundColor: "grey", margin: "5px", textAlign:"center" }}>
          <h2>Perks</h2>
          <Perk setPerk={setPerk1} perk={perk1} perkList={perkList} />
          <Perk setPerk={setPerk2} perk={perk2} perkList={perkList} />
          <Perk setPerk={setPerk3} perk={perk3} perkList={perkList} />
          <Perk setPerk={setPerk4} perk={perk4} perkList={perkList} />
        </div>
        <div style={{ float: "left", backgroundColor: "gray", margin: "5px", textAlign:"center"  }}>
          <h2>Item + Addons</h2>
          <Item setItem={setItem} item={item} itemList={itemList} />
          <Addon setAddon={setAddon} addon={addon} addonList={addonList} />
          <Addon setAddon={setAddon2} addon={addon2} addonList={addonList} />
        </div>

        <div style={{ float: "left", backgroundColor: "gray", margin: "5px", textAlign:"center"  }}>
          <h2>Offering</h2>
          <Offering
            setOffering={setOffering}
            offering={offering}
            offeringList={offeringList}
          />
        </div>
      </div>

      <div style={{ display:"inline-block", backgroundColor: "gray", margin: "5px", textAlign:"center"  }}>
        <h2>Survivor</h2>
        <Survivor
          setSurvivor={setSurvivor}
          survivor={survivor}
          survivorList={survivorList}
        />
      </div>

      <div style={{ float:"left", backgroundColor: "gray", margin: "5px", textAlign:"center"  }}>
        <h2>Description</h2>
      <textarea style={{margin:"10px", resize:"none"}} value={description} onChange={handleChange} name="description" id="description" cols="50" rows="4">
        Write a description for your build...
      </textarea>
      </div>

      <div style={{ float:"left", backgroundColor: "gray", margin: "5px", textAlign:"center"  }}>
        <h2>Unique Build URL</h2>
        <button style={{margin:"10px"}} onClick={createBuild}>Generate Build URL</button>
        <input style={{margin:"10px"}} type="text" value={buildId}/>
      </div>
      
    </>
  );
};

export default BuildForm;
