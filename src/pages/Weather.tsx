import { useLocationWeather } from "../hooks/useLocationWeather";
import { MobileLayout } from "../components/layout/MobileLayout";
import { formatLocation, getAirQualityStatus } from "../lib/locationWeatherApi";
import { 
  CloudRain, 
  Thermometer, 
  Eye, 
  Wind, 
  Drop, 
  Sun, 
  Gauge,
  ArrowFatUp,
  ArrowFatDown,
  Leaf,
  MapPin,
  Clock
} from "@phosphor-icons/react";

export const Weather = () => {
  const { coords, weather, isLoading, error, refreshData } = useLocationWeather();

  if (isLoading) {
    return (
      <MobileLayout currentPage="weather">
        <div className="flex flex-col items-center justify-center h-[35rem] p-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <CloudRain weight="duotone" size={32} className="text-primary" />
          </div>
          <p className="text-text-secondary">Loading weather data...</p>
        </div>
      </MobileLayout>
    );
  }

  if (error || !weather) {
    return (
      <MobileLayout currentPage="weather">
        <div className="flex flex-col items-center justify-center p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <CloudRain weight="duotone" size={32} className="text-red-600" />
          </div>
          <p className="text-red-600 text-center mb-4">
            {error || "Unable to load weather data"}
          </p>
          <button 
            onClick={refreshData}
            className="bg-primary text-white px-4 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </MobileLayout>
    );
  }

  const { current } = weather;
  const airQuality = getAirQualityStatus(current.air_quality["us-epa-index"]);

  return (
    <MobileLayout currentPage="weather">
      <div className="p-4 space-y-6">
        {/* Header with Location */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <MapPin weight="duotone" size={20} className="text-text-secondary" />
            <h1 className="text-xl font-semibold text-text-primary">
              {formatLocation(weather)}
            </h1>
          </div>
          {/* <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
            <Clock weight="duotone" size={16} />
            <span>Last updated: {current.observation_time}</span>
          </div> */}
        </div>

      {/* Current Weather */}
<div className="bg-surface border border-card-border rounded-xl p-5 transition-all duration-300">
  {/* Temperature + Icon */}
  <div className="flex items-center justify-between mb-4">
    {/* Left Side: Temperature */}
    <div>
      <h2 className="text-3xl font-bold text-primary">{current.temp_c}°C</h2>
      <p className="text-text-secondary text-sm">
        Feels like <span className="font-medium">{current.feelslike_c}°C</span>
      </p>
      <p className="text-text-secondary text-sm">
        Last Updated:<span className="font-medium">{current.last_updated}</span>
      
      </p>
    </div>

    {/* Right Side: Icon + Description */}
    <div className="flex flex-col items-center">
      <img
        src={current.condition.icon.startsWith('//') ? 'https:' + current.condition.icon : current.condition.icon}
        alt={current.condition.text}
        className="w-14 h-14 mb-1 rounded-lg shadow-sm"
      />
      <p className="text-text-secondary text-sm font-medium capitalize">
        {current.condition.text}
      </p>
    </div>
  </div>
</div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Wind weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">Wind</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">
              {current.wind_kph} km/h {current.wind_dir}
            </p>
          </div>

          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Drop weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">Humidity</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">{current.humidity}%</p>
          </div>

          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Eye weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">Visibility</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">{current.vis_km} km</p>
          </div>

          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Gauge weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">Pressure</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">{current.pressure_mb} mb</p>
          </div>

          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Sun weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">UV Index</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">{current.uv}</p>
          </div>

          <div className="bg-surface border border-card-border rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <CloudRain weight="duotone" size={20} className="text-text-secondary" />
              <span className="font-medium text-text-primary text-base">Precip.</span>
            </div>
            <p className="text-text-secondary font-normal text-md mt-1 line-clamp-2">{current.precip_mm} mm</p>
          </div>
        </div>

        {/* Air Quality */}
        <div className="bg-surface border border-card-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Leaf weight="duotone" size={20} className="text-text-secondary" />
            <h3 className="font-semibold text-text-primary">Air Quality</h3>
          </div>
          <div className="space-y-2">
            <div className="flex justify-start gap-2 items-center">
              <span className="text-text-secondary">Status:</span>
              <span className={`font-semibold ${airQuality.color}`}>
                {airQuality.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-start gap-2">
                <span className="text-text-secondary">PM2.5:</span>
                <span className="text-text-primary">{current.air_quality.pm2_5} μg/m³</span>
              </div>
              <div className="flex justify-start gap-2">
                <span className="text-text-secondary">PM10:</span>
                <span className="text-text-primary">{current.air_quality.pm10} μg/m³</span>
              </div>
              <div className="flex justify-start gap-2">
                <span className="text-text-secondary">O3:</span>
                <span className="text-text-primary">{current.air_quality.o3} μg/m³</span>
              </div>
              <div className="flex justify-start gap-2">
                <span className="text-text-secondary">NO2:</span>
                <span className="text-text-primary">{current.air_quality.no2} μg/m³</span>
              </div>
            </div>
          </div>
        </div>

        {/* Agricultural Advice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-900 mb-2">Today's Farming Advice</h3>
          <div className="space-y-2 text-sm text-green-700">
            {current.humidity > 80 && (
              <p>• High humidity detected. Monitor crops for fungal diseases.</p>
            )}
            {current.wind_kph > 20 && (
              <p>• Strong winds. Secure lightweight structures and check for plant damage.</p>
            )}
            {current.temp_c > 35 && (
              <p>• High temperature. Ensure adequate irrigation and shade for sensitive crops.</p>
            )}
            {current.precip_mm > 5 && (
              <p>• Recent rainfall. Check field drainage and avoid heavy machinery on wet soil.</p>
            )}
            {current.air_quality["us-epa-index"] > 2 && (
              <p>• Poor air quality. Consider protecting workers and sensitive crops.</p>
            )}
            {current.uv > 7 && (
              <p>• High UV index. Protect workers and consider shade for sensitive plants.</p>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
};