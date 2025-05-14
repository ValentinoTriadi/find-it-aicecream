import { TopicCategory } from "@/context/battle-map.context";
import supabase from "@/utils/supabase";

export async function getAllTopic() {
  const { data, error } = await supabase.from("topic").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getTopicById(id: number) {
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getAllSubTopic(topicId: number) {
  const { data, error } = await supabase
    .from("sub_topic")
    .select("*")
    .eq("topic_id", topicId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getSubTopicById(id: number) {
  const { data, error } = await supabase
    .from("sub_topic")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getAllSubTopicWithStar(topicId: number) {
  const { data, error } = await supabase
    .from("sub_topic")
    .select("*, sub_topic_star(*)")
    .eq("topic_id", topicId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getTopicStarCount(topicId: number) {
  const { data, error } = await supabase
    .from("topic")
    .select("*, sub_topic(*, sub_topic_star(*))")
    .eq("id", topicId);

  if (error) {
    throw new Error(error.message);
  }

  const subTopics = data[0].sub_topic;
  const starCount = subTopics.reduce((acc: number, curr: any) => {
    const subTopicStar = curr.sub_topic_star.reduce(
      (acc1: number, curr: any) => {
        if (curr.star) {
          acc1 += curr.star;
        }
        return acc1;
      },
      0
    );
    return acc + subTopicStar;
  }, 0);

  return starCount as number;
}
export async function getAllSubTopicWithStarByUserId(
  topicId: number,
  userId: string
) {
  const { data, error } = await supabase
    .from("sub_topic")
    .select("*, sub_topic_star(*)")
    .eq("topic_id", topicId)
    .filter("sub_topic_star.user_id", "eq", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
export async function getCountStarUser(userId: string) {
  const { data, error } = await supabase
    .from("sub_topic_star")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

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
    .from("sub_topic_star")
    .select("*", { count: "exact" })
    .eq("user_id", userId);

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
    .from("sub_topic_star")
    .select("sub_topic_id")
    .eq("user_id", userId)
    .in(
      "sub_topic_id",
      (
        await supabase.from("sub_topic").select("id").eq("topic_id", topicId)
      ).data?.map((subTopic) => subTopic.id) || []
    )
    .order("sub_topic_id", { ascending: false })
    .limit(1);

  if (error) {
    throw new Error(error.message);
  }

  return data[0]?.sub_topic_id || -1;
}

export async function getAllTopicWithSubTopicAndStar() {
  const { data, error } = await supabase
    .from("topic")
    .select("*, sub_topic(*, sub_topic_star(*))");

  if (error) {
    throw new Error(error.message);
  }

  // console.log("ALL TOPIC + SUB + STAR: ", data);

  const newData: TopicCategory[] = data.map((topic, topidx) => {
    const subTopics = topic.sub_topic.map((subTopic: any, subidx: any) => {
      const subTopicStar = subTopic.sub_topic_star[0].star || 0;
      return {
        id: subTopic.id,
        name: subTopic.name,
        level: topidx + 1 + "-" + (subidx + 1),
        description: subTopic.description,
        points: 50,
        stars: subTopicStar,
        unlocked: subidx == 0 ? true : false,
        battleWon: 0,
        averageTime: 0,
        bestScore: 0,
        roles: [
          { name: "Leader", desc: "Gives instructions to teammates" },
          { name: "Follower", desc: "Executes tasks based on given orders" },
        ],
        topic_id: topic.id,
      };
    });
    return {
      id: topic.id,
      name: topic.name,
      icon: "",
      color: "",
      bgColor: "",
      subtopic: subTopics,
    };
  });

  console.log("NEW DATA: ", newData);

  return newData as TopicCategory[];
}
