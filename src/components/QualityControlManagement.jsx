import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Package,
  Truck,
  ClipboardCheck,
  Camera,
  FileText,
  Download,
  Calendar,
  User,
  MapPin,
  Clock,
  Star,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Eye,
  Edit
} from 'lucide-react';

export default function GoodsReceiptDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [receiptForm, setReceiptForm] = useState({
    quantityReceived: '',
    condition: 'good',
    qualityRating: 5,
    notes: '',
    discrepancies: [],
    photos: []
  });

  // Sample Goods Receipts
  const receipts = [
    {
      id: 'GR-2025-001',
      poNumber: 'PO-2025-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      status: 'pending_receipt',
      supplier: 'SteelSphere GmbH',
      projectName: 'Industrial Warehouse Structure',
      expectedDate: '2025-11-17',
      actualDate: null,
      items: [
        {
          id: 1,
          description: 'Steel I-Beams Grade A36',
          specifications: '12" depth, 30ft length',
          orderedQty: 20,
          receivedQty: null,
          unit: 'pieces',
          condition: null
        }
      ],
      deliveryAddress: 'Warehouse Site, Industriestrasse 89, 22047 Hamburg',
      receivedBy: null,
      inspectedBy: null,
      daysUntilExpected: 14
    },
    {
      id: 'GR-2025-002',
      poNumber: 'PO-2025-002',
      rfqId: 'KRAUBEX-RFQ-15678',
      status: 'in_transit',
      supplier: 'Deutsche Stahlbau',
      projectName: 'Bridge Component Fabrication',
      expectedDate: '2025-11-15',
      actualDate: null,
      items: [
        {
          id: 1,
          description: 'Steel Girders',
          specifications: 'Heavy duty, 40ft length',
          orderedQty: 15,
          receivedQty: null,
          unit: 'pieces',
          condition: null
        }
      ],
      deliveryAddress: 'Bridge Construction Site, Hafenstrasse 45, 20457 Hamburg',
      trackingNumber: 'TRK-2025-002',
      carrier: 'Deutsche Post DHL',
      receivedBy: null,
      inspectedBy: null,
      daysUntilExpected: 12
    },
    {
      id: 'GR-2025-003',
      poNumber: 'PO-2025-003',
      rfqId: 'KRAUBEX-RFQ-20445',
      status: 'received_good',
      supplier: 'ProInstall Services GmbH',
      projectName: 'Installation Service Contract',
      expectedDate: '2025-10-25',
      actualDate: '2025-10-24',
      items: [
        {
          id: 1,
          description: 'Installation & Assembly Service',
          specifications: 'Complete on-site installation',
          orderedQty: 1,
          receivedQty: 1,
          unit: 'service',
          condition: 'excellent'
        }
      ],
      deliveryAddress: 'Manufacturing Plant, Fabrikstrasse 12, 20095 Hamburg',
      receivedBy: 'Martin Fischer',
      receivedDate: '2025-10-24',
      inspectedBy: 'Thomas Becker',
      inspectionDate: '2025-10-24',
      qualityRating: 5,
      condition: 'excellent',
      notes: 'Service completed ahead of schedule. All equipment installed perfectly and tested successfully.',
      photos: ['installation_1.jpg', 'installation_2.jpg', 'test_results.jpg'],
      signature: 'digital_signature.png'
    },
    {
      id: 'GR-2025-004',
      poNumber: 'PO-2025-004',
      rfqId: 'KRAUBEX-RFQ-18765',
      status: 'received_partial',
      supplier: 'MetalWorks Industries',
      projectName: 'Equipment Platform',
      expectedDate: '2025-10-30',
      actualDate: '2025-10-30',
      items: [
        {
          id: 1,
          description: 'Platform Structure',
          specifications: 'Custom steel platform',
          orderedQty: 1,
          receivedQty: 1,
          unit: 'unit',
          condition: 'good'
        },
        {
          id: 2,
          description: 'Safety Rails',
          specifications: 'Standard safety rails',
          orderedQty: 1,
          receivedQty: 0,
          unit: 'set',
          condition: null,
          note: 'Not delivered - will arrive in 5 days'
        }
      ],
      deliveryAddress: 'Production Facility, Produktionsweg 78, 20095 Hamburg',
      receivedBy: 'Peter Wagner',
      receivedDate: '2025-10-30',
      inspectedBy: 'Lisa Hoffmann',
      inspectionDate: '2025-10-30',
      qualityRating: 4,
      condition: 'good',
      notes: 'Platform delivered and inspected. Minor surface scratches noted but acceptable. Safety rails delayed - new ETA: Nov 4th.',
      discrepancies: [
        { type: 'partial_delivery', description: 'Safety rails not included in this shipment' },
        { type: 'cosmetic_damage', description: 'Minor surface scratches on platform base' }
      ],
      photos: ['platform_1.jpg', 'scratch_detail.jpg'],
      signature: 'digital_signature.png'
    },
    {
      id: 'GR-2025-005',
      poNumber: 'PO-2025-005',
      rfqId: 'KRAUBEX-RFQ-19234',
      status: 'received_damaged',
      supplier: 'Titan Steel Works',
      projectName: 'Structural Components',
      expectedDate: '2025-10-28',
      actualDate: '2025-10-28',
      items: [
        {
          id: 1,
          description: 'Steel Columns',
          specifications: 'Grade A572, 8m height',
          orderedQty: 10,
          receivedQty: 10,
          unit: 'pieces',
          condition: 'damaged',
          damagedQty: 3
        }
      ],
      deliveryAddress: 'Construction Site Alpha, Baustrasse 34, 20095 Hamburg',
      receivedBy: 'Klaus Mueller',
      receivedDate: '2025-10-28',
      inspectedBy: 'Andrea Schmidt',
      inspectionDate: '2025-10-28',
      qualityRating: 2,
      condition: 'damaged',
      notes: 'DAMAGE REPORT: 3 out of 10 columns show significant dents and bent sections. Appears to be transport damage. Photos taken and supplier notified immediately.',
      discrepancies: [
        { type: 'damage', description: '3 columns with significant dents' },
        { type: 'damage', description: '2 columns with bent sections at top' },
        { type: 'quality', description: 'Protective coating scratched on multiple units' }
      ],
      photos: ['damage_1.jpg', 'damage_2.jpg', 'damage_3.jpg', 'packaging.jpg'],
      rejectionReason: 'Significant structural damage - not fit for purpose',
      supplierNotified: true,
      replacementRequested: true,
      signature: 'digital_signature.png'
    },
    {
      id: 'GR-2025-006',
      poNumber: 'PO-2025-006',
      rfqId: 'KRAUBEX-RFQ-22157',
      status: 'inspection_pending',
      supplier: 'QualityTest Pro GmbH',
      projectName: 'Quality Control & Inspection',
      expectedDate: '2025-11-07',
      actualDate: '2025-11-06',
      items: [
        {
          id: 1,
          description: 'Non-Destructive Testing Service',
          specifications: 'Ultrasonic and X-ray testing',
          orderedQty: 1,
          receivedQty: 1,
          unit: 'service',
          condition: null
        }
      ],
      deliveryAddress: 'Quality Lab, Qualitätsweg 5, 20095 Hamburg',
      receivedBy: 'Lisa Hoffmann',
      receivedDate: '2025-11-06',
      inspectedBy: null,
      inspectionDate: null,
      notes: 'Service received. Awaiting final inspection report and quality certification.'
    }
  ];

  const stats = {
    total: receipts.length,
    pending: receipts.filter(r => r.status === 'pending_receipt' || r.status === 'in_transit').length,
    received: receipts.filter(r => r.status === 'received_good').length,
    partial: receipts.filter(r => r.status === 'received_partial').length,
    damaged: receipts.filter(r => r.status === 'received_damaged').length,
    inspectionPending: receipts.filter(r => r.status === 'inspection_pending').length,
    avgQualityRating: 4.0
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending_receipt': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'in_transit': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'inspection_pending': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'received_good': return 'bg-green-100 text-green-800 border-green-300';
      case 'received_partial': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'received_damaged': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending_receipt': return <Clock className="w-4 h-4" />;
      case 'in_transit': return <Truck className="w-4 h-4" />;
      case 'inspection_pending': return <ClipboardCheck className="w-4 h-4" />;
      case 'received_good': return <CheckCircle className="w-4 h-4" />;
      case 'received_partial': return <AlertTriangle className="w-4 h-4" />;
      case 'received_damaged': return <XCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending_receipt': return 'Pending Receipt';
      case 'in_transit': return 'In Transit';
      case 'inspection_pending': return 'Inspection Pending';
      case 'received_good': return 'Received - Good';
      case 'received_partial': return 'Partial Receipt';
      case 'received_damaged': return 'Received - Damaged';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleConfirmReceipt = (receipt) => {
    console.log('Confirming receipt:', receipt.id, receiptForm);
    setShowReceiptModal(false);
  };

  const filteredReceipts = receipts.filter(receipt => {
    const matchesTab = activeTab === 'all' ||
      (activeTab === 'pending' && (receipt.status === 'pending_receipt' || receipt.status === 'in_transit' || receipt.status === 'inspection_pending')) ||
      (activeTab === 'received' && receipt.status === 'received_good') ||
      (activeTab === 'issues' && (receipt.status === 'received_partial' || receipt.status === 'received_damaged'));

    const matchesSearch = receipt.poNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         receipt.projectName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Goods Receipt & Inspection</h1>
          <p className="text-gray-600">Confirm deliveries and inspect received goods</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Receipts</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.received}</p>
            <p className="text-xs text-gray-600 mt-1">Good Condition</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.partial}</p>
            <p className="text-xs text-gray-600 mt-1">Partial</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <XCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.damaged}</p>
            <p className="text-xs text-gray-600 mt-1">Damaged</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Star className="w-8 h-8 text-yellow-500 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.avgQualityRating}</p>
            <p className="text-xs text-gray-600 mt-1">Avg. Quality</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'pending'
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('received')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'received'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Received ({stats.received})
              </button>
              <button
                onClick={() => setActiveTab('issues')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'issues'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Issues ({stats.partial + stats.damaged})
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
            </div>
          </div>
        </div>

        {/* Receipt List */}
        <div className="space-y-4">
          {filteredReceipts.map((receipt) => (
            <div key={receipt.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{receipt.id}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusColor(receipt.status)}`}>
                        {getStatusIcon(receipt.status)}
                        {getStatusLabel(receipt.status)}
                      </span>
                      {receipt.qualityRating && (
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < receipt.qualityRating
                                  ? 'text-yellow-500 fill-yellow-500'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      PO: {receipt.poNumber} • Project: {receipt.projectName}
                    </p>
                    <p className="text-sm text-gray-600">
                      Supplier: {receipt.supplier}
                    </p>
                  </div>
                  <div className="text-right">
                    {receipt.daysUntilExpected > 0 && (
                      <p className="text-sm text-gray-500">{receipt.daysUntilExpected} days until expected</p>
                    )}
                    {receipt.actualDate && (
                      <p className="text-sm font-semibold text-green-600">
                        Received: {formatDate(receipt.actualDate)}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Items</h4>
                  <div className="space-y-2">
                    {receipt.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">{item.description}</p>
                          <p className="text-xs text-gray-600">{item.specifications}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {item.receivedQty !== null ? (
                              <span className={item.receivedQty === item.orderedQty ? 'text-green-600' : 'text-orange-600'}>
                                {item.receivedQty} / {item.orderedQty} {item.unit}
                              </span>
                            ) : (
                              <span className="text-gray-500">
                                Expected: {item.orderedQty} {item.unit}
                              </span>
                            )}
                          </p>
                          {item.condition && (
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              item.condition === 'excellent' || item.condition === 'good' ? 'bg-green-100 text-green-800' :
                              item.condition === 'damaged' ? 'bg-red-100 text-red-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {item.condition}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Info */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Expected Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(receipt.expectedDate)}</p>
                    </div>
                  </div>
                  {receipt.receivedBy && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Received By</p>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-semibold">{receipt.receivedBy}</p>
                      </div>
                    </div>
                  )}
                  {receipt.inspectedBy && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Inspected By</p>
                      <div className="flex items-center gap-2">
                        <ClipboardCheck className="w-4 h-4 text-gray-600" />
                        <p className="text-sm font-semibold">{receipt.inspectedBy}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Discrepancies */}
                {receipt.discrepancies && receipt.discrepancies.length > 0 && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="text-sm font-semibold text-red-900 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Discrepancies Found
                    </h4>
                    <ul className="space-y-1">
                      {receipt.discrepancies.map((disc, index) => (
                        <li key={index} className="text-sm text-red-800 flex items-start gap-2">
                          <span className="text-red-600">•</span>
                          <span><strong>{disc.type}:</strong> {disc.description}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Notes */}
                {receipt.notes && (
                  <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-blue-900">{receipt.notes}</p>
                    </div>
                  </div>
                )}

                {/* Photos */}
                {receipt.photos && receipt.photos.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Photos ({receipt.photos.length})</h4>
                    <div className="flex gap-2">
                      {receipt.photos.map((photo, index) => (
                        <div key={index} className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Camera className="w-8 h-8 text-gray-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedReceipt(receipt);
                      setShowReceiptModal(true);
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                  {(receipt.status === 'pending_receipt' || receipt.status === 'inspection_pending') && (
                    <button
                      onClick={() => {
                        setSelectedReceipt(receipt);
                        setShowReceiptModal(true);
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Confirm Receipt
                    </button>
                  )}
                  {receipt.status === 'received_damaged' && (
                    <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Report Issue to Supplier
                    </button>
                  )}
                  <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download Report
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Receipt Confirmation Modal */}
        {showReceiptModal && selectedReceipt && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Confirm Goods Receipt</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedReceipt.id} • PO: {selectedReceipt.poNumber}</p>
                </div>
                <button onClick={() => setShowReceiptModal(false)}>
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">{selectedReceipt.projectName}</h4>
                  <p className="text-gray-700 mb-2"><strong>Supplier:</strong> {selectedReceipt.supplier}</p>
                  <p className="text-gray-700"><strong>Delivery Address:</strong> {selectedReceipt.deliveryAddress}</p>
                </div>

                {/* Items Confirmation */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Confirm Received Quantities</h4>
                  {selectedReceipt.items.map((item, index) => (
                    <div key={item.id} className="mb-4 p-4 border rounded-lg">
                      <p className="font-semibold mb-2">{item.description}</p>
                      <p className="text-sm text-gray-600 mb-3">{item.specifications}</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Ordered Quantity</label>
                          <input
                            type="number"
                            value={item.orderedQty}
                            disabled
                            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Received Quantity</label>
                          <input
                            type="number"
                            defaultValue={item.orderedQty}
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-sm font-medium mb-1">Condition</label>
                        <select className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="excellent">Excellent</option>
                          <option value="good">Good</option>
                          <option value="acceptable">Acceptable</option>
                          <option value="damaged">Damaged</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quality Rating */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Overall Quality Rating</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setReceiptForm({...receiptForm, qualityRating: rating})}
                        className="focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 ${
                            rating <= receiptForm.qualityRating
                              ? 'text-yellow-500 fill-yellow-500'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-gray-700">
                      {receiptForm.qualityRating} / 5
                    </span>
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Inspection Notes</label>
                  <textarea
                    value={receiptForm.notes}
                    onChange={(e) => setReceiptForm({...receiptForm, notes: e.target.value})}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add any observations, issues, or special notes..."
                  ></textarea>
                </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Upload Photos (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm text-gray-600 mb-2">Click to upload photos of received goods</p>
                    <p className="text-xs text-gray-500">Especially important for damage documentation</p>
                    <input type="file" multiple accept="image/*" className="hidden" id="photo-upload" />
                    <label
                      htmlFor="photo-upload"
                      className="mt-3 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                    >
                      Choose Photos
                    </label>
                  </div>
                </div>

                {/* Digital Signature */}
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">Digital Signature</label>
                  <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                    <p className="text-sm text-gray-600 mb-2">
                      By confirming, you certify that you have received and inspected the goods.
                    </p>
                    <input
                      type="text"
                      placeholder="Type your full name"
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => setShowReceiptModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleConfirmReceipt(selectedReceipt)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Receipt
                  </button>
                  <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Report Issues
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