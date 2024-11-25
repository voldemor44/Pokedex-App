import { View, ViewStyle, type ViewProps } from "react-native";

const rowStyle = {
  flex: 0,
  flexDirection: "row",
  alignItems: "center",
} satisfies ViewStyle;

type Props = ViewProps & { gap?: number };
export default function Row({ style, gap, ...rest }: Props) {
  return (
    <View style={[rowStyle, style, gap ? { gap: gap } : undefined]} {...rest} />
  );
}
