import { useEffect, useState } from "react";
import { View, Text, Button, FlatList } from "react-native";
import { addMood, getMoods } from "../services/moodService";

type MoodType = {
  _id: string;
  userId: string;
  mood: string;
  note?: string;
  date?: string;
};


export default function Home() {
  const [moods, setMoods] = useState<MoodType[]>([]);

  const userId = "123"; // replace with logged-in user later

  // 📊 Fetch moods
  const fetchMoods = async () => {
    try {
      const res = await getMoods(userId);
      setMoods(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  // ➕ Add Mood
  const handleAddMood = async () => {
    try {
      await addMood({
        userId,
        mood: "happy",
        note: "Feeling good!",
      });

      fetchMoods(); // refresh
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button onPress={handleAddMood}>Add Mood</Button>

      <FlatList
        data={moods}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item } : { item: MoodType }) => (
          <View style={{ marginTop: 10 }}>
            <Text>😊 Mood: {item.mood}</Text>
            <Text>📝 {item.note}</Text>
          </View>
        )}
      />
    </View>
  );
}