import React, { useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const Sol_areachart = ({ state, chartprops }) => {

  return (
    <div
      className="py0 my0"
      style={{ height: chartprops.height || "56vh", width: chartprops.width, maxWidth: "97%", minWidth: 129 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={state[chartprops.data_properties[0]] || []} width={369} height={256}>
        {chartprops.cartesiangrid && (  <CartesianGrid strokeDasharray="50 50" />)}
          <XAxis dataKey="name" />
          <YAxis />
          {chartprops.tooltip && (<Tooltip cursor={{ strokeDasharray: "9 9" }} />)}
          {chartprops.legend && (<Legend />)}
          {chartprops.items.map((item, index) => {
            return (
              <Area
                key={index}
                name={item.name}
                type={item.type || "linear"}
                dataKey={item.dataKey}
                fill={item.color || "red"}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sol_areachart;
