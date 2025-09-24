import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LocationWeatherProvider } from "./hooks/useLocationWeather";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Home } from "./pages/Home";
import { AgriculturalChat } from "./pages/AgriculturalChat";
import { CropDiagnosis } from "./pages/CropDiagnosis";
import { Weather } from "./pages/Weather";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import { Assessment } from "./pages/Assessment";
import { Results } from "./pages/Results";
import { Advice } from "./pages/Advice";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LocationWeatherProvider>
        <TooltipProvider>
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<AgriculturalChat />} />
              <Route path="/diagnosis" element={<CropDiagnosis />} />
              <Route path="/weather" element={<Weather />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              {/* Legacy routes for backward compatibility */}
              <Route path="/assessment" element={<Assessment />} />
              <Route path="/results" element={<Results />} />
              <Route path="/advice" element={<Advice />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LocationWeatherProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
