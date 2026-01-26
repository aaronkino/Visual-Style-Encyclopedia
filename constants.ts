import { Category, StyleItem } from './types';

// --- English Prompts Dictionary (Used for AI Generation) ---
const STYLE_DICTIONARY: Record<string, string> = {
  // --- Classic Anime / IP specific ---
  "三渲二": "cel-shaded 3D style, anime aesthetic with 3D modeling features, sharp shadows, guilty gear style, arc system works aesthetic",
  "JoJo的奇妙冒險": "JoJo's Bizarre Adventure style, Hirohiko Araki art style, bold black outlines, dramatic shading, detailed muscle definition, menacing text effects, vibrant colors, fashion pose",
  "辛普森家庭": "The Simpsons art style, Matt Groening style, yellow skin, bulging eyes, overbite, 2D flat cartoon, comedic atmosphere, springfield aesthetic",
  "吉卜力": "Studio Ghibli style, Hayao Miyazaki art style, hand-painted background, soft colors, cel animation, whimsical, detailed environment, gouache background",
  "藤本樹": "Tatsuki Fujimoto style, Chainsaw Man art style, rough sketchy lines, high contrast, cinematic composition, slightly dark and chaotic atmosphere, emotional expression",
  "吊帶襪女孩": "Panty & Stocking with Garterbelt style, thick jagged outlines, american cartoon influence, vibrant pop colors, angular character design, vector art style",
  "動森": "Animal Crossing style, low poly cute 3D, soft textures, rounded shapes, nintendo art style, cozy atmosphere, pastel colors",
  "樂高": "LEGO minifigure style, plastic texture, blocky shapes, c-shaped hands, 3d render, glossy plastic finish, toy photography",
  "比奇堡": "SpongeBob SquarePants style, marine cartoon, thick colorful outlines, exaggerated expressions, nickelodeon style, underwater aesthetic",
  "蠟筆小新": "Crayon Shin-chan style, distorted proportions, thick wavy outlines, simple flat colors, comedic minimalist, Yoshito Usui style",
  "萊卡定格動畫": "Laika studio style, Coraline style, stop-motion claymation, clay texture, puppet aesthetic, cinematic lighting, slightly eerie, detailed fabrics",
  "銹湖": "Rusty Lake style, surreal hand-drawn, flat perspective, victorian gothic influence, uncanny valley, muted earth tones, escape room game art",
  "美式肌肉諷刺卡通": "Ren and Stimpy style, gross-up close up, hyper-detailed veins and muscles, exaggerated grotesque cartoon, 90s animation, spumco style",
  "名偵探柯南": "Detective Conan style, Case Closed, Gosho Aoyama art style, sharp angular noses, large expressive eyes with specific highlights, 90s anime aesthetic, blue suit influence",
  "木葉村": "Naruto style, Masashi Kishimoto art style, dynamic action lines, cel shaded, ninja aesthetic, detailed eyes, shonen manga style",
  "草帽團": "One Piece style, Eiichiro Oda art style, distinct exaggerated facial proportions, wide grins, vibrant adventure anime style, cross-hatching shading",
  "龍族傳說": "Dragon Ball style, Akira Toriyama art style, muscular definition, spiky hair, angular eyes, action manga aesthetic, 90s shonen anime",
  "史努比": "Peanuts comic style, Charles M. Schulz, shaky ink lines, minimalist character design, simple flat colors, comic strip aesthetic",
  "女頻漫畫": "Otome game style, Shoujo manhua, delicate handsome characters, sparkling atmosphere, highly detailed eyes and hair, romantic lighting, webtoon style",
  "3D國創": "Chinese 3D animation style, Donghua, high quality CGI, perfect skin texture, flowy hair, ethereal fantasy lighting, martial arts aesthetic, detailed costumes",
  "2D漫劇": "Motion comic style, dynamic 2D frames, webtoon aesthetic, dramatic storytelling composition, semi-realistic anime style",

  // --- Urban / Emotion ---
  "都市言情": "Modern romance webtoon style, handsome/beautiful characters, soft lighting, sparkling eyes, fashion magazine aesthetic, glossy finish",
  "韓系都市": "Korean manhwa style, sleek lines, k-pop fashion, detailed hair, vibrant digital coloring, webtoon aesthetic, vertical scroll composition",
  "復古線條都市": "City pop art style, 80s anime city vibe, sharp lines, pastel neon colors, nostalgic atmosphere, night city background",
  "魅惑哥特霓虹": "Neon gothic style, cyberpunk noir, glowing neon lights against dark backgrounds, mysterious allure, high contrast, violet and teal palette",
  "治愈Q萌": "Chibi healing style, super deformed characters, soft pastel colors, fluffy textures, heartwarming atmosphere, kawaii aesthetic",
  "恐怖懸疑": "Junji Ito style, horror manga, heavy black ink lines, spiraling patterns, eerie atmosphere, detailed shading, psychological horror",
  "火柴人": "Stick figure art, minimalist, Alan Becker style, fluid animation lines, simple geometric shapes, expressive poses",
  "潮流都市": "Urban pop art, streetwear fashion, bold vector lines, vibrant flat colors, modern graphic design, skateboard culture influence",
  "歐漫概念藝術": "European comic style, Moebius influence, ligne claire, detailed line work, flat colors, sci-fi fantasy concept art, atmospheric",
  "冷靜感線條": "Technical drawing style, precise thin lines, minimal shading, blueprint aesthetic, clean and architectural, cold color palette",

  // --- Hand Drawn / Art ---
  "國風水墨": "Chinese ink wash painting, Shuimo, splashing ink, brush strokes, elegant void space, black and white with red accents, traditional art, wet ink texture",
  "浮世繪超現實主義": "Surreal Ukiyo-e style, woodblock print texture, traditional Japanese wave patterns, flat perspective, mixed with modern surreal elements, Hokusai influence",
  "油畫釉光": "Oil painting style, thick impasto, glossy glaze, classical art texture, rich deep colors, visible brushwork, baroque lighting",
  "文藝復興古典畫": "Renaissance art style, da Vinci or Michelangelo influence, sfumato technique, realistic anatomy, dramatic chiaroscuro lighting, oil on canvas, cracked paint texture",
  "朦朧印象派": "Impressionist style, Claude Monet style, dabbed brush strokes, light and airy, lack of sharp outlines, capturing the essence of light, pastel palette",
  "莫蘭迪水粉手繪": "Morandi color palette, gouache painting, muted earthy tones, low saturation, matte texture, flat composition, calming aesthetic",
  "炭筆暗黑朋克": "Charcoal drawing, dark punk aesthetic, smudged textures, gritty, high contrast black and white, rough sketch, dirty texture",
  "表現主義兒童涂鴉": "Expressionist child drawing, crayon texture, messy lines, naive art, chaotic colors, raw emotion, basquiat influence",
  "東方淡彩": "Oriental light color style, thin ink lines, diluted watercolor, elegant and ethereal, traditional chinese illustration, soft gradients",
  "空氣彩鉛": "Airy colored pencil style, light pressure, textured paper grain, soft edges, dreamy atmosphere, sketch aesthetic",
  "彩鉛素描插畫": "Colored pencil sketch, visible strokes, cross-hatching, vibrant but textured, hand-drawn illustration style",

  // --- JP Anime ---
  "日系少女漫": "Shojo manga style, large sparkling eyes, flowery background, delicate lines, romantic atmosphere, screentone effects, clamp style",
  "復古賽璐璐懷舊動畫": "90s anime style, cel shading, grain filter, vhs aesthetic, Sailor Moon era, slightly faded colors, hand-painted background",
  "蒸汽波神話糖果治癒系": "Vaporwave aesthetic, greek statues mixed with anime, pastel pink and blue, glitch art, nostalgic 80s computer graphics, lo-fi hip hop vibe",
  
  // --- Color FX ---
  "低飽和平塗手繪": "Low saturation flat illustration, vector art style, clean shapes, minimal shading, muted colors, modern graphic design, corporate memphis style",
  "波普印刷": "Pop Art style, Andy Warhol style, halftone dots, screen printing texture, bold repeating colors, comic book aesthetic, roy lichtenstein style",
  "賽博朋克": "Cyberpunk style, high tech low life, neon blue and magenta, chromatic aberration, futuristic interface elements, rain-slicked streets, blade runner aesthetic",
  "故障藝術": "Glitch art, datamosh, pixel sorting, CRT monitor distortion, digital noise, corrupted image aesthetic, cybercore",
  "蝕刻光影": "Etching style, cross-hatching, engraved line work, bank note style, detailed monochromatic lines, vintage illustration",
  "奇幻平塗": "Fantasy flat illustration, vibrant magic effects, clean vector lines, mobile game art style, cell shaded character",

  // --- Retro / Material ---
  "80s年代": "1980s retro style, synthwave colors, airbrush art, chrome textures, laser grids, retro-futurism, stranger things aesthetic",
  "懷舊膠片": "Vintage film photography, kodak portra 400, film grain, light leaks, slightly blurred edges, nostalgic warmth, polaroid style",
  "像素": "Pixel art, 16-bit style, sprite art, limited color palette, blocky edges, SNES game aesthetic, retro rpg",
  "折紙藝術": "Origami style, paper craft, folded paper textures, sharp geometric creases, soft shadows, paper material, diorama",
  "粘土玩具": "Claymation style, plasticine texture, fingerprints on clay, soft rounded edges, miniature photography, tilt-shift effect, aardman style",
  "光柵像素藝術": "Dithering pixel art, retro pc-98 style, limited color palette, cyberpunk adventure game aesthetic, floyd-steinberg dithering",
  "復古掌機": "Gameboy aesthetic, 4-color green palette, pixel art, dot matrix grid, low resolution, nostalgic gaming",
  "迷幻復古都市": "Psychedelic retro city, acid colors, swirling patterns, 70s poster art, trippy visual effects, urban setting"
};

