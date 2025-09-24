import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MobileLayout } from "../components/layout/MobileLayout";
import { 
  ArrowLeft, 
  Camera, 
  Image as ImageIcon, 
  Upload, 
  X,
  Flask,
  CheckCircle,
  Warning,
  Leaf,
  Bug,
  Eye
} from "@phosphor-icons/react";

interface DiagnosisResult {
  id: string;
  problem: string;
  confidence: number;
  category: 'pest' | 'disease' | 'nutrition' | 'water_stress';
  severity: 'low' | 'medium' | 'high';
  description: string;
  symptoms: string[];
  treatment: {
    immediate: string[];
    organic: string[];
    chemical: string[];
  };
  prevention: string[];
}

export const CropDiagnosis = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [cropType, setCropType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setDiagnosisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    cameraInputRef.current?.click();
  };

  const handleGallerySelect = () => {
    fileInputRef.current?.click();
  };

  const analyzeImage = () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: DiagnosisResult = {
        id: 'diag-001',
        problem: 'Rice Blast Disease',
        confidence: 0.87,
        category: 'disease',
        severity: 'medium',
        description: 'Fungal disease affecting rice leaves, causing diamond-shaped lesions with gray centers and brown margins.',
        symptoms: [
          'Diamond-shaped spots on leaves',
          'Gray center with brown/reddish borders',
          'Spots may coalesce in severe cases',
          'Affected leaves may dry up'
        ],
        treatment: {
          immediate: [
            'Remove and destroy affected leaves',
            'Improve air circulation around plants',
            'Avoid overhead irrigation',
            'Apply organic fungicide spray'
          ],
          organic: [
            'Neem oil spray (5ml/liter)',
            'Trichoderma viride application',
            'Copper oxychloride (2g/liter)',
            'Maintain field hygiene'
          ],
          chemical: [
            'Tricyclazole 75% WP (0.6g/liter)',
            'Propiconazole 25% EC (1ml/liter)',
            'Azoxystrobin 23% SC (1ml/liter)'
          ]
        },
        prevention: [
          'Use resistant varieties',
          'Balanced fertilization (avoid excess nitrogen)',
          'Proper plant spacing',
          'Regular field monitoring',
          'Crop rotation with non-host crops'
        ]
      };
      
      setDiagnosisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setDiagnosisResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'pest': return <Bug size={20} />;
      case 'disease': return <Leaf size={20} />;
      case 'nutrition': return <Warning size={20} />;
      default: return <Eye size={20} />;
    }
  };

  return (
    <MobileLayout currentPage="diagnosis">
      <div className="flex flex-col">
        {/* Header
        <div className="bg-surface border-b border-card-border px-4 py-3 flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-1">
            <ArrowLeft size={24} className="text-text-primary" />
          </button>
          <div>
            <h1 className="font-semibold text-text-primary">Crop Diagnosis</h1>
            <p className="text-text-secondary text-sm">AI-powered plant health analysis</p>
          </div>
        </div> */}

        <div className="flex-1 overflow-y-auto">
          {/* Image Upload Section */}
          {!selectedImage && (
            <div className="p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera size={40} weight="duotone" className="text-primary" />
                </div>
                <h2 className="text-lg font-semibold text-text-primary mb-2">
                  Upload Crop Photo
                </h2>
                <p className="text-text-secondary text-sm">
                  Upload a clear photo of your crop's leaves, stems, or affected parts for AI analysis
                </p>
              </div>

              {/* Crop Type Selection */}
<div className="mb-6">
  <label className="block text-sm font-medium text-text-primary mb-2">
    Crop Type
  </label>

  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
    {[
      { value: "rice", label: "Rice", icon: "🌾", img: "https://cdn-icons-png.flaticon.com/128/1134/1134450.png" },
      { value: "banana", label: "Banana", icon: "🌿", img: "https://cdn-icons-png.flaticon.com/128/7756/7756334.png" },
      { value: "coconut", label: "Coconut", icon: "🥥", img: "https://cdn-icons-png.flaticon.com/128/10484/10484064.png" },
{ value: "rubber", label: "Rubber", icon: "🌳", img: "https://cdn-icons-png.flaticon.com/128/9410/9410525.png" },
{ value: "pepper", label: "Pepper", icon: "🌿", img: "https://cdn-icons-png.flaticon.com/128/1407/1407664.png" },
{ value: "cardamom", label: "Cardamom", icon: "🟢", img: "https://cdn-icons-png.flaticon.com/128/4788/4788056.png" },
{ value: "tea-coffee", label: "Tea/Coffee", icon: "cup", img: "https://cdn-icons-png.flaticon.com/128/9920/9920995.png"},
{ value: "vegetables", label: "Vegetables", icon: "🥬", img: "https://cdn-icons-png.flaticon.com/128/2153/2153788.png" },
{ value: "other", label: "Other", icon: "❓", img: "https://cdn-icons-png.flaticon.com/128/8454/8454793.png" }

      // { value: "cotton", label: "Cotton", icon: "🧵", img: "https://cdn-icons-png.flaticon.com/128/3944/3944309.png" },
      // { value: "sugarcane", label: "Sugarcane", icon: "🍬", img: "https://cdn-icons-png.flaticon.com/128/12233/12233687.png" },
      // { value: "tomato", label: "Tomato", icon: "🍅", img: "https://cdn-icons-png.flaticon.com/128/2674/2674605.png" },
      // { value: "potato", label: "Potato", icon: "🥔", img: "https://cdn-icons-png.flaticon.com/128/3610/3610475.png" },
      // { value: "onion", label: "Onion", icon: "🧅", img: "https://cdn-icons-png.flaticon.com/128/1134/1134474.png" },
      // { value: "other", label: "Other", icon: "❓", img: "https://cdn-icons-png.flaticon.com/128/1134/1134475.png" },
    ].map((crop) => (
      <div
        key={crop.value}
        onClick={() => setCropType(crop.value)}
        className={`cursor-pointer flex flex-col items-center justify-center p-4 border rounded-lg transition-all
          ${cropType === crop.value
            ? "border-primary border-2 bg-primary/10 bg-surface border border-card-border"
            : "border-input-border hover:border-primary/50 bg-surface border border-card-border"}`}
      >
        <img src={crop.img} alt={crop.label} className="w-10 h-10 mb-1" />
        <span className="text-sm font-medium">{crop.label}</span>
      </div>
    ))}
  </div>
</div>


              {/* Upload Options */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleCameraCapture}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg font-medium"
                >
                  <Camera weight="duotone" size={24} />
                  Take Crop Photo
                </button>
                
                <button
                  onClick={handleGallerySelect}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-white rounded-lg font-medium"
                >
                  <ImageIcon weight="duotone" size={24} />
                  Choose from Gallery
                </button>
              </div>

              {/* Photo Tips
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-900 mb-2">For better results:</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Take clear, sharp photos</li>
                  <li>• Show affected parts closely</li>
                  <li>• Take photos in good lighting</li>
                  <li>• Show both sides of leaves</li>
                </ul>
              </div> */}
            </div>
          )}

          {/* Image Preview and Analysis */}
          {selectedImage && (
            <div className="p-4">
              <div className="relative mb-4">
                <img
                  src={selectedImage}
                  alt="Crop image for analysis"
                  className="w-full h-64 object-cover rounded-lg border border-card-border"
                />
                <button
                  onClick={clearImage}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full shadow-lg"
                >
                  <X size={16} />
                </button>
              </div>

              {!diagnosisResult && !isAnalyzing && (
                <button
                  onClick={analyzeImage}
                  className="w-full flex items-center justify-center gap-3 py-3 px-6 bg-primary text-white rounded-lg font-medium"
                >
                  <Flask weight="duotone" size={20} />
                  Start AI Analysis
                </button>
              )}

              {isAnalyzing && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Flask weight="duotone" size={32} className="text-primary" />
                  </div>
                  <h3 className="font-medium text-text-primary mb-2">AI Analysis in progress...</h3>
                  <p className="text-text-secondary text-sm">Analyzing your crop image, one moment please…</p>
                  <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                  </div>
                </div>
              )}

              {/* Diagnosis Results */}
              {diagnosisResult && (
                <div className="space-y-4">
                  <div className="bg-surface border border-card-border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-primary">
                          {getCategoryIcon(diagnosisResult.category)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-text-primary">{diagnosisResult.problem}</h3>
                          <p className="text-text-secondary text-sm">Confidence: {Math.round(diagnosisResult.confidence * 100)}%</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSeverityColor(diagnosisResult.severity)}`}>
                        {diagnosisResult.severity.toUpperCase()}
                      </div>
                    </div>
                    
                    <p className="text-text-secondary text-sm mb-4">{diagnosisResult.description}</p>
                    
                    <div className="space-y-4">
                      {/* Symptoms */}
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Symptoms:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {diagnosisResult.symptoms.map((symptom, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Immediate Treatment */}
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Immediate Action:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {diagnosisResult.treatment.immediate.map((action, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Organic Treatment */}
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Organic Treatment:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {diagnosisResult.treatment.organic.map((treatment, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Leaf size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Chemical Treatment */}
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Chemical Treatment:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {diagnosisResult.treatment.chemical.map((treatment, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <Warning size={16} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                              {treatment}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Prevention */}
                      <div>
                        <h4 className="font-medium text-text-primary mb-2">Prevention:</h4>
                        <ul className="text-sm text-text-secondary space-y-1">
                          {diagnosisResult.prevention.map((prevention, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-primary mt-1">•</span>
                              {prevention}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => navigate(`/chat?query=more details about ${diagnosisResult.problem}`)}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-primary text-white rounded-lg font-medium"
                    >
                      <Flask weight="duotone" size={20} />
                      Get More Details from AI
                    </button>
                    <button
                      onClick={clearImage}
                      className="flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-white rounded-lg font-medium"
                    >
                      <Camera weight="duotone" size={20} />
                      Upload New Photo
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>
    </MobileLayout>
  );
};