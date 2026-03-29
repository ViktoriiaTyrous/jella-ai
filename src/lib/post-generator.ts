export interface GeneratedPost {
  caption: string;
  hashtags: string[];
  bestTimeToPost: string;
  estimatedEngagement: string;
  variations: string[];
}

export interface GeneratePostParams {
  platform: "instagram" | "tiktok" | "twitter" | "facebook" | "linkedin" | "pinterest";
  topic: string;
  tone: "professional" | "casual" | "playful" | "bold" | "minimal" | "luxurious";
  contentType: "product" | "behind-the-scenes" | "tips" | "testimonial" | "promotion" | "storytelling";
  brandName?: string;
  niche?: string;
}

const bestTimes: Record<string, string> = {
  instagram: "Tuesday & Thursday, 10:00 AM - 1:00 PM",
  tiktok: "Tuesday, Thursday & Friday, 7:00 PM - 9:00 PM",
  twitter: "Monday - Friday, 8:00 AM - 10:00 AM",
  facebook: "Wednesday, 11:00 AM - 1:00 PM",
  linkedin: "Tuesday - Thursday, 9:00 AM - 12:00 PM",
  pinterest: "Saturday & Sunday, 8:00 PM - 11:00 PM",
};

const platformLimits: Record<string, number> = {
  instagram: 2200,
  twitter: 280,
  tiktok: 2200,
  linkedin: 3000,
  facebook: 63206,
  pinterest: 500,
};

