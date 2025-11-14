import React, { useState, useCallback } from 'react';

import {Home, Workflow, Layers, Search, BarChart3, Euro, Package,
  Shield, Users, MessageCircle, Settings, HelpCircle, Bot, Hand, Zap,
  Brain, Target, Database, TrendingUp, AlertTriangle, FileText, Calendar,
  Clock, Filter, Eye, Cpu, PieChart, MapPin, Check, FileCheck, TrendingDown,
  CheckSquare, GitBranch, MessageSquare, Building, Calculator, Bell, Lock,
  ShieldCheck, PlayCircle, Ticket, Send, Sparkles, ListFilter, Grid3x3, BarChart2,
  Download, Upload, Plus, X, ChevronLeft, ChevronRight, Paperclip, Mic, Video, Image,
  File, FileUp, Edit, XCircle, Rocket, Star, Activity, Briefcase, CheckCircle2, Play,
  Pause, RotateCw, Phone, MicOff, Smile, Share2, Trash2, Mail, ChevronDown, ChevronUp,
  Award, DownloadCloud, GitMerge, RefreshCw, ExternalLink } from 'lucide-react';


const SupplierChatContent = ({ companyInfo }) => {
  const [message, setMessage] = useState('');
  const [showRFQModal, setShowRFQModal] = useState(false);
  const [showRFQForm, setShowRFQForm] = useState(false);
  const [showTemplatePreview, setShowTemplatePreview] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [editingRFQ, setEditingRFQ] = useState(null);
  const [showPDFUpload, setShowPDFUpload] = useState(false);
  const [uploadedPDF, setUploadedPDF] = useState(null);

  const companyName = companyInfo?.name || 'SteelSphere GmbH';
  const companyInitials = companyInfo?.name ? companyInfo.name.split(' ').map(w => w[0]).join('').substring(0, 2) : 'SS';
  const companyEmail = companyInfo?.contact || 'info@supplier.com';



  const generateRFQId = () => {
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    return `KRA-RFQ-${randomNum}`;
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'John Smith',
      avatar: 'JS',
      time: '2:30 PM',
      text: 'Hello! We would be happy to help. What kind of project are you working on?',
      isOwn: false
    },
    {
      id: 2,
      user: 'You',
      avatar: 'YU',
      time: '2:32 PM',
      text: `Hi! I am interested in your ${companyInfo?.industry || 'steel fabrication'} services.`,
      isOwn: true
    },
    {
      id: 3,
      user: 'John Smith',
      avatar: 'JS',
      time: '2:35 PM',
      isOwn: false,
      isRFQ: true,
      rfqData: {
        rfqId: 'KRAUBEX-RFQ-10234',
        type: 'Steel Fabrication',
        projectName: 'Industrial Warehouse Structure',
        description: 'Need steel beams and columns for a 5000 sq ft warehouse',
        components: [
          {
            id: 1,
            name: 'I-Beams',
            description: 'Structural steel I-beams',
            quantity: '20 units',
            specifications: 'Grade A36, 12" depth, 30ft length'
          }
        ],
        requiredDocs: ['Material certificates', 'Quality test reports'],
        attachedFiles: [
          { id: 1, name: 'warehouse-plans.pdf', size: '2.3 MB', type: 'document' }
        ],
        deadline: '2025-11-15',
        budget: '€50,000 - €75,000',
        location: 'Hamburg, Germany'
      }
    }
  ]);

  const [rfqStatuses, setRfqStatuses] = useState({});

  const [rfqForm, setRfqForm] = useState({
    type: '',
    projectName: '',
    description: '',
    quantity: '',
    deadline: '',
    budget: '',
    location: '',
    components: [
      { id: 1, name: '', description: '', quantity: '', specifications: '' }
    ],
    requiredDocs: [],
    attachedFiles: []
  });

  const rfqTemplates = [
    { id: 'steel-fab', name: 'Steel Fabrication', icon: Package, color: 'bg-blue-500' },
    { id: 'raw-materials', name: 'Raw Materials', icon: Package, color: 'bg-green-500' },
    { id: 'custom-project', name: 'Custom Project', icon: FileText, color: 'bg-purple-500' },
    { id: 'maintenance', name: 'Maintenance Service', icon: FileText, color: 'bg-orange-500' }
  ];


  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        user: 'You',
        avatar: 'YU',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text: message,
        isOwn: true
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const handleCreateRFQ = (templateId) => {
  const template = rfqTemplates.find(t => t.id === templateId);
    setRfqForm({
      ...rfqForm,
      type: template.name
    });
    setShowRFQModal(false);
    setShowRFQForm(true);
  };

 const handleViewRFQ = (msg) => {
  // Example: open a modal with RFQ details
  // You can implement your modal logic or navigate to a RFQ detail page
  console.log('View RFQ clicked:', msg.rfqData);
  alert(`Viewing RFQ: ${msg.rfqData.rfqId}\nProject: ${msg.rfqData.projectName}`);
  };

  const handleShareRFQ = () => {
    const rfqMessage = {
      id: messages.length + 1,
      user: editingRFQ ? 'You' : 'You',
      avatar: 'YU',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: editingRFQ ? editingRFQ.isOwn : true,
      isRFQ: true,
      rfqData: {
        ...rfqForm,
        rfqId: editingRFQ ? rfqForm.rfqId : generateRFQId()
      },
      isUpdate: editingRFQ ? true : false,
      originalId: editingRFQ ? editingRFQ.id : null
    };
    setMessages([...messages, rfqMessage]);
    setShowRFQForm(false);
    setEditingRFQ(null);
    setRfqForm({
      type: '',
      projectName: '',
      description: '',
      quantity: '',
      deadline: '',
      budget: '',
      location: '',
      components: [
        { id: 1, name: '', description: '', quantity: '', specifications: '' }
      ],
      requiredDocs: [],
      attachedFiles: []
    });
  };

  const handleAcceptRFQ = (msgId) => {
    setRfqStatuses({
      ...rfqStatuses,
      [msgId]: 'accepted'
    });
    const statusMessage = {
      id: messages.length + 1,
      user: 'You',
      avatar: 'YU',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: '✅ RFQ has been accepted!',
      isOwn: true,
      isStatusMessage: true
    };
    setMessages([...messages, statusMessage]);
  };

  const handleRejectRFQ = (msgId) => {
    setRfqStatuses({
      ...rfqStatuses,
      [msgId]: 'rejected'
    });
    const statusMessage = {
      id: messages.length + 1,
      user: 'You',
      avatar: 'YU',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: '❌ RFQ has been rejected.',
      isOwn: true,
      isStatusMessage: true
    };
    setMessages([...messages, statusMessage]);
  };

  const handleEditRFQ = (msg) => {
    setEditingRFQ(msg);
    setRfqForm({ ...msg.rfqData });
    setShowRFQForm(true);
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setUploadedPDF({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      });
    }
  };

  const handleConvertPDFToRFQ = () => {
    // Simulate PDF parsing - in real app, this would use OCR/PDF parsing
    const extractedData = {
      type: 'Imported from PDF',
      projectName: 'Extracted Project Name',
      description: 'Auto-extracted from PDF document',
      quantity: '',
      deadline: '',
      budget: '',
      location: '',
      components: [
        { id: 1, name: '', description: '', quantity: '', specifications: '' }
      ],
      requiredDocs: [],
      attachedFiles: [
        {
          id: Date.now(),
          name: uploadedPDF.name,
          size: uploadedPDF.size,
          type: 'document'
        }
      ]
    };

    setRfqForm(extractedData);
    setShowPDFUpload(false);
    setShowRFQForm(true);
    setUploadedPDF(null);
  };

  const addComponent = () => {
    const newComponent = {
      id: rfqForm.components.length + 1,
      name: '',
      description: '',
      quantity: '',
      specifications: ''
    };
    setRfqForm({
      ...rfqForm,
      components: [...rfqForm.components, newComponent]
    });
  };

  const removeComponent = (id) => {
    setRfqForm({
      ...rfqForm,
      components: rfqForm.components.filter(comp => comp.id !== id)
    });
  };

  const updateComponent = (id, field, value) => {
    setRfqForm({
      ...rfqForm,
      components: rfqForm.components.map(comp =>
        comp.id === id ? { ...comp, [field]: value } : comp
      )
    });
  };

  const addRequiredDoc = (docName) => {
    if (docName.trim() && !rfqForm.requiredDocs.includes(docName.trim())) {
      setRfqForm({
        ...rfqForm,
        requiredDocs: [...rfqForm.requiredDocs, docName.trim()]
      });
    }
  };

  const removeRequiredDoc = (index) => {
    setRfqForm({
      ...rfqForm,
      requiredDocs: rfqForm.requiredDocs.filter((_, i) => i !== index)
    });
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type.includes('image') ? 'image' : 'document'
    }));

    setRfqForm({
      ...rfqForm,
      attachedFiles: [...rfqForm.attachedFiles, ...newFiles]
    });
  };

  const removeFile = (fileId) => {
    setRfqForm({
      ...rfqForm,
      attachedFiles: rfqForm.attachedFiles.filter(file => file.id !== fileId)
    });
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Chat Header */}
      <div className="bg-gray-50 border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-600 rounded text-white flex items-center justify-center text-sm font-semibold">
            {companyInitials}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900" style={{fontFamily: 'Roboto'}}>{companyName}</h3>
            <p className="text-xs text-green-600">● Online</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-200 rounded transition-colors">
            <Phone className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-200 rounded transition-colors">
            <Video className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className={`p-2 hover:bg-gray-200 rounded transition-colors ${isMuted ? 'bg-red-100' : ''}`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-4 h-4 text-red-600" /> : <Mic className="w-4 h-4 text-gray-600" />}
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 h-64" style={{fontFamily: 'Roboto', backgroundColor: '#efeee7'}}>
        {messages.map((msg) => (
          <div key={msg.id} className={`flex gap-3 mb-4 ${msg.isOwn ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded flex items-center justify-center text-sm font-semibold ${
              msg.isOwn ? 'bg-blue-600 text-white' : 'bg-gray-400 text-white'
            }`}>
              {msg.avatar}
            </div>

            <div className={`flex-1 max-w-xs ${msg.isOwn ? 'text-right' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-semibold text-gray-900">{msg.user}</span>
                <span className="text-xs text-gray-500">{msg.time}</span>
              </div>

              {msg.isRFQ ? (
                <div className={`p-3 rounded-lg border ${
                  msg.isOwn ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
                } ${rfqStatuses[msg.id] === 'accepted' ? 'border-green-500 bg-green-50' : ''} ${
                  rfqStatuses[msg.id] === 'rejected' ? 'border-red-500 bg-red-50' : ''
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-blue-600 truncate max-w-[180px]">
                        {msg.isUpdate ? '📝 Updated RFQ' : 'RFQ'}: {msg.rfqData.type}
                      </span>
                    </div>
                  {/* RFQ ID + View icon, always shown for shared RFQs */}
                  {msg.isRFQ && (
                    <div className="flex items-center gap-1 flex-shrink-0 ml-2">
                      <span className="text-xs font-mono bg-gray-200 px-2 py-1 rounded">
                        {msg.rfqData.rfqId}
                      </span>
                      <Eye
                        className="w-4 h-4 text-blue-600 cursor-pointer hover:text-blue-700 transition-colors"
                        onClick={() => handleViewRFQ(msg)}
                        title="View RFQ"
                      />
                    </div>
                  )}
                  </div>
                  {rfqStatuses[msg.id] && (
                    <div className="mb-2">
                      {rfqStatuses[msg.id] === 'accepted' && (
                        <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Accepted</span>
                      )}
                      {rfqStatuses[msg.id] === 'rejected' && (
                        <span className="text-xs bg-red-600 text-white px-2 py-1 rounded">Rejected</span>
                      )}
                    </div>
                  )}
                  <div className="text-sm space-y-1">
                    <p><strong>Project:</strong> {msg.rfqData.projectName}</p>
                    <p><strong>Description:</strong> {msg.rfqData.description}</p>
                    <p><strong>Components:</strong> {msg.rfqData.components?.length || 0} items</p>
                    <p><strong>Required Docs:</strong> {msg.rfqData.requiredDocs?.length || 0} documents</p>
                    {msg.rfqData.attachedFiles?.length > 0 && (
                      <p><strong>Attachments:</strong> {msg.rfqData.attachedFiles.length} files</p>
                    )}
                  </div>
                  {!rfqStatuses[msg.id] && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleAcceptRFQ(msg.id)}
                        className="flex-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700 transition-colors flex items-center justify-center gap-1"
                        >
                        <Check className="w-3 h-3" />
                        Accept
                      </button>
                      <button
                        onClick={() => handleRejectRFQ(msg.id)}
                        className="flex-1 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-3 h-3" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleEditRFQ(msg)}
                        className="flex-1 px-3 py-1 bg-orange-600 text-white text-xs rounded hover:bg-orange-700 transition-colors flex items-center justify-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        Edit & Reshare
                      </button>
                    </div>
                  )}
                </div>
              ) : msg.isStatusMessage ? (
                <div className={`p-2 rounded-lg text-center text-sm font-medium ${
                  msg.text.includes('accepted') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {msg.text}
                </div>
              ) : (
                <div className={`p-3 rounded-lg ${
                  msg.isOwn ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}>
                  {msg.text}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <button
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            onClick={() => setShowRFQModal(true)}
          >
            <Plus className="w-5 h-5 text-gray-600" />
          </button>

          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Paperclip className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex-1 relative">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{fontFamily: 'Roboto'}}
            />
          </div>

          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <Smile className="w-5 h-5 text-gray-600" />
          </button>

          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Template Selection Modal */}
      {showRFQModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" style={{fontFamily: 'Roboto'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Select RFQ Template</h3>
              <button onClick={() => setShowRFQModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {rfqTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleCreateRFQ(template.id)}
                  className="flex flex-col items-center gap-2 p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded flex items-center justify-center ${template.color}`}>
                    <template.icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-center">{template.name}</span>
                </button>
              ))}
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowRFQModal(false);
                  setShowPDFUpload(true);
                }}
                className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <FileUp className="w-4 h-4" />
                Upload Existing RFQ (PDF)
              </button>

              <button
                onClick={() => {
                  setShowRFQModal(false);
                  setShowRFQForm(true);
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Create Blank RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PDF Upload Modal */}
      {showPDFUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6" style={{fontFamily: 'Roboto'}}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Upload Existing RFQ</h3>
              <button onClick={() => {
                setShowPDFUpload(false);
                setUploadedPDF(null);
              }}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Upload an existing RFQ PDF document. We'll extract the information and convert it into an editable KRAUBEX RFQ format.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handlePDFUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <FileUp className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {uploadedPDF ? uploadedPDF.name : 'Click to upload PDF'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {uploadedPDF ? uploadedPDF.size : 'Maximum file size: 10MB'}
                  </p>
                </label>
              </div>

              {uploadedPDF && (
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                  <File className="w-5 h-5 text-green-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-green-800">{uploadedPDF.name}</p>
                    <p className="text-xs text-green-600">{uploadedPDF.size}</p>
                  </div>
                  <button
                    onClick={() => setUploadedPDF(null)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowPDFUpload(false);
                  setUploadedPDF(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConvertPDFToRFQ}
                disabled={!uploadedPDF}
                className={`flex-1 px-4 py-2 rounded transition-colors flex items-center justify-center gap-2 ${
                  uploadedPDF
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <FileText className="w-4 h-4" />
                Convert to RFQ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RFQ Form Modal */}
      {showRFQForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl flex flex-col" style={{fontFamily: 'Roboto', maxHeight: '90vh'}}>
            <div className="flex items-center justify-between p-6 border-b flex-shrink-0">
              <div>
                <h3 className="text-lg font-semibold">
                  {editingRFQ ? `Edit ${rfqForm.type} RFQ` : `Create ${rfqForm.type} RFQ`}
                </h3>
                {rfqForm.rfqId && (
                  <p className="text-sm text-gray-500 font-mono mt-1">{rfqForm.rfqId}</p>
                )}
              </div>
              <button onClick={() => {
                setShowRFQForm(false);
                setEditingRFQ(null);
              }}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Basic Information</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1">Project Name</label>
                    <input
                      type="text"
                      value={rfqForm.projectName}
                      onChange={(e) => setRfqForm({...rfqForm, projectName: e.target.value})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      value={rfqForm.description}
                      onChange={(e) => setRfqForm({...rfqForm, description: e.target.value})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows="3"
                      placeholder="Project description..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Deadline</label>
                      <input
                        type="date"
                        value={rfqForm.deadline}
                        onChange={(e) => setRfqForm({...rfqForm, deadline: e.target.value})}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Budget Range</label>
                      <input
                        type="text"
                        value={rfqForm.budget}
                        onChange={(e) => setRfqForm({...rfqForm, budget: e.target.value})}
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="€10,000 - €50,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Location</label>
                    <input
                      type="text"
                      value={rfqForm.location}
                      onChange={(e) => setRfqForm({...rfqForm, location: e.target.value})}
                      className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Berlin, Germany"
                    />
                  </div>
                </div>

                {/* File Attachments */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Attachments</h4>
                  <div>
                    <label className="block text-sm font-medium mb-2">Upload Files</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.dwg,.step"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600">Click to upload files</p>
                        <p className="text-xs text-gray-400">PDF, DOC, Images, CAD files</p>
                      </label>
                    </div>

                    {rfqForm.attachedFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {rfqForm.attachedFiles.map((file) => (
                          <div key={file.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                            <div className="flex items-center gap-2">
                              {file.type === 'image' ?
                                <Image className="w-4 h-4 text-blue-500" /> :
                                <File className="w-4 h-4 text-gray-500" />
                              }
                              <span className="text-sm">{file.name}</span>
                              <span className="text-xs text-gray-500">({file.size})</span>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Required Documents */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Required Documents from Supplier</label>
                    <div className="space-y-2">
                      {rfqForm.requiredDocs.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-yellow-50 rounded border border-yellow-200">
                          <span className="text-sm">{doc}</span>
                          <button
                            onClick={() => removeRequiredDoc(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Add required document..."
                          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              addRequiredDoc(e.target.value);
                              e.target.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.target.previousElementSibling;
                            addRequiredDoc(input.value);
                            input.value = '';
                          }}
                          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Components Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-800 border-b pb-2">Components & Specifications</h4>
                  <button
                    onClick={addComponent}
                    className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 flex items-center gap-1"
                  >
                    <Plus className="w-4 h-4" />
                    Add Component
                  </button>
                </div>

                <div className="space-y-4">
                  {rfqForm.components.map((component, index) => (
                    <div key={component.id} className="p-4 border rounded-lg bg-gray-50">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-medium text-gray-700">Component {index + 1}</h5>
                        {rfqForm.components.length > 1 && (
                          <button
                            onClick={() => removeComponent(component.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>

                      <div className="grid md:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium mb-1">Component Name</label>
                          <input
                            type="text"
                            value={component.name}
                            onChange={(e) => updateComponent(component.id, 'name', e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., Steel Beam"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-1">Quantity</label>
                          <input
                            type="text"
                            value={component.quantity}
                            onChange={(e) => updateComponent(component.id, 'quantity', e.target.value)}
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., 10 units"
                          />
                        </div>
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Description</label>
                        <textarea
                          value={component.description}
                          onChange={(e) => updateComponent(component.id, 'description', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                          placeholder="Component description..."
                        />
                      </div>

                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Technical Specifications</label>
                        <textarea
                          value={component.specifications}
                          onChange={(e) => updateComponent(component.id, 'specifications', e.target.value)}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          rows="2"
                          placeholder="Material grade, dimensions, tolerances, finish requirements..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-6 border-t flex-shrink-0">
              <button
                onClick={() => {
                  setShowRFQForm(false);
                  setEditingRFQ(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleShareRFQ}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Share2 className="w-4 h-4" />
                {editingRFQ ? 'Update & Reshare RFQ' : 'Share RFQ'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
