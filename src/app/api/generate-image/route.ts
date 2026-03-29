import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const { prompt, platform, style } = await req.json();

    // Build image prompt optimized for social media
    const imagePrompt = `Create a professional social media ${platform} post image. ${prompt}. Style: ${style || "modern, clean, vibrant"}. High quality, photorealistic or stylized illustration suitable for social media marketing. No text overlays.`;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: imagePrompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });

    const imageUrl = response.data?.[0]?.url;
    const revisedPrompt = response.data?.[0]?.revised_prompt;
    if (!imageUrl) {
      return NextResponse.json({ error: "No image generated" }, { status: 500 });
    }

    return NextResponse.json({ imageUrl, revisedPrompt });
  } catch (error: unknown) {
    console.error("Generate image error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate image";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
