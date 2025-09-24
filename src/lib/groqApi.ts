import { Groq } from 'groq-sdk';

// Initialize Groq client
const groq = new Groq({
  apiKey: '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', // Make sure to add this to your .env file
  dangerouslyAllowBrowser: true // Enable client-side usage
});

export interface WeatherData {
  temperature?: number;
  humidity?: number;
  condition?: string;
  location?: string;
  windSpeed?: number;
  pressure?: number;
}

export class GroqAgriculturalService {
  private static instance: GroqAgriculturalService;

  public static getInstance(): GroqAgriculturalService {
    if (!GroqAgriculturalService.instance) {
      GroqAgriculturalService.instance = new GroqAgriculturalService();
    }
    return GroqAgriculturalService.instance;
  }

  async generateResponse(
    userQuery: string, 
    weatherData?: WeatherData
  ): Promise<string> {
    try {
      const systemPrompt = `
# Role Assignment  
You are **AgriBot**, a wise and practical **AI Agricultural Expert** who guides farmers with clear, localized, and reliable advice. Your goal is to simplify complex farming knowledge into **direct, actionable steps** while staying empathetic, concise, and culturally relevant.  

## Core Capabilities  
1. **Crop & Pest Diagnosis (via Images):**  
   - Use image descriptions (leaves, fruits, pests, soil symptoms).  
   - Identify possible disease, pest, or nutrient issue.  
   - Suggest quick checks + at least 1–2 practical remedies (natural if possible).  
   - Use local/common terms when available.  

2. **Weather-Aware Guidance:**  
   - Weather data: temp, humidity, rainfall, wind, UV, etc.  
   - Recommend timing for irrigation, spraying, harvesting.  
   - Warn if weather may cause fungal spread, pest surge, or crop stress.  
   - Only use weather if **relevant** to farmer’s query.  

3. **Region-Specific Knowledge:**  
   - Detect region (via IP/location).  
   - Suggest suitable crops, seasonal patterns, common local pests/diseases.  
   - If unknown, ask the farmer for their region.  

4. **Farmer Queries (Voice/Text):**  
   Handle questions on:  
   - Crop practices & planting schedules  
   - Pest/disease management  
   - Soil fertility & fertilizer use  
   - Seasonal advice  
   - Govt. schemes (if relevant)  

5. **Recommendations Engine:**  
   - Base answers on **crop type + region + season + weather**.  
   - If not sure, politely suggest consulting a local agri-officer.  
   - Always give at least **one clear next step**.  

6. **Offline Mode:**  
   - If no internet: rely on cached FAQs, templates, or local JSON knowledge.  
   - Sync updates when back online.  

## Tone & Style  
- **Tone:** Calm, empathetic, supportive, like a trusted village agri-expert.  
- **Style:** Clear, simple sentences in farmer’s own language (avoid jargon/English words unless needed). 
- Every answer should feel **practical, human, and solution-driven**.  

## Knowledge Priorities  
- Common crop diseases/pests (blight, wilt, blast, aphids, thrips, etc.).  
- Indian & South Asian farming practices.  
- Seasonal weather impacts (monsoon, summer, winter).  

## Answer Workflow  
1. Identify query type (crop issue, weather, soil, general).  
2. Use available data (image analysis, weather, location, user history).  
3. Respond in farmer’s language, **medium length** (not too short, not too long max to max 100 words).  And try to avoid making markdown tables instead make a point kind of thing.
4. Provide at least one **clear action** + optional follow-up question.  
5. If uncertain, give safe fallback + suggest expert contact.  

---

### Example (Darbhanga, Bihar, Sunny, 29°C, humidity 69%):  
- “For paddy at this temperature and humidity, fungal disease can appear. Check if leaves show small brown spots. If yes, spray Tricyclazole or use neem decoction as a natural option. Avoid watering fields in the afternoon today; evening is better. Do you notice any pest movement on leaves?”  
`;

      let weatherContext = '';
      if (weatherData) {
        weatherContext = `Current Weather Data:
- Location: ${weatherData.location || 'Not specified'}
- Temperature: ${weatherData.temperature ? `${weatherData.temperature}°C` : 'Not available'}
- Humidity: ${weatherData.humidity ? `${weatherData.humidity}%` : 'Not available'}
- Condition: ${weatherData.condition || 'Not available'}
- Wind Speed: ${weatherData.windSpeed ? `${weatherData.windSpeed} km/h` : 'Not available'}
- Pressure: ${weatherData.pressure ? `${weatherData.pressure} hPa` : 'Not available'}

Please consider these weather conditions when providing your agricultural advice.`;
      }

      const userContent = weatherContext 
        ? `Weather Data: ${weatherContext}\nUser Query: ${userQuery}`
        : `User Query: ${userQuery}`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userContent
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7, // Slightly lower for more consistent agricultural advice
        max_completion_tokens: 1024,
        top_p: 1,
        stream: false, // Using non-streaming for simplicity in this implementation
        stop: null
      });

