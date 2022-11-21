import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
  PolarRadiusAxis,
  PolarGrid,
  CartesianGrid,
} from "recharts";

const Sol_piechart = ({ state, chartprops }) => {

  let range = 25;
      
  return (
    <div
      className="py0 my0"
      style={{
        height: chartprops.height || "56vh",
        width: chartprops.width, minWidth: 129,
        maxWidth: "97%",
        border: "1px solid var(--h)",
        padding: "1rem"
      }}
    >
      <em>{chartprops.description}</em>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={492} height={256}>
        {chartprops.cartesiangrid && (  <CartesianGrid strokeDasharray="14 14" />)}
          {chartprops.legend && (<Tooltip cursor={{ strokeDasharray: "9 9" }}  />)}
          {chartprops.items.map((item, index) => {
            if(!chartprops.data_properties[index]) return (
              <div>Data properties - items length miss matching.</div>
            )
            return (
              <Pie 
                key={index}
                data={state[chartprops.data_properties[index]]} 
                dataKey={item.dataKey} 
                name={item.name} 
                cx={"50%"}
                cy="50%" 
                outerRadius={index*range + 2*range} 
                innerRadius={index*range + range} 
                fill={item.color || "red"} 
              />
            )
          })}
          {chartprops.legend && (<Legend />)}
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sol_piechart;