const captions: Record<string, Record<string, Record<string, string[]>>> = {
  instagram: {
    casual: {
      product: [
        "Just dropped something special ✨ Our newest {topic} is here and we can't stop staring. Who's ready?",
        "POV: You just found your new obsession 🤍 Say hello to our latest {topic}!",
        "This one's been in the works for months. Finally here — {topic} that speaks for itself.",
      ],
      "behind-the-scenes": [
        "A little peek behind the curtain 👀 Here's how we bring {topic} to life.",
        "No filters, no edits — just the real process of creating {topic}.",
      ],
      tips: [
        "3 things I wish I knew sooner about {topic} 💡 Save this for later!",
        "Hot take: Most people overcomplicate {topic}. Here's the simple version.",
      ],
      testimonial: [
        "Don't just take our word for it 🥹 Here's what our community says about {topic}.",
      ],
      promotion: [
        "This is your sign ✨ {topic} — limited time, don't sleep on it!",
      ],
      storytelling: [
        "It all started with a simple idea about {topic}. Here's where we are now.",
      ],
    },
    professional: {
      product: [
        "Introducing our latest {topic} — designed with intention, crafted with care.",
        "Elevate your everyday with {topic}. Quality you can see and feel.",
      ],
      "behind-the-scenes": [
        "Behind every great product is a dedicated team. Here's how we approach {topic}.",
      ],
      tips: [
        "Expert insight: 5 ways to optimize your approach to {topic}.",
      ],
      testimonial: [
        "Our clients trust us with {topic}. Here's their experience in their own words.",
      ],
      promotion: [
        "For a limited time, experience {topic} at an exceptional value.",
      ],
      storytelling: [
        "The journey of building {topic} taught us more than we expected.",
      ],
    },
    playful: {
      product: [
        "okay but HOW cute is this {topic}?! 😍 we're obsessed and you will be too",
        "new {topic} just dropped and it's giving everything we hoped for 💅",
      ],
      "behind-the-scenes": [
        "you wanna see how the magic happens? 🪄 here's {topic} behind the scenes!",
      ],
      tips: [
        "bestie, let me tell you about {topic} — this changed EVERYTHING for me",
      ],
      testimonial: [
        "our fave humans said the nicest things about {topic} and we're not crying, you are 🥲",
      ],
      promotion: [
        "run don't walk! 🏃‍♀️ {topic} is on sale and it won't last long!",
      ],
      storytelling: [
        "plot twist: {topic} wasn't even the original plan. here's the real story...",
      ],
    },
    bold: {
      product: [
        "This isn't just another {topic}. This is the standard. Period.",
        "{topic} that demands attention. No compromises, no apologies.",
      ],
      "behind-the-scenes": [
        "Raw. Unfiltered. This is what creating {topic} actually looks like.",
      ],
      tips: [
        "Stop following trends. Start mastering {topic}. Here's how.",
      ],
      testimonial: [
        "The results speak louder than any ad. Real people, real {topic} results.",
      ],
      promotion: [
        "Your last chance. {topic} at this price won't happen again.",
      ],
      storytelling: [
        "They said {topic} couldn't be done. We proved them wrong.",
      ],
    },
    minimal: {
      product: [
        "{topic}. Refined. Timeless.",
        "Less noise. More {topic}.",
      ],
      "behind-the-scenes": [
        "The process behind {topic}.",
      ],
      tips: [
        "One tip about {topic} that changes everything.",
      ],
      testimonial: [
        "What they say about {topic}.",
      ],
      promotion: [
        "{topic}. Now available.",
      ],
      storytelling: [
        "A story about {topic}.",
      ],
    },
    luxurious: {
      product: [
        "Exquisite craftsmanship meets modern design. Discover our {topic} collection.",
        "For those who appreciate the finer things — {topic}, reimagined with elegance.",
      ],
      "behind-the-scenes": [
        "The art of perfection: an intimate look at how we create {topic}.",
      ],
      tips: [
        "The connoisseur's guide to {topic}. Elevate your taste.",
      ],
      testimonial: [
        "Discerning clients share their experience with our {topic}.",
      ],
      promotion: [
        "An exclusive invitation. Experience {topic} like never before.",
      ],
      storytelling: [
        "Born from passion, perfected over time — the story of {topic}.",
      ],
    },
  },
  tiktok: {
    casual: {
      product: ["wait till you see this {topic} 😱 #musthave"],
      "behind-the-scenes": ["the making of {topic} — it's more chaotic than you'd think 😂"],
      tips: ["things about {topic} that nobody tells you 👀"],
      testimonial: ["reacting to what people say about our {topic} 🥹"],
      promotion: ["{topic} SALE is live! link in bio 🔥"],
      storytelling: ["the story time nobody asked for but you need: {topic}"],
    },
    professional: {
      product: ["Here's why {topic} is changing the game in our industry."],
      "behind-the-scenes": ["Professional BTS: How {topic} goes from concept to reality."],
      tips: ["Pro tip series: Master {topic} with these strategies."],
      testimonial: ["Client spotlight: Real results with {topic}."],
      promotion: ["Industry-leading {topic} — see why professionals choose us."],
      storytelling: ["The professional journey behind {topic}."],
    },
    playful: {
      product: ["this {topic} is SO good i can't 💀"],
      "behind-the-scenes": ["me pretending i know what i'm doing with {topic} 🤡"],
      tips: ["{topic} hack that'll blow your mind 🤯"],
      testimonial: ["y'all are TOO sweet about our {topic} 😭"],
      promotion: ["PSA: {topic} is literally on sale rn go go go"],
      storytelling: ["ok so funny story about {topic}..."],
    },
    bold: {
      product: ["{topic}. Different. Better. Yours."],
      "behind-the-scenes": ["No sugar coating. This is {topic} behind the scenes."],
      tips: ["Stop doing {topic} wrong. Here's the truth."],
      testimonial: ["Real talk about {topic} from real people."],
      promotion: ["{topic}. Limited drop. Don't miss it."],
      storytelling: ["How {topic} changed everything for us."],
    },
    minimal: {
      product: ["{topic}. ✨"],
      "behind-the-scenes": ["Making {topic}."],
      tips: ["{topic} simplified."],
      testimonial: ["What they think about {topic}."],
      promotion: ["{topic}. Available now."],
      storytelling: ["{topic}: a short story."],
    },
    luxurious: {
      product: ["Introducing {topic} — where luxury meets innovation."],
      "behind-the-scenes": ["The artisan process behind our {topic}."],
      tips: ["The refined approach to {topic}."],
      testimonial: ["Luxury clients share their {topic} experience."],
      promotion: ["Exclusive access: {topic} collection."],
      storytelling: ["The heritage behind {topic}."],
    },
  },
  twitter: {
    casual: {
      product: ["just launched {topic} and honestly? pretty proud of this one 🤍"],
      "behind-the-scenes": ["behind the scenes of {topic} — messy desks and all 😅"],
      tips: ["quick thread on {topic} because someone needs to hear this 🧵"],
      testimonial: ["this review about {topic} made our whole week"],
      promotion: ["{topic} is on sale. that's it. that's the tweet."],
      storytelling: ["a quick story about {topic} that I think you'll like"],
    },
    professional: {
      product: ["Announcing: {topic}. Built for professionals who value quality."],
      "behind-the-scenes": ["A look at the R&D process behind {topic}."],
      tips: ["Key takeaway from our work with {topic}:"],
      testimonial: ["Client feedback on {topic} continues to exceed expectations."],
      promotion: ["Special offer: {topic} — available for a limited time."],
      storytelling: ["The story behind {topic} and what it means for our industry."],
    },
    playful: {
      product: ["ok but {topic} hits different and i need everyone to know 💅"],
      "behind-the-scenes": ["plot twist: making {topic} is actually chaos 🎭"],
      tips: ["not me sharing all my {topic} secrets for free 🤫"],
      testimonial: ["y'all being so nice about {topic} i'm SOFT"],
      promotion: ["{topic} sale!! run don't walk bestie 🏃‍♀️"],
      storytelling: ["gather round kids, let me tell you about {topic} 🍿"],
    },
    bold: {
      product: ["{topic}. No compromises. Available now."],
      "behind-the-scenes": ["This is what building {topic} really looks like."],
      tips: ["Unpopular opinion about {topic}:"],
      testimonial: ["The numbers don't lie. {topic} delivers."],
      promotion: ["Last call for {topic}. You've been warned."],
      storytelling: ["{topic}: the story they don't want you to know."],
    },
    minimal: {
      product: ["{topic}."],
      "behind-the-scenes": ["making {topic}"],
      tips: ["{topic} tip:"],
      testimonial: ["{topic} review ↓"],
      promotion: ["{topic} — available"],
      storytelling: ["{topic}, a thread:"],
    },
    luxurious: {
      product: ["Presenting {topic} — crafted for the discerning few."],
      "behind-the-scenes": ["The meticulous craft behind {topic}."],
      tips: ["Curated insights on {topic}."],
      testimonial: ["Distinguished clients share their {topic} journey."],
      promotion: ["By invitation: {topic} exclusive access."],
      storytelling: ["The legacy of {topic}."],
    },
  },
  facebook: {
    casual: {
      product: ["🎉 We're so excited to introduce {topic}! Check it out and let us know what you think in the comments!"],
      "behind-the-scenes": ["Ever wondered how {topic} comes together? Here's a sneak peek!"],
      tips: ["We put together some helpful tips about {topic} — hope this helps!"],
      testimonial: ["One of our amazing customers shared their experience with {topic} ❤️"],
      promotion: ["Special offer alert! {topic} is available at a great price 🙌"],
      storytelling: ["We wanted to share the story behind {topic} with our community."],
    },
    professional: {
      product: ["We're pleased to announce the launch of {topic}. Learn more about how it can benefit you."],
      "behind-the-scenes": ["Inside our process: how we develop {topic} to meet your needs."],
      tips: ["Industry insights: optimizing your approach to {topic}."],
      testimonial: ["Our valued clients share their success stories with {topic}."],
      promotion: ["For a limited time: special pricing on {topic}."],
      storytelling: ["The evolution of {topic} and what it means for our industry."],
    },
    playful: {
      product: ["OKAY so {topic} just dropped and we're freaking out!! 🎉🎉"],
      "behind-the-scenes": ["You asked, we're showing! Here's the chaos behind {topic} 😂"],
      tips: ["SAVE THIS! {topic} tips you'll actually use 💡"],
      testimonial: ["We're not crying over this {topic} review... okay maybe a little 🥲"],
      promotion: ["Drop everything!! {topic} is ON SALE 🔥🔥"],
      storytelling: ["Storytime! The wild journey of creating {topic} 🎢"],
    },
    bold: {
      product: ["{topic} is here. And it's unlike anything else on the market."],
      "behind-the-scenes": ["No fluff. Here's the real process behind {topic}."],
      tips: ["Most people get {topic} wrong. Here's what actually works."],
      testimonial: ["Real results. Real people. {topic} speaks for itself."],
      promotion: ["{topic}. Best price we've ever offered. Period."],
      storytelling: ["Against all odds: the {topic} story."],
    },
    minimal: {
      product: ["New: {topic}."],
      "behind-the-scenes": ["How we make {topic}."],
      tips: ["{topic} essentials."],
      testimonial: ["What our clients say about {topic}."],
      promotion: ["{topic}. Special pricing."],
      storytelling: ["The {topic} story."],
    },
    luxurious: {
      product: ["Introducing an exquisite addition to our collection: {topic}."],
      "behind-the-scenes": ["A glimpse into the artisanal creation of {topic}."],
      tips: ["The sophisticated guide to {topic}."],
      testimonial: ["Our distinguished clientele shares their {topic} experience."],
      promotion: ["An exclusive opportunity: {topic} at exceptional value."],
      storytelling: ["The timeless story behind {topic}."],
    },
  },
  linkedin: {
    casual: {
      product: ["Thrilled to share something we've been working on — {topic}! Would love your thoughts."],
      "behind-the-scenes": ["Here's a behind-the-scenes look at how our team tackles {topic}."],
      tips: ["I've learned a lot about {topic} over the years. Here are my top takeaways:"],
      testimonial: ["One of our partners shared their experience with {topic}, and it really resonated."],
      promotion: ["Excited to offer {topic} to our network. Details below!"],
      storytelling: ["The journey of building {topic} has been full of lessons."],
    },
    professional: {
      product: ["We're proud to announce the launch of {topic}. Here's how it addresses key industry challenges."],
      "behind-the-scenes": ["Innovation requires transparency. Here's our approach to developing {topic}."],
      tips: ["Key insights from our work with {topic} that every professional should know:"],
      testimonial: ["Client success story: How {topic} delivered measurable results."],
      promotion: ["For qualified professionals: special access to {topic}."],
      storytelling: ["From concept to market: the {topic} journey and lessons learned."],
    },
    playful: {
      product: ["So we made a thing... 😄 {topic} is officially live! Check it out!"],
      "behind-the-scenes": ["Spoiler: building {topic} involved a LOT of coffee ☕"],
      tips: ["Okay LinkedIn, let's talk about {topic} because this is important 💡"],
      testimonial: ["This feedback about {topic} genuinely made our day 🙏"],
      promotion: ["Psst... {topic} special offer for our LinkedIn family 🤫"],
      storytelling: ["Fun fact: {topic} almost didn't happen. Here's why it did."],
    },
    bold: {
      product: ["{topic} sets a new standard for the industry. Here's why."],
      "behind-the-scenes": ["Disruption starts behind closed doors. Inside our {topic} development."],
      tips: ["The hard truth about {topic} that no one talks about."],
      testimonial: ["{topic} results that speak louder than marketing."],
      promotion: ["{topic}. Market-leading value. Limited availability."],
      storytelling: ["How {topic} challenged conventional wisdom."],
    },
    minimal: {
      product: ["Launching: {topic}."],
      "behind-the-scenes": ["Inside {topic}."],
      tips: ["{topic} insight."],
      testimonial: ["{topic} testimonial."],
      promotion: ["{topic} offer."],
      storytelling: ["{topic} journey."],
    },
    luxurious: {
      product: ["We're honoured to present {topic} — where excellence meets innovation."],
      "behind-the-scenes": ["The distinguished craft behind {topic}."],
      tips: ["Executive insights on {topic}."],
      testimonial: ["Industry leaders share their {topic} experience."],
      promotion: ["By invitation only: exclusive {topic} access for select professionals."],
      storytelling: ["The prestigious story of {topic}."],
    },
  },
  pinterest: {
    casual: {
      product: ["{topic} inspo for your next project ✨ Pin this for later!"],
      "behind-the-scenes": ["How {topic} is made — from sketch to final product 🎨"],
      tips: ["{topic} ideas you'll want to try this season 💡"],
      testimonial: ["See how our community styles {topic} 🤍"],
      promotion: ["Shop {topic} — link in description!"],
      storytelling: ["The inspiration behind {topic} ✨"],
    },
    professional: {
      product: ["Curated {topic} designs for the modern professional."],
      "behind-the-scenes": ["The design process behind our {topic} collection."],
      tips: ["Professional guide to incorporating {topic} into your workflow."],
      testimonial: ["How professionals use {topic} in their projects."],
      promotion: ["{topic} collection — now available."],
      storytelling: ["The design philosophy behind {topic}."],
    },
    playful: {
      product: ["OMG this {topic} is SO Pinterest-worthy!! 📌"],
      "behind-the-scenes": ["the messy beautiful process of creating {topic} 🎨"],
      tips: ["{topic} hacks that'll change your life!! save this!! 📌"],
      testimonial: ["how cute is this {topic} setup by our customer? 😍"],
      promotion: ["{topic} sale alert!! save save save 📌🔥"],
      storytelling: ["the cutest story behind {topic} 🥰"],
    },
    bold: {
      product: ["{topic}. Pin-worthy. Statement-making."],
      "behind-the-scenes": ["Raw creation: {topic} from start to finish."],
      tips: ["{topic} done right. No shortcuts."],
      testimonial: ["{topic} in action. Real setups, real results."],
      promotion: ["{topic}. Get it before it's gone."],
      storytelling: ["{topic}. The story in images."],
    },
    minimal: {
      product: ["{topic}."],
      "behind-the-scenes": ["Making {topic}."],
      tips: ["{topic} tips."],
      testimonial: ["{topic} styled."],
      promotion: ["Shop {topic}."],
      storytelling: ["{topic} story."],
    },
    luxurious: {
      product: ["Curated elegance: {topic} for the refined aesthetic."],
      "behind-the-scenes": ["The artistry behind our {topic} collection."],
      tips: ["The art of styling {topic} with sophistication."],
      testimonial: ["How tastemakers incorporate {topic}."],
      promotion: ["Exclusive: {topic} collection now available."],
      storytelling: ["The refined inspiration behind {topic}."],
    },
  },
};