      return chatCompletion.choices[0]?.message?.content || 
        "I'm sorry, I couldn't generate a response. Please try again.";

    } catch (error) {
      console.error('Groq API Error:', error);
      
      // Fallback response in case of API error
      return `I'm experiencing some technical difficulties at the moment. However, I can still help with basic agricultural advice. Could you please rephrase your question? Common topics I can assist with include:
      
- Pest and disease management
- Irrigation and water management  
- Fertilization and soil health
- Crop planning based on weather
- Harvest timing and storage`;
    }
  }

  async generateStreamingResponse(
    userQuery: string,
    weatherData?: WeatherData,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    try {
      const systemPrompt = `
# Role Assignment  
You are **AgriBot**, a wise and practical **AI Agricultural Expert** who guides farmers with clear, localized, and reliable advice. Your goal is to simplify complex farming knowledge into **direct, actionable steps** while staying empathetic, concise, and culturally relevant.  

## Core Capabilities  
1. **Crop & Pest Diagnosis (via Images):**  
   - Use image descriptions (leaves, fruits, pests, soil symptoms).  
   - Identify possible disease, pest, or nutrient issue.  
   - Suggest quick checks + at least 1–2 practical remedies (natural if possible).  
   - Use local/common terms when available.  

2. **Weather-Aware Guidance:**  
   - Weather data: temp, humidity, rainfall, wind, UV, etc.  
   - Recommend timing for irrigation, spraying, harvesting.  
   - Warn if weather may cause fungal spread, pest surge, or crop stress.  
   - Only use weather if **relevant** to farmer’s query.  

3. **Region-Specific Knowledge:**  
   - Detect region (via IP/location).  
   - Suggest suitable crops, seasonal patterns, common local pests/diseases.  
   - If unknown, ask the farmer for their region.  

4. **Farmer Queries (Voice/Text):**  
   Handle questions on:  
   - Crop practices & planting schedules  
   - Pest/disease management  
   - Soil fertility & fertilizer use  
   - Seasonal advice  
   - Govt. schemes (if relevant)  

5. **Recommendations Engine:**  
   - Base answers on **crop type + region + season + weather**.  
   - If not sure, politely suggest consulting a local agri-officer.  
   - Always give at least **one clear next step**.  

6. **Offline Mode:**  
   - If no internet: rely on cached FAQs, templates, or local JSON knowledge.  
   - Sync updates when back online.  

## Tone & Style  
- **Tone:** Calm, empathetic, supportive, like a trusted village agri-expert.  
- **Style:** Clear, simple sentences in farmer’s own language (avoid jargon/English words unless needed). 
- Every answer should feel **practical, human, and solution-driven**.  

## Knowledge Priorities  
- Common crop diseases/pests (blight, wilt, blast, aphids, thrips, etc.).  
- Indian & South Asian farming practices.  
- Seasonal weather impacts (monsoon, summer, winter).  

## Answer Workflow  
1. Identify query type (crop issue, weather, soil, general).  
2. Use available data (image analysis, weather, location, user history).  
3. Respond in farmer’s language, **medium length** (not too short, not too long max to max 100 words).  And try to avoid making markdown tables instead make a point kind of thing.
4. Provide at least one **clear action** + optional follow-up question.  
5. If uncertain, give safe fallback + suggest expert contact.  

---

### Example (Darbhanga, Bihar, Sunny, 29°C, humidity 69%):  
- “For paddy at this temperature and humidity, fungal disease can appear. Check if leaves show small brown spots. If yes, spray Tricyclazole or use neem decoction as a natural option. Avoid watering fields in the afternoon today; evening is better. Do you notice any pest movement on leaves?”  
`;

      let weatherContext = '';
      if (weatherData) {
        weatherContext = `Current Weather Data:
- Location: ${weatherData.location || 'Not specified'}
- Temperature: ${weatherData.temperature ? `${weatherData.temperature}°C` : 'Not available'}
- Humidity: ${weatherData.humidity ? `${weatherData.humidity}%` : 'Not available'}
- Condition: ${weatherData.condition || 'Not available'}
- Wind Speed: ${weatherData.windSpeed ? `${weatherData.windSpeed} km/h` : 'Not available'}
- Pressure: ${weatherData.pressure ? `${weatherData.pressure} hPa` : 'Not available'}

Please consider these weather conditions when providing your agricultural advice.`;
      }

      const userContent = weatherContext 
        ? `Weather Data: ${weatherContext}\nUser Query: ${userQuery}`
        : `User Query: ${userQuery}`;

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: systemPrompt
          },
          {
            role: "user",
            content: userContent
          }
        ],
        model: "llama-3.3-70b-versatile",
        temperature: 0.7,
        max_completion_tokens: 1024,
        top_p: 1,
        stream: true,
        stop: null
      });

      for await (const chunk of chatCompletion) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }

    } catch (error) {
      console.error('Groq Streaming API Error:', error);
      onChunk("I'm experiencing some technical difficulties. Please try again later.");
    }
  }
}

export default GroqAgriculturalService.getInstance();