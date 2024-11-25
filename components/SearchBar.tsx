import { Image, StyleSheet, TextInput, View } from "react-native";
import Row from "./Row";
import { useThemeColors } from "@/hooks/useThemeColors";

// Typage des paramètres
type Props = {
  value: string;
  onChange: (s: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  const colors = useThemeColors();
  return (
    <Row
      gap={8}
      style={[styles.wrapper, { backgroundColor: colors.grayWhite }]}
    >
      <Image
        source={require("@/assets/images/search.png")}
        style={[styles.image, { tintColor: colors.tint }]}
      />
      <TextInput style={[styles.input]} onChangeText={onChange} value={value} selectionColor={colors.tint}/>
    </Row>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, borderRadius: 16, height: 35, paddingHorizontal: 12 },
  image: {
    width: 16,
    height: 16,
  },
  input: {
    flex: 1,
    fontSize: 12,
    lineHeight: 10,
    paddingTop :14
  },
});