// --- Chinese Descriptions Dictionary (Used for UI Display) ---
const STYLE_DICTIONARY_CN: Record<string, string> = {
  // --- Classic Anime ---
  "三渲二": "三維渲染二維風格，具有動畫審美的3D建模特徵，鋒利的陰影邊緣，類似《罪惡裝備》或Arc System Works的美術風格。",
  "JoJo的奇妙冒險": "《JoJo的奇妙冒險》荒木飛呂彥畫風，粗獷的黑色輪廓線，戲劇性的陰影，詳細的肌肉線條，壓迫感的擬聲字特效，鮮豔的色彩與時尚姿勢。",
  "辛普森家庭": "《辛普森家庭》美式卡通風格，馬特·格勒寧畫風，黃色皮膚，凸出的眼睛，微凸的暴牙，2D平面卡通，幽默喜劇氛圍。",
  "吉卜力": "吉卜力工作室風格，宮崎駿美術風格，手繪水粉背景，柔和的色彩，賽璐璐動畫質感，充滿奇思妙想，細節豐富的環境。",
  "藤本樹": "藤本樹（鏈鋸人）畫風，粗糙的素描線條，高對比度，電影般的構圖，略帶黑暗與混亂的氛圍，強烈的情感表達。",
  "吊帶襪女孩": "《Panty & Stocking》風格，粗獷的鋸齒狀輪廓，美式卡通影響，鮮豔的波普色彩，稜角分明的角色設計，向量藝術風格。",
  "動森": "《動物森友會》風格，低多邊形可愛3D，柔和的材質貼圖，圓潤的形狀，任天堂美術風格，舒適溫馨的氛圍。",
  "樂高": "樂高人偶風格，塑膠材質質感，塊狀形狀，C型手，3D渲染，光澤塑膠表面，玩具攝影感。",
  "比奇堡": "《海綿寶寶》風格，海洋卡通，粗獷多彩的輪廓線，誇張的表情，Nickelodeon頻道風格，水下美學。",
  "蠟筆小新": "《蠟筆小新》風格，臼井儀人畫風，扭曲的比例，粗獷的波浪輪廓線，簡單的平塗色彩，極簡主義喜劇。",
  "萊卡定格動畫": "萊卡工作室（Laika）風格，《第十四道門》風格，定格黏土動畫，黏土紋理，木偶美學，電影級打光，略帶怪誕感。",
  "銹湖": "《銹湖》(Rusty Lake) 風格，超現實手繪，平面透視，維多利亞哥德式影響，恐怖谷效應，柔和的地球色調，密室逃脫遊戲藝術。",
  "美式肌肉諷刺卡通": "《Ren and Stimpy》風格，特寫鏡頭，超精細的靜脈和肌肉，誇張怪誕的卡通，90年代動畫，Spumco風格。",
  "名偵探柯南": "《名偵探柯南》風格，青山剛昌畫風，尖銳的鼻子線條，大而富有表情的眼睛（特定高光），90年代動畫審美，藍色西裝元素。",
  "木葉村": "《火影忍者》風格，岸本齊史畫風，動態的動作線條，賽璐璐上色，忍者美學，細緻的眼睛描繪，少年漫畫風格。",
  "草帽團": "《航海王》(One Piece) 風格，尾田榮一郎畫風，獨特誇張的面部比例，大笑嘴型，充滿活力的冒險動畫風格，排線陰影。",
  "龍族傳說": "《七龍珠》風格，鳥山明畫風，清晰的肌肉線條，刺蝟頭，稜角分明的眼睛，動作漫畫美學，90年代少年動畫。",
  "史努比": "《花生漫畫》(Snoopy) 風格，舒茲畫風，抖動的墨水線條，極簡角色設計，簡單平塗色彩，報紙四格漫畫美學。",
  "女頻漫畫": "乙女遊戲/少女漫風格，精緻俊美的角色，閃閃發光的氛圍，極其細緻的眼睛和頭髮，浪漫的打光，韓漫Webtoon風格。",
  "3D國創": "國產3D動畫風格（國漫），高品質CGI，完美的皮膚質感，飄逸的頭髮，空靈的玄幻打光，武俠仙俠美學，精緻的服裝細節。",
  "2D漫劇": "動態漫畫風格，動態的2D分鏡，Webtoon美學，戲劇性的敘事構圖，半寫實動漫風格。",

  // --- Urban / Emotion ---
  "都市言情": "現代言情條漫風格，俊男美女角色，柔和的打光，閃亮的眼睛，時尚雜誌美學，光澤質感。",
  "韓系都市": "韓式條漫(Manhwa)風格，流暢的線條，K-pop時尚，細緻的頭髮，鮮豔的數位上色，垂直捲軸構圖。",
  "復古線條都市": "City Pop藝術風格，80年代動漫城市氛圍，銳利的線條，粉彩霓虹色調，懷舊氛圍，夜景城市背景。",
  "魅惑哥特霓虹": "霓虹哥德風格，賽博龐克黑色電影，暗色背景下的發光霓虹燈，神秘的誘惑感，高對比度，紫羅蘭色與青色調。",
  "治愈Q萌": "Q版治癒系風格，二頭身角色，柔和的粉彩色調，毛茸茸的質感，溫馨暖心的氛圍，卡哇伊美學。",
  "恐怖懸疑": "伊藤潤二風格，恐怖漫畫，厚重的黑色墨線，漩渦狀圖案，怪誕氛圍，細緻的陰影，心理恐懼。",
  "火柴人": "火柴人藝術，極簡主義，Alan Becker風格，流暢的動畫線條，簡單幾何形狀，富有表現力的姿勢。",
  "潮流都市": "都市波普藝術，街頭時尚，大膽的向量線條，鮮豔的平塗色彩，現代平面設計，滑板文化影響。",
  "歐漫概念藝術": "歐洲漫畫風格，墨比斯(Moebius)影響，清晰線條(Ligne Claire)，細緻的線稿，平塗色彩，科幻奇幻概念藝術。",
  "冷靜感線條": "工程製圖風格，精確的細線，極少陰影，藍圖美學，乾淨且具建築感，冷色調。",

  // --- Hand Drawn ---
  "國風水墨": "中國水墨畫風格，潑墨，毛筆筆觸，優雅的留白，黑白為主點綴紅色，傳統藝術，濕潤的墨水質感。",
  "浮世繪超現實主義": "超現實浮世繪風格，木版畫紋理，傳統日本波浪圖案，平面透視，混合現代超現實元素，葛飾北齋影響。",
  "油畫釉光": "油畫風格，厚塗顏料(Impasto)，光澤釉面，古典藝術質感，濃郁深沉的色彩，可見的筆觸，巴洛克式打光。",
  "文藝復興古典畫": "文藝復興藝術風格，達文西或米開朗基羅影響，暈塗法(Sfumato)，寫實解剖學，戲劇性的明暗對照法(Chiaroscuro)，畫布油畫。",
  "朦朧印象派": "印象派風格，克勞德·莫內風格，點彩筆觸，輕盈通透，缺乏銳利輪廓，捕捉光影的本質，粉彩調色盤。",
  "莫蘭迪水粉手繪": "莫蘭迪色系，不透明水彩(Gouache)繪畫，柔和的地球色調，低飽和度，啞光質感，平面構圖，寧靜美學。",
  "炭筆暗黑朋克": "炭筆素描，黑暗龐克美學，塗抹的紋理，粗糙顆粒感，高對比度黑白，粗略速寫，髒髒的質感。",
  "表現主義兒童涂鴉": "表現主義兒童畫，蠟筆紋理，凌亂的線條，原生藝術，混亂的色彩，原始情感，巴斯奇亞影響。",
  "東方淡彩": "東方淡彩風格，纖細的墨線，稀釋的水彩，優雅空靈，傳統插畫，柔和的漸層。",
  "空氣彩鉛": "空氣感彩鉛風格，輕柔的筆觸，紋理紙張顆粒，柔和邊緣，夢幻氛圍，速寫美學。",
  "彩鉛素描插畫": "彩色鉛筆素描，可見的筆觸，排線技法，鮮豔但具紋理感，手繪插畫風格。",

  // --- JP Anime ---
  "日系少女漫": "少女漫畫風格，巨大的閃亮眼睛，花朵背景，纖細的線條，浪漫氛圍，網點紙效果，Clamp風格。",
  "復古賽璐璐懷舊動畫": "90年代動畫風格，賽璐璐上色，顆粒濾鏡，VHS錄影帶美學，美少女戰士年代，略微褪色的色彩，手繪背景。",
  "蒸汽波神話糖果治癒系": "蒸汽波(Vaporwave)美學，希臘雕像混合動漫元素，粉彩粉紅與藍色，故障藝術，懷舊80年代電腦圖形，Lo-fi氛圍。",
  
  // --- Color FX ---
  "低飽和平塗手繪": "低飽和平塗插畫，向量藝術風格，乾淨的形狀，極少陰影，柔和色彩，現代平面設計，企業曼菲斯(Corporate Memphis)風格。",
  "波普印刷": "波普藝術風格，安迪·沃荷風格，半色調網點，絲網印刷紋理，大膽的重複色彩，漫畫書美學。",
  "賽博朋克": "賽博龐克風格，高科技低生活，霓虹藍與洋紅，色差故障，未來主義介面元素，雨後濕滑的街道，銀翼殺手美學。",
  "故障藝術": "故障藝術(Glitch Art)，像素排序，CRT顯示器失真，數位噪點，損壞的圖像美學，Cybercore。",
  "蝕刻光影": "蝕刻版畫風格，交叉排線，雕刻線條，鈔票風格，細緻的單色線條，復古插畫。",
  "奇幻平塗": "奇幻平塗插畫，鮮豔的魔法特效，乾淨的向量線條，手遊美術風格，賽璐璐角色。",

  // --- Retro / Material ---
  "80s年代": "80年代復古風格，合成器波(Synthwave)色彩，噴槍藝術，鉻金屬質感，雷射網格，復古未來主義。",
  "懷舊膠片": "復古底片攝影，Kodak Portra 400，膠片顆粒，漏光效果，略微模糊的邊緣，懷舊溫暖感，拍立得風格。",
  "像素": "像素藝術，16-bit風格，精靈圖(Sprite)藝術，有限調色盤，塊狀邊緣，SNES遊戲美學，復古RPG。",
  "折紙藝術": "摺紙風格，紙工藝，摺疊紙張紋理，銳利的幾何摺痕，柔和陰影，紙張材質，立體透視模型。",
  "粘土玩具": "黏土動畫風格，橡皮泥質感，黏土上的指紋，柔和圓潤的邊緣，微縮模型攝影，移軸效果，阿德曼風格。",
  "光柵像素藝術": "抖動像素藝術(Dithering)，復古PC-98風格，有限調色盤，賽博龐克冒險遊戲美學。",
  "復古掌機": "Gameboy美學，4色綠色調色盤，像素藝術，點陣網格，低解析度，懷舊遊戲感。",
  "迷幻復古都市": "迷幻復古城市，酸性色彩，漩渦狀圖案，70年代海報藝術，致幻視覺效果，都市背景。"
};

