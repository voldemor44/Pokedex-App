import { Link } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../components/ThemedText";
import { useThemeColors } from "@/hooks/useThemeColors";
import Card from "@/components/Card";
import { View } from "react-native";
import PokemonCard from "@/components/pokemon/PokemonCard";
import { useAxiosQuery } from "@/hooks/useAxiosQuery";
import { useEffect, useState } from "react";
import { getPokemonId } from "@/functions/pokemon";

export default function Index() {
  const colors = useThemeColors();
  const [pokemons, setPokemons] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleLoadMore = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const fetchPokemons = async () => {
    if (loading || !hasMore) return;

    setLoading(true);

    try {
      await useAxiosQuery(page).then((response) => {
        setPokemons((prevPokemons) => [
          ...prevPokemons,
          ...response.data.results,
        ]);

        if (response.data.results.length < 21) {
          setHasMore(false);
        }
      });
    } catch (error) {
      console.error("Erreur lors du chargement des données :", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [page]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </View>

      <Card style={styles.body}>
        <FlatList
          data={pokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]} // Espacement verticale
          columnWrapperStyle={styles.gridGap} // Espacement horizontale
          ListFooterComponent={
            loading ? <ActivityIndicator color={colors.tint} /> : null
          } // Loader
          onEndReached={handleLoadMore}
          renderItem={({ item }) => (
            <PokemonCard
              id={getPokemonId(item.url)}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item, index) => `${item.url}${index + 1}`} //key of item
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 15,
  },
  body: { flex: 1 },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
