import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Send,
  Truck,
  Package,
  CheckCircle,
  Clock,
  AlertTriangle,
  XCircle,
  FileText,
  Calendar,
  DollarSign,
  CreditCard,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Plus,
  TrendingUp,
  Box
} from 'lucide-react';

export default function PurchaseOrderDashboard() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPOModal, setShowPOModal] = useState(false);
  const [selectedPO, setSelectedPO] = useState(null);
  const [showCreatePO, setShowCreatePO] = useState(false);

  // Sample Purchase Orders
  const purchaseOrders = [
    {
      id: 'PO-2025-001',
      poNumber: 'PO-2025-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      approvalId: 'APR-001',
      status: 'confirmed',
      supplier: {
        name: 'SteelSphere GmbH',
        contact: 'Hans Mueller',
        email: 'hans.mueller@steelsphere.de',
        phone: '+49 30 1234567',
        address: 'Stahlstrasse 45, 10115 Berlin, Germany'
      },
      buyer: {
        name: 'KRAUBEX GmbH',
        contact: 'John Müller',
        email: 'john.mueller@kraubex.de',
        phone: '+49 40 9876543',
        address: 'Industrieweg 12, 20095 Hamburg, Germany'
      },
      issueDate: '2025-11-03',
      deliveryDate: '2025-11-17',
      expectedDelivery: '2025-11-17',
      projectName: 'Industrial Warehouse Structure',
      items: [
        {
          id: 1,
          description: 'Steel I-Beams Grade A36',
          specifications: '12" depth, 30ft length',
          quantity: 20,
          unit: 'pieces',
          unitPrice: 2500,
          totalPrice: 50000
        }
      ],
      subtotal: 50000,
      taxRate: 19,
      taxAmount: 9500,
      shippingCost: 500,
      totalAmount: 60000,
      currency: '€',
      paymentTerms: 'Net 30',
      deliveryTerms: 'DDP - Delivered Duty Paid',
      shippingAddress: 'Warehouse Site, Industriestrasse 89, 22047 Hamburg',
      notes: 'Please ensure proper packaging for transportation. Notify 24h before delivery.',
      createdBy: 'John Müller',
      createdDate: '2025-11-03',
      confirmedDate: '2025-11-03',
      trackingNumber: 'TRK-2025-001',
      daysUntilDelivery: 14
    },
    {
      id: 'PO-2025-002',
      poNumber: 'PO-2025-002',
      rfqId: 'KRAUBEX-RFQ-15678',
      approvalId: 'APR-002',
      status: 'in_transit',
      supplier: {
        name: 'Deutsche Stahlbau',
        contact: 'Klaus Weber',
        email: 'klaus.weber@dstahlbau.de',
        phone: '+49 89 2345678',
        address: 'Metallweg 23, 80331 Munich, Germany'
      },
      buyer: {
        name: 'KRAUBEX GmbH',
        contact: 'Anna Schneider',
        email: 'anna.schneider@kraubex.de',
        phone: '+49 40 9876543',
        address: 'Industrieweg 12, 20095 Hamburg, Germany'
      },
      issueDate: '2025-10-25',
      deliveryDate: '2025-11-15',
      expectedDelivery: '2025-11-15',
      projectName: 'Bridge Component Fabrication',
      items: [
        {
          id: 1,
          description: 'Steel Girders',
          specifications: 'Heavy duty, 40ft length',
          quantity: 15,
          unit: 'pieces',
          unitPrice: 7200,
          totalPrice: 108000
        }
      ],
      subtotal: 108000,
      taxRate: 19,
      taxAmount: 20520,
      shippingCost: 1500,
      totalAmount: 130020,
      currency: '€',
      paymentTerms: 'Net 60',
      deliveryTerms: 'FOB - Free on Board',
      shippingAddress: 'Bridge Construction Site, Hafenstrasse 45, 20457 Hamburg',
      notes: 'Requires specialized transportation. Crane assistance needed on-site.',
      createdBy: 'Anna Schneider',
      createdDate: '2025-10-25',
      confirmedDate: '2025-10-26',
      shippedDate: '2025-11-05',
      trackingNumber: 'TRK-2025-002',
      carrier: 'Deutsche Post DHL',
      daysUntilDelivery: 12,
      trackingUrl: 'https://tracking.dhl.de/TRK-2025-002'
    },
    {
      id: 'PO-2025-003',
      poNumber: 'PO-2025-003',
      rfqId: 'KRAUBEX-RFQ-20445',
      approvalId: 'APR-003',
      status: 'completed',
      supplier: {
        name: 'ProInstall Services GmbH',
        contact: 'Stefan Schmidt',
        email: 'stefan.schmidt@proinstall.de',
        phone: '+49 211 3456789',
        address: 'Serviceweg 67, 40210 Düsseldorf, Germany'
      },
      buyer: {
        name: 'KRAUBEX GmbH',
        contact: 'Martin Fischer',
        email: 'martin.fischer@kraubex.de',
        phone: '+49 40 9876543',
        address: 'Industrieweg 12, 20095 Hamburg, Germany'
      },
      issueDate: '2025-10-20',
      deliveryDate: '2025-10-25',
      expectedDelivery: '2025-10-25',
      actualDelivery: '2025-10-24',
      projectName: 'Installation Service Contract',
      items: [
        {
          id: 1,
          description: 'Installation & Assembly Service',
          specifications: 'Complete on-site installation',
          quantity: 1,
          unit: 'service',
          unitPrice: 15000,
          totalPrice: 15000
        }
      ],
      subtotal: 15000,
      taxRate: 19,
      taxAmount: 2850,
      shippingCost: 0,
      totalAmount: 17850,
      currency: '€',
      paymentTerms: 'Net 30',
      deliveryTerms: 'On-site Service',
      shippingAddress: 'Manufacturing Plant, Fabrikstrasse 12, 20095 Hamburg',
      notes: 'Service completed successfully. All equipment installed and tested.',
      createdBy: 'Martin Fischer',
      createdDate: '2025-10-20',
      confirmedDate: '2025-10-20',
      completedDate: '2025-10-24',
      invoiceReceived: true,
      invoiceId: 'INV-2025-003',
      daysUntilDelivery: 0
    },
    {
      id: 'PO-2025-004',
      poNumber: 'PO-2025-004',
      rfqId: 'KRAUBEX-RFQ-22157',
      approvalId: 'APR-005',
      status: 'draft',
      supplier: {
        name: 'QualityTest Pro GmbH',
        contact: 'Andrea Becker',
        email: 'andrea.becker@qualitytest.de',
        phone: '+49 69 4567890',
        address: 'Teststrasse 34, 60311 Frankfurt, Germany'
      },
      buyer: {
        name: 'KRAUBEX GmbH',
        contact: 'Lisa Hoffmann',
        email: 'lisa.hoffmann@kraubex.de',
        phone: '+49 40 9876543',
        address: 'Industrieweg 12, 20095 Hamburg, Germany'
      },
      issueDate: '2025-11-04',
      deliveryDate: '2025-11-07',
      expectedDelivery: '2025-11-07',
      projectName: 'Quality Control & Inspection',
      items: [
        {
          id: 1,
          description: 'Non-Destructive Testing Service',
          specifications: 'Ultrasonic and X-ray testing',
          quantity: 1,
          unit: 'service',
          unitPrice: 8500,
          totalPrice: 8500
        }
      ],
      subtotal: 8500,
      taxRate: 19,
      taxAmount: 1615,
      shippingCost: 0,
      totalAmount: 10115,
      currency: '€',
      paymentTerms: 'Net 45',
      deliveryTerms: 'On-site Service',
      shippingAddress: 'Quality Lab, Qualitätsweg 5, 20095 Hamburg',
      notes: 'Draft PO - Pending final review before sending to supplier',
      createdBy: 'Lisa Hoffmann',
      createdDate: '2025-11-04',
      daysUntilDelivery: 3
    },
    {
      id: 'PO-2025-005',
      poNumber: 'PO-2025-005',
      rfqId: 'KRAUBEX-RFQ-18932',
      approvalId: 'APR-006',
      status: 'delayed',
      supplier: {
        name: 'MetalWorks Industries',
        contact: 'Thomas Klein',
        email: 'thomas.klein@metalworks.de',
        phone: '+49 221 5678901',
        address: 'Metallplatz 56, 50667 Cologne, Germany'
      },
      buyer: {
        name: 'KRAUBEX GmbH',
        contact: 'Peter Wagner',
        email: 'peter.wagner@kraubex.de',
        phone: '+49 40 9876543',
        address: 'Industrieweg 12, 20095 Hamburg, Germany'
      },
      issueDate: '2025-10-15',
      deliveryDate: '2025-10-29',
      expectedDelivery: '2025-11-05',
      projectName: 'Equipment Platform',
      items: [
        {
          id: 1,
          description: 'Platform Structure',
          specifications: 'Custom steel platform',
          quantity: 1,
          unit: 'unit',
          unitPrice: 45000,
          totalPrice: 45000
        },
        {
          id: 2,
          description: 'Safety Rails',
          specifications: 'Standard safety rails',
          quantity: 1,
          unit: 'set',
          unitPrice: 6000,
          totalPrice: 6000
        }
      ],
      subtotal: 51000,
      taxRate: 19,
      taxAmount: 9690,
      shippingCost: 800,
      totalAmount: 61490,
      currency: '€',
      paymentTerms: 'Net 30',
      deliveryTerms: 'DDP - Delivered Duty Paid',
      shippingAddress: 'Production Facility, Produktionsweg 78, 20095 Hamburg',
      notes: 'DELAYED: Manufacturing issues at supplier. New ETA: Nov 5th',
      createdBy: 'Peter Wagner',
      createdDate: '2025-10-15',
      confirmedDate: '2025-10-16',
      delayReason: 'Manufacturing equipment malfunction',
      daysUntilDelivery: 8,
      daysDelayed: 7
    }
  ];

  const stats = {
    total: purchaseOrders.length,
    draft: purchaseOrders.filter(po => po.status === 'draft').length,
    confirmed: purchaseOrders.filter(po => po.status === 'confirmed').length,
    inTransit: purchaseOrders.filter(po => po.status === 'in_transit').length,
    completed: purchaseOrders.filter(po => po.status === 'completed').length,
    delayed: purchaseOrders.filter(po => po.status === 'delayed').length,
    totalValue: purchaseOrders.reduce((sum, po) => sum + po.totalAmount, 0),
    avgDeliveryTime: 12
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'confirmed': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'in_transit': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'completed': return 'bg-green-100 text-green-800 border-green-300';
      case 'delayed': return 'bg-red-100 text-red-800 border-red-300';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'draft': return <FileText className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'completed': return <Package className="w-4 h-4" />;
      case 'delayed': return <AlertTriangle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const formatCurrency = (amount, currency = '€') => {
    return `${currency}${amount.toLocaleString('de-DE')}`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredPOs = purchaseOrders.filter(po => {
    const matchesTab = activeTab === 'all' || po.status === activeTab;
    const matchesSearch = po.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         po.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         po.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="w-full">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Purchase Order Management</h1>
            <p className="text-gray-600">Track and manage all purchase orders</p>
          </div>
          <button
            onClick={() => setShowCreatePO(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 font-semibold"
          >
            <Plus className="w-5 h-5" />
            Create PO
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total POs</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-gray-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            <p className="text-xs text-gray-600 mt-1">Draft</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
            <p className="text-xs text-gray-600 mt-1">Confirmed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Truck className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.inTransit}</p>
            <p className="text-xs text-gray-600 mt-1">In Transit</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Package className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            <p className="text-xs text-gray-600 mt-1">Completed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.delayed}</p>
            <p className="text-xs text-gray-600 mt-1">Delayed</p>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Total PO Value</p>
                <p className="text-4xl font-bold">{formatCurrency(stats.totalValue)}</p>
              </div>
              <CreditCard className="w-16 h-16 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Avg. Delivery Time</p>
                <p className="text-4xl font-bold">{stats.avgDeliveryTime} days</p>
              </div>
              <Clock className="w-16 h-16 opacity-50" />
            </div>
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
                onClick={() => setActiveTab('draft')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'draft'
                    ? 'border-gray-600 text-gray-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Draft ({stats.draft})
              </button>
              <button
                onClick={() => setActiveTab('confirmed')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'confirmed'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Confirmed ({stats.confirmed})
              </button>
              <button
                onClick={() => setActiveTab('in_transit')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'in_transit'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                In Transit ({stats.inTransit})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'completed'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Completed ({stats.completed})
              </button>
              <button
                onClick={() => setActiveTab('delayed')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'delayed'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Delayed ({stats.delayed})
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by PO number, supplier, or project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* PO List */}
        <div className="space-y-4">
          {filteredPOs.map((po) => (
            <div key={po.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{po.poNumber}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusColor(po.status)}`}>
                        {getStatusIcon(po.status)}
                        {po.status.replace('_', ' ').toUpperCase()}
                      </span>
                      {po.status === 'delayed' && (
                        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          {po.daysDelayed} days late
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Project: {po.projectName} • RFQ: {po.rfqId}
                    </p>
                    <p className="text-sm text-gray-600">
                      Supplier: {po.supplier.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(po.totalAmount, po.currency)}</p>
                    {po.daysUntilDelivery > 0 && (
                      <p className="text-xs text-gray-500 mt-1">{po.daysUntilDelivery} days until delivery</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Issue Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(po.issueDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Expected Delivery</p>
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(po.expectedDelivery)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Terms</p>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{po.paymentTerms}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Created By</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{po.createdBy}</p>
                    </div>
                  </div>
                </div>

                {/* Items Summary */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Order Items</h4>
                  <div className="space-y-2">
                    {po.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.description}</p>
                          <p className="text-xs text-gray-600">{item.specifications}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">
                            {item.quantity} {item.unit} × {formatCurrency(item.unitPrice)}
                          </p>
                          <p className="text-sm text-blue-600 font-bold">{formatCurrency(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking Info */}
                {po.trackingNumber && po.status === 'in_transit' && (
                  <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-purple-900">Tracking Number</p>
                        <p className="text-lg font-mono font-bold text-purple-700">{po.trackingNumber}</p>
                        {po.carrier && (
                          <p className="text-xs text-purple-600 mt-1">Carrier: {po.carrier}</p>
                        )}
                      </div>
                      {po.trackingUrl && (
                        <a
                          href={po.trackingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm font-semibold"
                        >
                          Track Shipment
                        </a>
                      )}
                    </div>
                  </div>
                )}

                {/* Delay Notice */}
                {po.status === 'delayed' && po.delayReason && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-red-900">Delivery Delayed</p>
                        <p className="text-sm text-red-700 mt-1">{po.delayReason}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedPO(po);
                      setShowPOModal(true);
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  {po.status === 'draft' && (
                    <>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </button>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Send to Supplier
                      </button>
                    </>
                  )}
                  {po.status === 'confirmed' && (
                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
                      <Edit className="w-4 h-4" />
                      Amend PO
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PO Detail Modal */}
        {showPOModal && selectedPO && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Purchase Order</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedPO.poNumber}</p>
                </div>
                <button onClick={() => setShowPOModal(false)}>
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {/* PO Header */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">From (Buyer)</h4>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">{selectedPO.buyer.name}</p>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.buyer.contact}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.buyer.email}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.buyer.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.buyer.address}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">To (Supplier)</h4>
                    <div className="space-y-2">
                      <p className="font-semibold text-lg">{selectedPO.supplier.name}</p>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <User className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.supplier.contact}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.supplier.email}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.supplier.phone}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 mt-0.5" />
                        <span>{selectedPO.supplier.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* PO Details */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Issue Date</p>
                    <p className="font-semibold">{formatDate(selectedPO.issueDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Expected Delivery</p>
                    <p className="font-semibold">{formatDate(selectedPO.expectedDelivery)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Terms</p>
                    <p className="font-semibold">{selectedPO.paymentTerms}</p>
                  </div>
                </div>

                {/* Items Table */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Description</th>
                          <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Qty</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Unit Price</th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {selectedPO.items.map((item) => (
                          <tr key={item.id}>
                            <td className="px-4 py-3">
                              <p className="font-semibold text-sm">{item.description}</p>
                              <p className="text-xs text-gray-500">{item.specifications}</p>
                            </td>
                            <td className="px-4 py-3 text-center text-sm">
                              {item.quantity} {item.unit}
                            </td>
                            <td className="px-4 py-3 text-right text-sm">
                              {formatCurrency(item.unitPrice)}
                            </td>
                            <td className="px-4 py-3 text-right text-sm font-semibold">
                              {formatCurrency(item.totalPrice)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-4 py-2 text-right text-sm font-semibold">Subtotal</td>
                          <td className="px-4 py-2 text-right text-sm font-semibold">{formatCurrency(selectedPO.subtotal)}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-4 py-2 text-right text-sm">Tax ({selectedPO.taxRate}%)</td>
                          <td className="px-4 py-2 text-right text-sm">{formatCurrency(selectedPO.taxAmount)}</td>
                        </tr>
                        <tr>
                          <td colSpan="3" className="px-4 py-2 text-right text-sm">Shipping</td>
                          <td className="px-4 py-2 text-right text-sm">{formatCurrency(selectedPO.shippingCost)}</td>
                        </tr>
                        <tr className="border-t-2">
                          <td colSpan="3" className="px-4 py-3 text-right text-lg font-bold">Total Amount</td>
                          <td className="px-4 py-3 text-right text-xl font-bold text-blue-600">
                            {formatCurrency(selectedPO.totalAmount, selectedPO.currency)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Shipping Address</h4>
                  <div className="p-4 bg-gray-50 rounded-lg flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <p className="text-sm text-gray-700">{selectedPO.shippingAddress}</p>
                  </div>
                </div>

                {/* Notes */}
                {selectedPO.notes && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                      <p className="text-sm text-gray-700">{selectedPO.notes}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowPOModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Email to Supplier
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