import RFQComparison from "../components/RFQComparison";
import ApprovalManagement from "../components/ApprovalManagement"
import PurchaseOrderManagement from "../components/PurchaseOrderManagement"
import QualityControlManagement from "../components/QualityControlManagement"
import InvoiceMatchingManagement from "../components/InvoiceMatchingManagement"
import PaymentApprovalManagement from "../components/PaymentApprovalManagement"
import UserProfile from "../components/UserProfile"
import RFQManagement from "../components/RFQManagement"
import InventoryManagement from "../components/InventoryManagement"
import AISearchManagement from "../components/AISearchManagement"
import SupplierContractManagement from "../components/SupplierContractManagement"
import MovableAIChat from "../components/MovableAIChat"


const AppointmentCalendarContent = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [duration, setDuration] = useState('30');
  const [supplierName, setSupplierName] = useState('');
  const [supplierEmail, setSupplierEmail] = useState('');
  const [meetingType, setMeetingType] = useState('contract');
  const [meetingNotes, setMeetingNotes] = useState('');
  const [shareToChat, setShareToChat] = useState(false);
  const [repeatType, setRepeatType] = useState('none');
  const [repeatEndDate, setRepeatEndDate] = useState('');
  const [reminderTime, setReminderTime] = useState('15');
  const [location, setLocation] = useState('');
  const [priority, setPriority] = useState('medium');

  const handleCreateAppointment = () => {
    const appointmentData = {
      supplierName,
      supplierEmail,
      meetingType,
      date: selectedDate,
      time: selectedTime,
      duration: duration + ' minutes',
      location,
      notes: meetingNotes,
      priority,
      repeatType,
      repeatEndDate: repeatType !== 'none' ? repeatEndDate : null,
      reminderTime: reminderTime + ' minutes before',
      shareToChat
    };

    alert('Appointment Created!\n' + JSON.stringify(appointmentData, null, 2));
  };

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border-2 border-indigo-200 p-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-500 to-blue-500 flex items-center justify-center">
            <Calendar className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold" style={{color: COLORS.primary}}>Appointment Calendar</h3>
            <p className="text-sm text-gray-600">Schedule meetings with suppliers - Advanced scheduling</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h4 className="text-lg font-bold mb-4" style={{color: COLORS.primary}}>Create New Appointment</h4>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Supplier Name *</label>
              <input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Enter supplier name..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Supplier Email *</label>
              <input
                type="email"
                value={supplierEmail}
                onChange={(e) => setSupplierEmail(e.target.value)}
                placeholder="supplier@example.com"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Meeting Type</label>
              <select
                value={meetingType}
                onChange={(e) => setMeetingType(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              >
                <option value="contract">Contract Discussion</option>
                <option value="negotiation">Price Negotiation</option>
                <option value="review">Performance Review</option>
                <option value="onboarding">Supplier Onboarding</option>
                <option value="audit">Compliance Audit</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Date *</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Time *</label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Duration</label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">1 hour</option>
                <option value="90">1.5 hours</option>
                <option value="120">2 hours</option>
              </select>
            </div>
          </div>

          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center gap-2 mb-3">
              <RotateCw className="w-4 h-4 text-purple-600" />
              <h5 className="font-semibold text-gray-900 text-sm">Repetition Settings</h5>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">Repeat</label>
                <select
                  value={repeatType}
                  onChange={(e) => setRepeatType(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
                >
                  <option value="none">Does not repeat</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                </select>
              </div>
              {repeatType !== 'none' && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">Repeat Until</label>
                  <input
                    type="date"
                    value={repeatEndDate}
                    onChange={(e) => setRepeatEndDate(e.target.value)}
                    className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Office or video call link..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">Reminder</label>
              <select
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
              >
                <option value="5">5 minutes before</option>
                <option value="15">15 minutes before</option>
                <option value="30">30 minutes before</option>
                <option value="60">1 hour before</option>
                <option value="1440">1 day before</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Meeting Notes</label>
            <textarea
              value={meetingNotes}
              onChange={(e) => setMeetingNotes(e.target.value)}
              placeholder="Add meeting agenda..."
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none resize-none"
              rows={4}
            />
          </div>

          <div className="flex items-center gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <input
              type="checkbox"
              id="shareToChat"
              checked={shareToChat}
              onChange={(e) => setShareToChat(e.target.checked)}
              className="w-4 h-4"
            />
            <label htmlFor="shareToChat" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-indigo-600" />
              Share appointment in team chat
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={handleCreateAppointment}
              className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 font-medium flex items-center justify-center gap-2"
              style={{backgroundColor: COLORS.primary}}
            >
              <Calendar className="w-5 h-5" />
              Create Appointment
            </button>
            <button className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h4 className="text-lg font-bold mb-4" style={{color: COLORS.primary}}>Upcoming Appointments</h4>
        <div className="space-y-3">
          {[
            { supplier: 'SteelSphere GmbH', type: 'Contract Discussion', date: '2024-10-15', time: '10:00', status: 'scheduled', repeat: 'Weekly' },
            { supplier: 'TechVision Solutions', type: 'Price Negotiation', date: '2024-10-18', time: '14:30', status: 'scheduled', repeat: 'None' },
            { supplier: 'GreenEnergy Partners', type: 'Performance Review', date: '2024-10-22', time: '11:00', status: 'pending', repeat: 'Monthly' }
          ].map((apt, i) => (
            <div key={i} className="p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-300 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h5 className="font-semibold text-gray-900">{apt.supplier}</h5>
                  <p className="text-sm text-gray-600">{apt.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'scheduled' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {apt.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{apt.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{apt.time}</span>
                </div>
                {apt.repeat !== 'None' && (
                  <div className="flex items-center gap-1">
                    <RotateCw className="w-4 h-4" />
                    <span>{apt.repeat}</span>
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <button className="text-sm px-3 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200">
                  View Details
                </button>
                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  Share
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

import React, { useState, useCallback } from 'react';
import {
  Home,
  Workflow,
  Layers,
  Search,
  BarChart3,
  Euro,
  Package,
  Shield,
  Users,
  MessageCircle,
  Settings,
  HelpCircle,
  Bot,
  Hand,
  Zap,
  Brain,
  Target,
  Database,
  TrendingUp,
  AlertTriangle,
  FileText,
  Calendar,
  Clock,
  Filter,
  Eye,
  Cpu,
  PieChart,
  MapPin,
  Check,
  FileCheck,
  TrendingDown,
  CheckSquare,
  GitBranch,
  MessageSquare,
  Building,
  Calculator,
  Bell,
  Lock,
  ShieldCheck,
  PlayCircle,
  Ticket,
  Send,
  Sparkles,
  ListFilter,
  Grid3x3,
  BarChart2,
  Download,
  Upload,
  Plus,
  X,
  ChevronLeft,
  ChevronRight,
  Paperclip,
  Mic,
  Video,
  Image,
  File,
  FileUp,
  Edit,
  XCircle,
  Rocket,
  Star,
  Activity,
  Briefcase,
  CheckCircle2,
  Play,
  Pause,
  RotateCw,
  Phone,
  MicOff,
  Smile,
  Share2,
  Trash2,
  Mail,
  ChevronDown,
  ChevronUp,
  Award,
  DownloadCloud,
  GitMerge,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import kraubexLogo from "../assets/kraubex-logo.png";
import { Link } from "react-router-dom";

const COLORS = {
  primary: '#c04000',
  background: '#efeee7',
  text: '#292d32',
  orange: '#c04000'
};

// Procurement Agents Data
const procurementAgents = [
  {
    id: 'supplier-scout',
    name: 'Supplier Scout',
    icon: Search,
    description: 'Finds and evaluates potential suppliers based on your criteria',
    specialty: 'Supplier Discovery',
    status: 'active',
    tasksCompleted: 247,
    rating: 4.8,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'price-optimizer',
    name: 'Price Optimizer',
    icon: TrendingUp,
    description: 'Analyzes market prices and suggests optimal pricing strategies',
    specialty: 'Pricing Analysis',
    status: 'active',
    tasksCompleted: 189,
    rating: 4.9,
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'risk-guardian',
    name: 'Risk Guardian',
    icon: ShieldCheck,
    description: 'Monitors supplier risks and compliance issues in real-time',
    specialty: 'Risk Management',
    status: 'active',
    tasksCompleted: 312,
    rating: 4.7,
    color: 'from-red-500 to-orange-500'
  },
  {
    id: 'order-orchestrator',
    name: 'Order Orchestrator',
    icon: Package,
    description: 'Manages order tracking, logistics, and delivery optimization',
    specialty: 'Order Management',
    status: 'active',
    tasksCompleted: 428,
    rating: 4.6,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'analytics-wizard',
    name: 'Analytics Wizard',
    icon: BarChart3,
    description: 'Generates insights and predictions from procurement data',
    specialty: 'Data Analytics',
    status: 'idle',
    tasksCompleted: 156,
    rating: 4.9,
    color: 'from-indigo-500 to-purple-500'
  },
  {
    id: 'contract-negotiator',
    name: 'Contract Negotiator',
    icon: FileText,
    description: 'Assists with contract analysis and negotiation strategies',
    specialty: 'Contract Management',
    status: 'idle',
    tasksCompleted: 93,
    rating: 4.5,
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'appointment-agent',
    name: 'Appointment Agent',
    icon: Calendar,
    description: 'Schedules meetings with suppliers and sends automated notifications',
    specialty: 'Meeting Coordination',
    status: 'active',
    tasksCompleted: 178,
    rating: 4.8,
    color: 'from-pink-500 to-rose-500'
  }
];

// Dummy Companies Data
const dummyCompanies = [
  {
    id: 1,
    name: 'SteelSphere GmbH',
    industry: 'Steel Fabrication',
    location: 'Dortmund, Germany',
    size: '250+ employees',
    rating: 4.8,
    certifications: ['ISO 9001', 'ISO 14001'],
    specialties: ['Custom Steel Products', 'Industrial Components'],
    contact: 'info@steelsphere.de',
    established: 1995
  },
  {
    id: 2,
    name: 'TechVision Solutions',
    industry: 'Technology',
    location: 'Munich, Germany',
    size: '150-200 employees',
    rating: 4.6,
    certifications: ['ISO 27001', 'ISO 9001'],
    specialties: ['IT Infrastructure', 'Cloud Services'],
    contact: 'contact@techvision.de',
    established: 2008
  },
  {
    id: 3,
    name: 'GreenEnergy Partners',
    industry: 'Renewable Energy',
    location: 'Hamburg, Germany',
    size: '100-150 employees',
    rating: 4.9,
    certifications: ['ISO 50001', 'ISO 14001'],
    specialties: ['Solar Solutions', 'Wind Energy'],
    contact: 'info@greenenergy.de',
    established: 2012
  },
  {
    id: 4,
    name: 'AutoParts Excellence',
    industry: 'Automotive Manufacturing',
    location: 'Stuttgart, Germany',
    size: '300+ employees',
    rating: 4.7,
    certifications: ['IATF 16949', 'ISO 9001'],
    specialties: ['Precision Parts', 'Assembly Components'],
    contact: 'sales@autoparts.de',
    established: 1988
  },
  {
    id: 5,
    name: 'BioTech Innovations',
    industry: 'Biotechnology',
    location: 'Berlin, Germany',
    size: '50-100 employees',
    rating: 4.5,
    certifications: ['ISO 13485', 'GMP'],
    specialties: ['Medical Devices', 'Lab Equipment'],
    contact: 'research@biotech.de',
    established: 2015
  },
  {
    id: 6,
    name: 'LogiChain Masters',
    industry: 'Logistics & Supply Chain',
    location: 'Frankfurt, Germany',
    size: '200-250 employees',
    rating: 4.4,
    certifications: ['ISO 9001', 'ISO 28000'],
    specialties: ['Warehouse Management', 'Transportation'],
    contact: 'operations@logichain.de',
    established: 2005
  },
  {
    id: 7,
    name: 'ChemPro Industries',
    industry: 'Chemical Manufacturing',
    location: 'Cologne, Germany',
    size: '150-200 employees',
    rating: 4.6,
    certifications: ['ISO 9001', 'ISO 14001', 'REACH'],
    specialties: ['Industrial Chemicals', 'Specialty Compounds'],
    contact: 'sales@chempro.de',
    established: 1992
  },
  {
    id: 8,
    name: 'PackTech Solutions',
    industry: 'Packaging',
    location: 'Düsseldorf, Germany',
    size: '100-150 employees',
    rating: 4.5,
    certifications: ['ISO 9001', 'BRC'],
    specialties: ['Custom Packaging', 'Sustainable Materials'],
    contact: 'info@packtech.de',
    established: 2010
  }
];

const sidebarData = [
  {
    id: 'home',
    title: 'Home',
    icon: Home,
    color: 'text-blue-600',
    subItems: [
      { id: 'overview-dashboard', title: 'Overview Dashboard', icon: BarChart3, type: 'manual', description: 'Key metrics & KPIs' },
      { id: 'ai-insights-dashboard', title: 'AI Insights Dashboard', icon: Bot, type: 'agentic', description: 'Intelligent business insights' },
      { id: 'recent-activities', title: 'Recent Activities', icon: Clock, type: 'manual', description: 'Latest actions & updates' },
      { id: 'smart-notifications', title: 'Smart Notifications', icon: Brain, type: 'agentic', description: 'Contextual alerts & reminders' },
      { id: 'quick-actions', title: 'Quick Actions', icon: Zap, type: 'manual', description: 'Frequently used functions' },
      { id: 'personalized-workspace', title: 'Personalized Workspace', icon: Target, type: 'agentic', description: 'AI-customized interface' }
    ]
  },
  {
    id: 'suppliers',
    title: 'Suppliers Search',
    icon: Search,
    color: 'text-orange-600',
    subItems: [
      { id: 'keyword-search', title: 'Keyword Search', icon: Search, type: 'manual', description: 'Search by company name, category' },
      { id: 'supplier-contracts', title: 'Supplier Contract Management', icon: File, type: 'manual', description: 'Location, industry, certification' },
      { id: 'semantic-search', title: 'Semantic Search', icon: Bot, type: 'agentic', description: 'Natural language queries' },
      { id: 'smart-matching', title: 'Smart Matching', icon: Target, type: 'agentic', description: 'AI-based supplier recommendations' },
      { id: 'supplier-directory', title: 'Supplier Directory', icon: Database, type: 'manual', description: 'Browse categorized suppliers' },
      { id: 'discovery-engine', title: 'Discovery Engine', icon: Zap, type: 'agentic', description: 'Find hidden supplier opportunities' }
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics',
    icon: BarChart3,
    color: 'text-purple-600',
    subItems: [
      { id: 'standard-reports', title: 'Standard Reports', icon: FileText, type: 'manual', description: 'Pre-built procurement reports' },
      { id: 'ai-powered-analytics', title: 'AI-Powered Analytics', icon: Bot, type: 'agentic', description: 'Intelligent data analysis' },
      { id: 'spend-analysis', title: 'Spend Analysis', icon: PieChart, type: 'manual', description: 'Cost breakdown & trends' },
      { id: 'predictive-forecasting', title: 'Predictive Forecasting', icon: Brain, type: 'agentic', description: 'Future demand & pricing' },
      { id: 'supplier-performance', title: 'Supplier Performance', icon: TrendingUp, type: 'manual', description: 'Rating & scorecards' },
      { id: 'anomaly-detection', title: 'Anomaly Detection', icon: AlertTriangle, type: 'agentic', description: 'Unusual patterns & outliers' }
    ]
  },
  {
    id: 'pricing',
    title: 'Smart Pricing',
    icon: Euro,
    color: 'text-green-600',
    subItems: [
      { id: 'quote-comparison', title: 'Quote Comparison', icon: BarChart3, type: 'manual', description: 'Side-by-side price analysis' },
      { id: 'dynamic-pricing', title: 'Dynamic Pricing', icon: Bot, type: 'agentic', description: 'AI-optimized price suggestions' },
      { id: 'cost-modeling', title: 'Cost Modeling', icon: Calculator, type: 'manual', description: 'Build custom pricing models' },
      { id: 'market-intelligence', title: 'Market Intelligence', icon: Brain, type: 'agentic', description: 'Real-time market pricing' },
      { id: 'negotiation-support', title: 'Negotiation Support', icon: Hand, type: 'manual', description: 'Tools for price negotiations' },
      { id: 'optimal-pricing', title: 'Optimal Pricing', icon: Target, type: 'agentic', description: 'AI-recommended best prices' }
    ]
  },
  {
    id: 'orders',
    title: 'Orders Status',
    icon: Package,
    color: 'text-blue-700',
    subItems: [
      { id: 'rfq-management', title: 'RFQ Management', icon: FileText, type: 'manual', description: 'RFQ status board' },
      { id: 'order-tracking', title: 'Order Tracking', icon: MapPin, type: 'manual', description: 'Real-time order status' },
      { id: 'smart-logistics', title: 'Smart Logistics', icon: Bot, type: 'agentic', description: 'AI-optimized delivery routing' },
      { id: 'delivery-schedule', title: 'Delivery Schedule', icon: Calendar, type: 'manual', description: 'Planned & actual deliveries' },
      { id: 'predictive-delays', title: 'Predictive Delays', icon: Brain, type: 'agentic', description: 'Early warning system' },
      { id: 'invoice-matching', title: 'Invoice Matching', icon: FileText, type: 'manual', description: '3-way matching process' },
      { id: 'automated-reconciliation', title: 'Automated Reconciliation', icon: Zap, type: 'agentic', description: 'AI invoice processing' }
    ]
  },
  {
    id: 'risk',
    title: 'Risk Monitoring',
    icon: ShieldCheck,
    color: 'text-red-600',
    subItems: [
      { id: 'supplier-audit', title: 'Supplier Audit', icon: FileCheck, type: 'manual', description: 'Manual compliance checks' },
      { id: 'risk-scoring', title: 'Risk Scoring', icon: Bot, type: 'agentic', description: 'AI-based risk assessment' },
      { id: 'compliance-tracking', title: 'Compliance Tracking', icon: ShieldCheck, type: 'manual', description: 'Certification monitoring' },
      { id: 'threat-intelligence', title: 'Threat Intelligence', icon: Brain, type: 'agentic', description: 'External risk monitoring' },
      { id: 'financial-health', title: 'Financial Health', icon: TrendingDown, type: 'manual', description: 'Credit & financial analysis' },
      { id: 'early-warning', title: 'Early Warning System', icon: AlertTriangle, type: 'agentic', description: 'Predictive risk alerts' }
    ]
  },
  {
    id: 'team',
    title: 'Team Workspace',
    icon: Users,
    color: 'text-indigo-600',
    subItems: [
      { id: 'team-dashboard', title: 'Team Dashboard', icon: Users, type: 'manual', description: 'Team performance & activities' },
      { id: 'collaboration-ai', title: 'Collaboration AI', icon: Bot, type: 'agentic', description: 'Smart team coordination' },
      { id: 'task-management', title: 'Task Management', icon: CheckSquare, type: 'manual', description: 'Assign & track tasks' },
      { id: 'financial-workflows', title: 'Financial Workflows', icon: Brain, type: 'agentic', description: 'Intelligent finacial process flows' },
      { id: 'approval-workflows', title: 'Approval Workflows', icon: GitBranch, type: 'manual', description: 'Custom approval chains' },
      { id: 'smart-delegation', title: 'Smart Delegation', icon: Target, type: 'agentic', description: 'AI-based task assignment' },
      { id: 'appointment-calendar', title: 'Appointment Calendar', icon: Calendar, type: 'manual', description: 'Schedule supplier meetings' }
    ]
  },
  {
    id: 'ERP',
    title: 'ERP Integration',
    icon: Layers,
    color: 'text-indigo-900',
    subItems: [
    { id: 'data-sources', title: 'Data Sources', icon: Database, type: 'manual', description: 'Connect ERP systems and manage permissions' },
    { id: 'data-imports', title: 'Data Imports', icon: DownloadCloud, type: 'manual', description: 'Import supplier, PO, and spend data from ERP' },
    { id: 'data-mapping', title: 'Data Mapping', icon: GitMerge, type: 'manual', description: 'Map ERP fields to KraubexAI schema' },
    { id: 'sync-settings', title: 'Sync Settings', icon: RefreshCw, type: 'manual', description: 'Configure real-time and scheduled data sync' },
    { id: 'integration-health', title: 'Integration Health', icon: Activity, type: 'agentic', description: 'Monitor data sync quality and detect issues' },
    { id: 'advanced-configuration', title: 'Advanced Configuration', icon: Settings, type: 'manual', description: 'Set up APIs, multi-ERP, and security policies' }
    ]
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: MessageCircle,
    color: 'text-pink-600',
    subItems: [
      { id: 'direct-messaging', title: 'Direct Messaging', icon: MessageSquare, type: 'manual', description: 'One-on-one conversations' },
      { id: 'ai-chat-assistant', title: 'AI Chat Assistant', icon: Bot, type: 'agentic', description: 'Intelligent chat support' },
      { id: 'group-channels', title: 'Group Channels', icon: Users, type: 'manual', description: 'Team & project channels' },
      { id: 'smart-responses', title: 'Smart Responses', icon: Brain, type: 'agentic', description: 'AI-suggested replies' },
      { id: 'supplier-chat', title: 'Supplier Chat', icon: Building, type: 'manual', description: 'External supplier communication' },
      { id: 'contextual-chat', title: 'Contextual Chat', icon: Cpu, type: 'agentic', description: 'Context-aware conversations' }
    ]
  }
];

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

const bottomItems = [
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    color: 'text-gray-600',
    subItems: [
      { id: 'user-preferences', title: 'User Preferences', icon: Settings, type: 'manual', description: 'Personal settings & preferences' },
      { id: 'ai-personalization', title: 'AI Personalization', icon: Bot, type: 'agentic', description: 'Smart interface customization' },
      { id: 'notification-settings', title: 'Notification Settings', icon: Bell, type: 'manual', description: 'Alert & reminder preferences' },
      { id: 'smart-defaults', title: 'Smart Defaults', icon: Brain, type: 'agentic', description: 'AI-optimized default settings' }
    ]
  },
  {
    id: 'help',
    title: 'Help',
    icon: HelpCircle,
    color: 'text-gray-600',
    subItems: [
      { id: 'documentation', title: 'Documentation', icon: FileText, type: 'manual', description: 'User guides & tutorials' },
      { id: 'ai-help-assistant', title: 'AI Help Assistant', icon: Bot, type: 'agentic', description: 'Intelligent help chatbot' },
      { id: 'video-tutorials', title: 'Video Tutorials', icon: PlayCircle, type: 'manual', description: 'Step-by-step video guides' },
      { id: 'contextual-help', title: 'Contextual Help', icon: Brain, type: 'agentic', description: 'Smart in-app guidance' }
    ]
  }
];

const ManualSearchContent = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedSize, setSelectedSize] = useState('Any Size');
  const [filteredCompanies, setFilteredCompanies] = useState(dummyCompanies);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    products: false,
    certifications: false,
    notes: false
  });

  const handleSearch = () => {
    let results = dummyCompanies;

    if (searchQuery.trim()) {
      results = results.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (selectedIndustry !== 'All Industries') {
      results = results.filter(company => company.industry === selectedIndustry);
    }

    if (selectedLocation !== 'All Locations') {
      results = results.filter(company => company.location.includes(selectedLocation));
    }

    if (selectedSize !== 'Any Size') {
      results = results.filter(company => company.size === selectedSize);
    }

    setFilteredCompanies(results);
  };

  const handleContactCompany = (company) => {
    setSelectedCompany(company);
    setShowChat(true);
  };

  const handleViewDetails = (company) => {
    setSelectedCompany(company);
    setShowCompanyDetails(true);
    setExpandedSections({ products: false, certifications: false, notes: false });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <label className="block text-sm font-medium mb-2" style={{color: COLORS.primary}}>
          Search Keywords
        </label>
        <div className="flex gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter company name, industry, or keywords..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400 outline-none"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-white border-2 text-white rounded-lg hover:opacity-90 transition-opacity font-medium flex items-center gap-2"
            style={{backgroundColor: COLORS.primary, borderColor: COLORS.primary}}
          >
            <Search className="w-5 h-5" />
            Search
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{color: COLORS.primary}}>
          <ListFilter className="w-5 h-5" />
          Advanced Filters
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Industry</label>
            <select
              value={selectedIndustry}
              onChange={(e) => setSelectedIndustry(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400 outline-none"
            >
              <option>All Industries</option>
              <option>Steel Fabrication</option>
              <option>Technology</option>
              <option>Renewable Energy</option>
              <option>Automotive Manufacturing</option>
              <option>Biotechnology</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Location</label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400 outline-none"
            >
              <option>All Locations</option>
              <option>Germany</option>
              <option>Dortmund</option>
              <option>Munich</option>
              <option>Hamburg</option>
              <option>Stuttgart</option>
              <option>Berlin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">Company Size</label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:border-gray-400 outline-none"
            >
              <option>Any Size</option>
              <option>50-100 employees</option>
              <option>100-150 employees</option>
              <option>150-200 employees</option>
              <option>200-250 employees</option>
              <option>250+ employees</option>
              <option>300+ employees</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <button
            onClick={handleSearch}
            className="px-4 py-2 border-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            style={{borderColor: COLORS.primary, color: COLORS.primary}}
          >
            <Filter className="w-4 h-4" />
            Apply Filters
          </button>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedIndustry('All Industries');
              setSelectedLocation('All Locations');
              setSelectedSize('Any Size');
              setFilteredCompanies(dummyCompanies);
            }}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border-2 border-gray-300 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold" style={{color: COLORS.primary}}>
            Search Results ({filteredCompanies.length})
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <button className="p-2 rounded hover:bg-gray-100"><Grid3x3 className="w-4 h-4" /></button>
            <button className="p-2 rounded hover:bg-gray-100"><BarChart2 className="w-4 h-4" /></button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCompanies.map((company) => (
            <div key={company.id} className="border-2 border-gray-200 rounded-lg p-4 hover:border-gray-400 transition-colors">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{company.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">{company.industry} • {company.location}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">{company.rating}</span>
                    <span className="text-xs text-gray-500">• {company.size}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {company.certifications.map((cert, i) => (
                      <span key={i} className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] rounded-full font-medium">
                        {cert}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600">
                    <strong>Specialties:</strong> {company.specialties.join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewDetails(company)}
                  className="text-sm px-4 py-2 rounded-lg hover:opacity-90 flex-1"
                  style={{backgroundColor: COLORS.primary, color: 'white'}}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleContactCompany(company)}
                  className="text-sm px-4 py-2 rounded-lg border-2 hover:bg-gray-50 flex items-center gap-1"
                  style={{borderColor: COLORS.primary, color: COLORS.primary}}
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showChat && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl mx-4" style={{height: '80vh'}}>
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with {selectedCompany.name}</h3>
              <button onClick={() => setShowChat(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <div style={{height: 'calc(100% - 60px)'}}>
              <SupplierChatContent companyInfo={selectedCompany} />
            </div>
          </div>
        </div>
      )}

      {showCompanyDetails && selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between rounded-t-2xl z-10">
              <h3 className="text-xl font-bold" style={{color: COLORS.primary}}>Company Details</h3>
              <button onClick={() => setShowCompanyDetails(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4" style={{color: COLORS.primary}}>{selectedCompany.name}</h1>
                <div className="flex justify-center items-center gap-1 mb-2">
                  {[...Array(Math.floor(selectedCompany.rating))].map((_, i) => (
                    <Star key={i} className="w-7 h-7 text-yellow-400 fill-yellow-400" />
                  ))}
                  {selectedCompany.rating % 1 !== 0 && (
                    <Star className="w-7 h-7 text-cyan-500 fill-cyan-500" />
                  )}
                </div>
                <div className="text-lg">
                  <span className="font-bold text-purple-700">{selectedCompany.rating}</span>
                  <span className="ml-1">(47 reviews)</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-200">
                  <h2 className="text-2xl font-bold mb-6" style={{color: COLORS.primary}}>Company Overview</h2>
                  <div className="space-y-4">
                    <div className="text-center">
                      <span className="font-semibold" style={{color: COLORS.primary}}>Founded:</span>
                      <span className="ml-2">{selectedCompany.established}</span>
                    </div>
                    <div className="text-center">
                      <span className="font-semibold" style={{color: COLORS.primary}}>Headquarters:</span>
                      <span className="ml-2">{selectedCompany.location}</span>
                    </div>
                    <div className="text-center">
                      <span className="font-semibold" style={{color: COLORS.primary}}>Industry:</span>
                      <span className="ml-2">{selectedCompany.industry}</span>
                    </div>
                    <div className="text-center">
                      <span className="font-semibold" style={{color: COLORS.primary}}>Number of Employees:</span>
                      <span className="ml-2">{selectedCompany.size}</span>
                    </div>
                    <div className="text-center">
                      <span className="font-semibold" style={{color: COLORS.primary}}>Annual Revenue:</span>
                      <span className="ml-2">€{selectedCompany.id * 2}M (FY 2023)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl p-6 border border-cyan-200">
                  <h2 className="text-2xl font-bold mb-6" style={{color: COLORS.primary}}>Contact Information</h2>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="font-semibold mb-2" style={{color: COLORS.primary}}>Address:</div>
                      <div>{selectedCompany.location}</div>
                    </div>
                    <div className="text-center">
                      <a href="#" className="text-cyan-600 hover:text-cyan-800 underline font-medium transition-colors">
                        www.{selectedCompany.name.toLowerCase().replace(/\s+/g, '')}.de
                      </a>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <Phone className="w-5 h-5 text-green-500" />
                      <span>+49 {selectedCompany.id}234567890</span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      <Mail className="w-5 h-5 text-orange-500" />
                      <span>{selectedCompany.contact}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200">
                  <div
                    className="flex items-center gap-3 text-emerald-700 cursor-pointer hover:text-emerald-800 transition-colors"
                    onClick={() => toggleSection('products')}
                  >
                    <Building className="w-5 h-5 text-emerald-500" />
                    <span className="font-semibold text-lg">Products and Services</span>
                    {expandedSections.products ?
                      <ChevronUp className="w-5 h-5 ml-auto text-emerald-600" /> :
                      <ChevronDown className="w-5 h-5 ml-auto text-emerald-600" />
                    }
                  </div>
                  {expandedSections.products && (
                    <div className="mt-4 pl-8 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Core Services:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            {selectedCompany.specialties.map((spec, i) => (
                              <li key={i}>{spec}</li>
                            ))}
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <Image className="w-4 h-4 text-emerald-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Project Gallery:</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-emerald-100 h-16 rounded flex items-center justify-center text-xs text-emerald-700 border border-emerald-200">
                                Recent Project<br/>Portfolio
                              </div>
                              <div className="bg-emerald-100 h-16 rounded flex items-center justify-center text-xs text-emerald-700 border border-emerald-200">
                                Client Success<br/>Stories
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Industry Solutions:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            <li>Custom manufacturing solutions</li>
                            <li>Quality assurance services</li>
                            <li>Technical consultation</li>
                            <li>24/7 customer support</li>
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-emerald-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Documentation:</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                <span>Product Catalog.pdf</span>
                                <ExternalLink className="w-3 h-3 text-emerald-600 cursor-pointer" />
                              </div>
                              <div className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                <span>Technical Specs.pdf</span>
                                <ExternalLink className="w-3 h-3 text-emerald-600 cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
                  <div
                    className="flex items-center gap-3 text-amber-700 cursor-pointer hover:text-amber-800 transition-colors"
                    onClick={() => toggleSection('certifications')}
                  >
                    <Award className="w-5 h-5 text-amber-500" />
                    <span className="font-semibold text-lg">Certifications and Compliance</span>
                    {expandedSections.certifications ?
                      <ChevronUp className="w-5 h-5 ml-auto text-amber-600" /> :
                      <ChevronDown className="w-5 h-5 ml-auto text-amber-600" />
                    }
                  </div>
                  {expandedSections.certifications && (
                    <div className="mt-4 pl-8 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Quality Standards:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            {selectedCompany.certifications.map((cert, i) => (
                              <li key={i}>{cert} Certified</li>
                            ))}
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-amber-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Certificates:</span>
                            </div>
                            <div className="space-y-2">
                              {selectedCompany.certifications.map((cert, i) => (
                                <div key={i} className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                  <span>{cert}_Certificate.pdf</span>
                                  <ExternalLink className="w-3 h-3 text-amber-600 cursor-pointer" />
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Safety & Environment:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            <li>Occupational Health & Safety</li>
                            <li>Environmental Management</li>
                            <li>Sustainability Initiative</li>
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <Image className="w-4 h-4 text-amber-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Documentation:</span>
                            </div>
                            <div className="grid grid-cols-1 gap-2">
                              <div className="bg-amber-100 h-12 rounded flex items-center justify-center text-xs text-amber-700 border border-amber-200">
                                Safety Audit Report 2024
                              </div>
                              <div className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                <span>Compliance_Report.pdf</span>
                                <ExternalLink className="w-3 h-3 text-amber-600 cursor-pointer" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-xl p-4 border border-violet-200">
                  <div
                    className="flex items-center gap-3 text-violet-700 cursor-pointer hover:text-violet-800 transition-colors"
                    onClick={() => toggleSection('notes')}
                  >
                    <FileText className="w-5 h-5 text-violet-500" />
                    <span className="font-semibold text-lg">Additional Notes</span>
                    {expandedSections.notes ?
                      <ChevronUp className="w-5 h-5 ml-auto text-violet-600" /> :
                      <ChevronDown className="w-5 h-5 ml-auto text-violet-600" />
                    }
                  </div>
                  {expandedSections.notes && (
                    <div className="mt-4 pl-8 space-y-3">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Company Highlights:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            <li>Serving 200+ industrial clients across Europe</li>
                            <li>Award-winning sustainability practices</li>
                            <li>24/7 emergency services available</li>
                            <li>In-house R&D team for innovation</li>
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <Image className="w-4 h-4 text-violet-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Awards & Recognition:</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="bg-violet-100 h-16 rounded flex items-center justify-center text-xs text-violet-700 border border-violet-200">
                                Industry Award<br/>Certificate 2023
                              </div>
                              <div className="bg-violet-100 h-16 rounded flex items-center justify-center text-xs text-violet-700 border border-violet-200">
                                Company Timeline<br/>Gallery
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2" style={{color: COLORS.primary}}>Recent Projects:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm mb-3">
                            <li>Major industrial expansion in {selectedCompany.location.split(',')[0]} (2024)</li>
                            <li>Infrastructure development projects</li>
                            <li>Technology integration initiatives</li>
                          </ul>
                          <div className="bg-gray-50 p-3 rounded-lg border">
                            <div className="flex items-center gap-2 mb-2">
                              <FileText className="w-4 h-4 text-violet-600" />
                              <span className="text-xs font-medium" style={{color: COLORS.primary}}>Project Documentation:</span>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                <span>Project_Portfolio.pdf</span>
                                <ExternalLink className="w-3 h-3 text-violet-600 cursor-pointer" />
                              </div>
                              <div className="flex items-center justify-between text-xs p-2 bg-white rounded border">
                                <span>Case_Studies.pdf</span>
                                <ExternalLink className="w-3 h-3 text-violet-600 cursor-pointer" />
                              </div>
                              <div className="bg-violet-100 h-12 rounded flex items-center justify-center text-xs text-violet-700 border border-violet-200">
                                Project Photos
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowCompanyDetails(false);
                    handleContactCompany(selectedCompany);
                  }}
                  className="flex-1 px-6 py-3 text-white rounded-lg hover:opacity-90 font-medium flex items-center justify-center gap-2"
                  style={{backgroundColor: COLORS.primary}}
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Supplier
                </button>
                <button
                  onClick={() => setShowCompanyDetails(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default function KraubexSidebar() {
  const [activeSection, setActiveSection] = useState('suppliers');
  const [activeSubItem, setActiveSubItem] = useState('keyword-search');
  const [subItemModes, setSubItemModes] = useState({});
  const [isSubSidebarOpen, setIsSubSidebarOpen] = useState(true);
  const [isAgentFactoryOpen, setIsAgentFactoryOpen] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [agentTask, setAgentTask] = useState('');

  const handleSectionClick = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const section = [...sidebarData, ...bottomItems].find(s => s.id === sectionId);
    if (section && section.subItems.length > 0) {
      setActiveSubItem(section.subItems[0].id);
    }
    setIsSubSidebarOpen(true);
  }, []);

  const handleSubItemClick = useCallback((subItemId) => {
    setActiveSubItem(subItemId);
  }, []);

  const toggleSubItemMode = useCallback((subItemId) => {
    setSubItemModes(prev => ({
      ...prev,
      [subItemId]: prev[subItemId] === 'agentic' ? 'manual' : 'agentic'
    }));
  }, []);

  const getSubItemMode = useCallback((subItemId, defaultType) => {
    return subItemModes[subItemId] || defaultType;
  }, [subItemModes]);

  const toggleSubSidebar = useCallback(() => {
    setIsSubSidebarOpen(prev => !prev);
  }, []);

  const toggleAgentFactory = useCallback(() => {
    setIsAgentFactoryOpen(prev => !prev);
  }, []);

  const handleAgentSelect = useCallback((agent) => {
    setSelectedAgent(agent);
    setAgentTask('');
  }, []);

  const handleAssignTask = useCallback(() => {
    if (selectedAgent && agentTask.trim()) {
      alert(`Task assigned to ${selectedAgent.name}: ${agentTask}`);
      setAgentTask('');
      setSelectedAgent(null);
    }
  }, [selectedAgent, agentTask]);

  const allItems = [...sidebarData, ...bottomItems];
  const currentSection = allItems.find(item => item.id === activeSection);
  const currentSubItem = currentSection?.subItems.find(item => item.id === activeSubItem);
  const currentMode = currentSubItem ? getSubItemMode(currentSubItem.id, currentSubItem.type) : 'manual';

  return (
    <div className="flex h-screen relative" style={{backgroundColor: COLORS.background}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inria+Serif:wght@400;700&family=Roboto:wght@300;400;500;700&display=swap');
        .font-roboto { font-family: 'Roboto', sans-serif; }
      `}</style>

      {/* Main Sidebar */}
      <div className="w-64 bg-white shadow-2xl border-r border-gray-200 flex flex-col font-roboto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Link to="/">
                  <img
                    src={kraubexLogo}
                    alt="Kraubex Logo"
                    className="w-8 h-8 rounded-lg object-contain"
                  />
              </Link>
              <h1 className="text-xl font-bold" style={{ color: COLORS.text }}>
                Kraubex
              </h1>
            </div>

            <button
              onClick={toggleAgentFactory}
              className="p-2 rounded-lg transition-colors hover:bg-orange-50"
              style={{color: COLORS.primary}}
              title="Agent Factory"
            >
              <Rocket className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 py-4 overflow-y-auto">
          {sidebarData.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 mx-2 mb-1 cursor-pointer transition-all duration-200 rounded-lg ${
                  isActive ? 'text-white shadow-lg' : 'text-gray-700 hover:bg-gray-100'
                }`}
                style={{backgroundColor: isActive ? COLORS.orange : 'transparent'}}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : item.color}`} />
                <span className="font-medium">{item.title}</span>
              </div>
            );
          })}
        </div>

        <div className="p-4 border-t border-gray-200">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;

            return (
              <div
                key={item.id}
                onClick={() => handleSectionClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 mx-2 mb-1 cursor-pointer transition-all duration-200 rounded-lg ${
                  isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className={`w-5 h-5 ${item.color}`} />
                <span className="font-medium">{item.title}</span>
              </div>
            );
          })}

            {/* Replace the old profile div with ProfileDropdown component */}
            <UserProfile />
        </div>
      </div>

      {/* Sub Sidebar */}
      <div
        className={`bg-white shadow-xl border-r border-gray-200 flex flex-col font-roboto overflow-y-auto transition-all duration-300 ${
          isSubSidebarOpen ? 'w-80' : 'w-0'
        }`}
        style={{
          minWidth: isSubSidebarOpen ? '320px' : '0px',
          opacity: isSubSidebarOpen ? 1 : 0
        }}
      >
        {currentSection && isSubSidebarOpen && (
          <>
            <div className="p-6 border-b border-gray-200 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {React.createElement(currentSection.icon, { className: `w-6 h-6 ${currentSection.color}` })}
                  <h2 className="text-lg font-bold" style={{color: COLORS.primary}}>{currentSection.title}</h2>
                </div>
                <button
                  onClick={toggleSubSidebar}
                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                  title="Close sidebar"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <p className="text-xs text-gray-600">Select a feature and toggle mode</p>
            </div>

            <div className="p-4 space-y-2">
              {currentSection.subItems.map((subItem) => {
                const SubIcon = subItem.icon;
                const isActive = activeSubItem === subItem.id;
                const currentMode = getSubItemMode(subItem.id, subItem.type);
                const isAgentic = currentMode === 'agentic';

                return (
                  <div
                    key={subItem.id}
                    onClick={() => handleSubItemClick(subItem.id)}
                    className={`rounded-lg p-3 cursor-pointer transition-all duration-200 border-2 ${
                      isActive
                        ? 'bg-orange-50'
                        : 'border-transparent bg-gray-50 hover:bg-gray-100'
                    }`}
                    style={{
                      borderColor: isActive ? COLORS.primary : 'transparent'
                    }}
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-start gap-2 flex-1 min-w-0">
                        <SubIcon className={`w-4 h-4 mt-0.5 flex-shrink-0`} style={{color: isActive ? COLORS.primary : '#6b7280'}} />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm text-gray-900 leading-tight">{subItem.title}</h3>
                          <p className="text-xs text-gray-600 mt-0.5">{subItem.description}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      <span className="text-xs text-gray-500 font-medium">Mode:</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSubItemMode(subItem.id);
                        }}
                        className="relative inline-flex items-center h-4 w-14 rounded-full transition-colors duration-200"
                        style={{backgroundColor: isAgentic ? '#9333ea' : '#6b7280'}}
                      >
                        <span className={`inline-block h-2.5 w-6 transform rounded-full bg-white shadow-md transition-transform duration-200 flex items-center justify-center ${
                          isAgentic ? 'translate-x-7' : 'translate-x-0.5'
                        }`}>
                          {isAgentic ? <Bot className="w-1.5 h-1.5 text-purple-600" /> : <Hand className="w-1.5 h-1.5 text-gray-600" />}
                        </span>
                        <span className={`absolute left-1 text-[9px] font-medium text-white ${isAgentic ? 'opacity-0' : 'opacity-100'}`}>M</span>
                        <span className={`absolute right-1 text-[9px] font-medium text-white ${isAgentic ? 'opacity-100' : 'opacity-0'}`}>AI</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Agent Factory Sidebar */}
      <div
        className={`bg-white shadow-2xl border-r border-gray-200 flex flex-col font-roboto overflow-y-auto transition-all duration-300 ${
          isAgentFactoryOpen ? 'w-96' : 'w-0'
        }`}
        style={{
          minWidth: isAgentFactoryOpen ? '384px' : '0px',
          opacity: isAgentFactoryOpen ? 1 : 0,
          position: 'absolute',
          right: 0,
          top: 0,
          height: '100%',
          zIndex: 30
        }}
      >
        {isAgentFactoryOpen && (
          <>
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{color: COLORS.primary}}>Agent Factory</h2>
                    <p className="text-xs text-gray-600">AI Procurement Agents</p>
                  </div>
                </div>
                <button
                  onClick={toggleAgentFactory}
                  className="p-1 hover:bg-white rounded transition-colors"
                  title="Close Agent Factory"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>

            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {procurementAgents.map((agent) => {
                const AgentIcon = agent.icon;
                const isSelected = selectedAgent?.id === agent.id;

                return (
                  <div
                    key={agent.id}
                    onClick={() => handleAgentSelect(agent)}
                    className={`rounded-xl p-4 cursor-pointer transition-all duration-200 border-2 ${
                      isSelected
                        ? 'border-orange-300 bg-orange-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${agent.color} flex items-center justify-center flex-shrink-0`}>
                        <AgentIcon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-bold text-gray-900">{agent.name}</h3>
                          <div className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                            agent.status === 'active'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {agent.status}
                          </div>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed mb-2">{agent.description}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Briefcase className="w-3 h-3" />
                            <span>{agent.specialty}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-xs text-gray-700 font-medium">{agent.tasksCompleted} tasks</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs text-gray-700 font-medium">{agent.rating}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {selectedAgent && (
              <div className="p-4 border-t-2 border-gray-200 bg-gradient-to-r from-orange-50 to-red-50">
                <div className="bg-white rounded-lg p-4 border-2 border-orange-200">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${selectedAgent.color} flex items-center justify-center`}>
                      {React.createElement(selectedAgent.icon, { className: 'w-4 h-4 text-white' })}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm" style={{color: COLORS.primary}}>Assign Task to {selectedAgent.name}</h4>
                      <p className="text-[10px] text-gray-600">{selectedAgent.specialty}</p>
                    </div>
                  </div>

                  <textarea
                    value={agentTask}
                    onChange={(e) => setAgentTask(e.target.value)}
                    placeholder="Describe the task you want this agent to perform..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 mb-3"
                    rows="3"
                  />

                  <div className="flex gap-2">
                    <button
                      onClick={handleAssignTask}
                      disabled={!agentTask.trim()}
                      className="flex-1 px-4 py-2 bg-gradient-to-r text-white rounded-lg hover:opacity-90 transition-opacity font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{background: `linear-gradient(to right, ${COLORS.primary}, #ff6b35)`}}
                    >
                      <Play className="w-4 h-4" />
                      Assign Task
                    </button>
                    <button
                      onClick={() => setSelectedAgent(null)}
                      className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {!isAgentFactoryOpen && (
        <button
          onClick={toggleAgentFactory}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-white border-2 rounded-l-lg p-3 hover:bg-orange-50 transition-colors shadow-lg z-20 flex flex-col items-center gap-1"
          title="Open Agent Factory"
          style={{borderColor: COLORS.primary}}
        >
          <Rocket className="w-5 h-5" style={{color: COLORS.primary}} />
          <span className="text-[10px] font-bold writing-mode-vertical" style={{color: COLORS.primary, writingMode: 'vertical-rl'}}>
            AGENTS
          </span>
        </button>
      )}

      {!isSubSidebarOpen && (
        <button
          onClick={toggleSubSidebar}
          className="absolute left-64 top-1/2 transform -translate-y-1/2 bg-white border-2 border-gray-300 rounded-r-lg p-2 hover:bg-gray-50 transition-colors shadow-lg z-20"
          title="Open sidebar"
          style={{borderColor: COLORS.primary}}
        >
          <ChevronRight className="w-5 h-5" style={{color: COLORS.primary}} />
        </button>
      )}

      <div className="flex-1 overflow-y-auto " style={{backgroundColor: COLORS.background}}>
        <div className="p-8">
          {currentSubItem && (
            <>
              <div className="bg-white rounded-xl border-2 border-gray-300 p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {React.createElement(currentSubItem.icon, { className: 'w-8 h-8', style: {color: COLORS.primary} })}
                    <div>
                      <h1 className="text-2xl font-bold" style={{color: COLORS.primary}}>{currentSubItem.title}</h1>
                      <p className="text-sm text-gray-600">{currentSubItem.description}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${
                    currentMode === 'agentic'
                      ? 'bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-700 border-2 border-gray-300'
                  }`}>
                    {currentMode === 'agentic' ? (
                      <>
                        <Bot className="w-4 h-4" />
                        AI Mode Active
                      </>
                    ) : (
                      <>
                        <Hand className="w-4 h-4" />
                        Manual Mode Active
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/*{currentMode === 'manual' ? <ManualSearchContent /> : <AISearchContent />}*/}
              {/* Only show search content for supplier keyword search */}
              {activeSection === "home" && activeSubItem === "overview-dashboard" && (
                         currentMode === "manual" ? <ManualSearchContent /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "suppliers" && activeSubItem === "keyword-search" && (
                         currentMode === "manual" ? <ManualSearchContent /> : <AISearchManagement />
              )}

              {currentSubItem?.id === 'appointment-calendar' && <AppointmentCalendarContent />}

              {currentSubItem?.id === 'supplier-chat' && <SupplierChatContent />}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "pricing" && activeSubItem === "quote-comparison" && (
                      currentMode === "manual" ? <RFQComparison /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "team" && activeSubItem === "approval-workflows" && (
                         currentMode === "manual" ? <ApprovalManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "orders" && activeSubItem === "order-tracking" && (
                         currentMode === "manual" ? <PurchaseOrderManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "orders" && activeSubItem === "delivery-schedule" && (
                         currentMode === "manual" ? <QualityControlManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "orders" && activeSubItem === "invoice-matching" && (
                         currentMode === "manual" ? <InvoiceMatchingManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search*/}
              {activeSection === "orders" && activeSubItem === "rfq-management" && (
                         currentMode === "manual" ? <RFQManagement /> : <AISearchManagement />
              )}


              {/* Only show search content for supplier keyword search */}
              {activeSection === "team" && activeSubItem === "financial-workflows" && (
                         currentMode === "manual" ? <PaymentApprovalManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "suppliers" && activeSubItem === "supplier-contracts" && (
                         currentMode === "manual" ? <SupplierContractManagement /> : <AISearchManagement />
              )}

              {/* Only show search content for supplier keyword search */}
              {activeSection === "orders" && activeSubItem === "smart-logistics" && (
                         currentMode === "manual" ? <InventoryManagement /> : <AISearchManagement />
              )}

            </>
          )}
        </div>
      </div>
    </div>
  );
}