import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Sol_linechart = ({ state, chartprops }) => {

  return (
    <div
      className="py0 my0"
      style={{ height: chartprops.height || "56vh", width: chartprops.width, maxWidth: "97%", minWidth: 129 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={369}
          height={256}
          data={state[chartprops.data_properties[0]] || []}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          {chartprops.cartesiangrid && (
            <CartesianGrid strokeDasharray="50 50" />
          )}
          <XAxis dataKey={chartprops.x} />
          <Tooltip />
          <YAxis />
          <Legend />
          {chartprops.items.map((item, index) => {
            return (
              <Line
                key={index}
                name={item.name}
                type={item.type || "linear"}
                dataKey={item.dataKey}
                fill={item.color || "red"}
              />
            );
          })}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Sol_linechart;