const nicheHashtags: Record<string, string[]> = {
  default: ["#contentcreator", "#socialmedia", "#digitalmarketing", "#branding", "#creative", "#design", "#marketing", "#smallbusiness", "#entrepreneur", "#growthmindset", "#businesstips", "#onlinebusiness", "#brandstrategy", "#visualcontent", "#contentmarketing"],
  fashion: ["#fashion", "#style", "#ootd", "#fashionblogger", "#styleinspo", "#outfitoftheday", "#fashionista", "#streetstyle", "#lookbook", "#trendy", "#fashiondesign", "#womensfashion", "#instastyle", "#fashiongram", "#styleguide"],
  food: ["#foodie", "#foodphotography", "#instafood", "#recipe", "#homecooking", "#foodblogger", "#healthyfood", "#cooking", "#foodstagram", "#yummy", "#delicious", "#foodlover", "#chef", "#baking", "#mealprep"],
  beauty: ["#beauty", "#skincare", "#makeup", "#beautytips", "#selfcare", "#glowup", "#beautyblogger", "#skincareroutine", "#makeuptutorial", "#naturalbeauty", "#beautyproducts", "#cosmetics", "#beautycare", "#makeupartist", "#beautycommunity"],
  tech: ["#tech", "#technology", "#innovation", "#digital", "#startup", "#coding", "#software", "#ai", "#machinelearning", "#webdev", "#programming", "#techlife", "#futuretech", "#saas", "#techstartup"],
  fitness: ["#fitness", "#workout", "#gym", "#health", "#fitlife", "#exercise", "#training", "#fitnessmotivation", "#healthylifestyle", "#bodybuilding", "#fitfam", "#wellness", "#cardio", "#strength", "#personaltrainer"],
  travel: ["#travel", "#wanderlust", "#travelgram", "#explore", "#adventure", "#vacation", "#tourism", "#travelphotography", "#instatravel", "#travelblogger", "#traveltheworld", "#beautifuldestinations", "#roadtrip", "#traveler", "#getaway"],
};

