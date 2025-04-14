import supabase from '@/utils/supabase';

export async function getAllTopic() {
  const { data, error } = await supabase.from('topic').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTopicById(id: number) {
  const { data, error } = await supabase
    .from('topic')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getAllSubTopic(topicId: number) {
  const { data, error } = await supabase
    .from('sub_topic')
    .select('*')
    .eq('topic_id', topicId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getSubTopicById(id: number) {
  const { data, error } = await supabase
    .from('sub_topic')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getAllSubTopicWithStar(topicId: number) {
  const { data, error } = await supabase
    .from('sub_topic')
    .select('*, sub_topic_star(*)')
    .eq('topic_id', topicId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getAllSubTopicWithStarByUserId(
  topicId: number,
  userId: string,
) {
  const { data, error } = await supabase
    .from('sub_topic')
    .select('*, sub_topic_star(*)')
    .eq('topic_id', topicId)
    .filter('sub_topic_star.user_id', 'eq', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getCountStarUser(userId: string) {
  const { data, error } = await supabase
    .from('sub_topic_star')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  const star = data.reduce((acc: number, curr) => {
    if (curr.star) {
      acc += curr.star as number;
    }
    return acc;
  }, 0);

  return star;
}
export async function getVictoryUser(userId: string) {
  const { data, error } = await supabase
    .from('sub_topic_star')
    .select('*', { count: 'exact' })
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  const vic = data.reduce((acc: number, curr) => {
    if (curr.star > 0) {
      acc += 1;
    }
    return acc;
  }, 0);

  return vic;
}
/**
 *
 * @param topicId Topic ID
 * @param userId User ID
 * @returns The last sub-topic ID within the topic that has been completed. If no sub-topic has been completed, returns -1.
 */
export async function getLastSubTopicDone(topicId: number, userId: string) {
  const { data, error } = await supabase
    .from('sub_topic_star')
    .select('sub_topic_id')
    .eq('user_id', userId)
    .in(
      'sub_topic_id',
      (
        await supabase.from('sub_topic').select('id').eq('topic_id', topicId)
      ).data?.map((subTopic) => subTopic.id) || [],
    )
    .order('sub_topic_id', { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0]?.sub_topic_id || -1;
}
