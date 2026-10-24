import { useState, useRef } from 'react';
import {
  View, Text, TextInput, Pressable, FlatList, StyleSheet,
  KeyboardAvoidingView, Platform, ActivityIndicator,
} from 'react-native';
import { theme } from '../constants/theme';
import { askAI, Msg } from '../services/ai';

export default function ChatScreen() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'assistant', content: 'Namaste! Main LIFEVERSE AI hoon. Kya poochna hai?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlatList>(null);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const next: Msg[] = [...messages, { role: 'user', content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const reply = await askAI(next);
      setMessages([...next, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...next, { role: 'assistant', content: 'Connection error. Server check karo.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.bg }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(_, i) => String(i)}
        contentContainerStyle={{ padding: 16 }}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={[styles.bubble, item.role === 'user' ? styles.user : styles.ai]}>
            <Text style={styles.msg}>{item.content}</Text>
          </View>
        )}
      />
      {loading && <ActivityIndicator color={theme.accent} style={{ margin: 8 }} />}
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Kuch bhi poochho..."
          placeholderTextColor={theme.muted}
          onSubmitEditing={send}
        />
        <Pressable style={styles.send} onPress={send}>
          <Text style={{ color: '#fff', fontWeight: '700' }}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: '82%', padding: 12, borderRadius: 16, marginBottom: 10 },
  user: { alignSelf: 'flex-end', backgroundColor: theme.primary },
  ai: { alignSelf: 'flex-start', backgroundColor: '#1a1a2e' },
  msg: { color: theme.text, fontSize: 15 },
  row: { flexDirection: 'row', padding: 12, gap: 8 },
  input: {
    flex: 1, backgroundColor: '#1a1a2e', color: '#fff',
    borderRadius: 24, paddingHorizontal: 16, paddingVertical: 10,
  },
  send: {
    backgroundColor: theme.primary, borderRadius: 24,
    paddingHorizontal: 20, justifyContent: 'center',
  },
});