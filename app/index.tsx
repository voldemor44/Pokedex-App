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
import SearchBar from "@/components/SearchBar";
import Row from "@/components/Row";
import SortButton from "@/components/SortButton";

type Pokemon = { id: number; name: string };

export default function Index() {
  const colors = useThemeColors();
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredpokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [sortKey, setSortKey] = useState<"id" | "name">("id");

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
          ...response.data.results.map((r: { url: string; name: any }) => ({
            id: getPokemonId(r.url),
            name: r.name,
          })),
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

  useEffect(() => {
    const filtered = [
      ...(search
        ? pokemons.filter(
            (p) =>
              p.name.includes(search.toLowerCase()) ||
              p.id.toString() === search
          )
        : pokemons),
    ].sort((a, b) => (a[sortKey] < b[sortKey] ? -1 : 1));

    setFilteredPokemons(filtered);
  }, [search, pokemons]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.tint }]}>
      <Row style={styles.header} gap={16}>
        <Image
          source={require("@/assets/images/pokeball.png")}
          width={24}
          height={24}
        />
        <ThemedText variant="headline" color="grayLight">
          Pokédex
        </ThemedText>
      </Row>
      <Row gap={16}>
        <SearchBar value={search} onChange={setSearch} />
        <SortButton value={sortKey} onChange={setSortKey} />
      </Row>
      <Card style={styles.body}>
        <FlatList
          data={filteredpokemons}
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]} // Espacement verticale
          columnWrapperStyle={styles.gridGap} // Espacement horizontale
          ListFooterComponent={
            loading ? <ActivityIndicator color={colors.tint} /> : null
          } // Loader
          onEndReached={search ? undefined : handleLoadMore}
          renderItem={({ item }) => (
            <PokemonCard
              id={item.id}
              name={item.name}
              style={{ flex: 1 / 3 }}
            />
          )}
          keyExtractor={(item, index) => `${item.id}${index + 1}`} //key of item
        />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4, gap: 16 },
  header: {
    padding: 12,
  },
  body: { flex: 1 },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
});
