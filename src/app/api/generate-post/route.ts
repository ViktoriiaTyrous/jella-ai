import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { platform, topic, tone, contentType, brandName, niche } = await req.json();

    const platformLimits: Record<string, number> = {
      instagram: 2200,
      tiktok: 2200,
      twitter: 280,
      facebook: 63206,
      linkedin: 3000,
      pinterest: 500,
    };

    const charLimit = platformLimits[platform] || 2200;

    const systemPrompt = `You are an expert social media content creator. Generate engaging, high-quality posts that drive engagement.

Always respond in valid JSON format with this exact structure:
{
  "caption": "the main post caption",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "bestTimeToPost": "e.g. Tuesday 10:00 AM",
  "estimatedEngagement": "e.g. High — 3-5% engagement rate",
  "variations": ["alternative caption 1", "alternative caption 2"]
}`;

    const userPrompt = `Create a ${platform} post with these parameters:
- Topic: ${topic}
- Tone: ${tone}
- Content type: ${contentType}
${brandName ? `- Brand: ${brandName}` : ""}
${niche ? `- Niche: ${niche}` : ""}
- Character limit: ${charLimit} characters
- Include 10-15 relevant hashtags
- Provide 2 caption variations
- Suggest the best time to post on ${platform}
- Estimate engagement rate

The caption must be compelling, use appropriate emojis, and be optimized for ${platform}'s algorithm. ${platform === "twitter" ? "Keep it under 280 characters." : ""}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.8,
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "No response from AI" }, { status: 500 });
    }

    const parsed = JSON.parse(content);

    return NextResponse.json(parsed);
  } catch (error: unknown) {
    console.error("Generate post error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate post";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
