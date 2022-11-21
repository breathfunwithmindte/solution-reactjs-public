import React, { useMemo } from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Sol_scatterchart = ({ data, chartprops }) => {

  const data_properties = useMemo(() => {
    if(typeof chartprops.data_properties === "string") {
      return chartprops.data_properties.split(",").map(i => i.trim()).slice(0, 3).map(j => j.split("::"))
    }else{
      return "documents"
    }
  }, []);

  console.log(data_properties)

  const items = useMemo(() => {
    if(chartprops.items instanceof Array) {
      let arr = [];
      chartprops.items.map(i => {
        if(typeof i === "string") {
          const [name, dataKey, color, type] = i.split("--");
          arr.push({ name, dataKey, color, type });
        }
      })
      return arr;
    }else{
      return []
    }
  }, []);



  return (
    <div
      className="py0 my0"
      style={{
        height: chartprops.height || "56vh",
        width: chartprops.width, minWidth: 129,
        maxWidth: "97%",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          width={369}
          height={256}
          margin={{ top: 20, right: 20, bottom: 10, left: 10 }}
        >
          {chartprops.cartesiangrid && (  <CartesianGrid strokeDasharray="50 50" />)}
          {items[0] && (
            <XAxis dataKey={items[0].dataKey} name={items[0].name} unit={items[0].type} />
          )}
          {items[1] && (
            <YAxis dataKey={items[1].dataKey} name={items[1].name} unit={items[1].type} />
          )}
          {items[2] && (
            <ZAxis dataKey={items[2].dataKey} name={items[2].name} unit={items[2].type} range={[100, 500]} />
          )}
          {chartprops.tooltip && (<Tooltip cursor={{ strokeDasharray: "9 9" }} />)}
          {chartprops.legend && (<Legend />)}
          {data_properties.map((data_property_arr, index) => {
            return (
              <Scatter 
                key={index} 
                name={data_property_arr[1]} 
                data={data[data_property_arr[0]]} 
                fill={data_property_arr[2]} 
              />
            );
          })}
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sol_scatterchart;
