import { Text, View } from "react-native";
import { PieChart } from "react-native-gifted-charts";

const Dot = ({ color }: { color: string }) => (
  <View
    className="h-3 w-3 rounded-full mr-2"
    style={{ backgroundColor: color }}
  />
);

const LegendItem = ({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: number;
}) => (
  <View className="flex-row items-center w-1/3">
    <Dot color={color} />
    <Text className="text-white">{`${label}: ${value}`}</Text>
  </View>
);

const LegendComponent = ({
  data,
}: {
  data: { label: string; value: number; color: string }[];
}) => (
  <View className="flex-row flex-wrap justify-center items-center mt-2 gap-6">
    {data.map((item, index) => (
      <LegendItem
        key={index}
        color={item.color}
        label={item.label}
        value={item.value}
      />
    ))}
  </View>
);

interface CustomPieChartProps {
  data: Array<{
    value: number;
    color: string;
    gradientCenterColor: string;
    focused?: boolean;
    label: string;
  }>;
}

export default function CustomPieChart({ data }: CustomPieChartProps) {
  let totalValue: number = 0;
  let valueStrong: number = 0;
  const legendData = data.map((item) => ({
    label: item.label,
    value: item.value,
    color: item.color,
  }));

  totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
  valueStrong = data.filter((item) => item.label === "Strong")[0].value;

  return (
    <View className="bg-mainBlue flex-1 py-8 px-2">
      <View className="bg-secondaryBlue p-4 rounded-2xl">
        <Text className="text-white text-lg font-bold mb-4">
          Password Resistance
        </Text>

        <View className="items-center mb-4">
          <PieChart
            data={data}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor="#232B5D"
            centerLabelComponent={() => (
              <View className="items-center">
                <Text className="text-white text-2xl font-bold">
                  {((valueStrong / totalValue) * 100).toFixed(2)} %
                </Text>
                <Text className="text-white text-sm">Strong</Text>
              </View>
            )}
          />
        </View>

        <LegendComponent data={legendData} />
      </View>
    </View>
  );
}
