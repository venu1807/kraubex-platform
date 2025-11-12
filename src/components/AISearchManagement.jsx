import { useState } from "react";
import {
  Sparkles,
  Paperclip,
  Image,
  File,
  Mic,
  Video,
  Plus,
  Send,
  Brain,
  Database,
  Globe,
  BarChart, TrendingUp, Eye, Zap
} from "lucide-react";



const COLORS = { primary: '#6b46c1' };

const AISearchContent = () => {
  const [input, setInput] = useState("");
  const [showMediaMenu, setShowMediaMenu] = useState(false);

  const prePrompts = [
    "Show low stock items",
    "Generate monthly report",
    "Compare suppliers",
    "Create purchase order"
  ];

  const handleAskAI = () => {
    console.log("Ask AI:", input);
    setInput("");
  };

  const handleClear = () => setInput("");

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900">KraubexAI Search Agent</h3>
            <p className="text-sm text-gray-600">Ask me anything about suppliers...</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 border border-purple-200">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="E.g., 'Find steel suppliers in Germany with ISO certification'..."
            className="w-full outline-none resize-none text-gray-700 rounded-lg p-2 border border-gray-200 focus:ring-2 focus:ring-purple-400"
            rows="3"
          />

        {/* Attachment + ERP + Web */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2">
            {/* File Icon */}
            <button
              title="Attach File"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Paperclip className="w-5 h-5 text-gray-600" />
            </button>

            {/* Media Plus Menu */}
            <div className="relative">
              <button
                onClick={() => setShowMediaMenu(!showMediaMenu)}
                title="Add Media"
                className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5 text-gray-600" />
              </button>
              {showMediaMenu && (
                <div className="absolute top-12 left-0 bg-white border rounded shadow p-2 flex flex-col gap-2 z-50">
                  <button className="flex items-center gap-2 px-2 py-1 hover:text-purple-600"><Image className="w-4 h-4" /> Image</button>
                  <button className="flex items-center gap-2 px-2 py-1 hover:text-purple-600"><Mic className="w-4 h-4" /> Audio</button>
                  <button className="flex items-center gap-2 px-2 py-1 hover:text-purple-600"><Video className="w-4 h-4" /> Video</button>
                </div>
              )}
            </div>

            {/* Document Icon */}
            <button
              title="Attach Document"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <File className="w-5 h-5 text-gray-600" />
            </button>

            {/* ERP Database */}
            <button
              title="ERP Database Query"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Database className="w-5 h-5 text-gray-600" />
            </button>

            {/* Web Search */}
            <button
              title="Web Search"
              className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Globe className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Pre-prompts */}
          <div className="flex gap-2 flex-wrap">
            {prePrompts.map((prompt, i) => (
              <button
                key={i}
                className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 border border-purple-200 rounded-full text-xs text-purple-700 hover:bg-purple-200 transition-colors flex items-center gap-1"
                onClick={() => setInput(prompt)}
              >
                <Sparkles className="w-3 h-3" /> {prompt}
              </button>
            ))}
          </div>
        </div>
       </div>

        <div className="flex gap-3">
          <button
            onClick={handleAskAI}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Ask Me
          </button>
          <button
            onClick={handleClear}
            className="px-6 py-3 bg-white border-2 border-purple-300 text-purple-700 rounded-lg hover:bg-purple-50 transition-colors font-medium"
          >
            Clear
          </button>
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: COLORS.primary }}>
          <Brain className="w-5 h-5" /> KraubexAI Recommendations
        </h3>
        <div className="space-y-3">
          {[
            'Top-rated steel suppliers in your region',
            'Companies with recent positive reviews',
            'Suppliers matching your budget range',
            'New suppliers in your industry'
          ].map((suggestion, i) => (
            <button
              key={i}
              className="w-full text-left p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors flex items-center justify-between"
            >
              <span className="text-gray-800">{suggestion}</span>
              <Sparkles className="w-4 h-4 text-purple-500" />
            </button>
          ))}
        </div>
      </div>

    {/* AI Insights */}
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{color: COLORS.primary}}>
            <Eye className="w-5 h-5" /> KraubexAI Insights
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700"><strong>Trend Alert:</strong> Steel prices expected to decrease by 5% next quarter.</p>
          </div>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-gray-700"><strong>Opportunity:</strong> 3 new certified suppliers match your requirements with competitive pricing.</p>
          </div>
        </div>
      </div>
     </div>
  );
};

export default AISearchContent;
