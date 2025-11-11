import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Package,
  Receipt,
  DollarSign,
  CreditCard,
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Send,
  Clock,
  Info,
  ArrowRight,
  Check
} from 'lucide-react';

export default function ThreeWayMatchingDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Sample 3-Way Matching Records
  const matchingRecords = [
    {
      id: 'MATCH-001',
      poNumber: 'PO-2025-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      grNumber: 'GR-2025-001',
      invoiceNumber: 'INV-2025-001',
      supplier: 'SteelSphere GmbH',
      projectName: 'Industrial Warehouse Structure',
      status: 'matched',
      matchDate: '2025-11-05',

      // Purchase Order Data
      po: {
        date: '2025-11-03',
        amount: 60000,
        currency: '€',
        items: [
          { description: 'Steel I-Beams Grade A36', quantity: 20, unitPrice: 2500, total: 50000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 9500, total: 9500 },
          { description: 'Shipping', quantity: 1, unitPrice: 500, total: 500 }
        ]
      },

      // Goods Receipt Data
      gr: {
        date: '2025-11-04',
        receivedBy: 'John Müller',
        items: [
          { description: 'Steel I-Beams Grade A36', orderedQty: 20, receivedQty: 20, condition: 'good' }
        ],
        qualityRating: 5
      },

      // Invoice Data
      invoice: {
        number: 'INV-SS-2025-001',
        date: '2025-11-04',
        dueDate: '2025-12-04',
        amount: 60000,
        currency: '€',
        items: [
          { description: 'Steel I-Beams Grade A36', quantity: 20, unitPrice: 2500, total: 50000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 9500, total: 9500 },
          { description: 'Shipping', quantity: 1, unitPrice: 500, total: 500 }
        ]
      },

      // Matching Results
      matching: {
        quantityMatch: true,
        priceMatch: true,
        totalMatch: true,
        discrepancies: []
      },

      approvedBy: 'Michael Schmidt',
      approvedDate: '2025-11-05',
      paymentStatus: 'approved'
    },
    {
      id: 'MATCH-002',
      poNumber: 'PO-2025-002',
      rfqId: 'KRAUBEX-RFQ-15678',
      grNumber: 'GR-2025-002',
      invoiceNumber: 'INV-2025-002',
      supplier: 'Deutsche Stahlbau',
      projectName: 'Bridge Component Fabrication',
      status: 'pending',

      po: {
        date: '2025-10-25',
        amount: 130020,
        currency: '€',
        items: [
          { description: 'Steel Girders', quantity: 15, unitPrice: 7200, total: 108000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 20520, total: 20520 },
          { description: 'Shipping', quantity: 1, unitPrice: 1500, total: 1500 }
        ]
      },

      gr: {
        date: '2025-11-01',
        receivedBy: 'Anna Schneider',
        items: [
          { description: 'Steel Girders', orderedQty: 15, receivedQty: 15, condition: 'excellent' }
        ],
        qualityRating: 5
      },

      invoice: {
        number: 'INV-DS-2025-002',
        date: '2025-11-01',
        dueDate: '2025-12-31',
        amount: 130020,
        currency: '€',
        items: [
          { description: 'Steel Girders', quantity: 15, unitPrice: 7200, total: 108000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 20520, total: 20520 },
          { description: 'Shipping', quantity: 1, unitPrice: 1500, total: 1500 }
        ]
      },

      matching: {
        quantityMatch: true,
        priceMatch: true,
        totalMatch: true,
        discrepancies: []
      },

      paymentStatus: 'pending_approval'
    },
    {
      id: 'MATCH-003',
      poNumber: 'PO-2025-003',
      rfqId: 'KRAUBEX-RFQ-20445',
      grNumber: 'GR-2025-003',
      invoiceNumber: 'INV-2025-003',
      supplier: 'ProInstall Services GmbH',
      projectName: 'Installation Service Contract',
      status: 'matched',
      matchDate: '2025-10-25',

      po: {
        date: '2025-10-20',
        amount: 17850,
        currency: '€',
        items: [
          { description: 'Installation & Assembly Service', quantity: 1, unitPrice: 15000, total: 15000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 2850, total: 2850 }
        ]
      },

      gr: {
        date: '2025-10-24',
        receivedBy: 'Martin Fischer',
        items: [
          { description: 'Installation & Assembly Service', orderedQty: 1, receivedQty: 1, condition: 'excellent' }
        ],
        qualityRating: 5
      },

      invoice: {
        number: 'INV-PI-2025-003',
        date: '2025-10-24',
        dueDate: '2025-11-23',
        amount: 17850,
        currency: '€',
        items: [
          { description: 'Installation & Assembly Service', quantity: 1, unitPrice: 15000, total: 15000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 2850, total: 2850 }
        ]
      },

      matching: {
        quantityMatch: true,
        priceMatch: true,
        totalMatch: true,
        discrepancies: []
      },

      approvedBy: 'Michael Schmidt',
      approvedDate: '2025-10-25',
      paymentStatus: 'paid',
      paymentDate: '2025-11-15'
    },
    {
      id: 'MATCH-004',
      poNumber: 'PO-2025-004',
      rfqId: 'KRAUBEX-RFQ-18765',
      grNumber: 'GR-2025-004',
      invoiceNumber: 'INV-2025-004',
      supplier: 'MetalWorks Industries',
      projectName: 'Equipment Platform',
      status: 'discrepancy',

      po: {
        date: '2025-10-20',
        amount: 61490,
        currency: '€',
        items: [
          { description: 'Platform Structure', quantity: 1, unitPrice: 45000, total: 45000 },
          { description: 'Safety Rails', quantity: 1, unitPrice: 6000, total: 6000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 9690, total: 9690 },
          { description: 'Shipping', quantity: 1, unitPrice: 800, total: 800 }
        ]
      },

      gr: {
        date: '2025-10-30',
        receivedBy: 'Peter Wagner',
        items: [
          { description: 'Platform Structure', orderedQty: 1, receivedQty: 1, condition: 'good' },
          { description: 'Safety Rails', orderedQty: 1, receivedQty: 0, condition: null, note: 'Not delivered' }
        ],
        qualityRating: 4,
        notes: 'Partial delivery - Safety rails delayed'
      },

      invoice: {
        number: 'INV-MW-2025-004',
        date: '2025-10-30',
        dueDate: '2025-11-29',
        amount: 61490,
        currency: '€',
        items: [
          { description: 'Platform Structure', quantity: 1, unitPrice: 45000, total: 45000 },
          { description: 'Safety Rails', quantity: 1, unitPrice: 6000, total: 6000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 9690, total: 9690 },
          { description: 'Shipping', quantity: 1, unitPrice: 800, total: 800 }
        ]
      },

      matching: {
        quantityMatch: false,
        priceMatch: true,
        totalMatch: false,
        discrepancies: [
          {
            type: 'quantity_mismatch',
            item: 'Safety Rails',
            po: 1,
            gr: 0,
            invoice: 1,
            severity: 'high',
            description: 'Invoice includes Safety Rails but goods were not received'
          },
          {
            type: 'amount_mismatch',
            description: 'Invoice total includes undelivered items',
            poAmount: 61490,
            grAmount: 54740, // Calculated without safety rails
            invoiceAmount: 61490,
            difference: 6750,
            severity: 'high'
          }
        ]
      },

      paymentStatus: 'on_hold',
      holdReason: 'Partial delivery - awaiting safety rails or adjusted invoice'
    },
    {
      id: 'MATCH-005',
      poNumber: 'PO-2025-005',
      rfqId: 'KRAUBEX-RFQ-19234',
      grNumber: 'GR-2025-005',
      invoiceNumber: 'INV-2025-005',
      supplier: 'Titan Steel Works',
      projectName: 'Structural Components',
      status: 'discrepancy',

      po: {
        date: '2025-10-20',
        amount: 47500,
        currency: '€',
        items: [
          { description: 'Steel Columns Grade A572', quantity: 10, unitPrice: 4000, total: 40000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 7600, total: 7600 }
        ]
      },

      gr: {
        date: '2025-10-28',
        receivedBy: 'Klaus Mueller',
        items: [
          { description: 'Steel Columns Grade A572', orderedQty: 10, receivedQty: 10, condition: 'damaged', damagedQty: 3 }
        ],
        qualityRating: 2,
        notes: 'DAMAGE REPORT: 3 columns severely damaged. Replacement requested.'
      },

      invoice: {
        number: 'INV-TS-2025-005',
        date: '2025-10-28',
        dueDate: '2025-11-27',
        amount: 47500,
        currency: '€',
        items: [
          { description: 'Steel Columns Grade A572', quantity: 10, unitPrice: 4000, total: 40000 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 7600, total: 7600 }
        ]
      },

      matching: {
        quantityMatch: true,
        priceMatch: true,
        totalMatch: false,
        discrepancies: [
          {
            type: 'quality_issue',
            item: 'Steel Columns Grade A572',
            description: '3 out of 10 units damaged - not acceptable quality',
            severity: 'high',
            action: 'Credit note required for 3 damaged units'
          },
          {
            type: 'amount_adjustment_needed',
            description: 'Invoice should be adjusted for damaged goods',
            originalAmount: 47500,
            adjustedAmount: 33250, // 7 good units
            creditRequired: 14250,
            severity: 'high'
          }
        ]
      },

      paymentStatus: 'disputed',
      disputeReason: 'Quality issues - credit note requested for damaged goods'
    },
    {
      id: 'MATCH-006',
      poNumber: 'PO-2025-006',
      rfqId: 'KRAUBEX-RFQ-22157',
      grNumber: 'GR-2025-006',
      invoiceNumber: null,
      supplier: 'QualityTest Pro GmbH',
      projectName: 'Quality Control & Inspection',
      status: 'incomplete',

      po: {
        date: '2025-11-04',
        amount: 10115,
        currency: '€',
        items: [
          { description: 'Non-Destructive Testing Service', quantity: 1, unitPrice: 8500, total: 8500 },
          { description: 'Tax (19%)', quantity: 1, unitPrice: 1615, total: 1615 }
        ]
      },

      gr: {
        date: '2025-11-06',
        receivedBy: 'Lisa Hoffmann',
        items: [
          { description: 'Non-Destructive Testing Service', orderedQty: 1, receivedQty: 1, condition: 'pending' }
        ],
        notes: 'Service completed. Awaiting final inspection report.'
      },

      invoice: null,

      matching: {
        quantityMatch: null,
        priceMatch: null,
        totalMatch: null,
        discrepancies: []
      },

      paymentStatus: 'awaiting_invoice'
    }
  ];

  const stats = {
    total: matchingRecords.length,
    matched: matchingRecords.filter(r => r.status === 'matched').length,
    pending: matchingRecords.filter(r => r.status === 'pending').length,
    discrepancy: matchingRecords.filter(r => r.status === 'discrepancy').length,
    incomplete: matchingRecords.filter(r => r.status === 'incomplete').length,
    totalValue: matchingRecords.reduce((sum, r) => sum + (r.po?.amount || 0), 0),
    discrepancyValue: matchingRecords
      .filter(r => r.status === 'discrepancy')
      .reduce((sum, r) => sum + (r.matching?.discrepancies?.[0]?.difference || 0), 0)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'matched': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'discrepancy': return 'bg-red-100 text-red-800 border-red-300';
      case 'incomplete': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'matched': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'discrepancy': return <AlertTriangle className="w-4 h-4" />;
      case 'incomplete': return <Info className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount, currency = '€') => {
    return `${currency}${amount.toLocaleString('de-DE')}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredRecords = matchingRecords.filter(record => {
    const matchesTab = activeTab === 'all' || record.status === activeTab;
    const matchesSearch = record.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         record.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">3-Way Matching</h1>
          <p className="text-gray-600">Match Purchase Orders, Goods Receipts, and Invoices</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Records</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.matched}</p>
            <p className="text-xs text-gray-600 mt-1">Matched</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending Review</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.discrepancy}</p>
            <p className="text-xs text-gray-600 mt-1">Discrepancies</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Info className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.incomplete}</p>
            <p className="text-xs text-gray-600 mt-1">Incomplete</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            <p className="text-xs text-gray-600 mt-1">Total Value</p>
          </div>
        </div>

        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-semibold text-blue-900 mb-1">What is 3-Way Matching?</h4>
            <p className="text-sm text-blue-800">
              3-Way Matching compares the <strong>Purchase Order</strong> (what you ordered),
              <strong> Goods Receipt</strong> (what you received), and <strong>Invoice</strong> (what you're being charged)
              to ensure they all match before approving payment. This prevents overpayment and fraud.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex gap-2 mb-6 border-b overflow-x-auto">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'pending'
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('matched')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'matched'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Matched ({stats.matched})
              </button>
              <button
                onClick={() => setActiveTab('discrepancy')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'discrepancy'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Discrepancies ({stats.discrepancy})
              </button>
              <button
                onClick={() => setActiveTab('incomplete')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'incomplete'
                    ? 'border-gray-600 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Incomplete ({stats.incomplete})
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by PO, supplier, or project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Matching Records */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <div key={record.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{record.id}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusColor(record.status)}`}>
                        {getStatusIcon(record.status)}
                        {record.status.toUpperCase().replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      PO: {record.poNumber} • Project: {record.projectName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Supplier: {record.supplier}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(record.po.amount, record.po.currency)}</p>
                  </div>
                </div>

                {/* 3-Way Matching Visual */}
                <div className="mb-4">
                  <div className="grid grid-cols-3 gap-4">
                    {/* Purchase Order */}
                    <div className={`p-4 rounded-lg border-2 ${
                      record.matching.quantityMatch && record.matching.priceMatch
                        ? 'bg-green-50 border-green-300'
                        : record.status === 'discrepancy'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-sm">Purchase Order</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">Date: {formatDate(record.po.date)}</p>
                      <p className="text-lg font-bold text-gray-900">{formatCurrency(record.po.amount)}</p>
                      <p className="text-xs text-gray-600 mt-1">{record.po.items.length} line items</p>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Goods Receipt */}
                    <div className={`p-4 rounded-lg border-2 ${
                      record.matching.quantityMatch
                        ? 'bg-green-50 border-green-300'
                        : record.status === 'discrepancy'
                        ? 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Package className="w-5 h-5 text-green-600" />
                        <h4 className="font-semibold text-sm">Goods Receipt</h4>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">Date: {formatDate(record.gr.date)}</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {record.gr.items.reduce((sum, item) => sum + (item.receivedQty || 0), 0)} items received
                      </p>
                      <p className="text-xs text-gray-600 mt-1">By: {record.gr.receivedBy}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div></div>
                    <div className="flex items-center justify-center">
                      <ArrowRight className="w-8 h-8 text-gray-400" />
                    </div>

                    {/* Invoice */}
                    <div className={`p-4 rounded-lg border-2 ${
                      record.invoice
                        ? record.matching.totalMatch
                          ? 'bg-green-50 border-green-300'
                          : 'bg-red-50 border-red-300'
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex items-center gap-2 mb-2">
                        <Receipt className="w-5 h-5 text-purple-600" />
                        <h4 className="font-semibold text-sm">Invoice</h4>
                      </div>
                      {record.invoice ? (
                        <>
                          <p className="text-xs text-gray-600 mb-1">Date: {formatDate(record.invoice.date)}</p>
                          <p className="text-lg font-bold text-gray-900">{formatCurrency(record.invoice.amount)}</p>
                          <p className="text-xs text-gray-600 mt-1">Due: {formatDate(record.invoice.dueDate)}</p>
                        </>
                      ) : (
                        <p className="text-sm text-gray-500 italic">Awaiting Invoice</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Matching Status */}
                {record.matching.discrepancies.length === 0 && record.status === 'matched' && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <p className="font-semibold text-green-900">Perfect Match!</p>
                    </div>
                    <p className="text-sm text-green-800 mt-1">
                      All documents match. Ready for payment approval.
                    </p>
                  </div>
                )}

                {/* Discrepancies */}
                {record.matching.discrepancies.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Discrepancies Found ({record.matching.discrepancies.length})
                    </h4>
                    <div className="space-y-2">
                      {record.matching.discrepancies.map((disc, index) => (
                        <div key={index} className={`p-4 rounded-lg border-2 ${
                          disc.severity === 'high'
                            ? 'bg-red-50 border-red-300'
                            : 'bg-yellow-50 border-yellow-300'
                        }`}>
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="font-semibold text-sm mb-1">
                                {disc.type.replace(/_/g, ' ').toUpperCase()}
                                {disc.item && ` - ${disc.item}`}
                              </p>
                              <p className="text-sm text-gray-800 mb-2">{disc.description}</p>
                              {disc.po !== undefined && (
                                <div className="text-xs space-y-1">
                                  <p><strong>PO:</strong> {disc.po} {disc.invoice && `| Invoice: ${disc.invoice}`} {disc.gr !== undefined && `| GR: ${disc.gr}`}</p>
                                </div>
                              )}
                              {disc.difference && (
                                <p className="text-sm font-bold text-red-700 mt-2">
                                  Difference: {formatCurrency(disc.difference)}
                                </p>
                              )}
                              {disc.action && (
                                <p className="text-sm font-semibold text-blue-700 mt-2">
                                  Action Required: {disc.action}
                                </p>
                              )}
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              disc.severity === 'high'
                                ? 'bg-red-600 text-white'
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {disc.severity?.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Payment Status */}
                {record.paymentStatus && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-gray-600" />
                      <span className="font-semibold text-gray-900">Payment Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        record.paymentStatus === 'approved' ? 'bg-green-100 text-green-800' :
                        record.paymentStatus === 'paid' ? 'bg-blue-100 text-blue-800' :
                        record.paymentStatus === 'on_hold' ? 'bg-red-100 text-red-800' :
                        record.paymentStatus === 'disputed' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.paymentStatus.replace(/_/g, ' ').toUpperCase()}
                      </span>
                    </div>
                    {record.approvedBy && (
                      <p className="text-sm text-gray-600">
                        Approved by {record.approvedBy} on {formatDate(record.approvedDate)}
                      </p>
                    )}
                  </div>
                )}

                {/* Hold/Dispute Reason */}
                {(record.holdReason || record.disputeReason) && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-red-900">
                          {record.holdReason ? 'Payment On Hold' : 'Payment Disputed'}
                        </p>
                        <p className="text-sm text-red-800 mt-1">
                          {record.holdReason || record.disputeReason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedMatch(record);
                      setShowMatchModal(true);
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {record.status === 'pending' && (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Approve for Payment
                    </button>
                  )}
                  {record.status === 'discrepancy' && (
                    <>
                      <button className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2">
                        <Send className="w-4 h-4" />
                        Request Clarification
                      </button>
                      <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                        <XCircle className="w-4 h-4" />
                        Dispute Invoice
                      </button>
                    </>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal */}
        {showMatchModal && selectedMatch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">3-Way Match Details</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedMatch.id}</p>
                </div>
                <button onClick={() => setShowMatchModal(false)}>
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* Comparison Table */}
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-3">Line Item Comparison</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Item Description</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">PO Qty</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">GR Qty</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Invoice Qty</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Unit Price</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Total</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedMatch.po.items.slice(0, -2).map((item, index) => {
                          const grItem = selectedMatch.gr.items[index];
                          const invoiceItem = selectedMatch.invoice?.items[index];
                          const qtyMatch = grItem?.receivedQty === item.quantity &&
                                         invoiceItem?.quantity === item.quantity;

                          return (
                            <tr key={index} className={qtyMatch ? '' : 'bg-red-50'}>
                              <td className="px-4 py-3 text-sm">{item.description}</td>
                              <td className="px-4 py-3 text-center text-sm font-semibold">{item.quantity}</td>
                              <td className="px-4 py-3 text-center text-sm font-semibold">
                                {grItem?.receivedQty !== undefined ? grItem.receivedQty : '-'}
                              </td>
                              <td className="px-4 py-3 text-center text-sm font-semibold">
                                {invoiceItem?.quantity || '-'}
                              </td>
                              <td className="px-4 py-3 text-right text-sm">{formatCurrency(item.unitPrice)}</td>
                              <td className="px-4 py-3 text-right text-sm font-semibold">{formatCurrency(item.total)}</td>
                              <td className="px-4 py-3 text-center">
                                {qtyMatch ? (
                                  <CheckCircle className="w-5 h-5 text-green-600 mx-auto" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-600 mx-auto" />
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot className="bg-gray-50 border-t-2">
                        <tr>
                          <td colSpan="5" className="px-4 py-3 text-right font-bold">Total Amount</td>
                          <td className="px-4 py-3 text-right text-lg font-bold text-blue-600">
                            {formatCurrency(selectedMatch.po.amount)}
                          </td>
                          <td className="px-4 py-3 text-center">
                            {selectedMatch.matching.totalMatch ? (
                              <CheckCircle className="w-6 h-6 text-green-600 mx-auto" />
                            ) : (
                              <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                            )}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Summary */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900 mb-2">Purchase Order</p>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(selectedMatch.po.amount)}</p>
                    <p className="text-xs text-blue-600 mt-1">{formatDate(selectedMatch.po.date)}</p>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm font-semibold text-green-900 mb-2">Goods Receipt</p>
                    <p className="text-xl font-bold text-green-700">
                      {selectedMatch.gr.items.reduce((sum, item) => sum + (item.receivedQty || 0), 0)} items
                    </p>
                    <p className="text-xs text-green-600 mt-1">{formatDate(selectedMatch.gr.date)}</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-sm font-semibold text-purple-900 mb-2">Invoice</p>
                    <p className="text-2xl font-bold text-purple-700">
                      {selectedMatch.invoice ? formatCurrency(selectedMatch.invoice.amount) : 'Pending'}
                    </p>
                    {selectedMatch.invoice && (
                      <p className="text-xs text-purple-600 mt-1">{formatDate(selectedMatch.invoice.date)}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowMatchModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  {selectedMatch.status === 'pending' && (
                    <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4" />
                      Approve Payment
                    </button>
                  )}
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}