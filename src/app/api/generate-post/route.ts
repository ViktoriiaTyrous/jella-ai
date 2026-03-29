import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { platform, topic, tone, contentType, brandName, niche, improveCaption, instruction, bulkCount } = await req.json();

    const platformLimits: Record<string, number> = {
      instagram: 2200,
      tiktok: 2200,
      twitter: 280,
      facebook: 63206,
      linkedin: 3000,
      pinterest: 500,
    };

    const charLimit = platformLimits[platform] || 2200;

    // Improve mode: refine an existing caption
    if (improveCaption) {
      const improveSystemPrompt = `You are an expert social media content editor. Improve the given caption based on the instruction provided.

Always respond in valid JSON format with this exact structure:
{
  "caption": "the improved caption",
  "hashtags": ["hashtag1", "hashtag2", ...],
  "bestTimeToPost": "e.g. Tuesday 10:00 AM",
  "estimatedEngagement": "e.g. High — 3-5% engagement rate",
  "variations": ["alternative caption 1", "alternative caption 2"]
}`;

      const improveUserPrompt = `Improve this social media caption for ${platform}. Instruction: ${instruction}\n\nOriginal caption:\n${improveCaption}\n\nKeep it under ${charLimit} characters. Return improved version in the specified JSON format. Include 10-15 relevant hashtags.`;

      const improveCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: improveSystemPrompt },
          { role: "user", content: improveUserPrompt },
        ],
        temperature: 0.8,
        max_tokens: 1000,
        response_format: { type: "json_object" },
      });

      const improveContent = improveCompletion.choices[0]?.message?.content;
      if (!improveContent) {
        return NextResponse.json({ error: "No response from AI" }, { status: 500 });
      }
      return NextResponse.json(JSON.parse(improveContent));
    }

    // Bulk mode: generate multiple variations
    if (bulkCount && bulkCount > 1) {
      const bulkSystemPrompt = `You are an expert social media content creator. Generate ${bulkCount} unique post variations.

Always respond in valid JSON format with this exact structure:
{
  "posts": [
    {
      "caption": "caption text",
      "hashtags": ["hashtag1", "hashtag2", ...],
      "bestTimeToPost": "e.g. Tuesday 10:00 AM",
      "estimatedEngagement": "e.g. High — 3-5% engagement rate",
      "variations": []
    }
  ]
}`;

      const bulkUserPrompt = `Create ${bulkCount} unique ${platform} post variations about: ${topic}
- Tone: ${tone}
- Content type: ${contentType}
${brandName ? `- Brand: ${brandName}` : ""}
${niche ? `- Niche: ${niche}` : ""}
- Character limit: ${charLimit} characters each
- Include 10-15 relevant hashtags per post
- Each post should have a different angle/approach`;

      const bulkCompletion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: bulkSystemPrompt },
          { role: "user", content: bulkUserPrompt },
        ],
        temperature: 0.9,
        max_tokens: 3000,
        response_format: { type: "json_object" },
      });

      const bulkContent = bulkCompletion.choices[0]?.message?.content;
      if (!bulkContent) {
        return NextResponse.json({ error: "No response from AI" }, { status: 500 });
      }
      return NextResponse.json(JSON.parse(bulkContent));
    }

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