const platformHashtags: Record<string, string[]> = {
  instagram: ["#instagood", "#photooftheday", "#instadaily", "#reels", "#explorepage"],
  tiktok: ["#fyp", "#foryou", "#foryoupage", "#viral", "#trending"],
  twitter: ["#trending", "#thread", "#twittermarketing"],
  facebook: ["#facebookbusiness", "#facebookmarketing", "#community"],
  linkedin: ["#leadership", "#networking", "#careers", "#professional", "#growth"],
  pinterest: ["#pinterestinspired", "#pinit", "#pinterestideas", "#aesthetic", "#moodboard"],
};

const engagementEstimates: Record<string, string> = {
  instagram: "3.2% - 5.8% engagement rate",
  tiktok: "5.5% - 12.0% engagement rate",
  twitter: "1.5% - 3.2% engagement rate",
  facebook: "2.0% - 4.5% engagement rate",
  linkedin: "3.8% - 7.2% engagement rate",
  pinterest: "2.5% - 4.0% engagement rate",
};

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function detectNiche(topic: string): string {
  const lower = topic.toLowerCase();
  if (/fashion|clothing|outfit|dress|style|wear/.test(lower)) return "fashion";
  if (/food|cook|recipe|restaurant|meal|eat/.test(lower)) return "food";
  if (/beauty|skin|makeup|cosmetic|glow/.test(lower)) return "beauty";
  if (/tech|software|app|code|ai|digital/.test(lower)) return "tech";
  if (/fitness|gym|workout|health|exercise/.test(lower)) return "fitness";
  if (/travel|trip|vacation|explore|adventure/.test(lower)) return "travel";
  return "default";
}