// Base descriptions per category (Fallback for Chinese)
const CATEGORY_DESCRIPTIONS_CN: Record<string, string> = {
  'classic-anime': "經典動漫風格，具有獨特的角色設計與傳統2D動畫美學。",
  'urban-emotion': "都市漫畫風格，細緻的角色插畫，現代條漫(Webtoon)美學。",
  'hand-drawn': "傳統藝術媒介，可見的紙張與筆觸紋理，手繪質感，藝術性詮釋。",
  'jp-anime': "日系動漫風格，高品質的動漫角色，賽璐璐上色，細緻的眼部描繪。",
  'color-fx': "藝術性的色彩分級，視覺特效，風格化插畫，獨特的打光。",
  'retro': "復古美學，懷舊材質紋理，風格化渲染，充滿年代感的氛圍。"
};

// Base prompts per category (Fallback for English)
const CATEGORY_PROMPTS: Record<string, string> = {
  'classic-anime': "classic anime style, distinct character design, 2D animation style",
  'urban-emotion': "urban comic style, detailed character illustration, modern webtoon aesthetic",
  'hand-drawn': "traditional artistic medium, visible texture, hand-drawn quality, artistic interpretation",
  'jp-anime': "japanese anime style, high quality anime character, cel shading, detailed eyes",
  'color-fx': "artistic color grading, visual effects, stylized illustration, unique lighting",
  'retro': "retro aesthetic, vintage material texture, stylized rendering, nostalgic vibe"
};

