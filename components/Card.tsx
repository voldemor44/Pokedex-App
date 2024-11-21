import { Shadows } from "@/constants/Shadows";
import { useThemeColors } from "@/hooks/useThemeColors";
import { View, type ViewProps, type ViewStyle } from "react-native";

// Custom View

type Props = ViewProps;

const styles = {
  overflow: "hidden",
  backgroundColor: "#FFF",
  borderRadius: 8,
  ...Shadows.dp2,
} satisfies ViewStyle;

export default function Card({ style, ...rest }: Props) {
  const colors = useThemeColors();
  return (
    <View
      style={[style, styles, { backgroundColor: colors.grayWhite }]}
      {...rest}
    />
  );
}
