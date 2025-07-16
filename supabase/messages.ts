import { createClient } from "./client";
import type { Database } from "./database.types";

type Message = Database["public"]["Tables"]["messages"]["Row"];
type MessageInsert = Database["public"]["Tables"]["messages"]["Insert"];
type MessageUpdate = Database["public"]["Tables"]["messages"]["Update"];

/**
 * Create a new message/post
 */
export async function createMessage(content: string, repliedToId?: string) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not authenticated");
  }

  const messageData: MessageInsert = {
    content,
    author_id: user.user.id,
    is_reply: !!repliedToId,
    replied_to_id: repliedToId || null,
  };

  const { data, error } = await supabase
    .from("messages")
    .insert(messageData)
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get all messages (timeline/feed)
 */
export async function getMessages(limit = 50, offset = 0) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("is_reply", false)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

/**
 * Get a specific message by ID with its replies
 */
export async function getMessageWithReplies(messageId: string) {
  const supabase = createClient();

  // Get the main message
  const { data: message, error: messageError } = await supabase
    .from("messages")
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("id", messageId)
    .single();

  if (messageError) throw messageError;

  // Get replies
  const { data: replies, error: repliesError } = await supabase
    .from("messages")
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("replied_to_id", messageId)
    .order("created_at", { ascending: true });

  if (repliesError) throw repliesError;

  return { message, replies };
}

/**
 * Get messages by a specific user
 */
export async function getMessagesByUser(
  userId: string,
  limit = 50,
  offset = 0
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("messages")
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .eq("author_id", userId)
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (error) throw error;
  return data;
}

/**
 * Update a message (only the author can update)
 */
export async function updateMessage(messageId: string, content: string) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not authenticated");
  }

  const { data, error } = await supabase
    .from("messages")
    .update({ content })
    .eq("id", messageId)
    .eq("author_id", user.user.id) // Ensure only author can update
    .select(
      `
      *,
      profiles:author_id (
        id,
        username,
        display_name,
        avatar_url
      )
    `
    )
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete a message (only the author can delete)
 */
export async function deleteMessage(messageId: string) {
  const supabase = createClient();
  const { data: user, error: userError } = await supabase.auth.getUser();

  if (userError || !user.user) {
    throw userError || new Error("User not authenticated");
  }

  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", messageId)
    .eq("author_id", user.user.id); // Ensure only author can delete

  if (error) throw error;
}

/**
 * Reply to a message
 */
export async function replyToMessage(
  originalMessageId: string,
  content: string
) {
  return createMessage(content, originalMessageId);
}