// Helper to construct the full prompt
const buildPrompt = (name: string, categoryId: string): string => {
  const specificDesc = STYLE_DICTIONARY[name];
  const categoryDesc = CATEGORY_PROMPTS[categoryId] || "artistic style";
  const styleDescription = specificDesc ? specificDesc : `${name} art style, ${categoryDesc}`;
  return `A masterpiece portrait of a character in ${styleDescription}. Best quality, highly detailed, expressive features, 8k resolution, distinct visual identity of ${name}.`;
};

// Helper to construct the full Chinese description
const buildDescriptionCN = (name: string, categoryId: string): string => {
  const specificDesc = STYLE_DICTIONARY_CN[name];
  const categoryDesc = CATEGORY_DESCRIPTIONS_CN[categoryId] || "藝術風格";
  // If specific CN desc exists, use it. Otherwise use generic category desc + name.
  return specificDesc ? specificDesc : `${name} 風格，${categoryDesc}`;
};

const createItems = (category: string, listStr: string): StyleItem[] => {
  return listStr.split(/,|，/).map((s) => {
    const name = s.trim();
    return {
      id: `${category}-${name}`,
      name: name,
      category: category,
      prompt: buildPrompt(name, category),
      descriptionCN: buildDescriptionCN(name, category),
    };
  }).filter(i => i.name.length > 0);
};

