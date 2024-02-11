import { useEffect, useState } from "react";
import farmerContext from "./farmerContext";


const FarmerState = (props) => {
  const [farmerId, setFarmerId] = useState(() => {
    return localStorage.getItem("farmerId") || null;
  });

  console.log("farmerId:", farmerId);

  useEffect(() => {
    console.log("Inside useEffect, farmerId:", farmerId);
    localStorage.setItem("farmerId", farmerId);
  }, [farmerId]);

  return (
    <farmerContext.Provider
      value={{
        farmerId,
        setFarmerId
      }}
    >
      {props.children} 
    </farmerContext.Provider>
  );
};


export default FarmerState