export function generatePost(params: GeneratePostParams): Promise<GeneratedPost> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { platform, topic, tone, contentType } = params;
      const niche = params.niche || detectNiche(topic);

      const platformCaptions = captions[platform]?.[tone]?.[contentType]
        || captions.instagram.casual.product;

      const mainCaption = pickRandom(platformCaptions).replace(/\{topic\}/g, topic);

      // Generate variations from other tones
      const toneKeys = Object.keys(captions[platform] || captions.instagram);
      const variations: string[] = [];
      for (const t of toneKeys) {
        if (t !== tone && variations.length < 3) {
          const alt = captions[platform]?.[t]?.[contentType];
          if (alt && alt.length > 0) {
            variations.push(pickRandom(alt).replace(/\{topic\}/g, topic));
          }
        }
      }

      const hashtags = generateHashtags(niche, platform);

      resolve({
        caption: mainCaption,
        hashtags: hashtags.slice(0, 10),
        bestTimeToPost: bestTimes[platform] || bestTimes.instagram,
        estimatedEngagement: engagementEstimates[platform] || engagementEstimates.instagram,
        variations: variations.slice(0, 3),
      });
    }, 1500);
  });
}

export function generateHashtags(niche: string, platform: string): string[] {
  const nicheSpecific = nicheHashtags[niche] || nicheHashtags.default;
  const platSpecific = platformHashtags[platform] || platformHashtags.instagram;
  const combined = [...nicheSpecific, ...platSpecific];
  // Shuffle and return 15-20
  const shuffled = combined.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 15 + Math.floor(Math.random() * 6));
}