// Raw Data Strings (Unchanged)
const CLASSIC_ANIME_STR = "三渲二， 女頻漫畫， JoJo的奇妙冒險， 辛普森家庭， 吉卜力， 3D國創， 2D漫劇， 木葉村， 藤本樹， 吊帶襪女孩， 名偵探柯南， 草帽團， 動森， 樂高， 比奇堡， 蠟筆小新， 龍族傳說， 史努比， 萊卡定格動畫， 銹湖， 美式肌肉諷刺卡通";
const URBAN_EMOTION_STR = "都市言情, 韓系都市, 潮流都市, 復古線條都市, 複雜線條都市漫, 都市潮漫硬邊撞色, 魅惑哥特霓虹, 治愈Q萌, 溫暖治愈Q版, 治癒柔和Q版, 治愈童趣顆粒彩鉛, 治愈冒險漫畫, 清新童趣Q版, 粗線超級Q版, 活力萌系賽璐璐, Q版草繪, Q版3D, 莫蘭迪Q版, 粗線潮流Q版, 日本小人, 火柴人, 歐漫概念藝術, 美式粗線漫畫, 經典美式漫畫, 韓式漫畫厚塗, 卡通平塗漫畫, 冷靜感線條, 空靈現實, 恐怖懸疑";
const HAND_DRAWN_STR = "手繪, 國風水墨, 東方淡彩, 東方古典裝飾, 浮世繪超現實主義, 油畫釉光, 文藝復興古典畫, 朦朧印象派, 莫蘭迪水粉手繪, 柔光浪漫水彩筆觸, 清新水彩墨線, 輕復古水彩, 戲劇光影水彩色塊, 生動水彩圖形, 水粉童書插畫, 奶油色繪本, 詭萌幻想繪本, 炭筆暗黑朋克, 彩鉛素描插畫, 空氣彩鉛, 質樸蠟筆, 童趣蠟筆插畫, 表現主義兒童涂鴉, 單色排線素描, 彩色排線手繪, Q萌馬克筆著色, 顆粒粉彩童話風, 甜美粉彩, 怪萌墨線, 粗獷墨線, 粗線塊面卡通, 粗糙顆粒肌理版畫, 墨線卡通, 簡約扁平手繪卡通";
const JP_ANIME_STR = "日系風格， 三渲二， 吉卜力， 木葉村， 藤本樹， 名偵探柯南， 草帽團， 日本小人， 龍族傳說， 日式少女漫， 空氣彩鉛， 復古日式， 復古夢幻賽璐璐， 復古賽璐璐懷舊動畫， 輕復古水彩， 活力萌系賽璐璐， 硬邊萌系賽璐璐， 粗獷硬邊賽璐璐， 日式少女漫空氣鉛彩光影平塗， 東方古典裝飾， 蒸汽波神話糖果治癒系";
const COLOR_FX_STR = "低飽和平塗手繪, 柔光平塗, 光影平塗, 奇幻平塗, 柔和光影厚塗卡通, 通透光影厚塗, 通透柔光厚塗, 柔光原畫厚塗, 厚塗柔光懷舊, 抒情柔光線條, 唯美柔光輻射, 發光線條柔光, 虹彩夢幻治愈水彩, 甜美可愛復古波普, 極簡色塊復古波普, 波普印刷, 風格化撞色賽博, 高對比硬邊緣圖形, 稜鏡故障藝術, 褪色顆粒懷舊, 美式顆粒, 蝕刻光影, 古典戲劇情緒光影, 經典影視感氛圍光影, 懷舊電影感氛圍光影, 復古彩光, 通透光澤馬卡龍, 可愛馬卡龍, 唯美清新通透, 夢幻線條怪誕";
const RETRO_MATERIAL_STR = "80s年代, 五零年代, 復古日式, 輕復古, 懷舊膠片, 復古褪色速寫, 復古線條都市, 迷幻復古都市, 朦朧暖色速寫, 童趣速寫, 粗線活力動感卡通, 高能動感卡通, 扁平涂鴉, 可愛抽象涂鴉, 矢量扁平色塊, 扁平圖形設計, 空靈哥特, 怪誕哥特卡通, 邪魅琉璃, 粘土玩具, 毛絨玩具質感, 折紙藝術, 方塊世界, 像素, 光柵像素藝術, 復古掌機";

