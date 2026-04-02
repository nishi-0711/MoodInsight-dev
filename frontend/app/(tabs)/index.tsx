import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { addMood, getMoods } from '../../services/moodService';
import { Ionicons } from '@expo/vector-icons';
import LoginModal from '../../components/LoginModal';

const COMMON_MOODS = [
  { emoji: '😊', label: 'Happy', color: '#FFD700' },
  { emoji: '😢', label: 'Sad', color: '#4682B4' },
  { emoji: '😡', label: 'Angry', color: '#FF4500' },
  { emoji: '😴', label: 'Tired', color: '#8A2BE2' },
  { emoji: '😍', label: 'Excited', color: '#FF69B4' },
  { emoji: '😐', label: 'Neutral', color: '#A9A9A9' },
];

interface MoodEntry {
  _id: string;
  emoji: string;
  mood: string;
  note?: string;
  createdAt: string;
}

export default function Home() {
  const [selectedEmoji, setSelectedEmoji] = useState('😊');
  const [selectedLabel, setSelectedLabel] = useState('Happy');
  const [customMood, setCustomMood] = useState('');
  const [note, setNote] = useState('');
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isLoginVisible, setIsLoginVisible] = useState(false);

  const userId = "all";

  const fetchMoods = async () => {
    setLoading(true);
    try {
      const res = await getMoods(userId);
      setMoods(res.data);
    } catch (err) {
      console.error("Error fetching moods:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const handleAddMood = async () => {
    const finalEmoji = customMood ? '✨' : selectedEmoji;
    const finalLabel = customMood || selectedLabel;

    if (!finalLabel) {
      Alert.alert("Error", "Please select or enter a mood");
      return;
    }

    setSubmitting(true);
    try {
      const res = await addMood({
        userId: null,
        emoji: finalEmoji,
        mood: finalLabel,
        note: note,
      });

      setMoods(prevMoods => [res.data, ...prevMoods]);
      setNote('');
      setCustomMood('');
      Alert.alert("Success", "Mood logged! ✨");
    } catch (err: any) {
      console.error("Full Error:", err);
      if (err.response) {
        console.error("Response Data:", err.response.data);
      } else if (err.request) {
        console.error("Request Error: No response received. Check your Server/IP.");
      }
      Alert.alert("Network Error", "Could not connect to the server. Check your API IP address.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderMoodItem = ({ item }: { item: MoodEntry }) => (
    <View style={styles.moodCard}>
      <View style={styles.moodHeader}>
        <Text style={styles.moodEmoji}>{item.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.moodText}>{item.mood}</Text>
          <Text style={styles.moodTime}>
            {new Date(item.createdAt).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </Text>
        </View>
      </View>
      {item.note ? <Text style={styles.moodNote}>{item.note}</Text> : null}
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LoginModal
        isVisible={isLoginVisible}
        onClose={() => setIsLoginVisible(false)}
        onLoginSuccess={(token) => {
          console.log("Logged in with token:", token);
        }}
      />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.headerRow}>
              <Text style={styles.title}>How are you feeling?</Text>
              <TouchableOpacity onPress={() => setIsLoginVisible(true)} style={styles.loginTrigger}>
                <Ionicons name="person-circle-outline" size={32} color="#007AFF" />
              </TouchableOpacity>
            </View>

            <View style={styles.selectorContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emojiList}>
                {COMMON_MOODS.map((m) => (
                  <TouchableOpacity
                    key={m.label}
                    onPress={() => {
                      setSelectedEmoji(m.emoji);
                      setSelectedLabel(m.label);
                      setCustomMood('');
                    }}
                    style={[
                      styles.emojiButton,
                      selectedLabel === m.label && !customMood && styles.selectedEmoji
                    ]}
                  >
                    <Text style={styles.emojiText}>{m.emoji}</Text>
                    <Text style={styles.labelText}>{m.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <TextInput
                placeholder="Or enter custom mood..."
                value={customMood}
                onChangeText={setCustomMood}
                style={styles.input}
              />

              <TextInput
                placeholder="Add a note (optional)"
                value={note}
                onChangeText={setNote}
                style={[styles.input, styles.textArea]}
                multiline
              />

              <TouchableOpacity
                onPress={handleAddMood}
                style={[styles.submitButton, submitting && styles.disabledButton]}
                disabled={submitting}
              >
                {submitting ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.submitButtonText}>Log Mood</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.historyHeader}>
              <Text style={styles.subtitle}>Recent History</Text>
              <TouchableOpacity onPress={fetchMoods}>
                 <Ionicons name="refresh" size={20} color="#666" />
              </TouchableOpacity>
            </View>
          </>
        }
        data={moods}
        keyExtractor={(item) => item._id}
        renderItem={renderMoodItem}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 60, paddingBottom: 40 }}
        ListEmptyComponent={
          !loading ? <Text style={styles.emptyText}>No moods logged yet.</Text> : null
        }
        ListFooterComponent={
            loading ? <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 20 }} /> : null
        }
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  loginTrigger: {
    padding: 5,
  },
  selectorContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 25,
  },
  emojiList: {
    marginBottom: 15,
  },
  emojiButton: {
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    width: 70,
  },
  selectedEmoji: {
    borderColor: '#007AFF',
    backgroundColor: '#E3F2FD',
  },
  emojiText: {
    fontSize: 24,
    marginBottom: 4,
  },
  labelText: {
    fontSize: 12,
    color: '#666',
  },
  input: {
    backgroundColor: '#f1f3f5',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  moodCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodEmoji: {
    fontSize: 30,
    marginRight: 15,
  },
  moodText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3436',
  },
  moodTime: {
    fontSize: 12,
    color: '#95a5a6',
    marginTop: 2,
  },
  moodNote: {
    marginTop: 10,
    color: '#636e72',
    fontStyle: 'italic',
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    marginTop: 30,
    fontSize: 16,
  }
});
