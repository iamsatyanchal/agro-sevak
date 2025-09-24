# Groq AI Integration Setup Guide

## Overview
This project now uses Groq AI API for agricultural chat functionality instead of mock responses. The AI provides intelligent, weather-aware agricultural advice.

## Setup Instructions

### 1. Install Groq SDK
```bash
# Using npm
npm install groq-sdk

# Using bun
bun add groq-sdk
```

### 2. Get Groq API Key
1. Visit [https://console.groq.com](https://console.groq.com)
2. Sign up or log in to your account
3. Go to API Keys section
4. Generate a new API key
5. Copy the API key

### 3. Environment Configuration
1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Add your Groq API key to `.env`:
   ```
   VITE_GROQ_API_KEY=gsk_your_actual_groq_api_key_here
   ```

### 4. Features

#### Weather-Aware AI Responses
The AI now considers current weather data when providing agricultural advice:
- Temperature-based crop recommendations
- Humidity considerations for disease prevention  
- Weather-specific irrigation advice
- Storm and extreme weather guidance

#### Streaming Responses
- Real-time AI response streaming for better UX
- Visual streaming indicator with cursor animation
- Fallback to non-streaming mode if needed

#### Advanced Agricultural Knowledge
The AI is trained to provide expert advice on:
- Crop management and planning
- Pest and disease identification/treatment
- Irrigation and water management
- Soil health and fertilization
- Weather-based farming decisions
- Seasonal planning and harvest timing

## Usage

### Basic Chat
Users can ask any agricultural question and get intelligent responses.

### Weather Integration
The AI automatically considers current weather conditions from the user's location when providing advice.

### Voice Input
Voice input functionality remains unchanged and works with the new AI system.

## Technical Details

### Files Modified
- `src/hooks/useAgriculturalChat.tsx` - Updated to use Groq API
- `src/lib/groqApi.ts` - New Groq service implementation
- `src/pages/AgriculturalChat.tsx` - Added streaming indicator

### API Configuration
- Model: `llama-3.3-70b-versatile`
- Temperature: 0.7 (balanced creativity/consistency)
- Max tokens: 1024
- Streaming: Enabled for better UX

## Error Handling

The implementation includes robust error handling:
- Network connectivity issues
- API rate limits
- Invalid API keys
- Graceful fallback to basic responses

## Security

- API key is stored in environment variables
- Client-side usage is enabled with proper configuration
- No sensitive data is logged

## Troubleshooting

### API Key Issues
- Ensure API key is correctly set in `.env` file
- Verify the key is valid on Groq console
- Check browser console for authentication errors

### Network Issues
- Check internet connectivity
- Verify Groq API is accessible
- Look for CORS issues in browser console

### Streaming Issues
- If streaming fails, the system falls back to non-streaming
- Check browser compatibility for streaming responses
- Ensure stable internet connection

## Development

To run the project:
```bash
npm run dev
# or
bun dev
```

The agricultural chat will now use real AI responses with weather integration!