export function getPostTemplates(platform: string): { name: string; template: string }[] {
  const templates: Record<string, { name: string; template: string }[]> = {
    instagram: [
      { name: "Product Launch", template: "Introducing [product] ✨ [description]. Link in bio!" },
      { name: "Engagement Question", template: "We want to know — [question]? Drop your answer below 👇" },
      { name: "Carousel Tips", template: "Swipe for [number] tips on [topic] → Save for later!" },
      { name: "Behind the Scenes", template: "Ever wondered how we [process]? Here's a peek 👀" },
    ],
    tiktok: [
      { name: "POV", template: "POV: You just discovered [topic] #fyp #viral" },
      { name: "Tutorial", template: "How to [action] in [time] ⏱️ #tutorial #tips" },
      { name: "Day in the Life", template: "A day in the life of [role] 📱 #dayinthelife" },
    ],
    twitter: [
      { name: "Hot Take", template: "Hot take: [opinion about topic]. Here's why 🧵" },
      { name: "Thread", template: "[Topic] thread:\n\n1/ [first point]" },
      { name: "Question", template: "Genuine question: [question]?" },
    ],
    facebook: [
      { name: "Community Post", template: "Hey [community]! We're excited to share [news]. What do you think?" },
      { name: "Event Announcement", template: "📅 Mark your calendars! [event] is happening [date]." },
    ],
    linkedin: [
      { name: "Thought Leadership", template: "I've been thinking a lot about [topic] lately.\n\nHere are my key takeaways:" },
      { name: "Achievement", template: "Proud to announce [achievement]. Here's what we learned:" },
      { name: "Insight", template: "[Industry] is changing. Here's what [professionals] need to know:" },
    ],
    pinterest: [
      { name: "Inspiration Board", template: "[Topic] inspiration for your next [project] ✨" },
      { name: "How-To Guide", template: "Step by step: How to [action] | [Topic] Guide" },
      { name: "Collection", template: "Curated [topic] picks for [season/occasion] 📌" },
    ],
  };
  return templates[platform] || templates.instagram;
}

export { platformLimits };
