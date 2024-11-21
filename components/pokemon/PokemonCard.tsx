import { Image, Pressable, StyleSheet, View, ViewStyle } from "react-native";
import Card from "../Card";
import { ThemedText } from "../ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";

type Props = {
  style: ViewStyle;
  id: number;
  name: string;
};

export default function PokemonCard({ style, id, name }: Props) {
  const colors = useThemeColors();
  return (
    <Link href={{ pathname: "/pokemon/[id]", params: { id: id } }} asChild>
      <Pressable
        android_ripple={{ color: colors.tint, foreground: true }}
        style={style}
      >
        <Card style={[styles.card]}>
          <ThemedText style={styles.id} variant="caption" color="grayMedium">
            #{id.toString().padStart(3, "0")}
          </ThemedText>
          <Image
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            }}
            width={72}
            height={72}
          />
          <ThemedText>{name}</ThemedText>
          <View
            style={[styles.shadow, { backgroundColor: colors.grayBackground }]}
          />
        </Card>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: { position: "relative", alignItems: "center", padding: 4 },
  id: { alignSelf: "flex-end" },
  shadow: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 44,
    borderRadius: 7,
    zIndex: -1,
  },
});