export const CATEGORIES: Category[] = [
  {
    id: 'classic-anime',
    name: '經典動漫風格',
    icon: '📺',
    items: createItems('classic-anime', CLASSIC_ANIME_STR),
  },
  {
    id: 'urban-emotion',
    name: '都市、情感與角色',
    icon: '🏙️',
    items: createItems('urban-emotion', URBAN_EMOTION_STR),
  },
  {
    id: 'hand-drawn',
    name: '手繪藝術質感',
    icon: '🖌️',
    items: createItems('hand-drawn', HAND_DRAWN_STR),
  },
  {
    id: 'jp-anime',
    name: '日系與動漫風格',
    icon: '🇯🇵',
    items: createItems('jp-anime', JP_ANIME_STR),
  },
  {
    id: 'color-fx',
    name: '色彩、光影與特效',
    icon: '✨',
    items: createItems('color-fx', COLOR_FX_STR),
  },
  {
    id: 'retro',
    name: '復古與特殊材質',
    icon: '🎞️',
    items: createItems('retro', RETRO_MATERIAL_STR),
  },
];

// Default Favorites List
const DEFAULT_FAV_STR = "賽博朋克、鏽湖 (Rusty Lake)、復古彩光、彩色排線手繪、莫蘭迪水粉手繪、清新童趣Q版、甜美粉彩、治癒冒险漫画、復古線條都市、高能動感卡通、夢幻線條怪誕、通透光澤馬卡龍、通透光影厚塗、簡約扁平手繪卡通、油畫釉光、低飽和平塗手繪、潮流都市、蝕刻光影、80s年代、冷靜感線條、懷舊膠片線條、復古褪色速寫、歐漫概念藝術、輕復古水彩、 轻复古水彩、卡通平塗漫畫、戲劇光影水彩色塊、奇幻平塗、抒情柔光線條、墨線卡通、活力萌系賽璐璐, 硬邊萌系賽璐璐, 粗獷硬邊賽璐璐, 日式少女漫空氣彩鉛光影平塗、唯美清新通透、發光線條柔光、清新水彩墨線";

const rawDefaultFavs = DEFAULT_FAV_STR.split(/,|，|、/).map(s => s.trim().replace(/\s*\(.*?\)/, ''));

export const INITIAL_FAVORITE_IDS: string[] = [];

CATEGORIES.forEach(cat => {
  cat.items.forEach(item => {
    const isFav = rawDefaultFavs.some(favName => item.name.includes(favName) || favName.includes(item.name));
    if (isFav) {
      INITIAL_FAVORITE_IDS.push(item.id);
    }
  });
});