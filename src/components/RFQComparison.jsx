import { useState } from 'react';
import {
  Search,
  Download,
  TrendingDown,
  Clock,
  DollarSign,
  Star,
  Building2,
  Package,
  Award,
  FileCheck,
  XCircle
} from 'lucide-react';

export default function RFQComparison() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSuppliers, setSelectedSuppliers] = useState([]);
  const [showContractDraft, setShowContractDraft] = useState(false);
  const [selectedForContract, setSelectedForContract] = useState(null);

  // Sample comparison data
  const comparisons = [
    {
      id: 'CMP-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      projectName: 'Industrial Warehouse Structure',
      componentName: 'I-Beams Grade A36',
      specifications: '12" depth, 30ft length',
      quantity: 20,
      type: 'component',
      suppliers: [
        {
          id: 'SUP-001',
          name: 'SteelSphere GmbH',
          logo: 'SS',
          unitPrice: 2500,
          totalPrice: 50000,
          deliveryTime: '14 days',
          quality: 'A+',
          rating: 4.8,
          responseTime: '2 hours',
          certifications: ['ISO 9001', 'CE'],
          warrantyMonths: 24,
          paymentTerms: 'Net 30',
          previousOrders: 15,
          onTimeDelivery: 98,
          defectRate: 0.5,
          status: 'best_price'
        },
        {
          id: 'SUP-002',
          name: 'MetalWorks Industries',
          logo: 'MW',
          unitPrice: 2650,
          totalPrice: 53000,
          deliveryTime: '10 days',
          quality: 'A+',
          rating: 4.9,
          responseTime: '1 hour',
          certifications: ['ISO 9001', 'CE', 'TÜV'],
          warrantyMonths: 36,
          paymentTerms: 'Net 45',
          previousOrders: 23,
          onTimeDelivery: 99,
          defectRate: 0.2,
          status: 'best_quality'
        },
        {
          id: 'SUP-003',
          name: 'Titan Steel Works',
          logo: 'TS',
          unitPrice: 2450,
          totalPrice: 49000,
          deliveryTime: '18 days',
          quality: 'A',
          rating: 4.6,
          responseTime: '4 hours',
          certifications: ['ISO 9001'],
          warrantyMonths: 18,
          paymentTerms: 'Net 15',
          previousOrders: 8,
          onTimeDelivery: 95,
          defectRate: 1.2,
          status: 'lowest_price'
        }
      ]
    },
    {
      id: 'CMP-002',
      rfqId: 'KRAUBEX-RFQ-20445',
      projectName: 'Manufacturing Plant Maintenance',
      componentName: 'Installation & Assembly Service',
      specifications: 'Complete on-site installation with welding',
      quantity: 1,
      type: 'service',
      suppliers: [
        {
          id: 'SUP-006',
          name: 'ProInstall Services GmbH',
          logo: 'PI',
          unitPrice: 15000,
          totalPrice: 15000,
          deliveryTime: '5 days',
          quality: 'A+',
          rating: 4.9,
          responseTime: '30 mins',
          certifications: ['ISO 9001', 'TÜV', 'Safety Certified'],
          warrantyMonths: 12,
          paymentTerms: 'Net 30',
          previousOrders: 28,
          onTimeDelivery: 99,
          defectRate: 0.3,
          status: 'recommended',
          serviceDetails: {
            teamSize: '4 technicians',
            experience: '15+ years',
            equipment: 'Included',
            insurance: 'Full coverage'
          }
        },
        {
          id: 'SUP-007',
          name: 'Deutsche Montage AG',
          logo: 'DM',
          unitPrice: 13500,
          totalPrice: 13500,
          deliveryTime: '7 days',
          quality: 'A',
          rating: 4.7,
          responseTime: '2 hours',
          certifications: ['ISO 9001', 'TÜV'],
          warrantyMonths: 6,
          paymentTerms: 'Net 15',
          previousOrders: 18,
          onTimeDelivery: 96,
          defectRate: 0.8,
          status: 'lowest_price',
          serviceDetails: {
            teamSize: '3 technicians',
            experience: '10 years',
            equipment: 'Partial',
            insurance: 'Basic coverage'
          }
        },
        {
          id: 'SUP-008',
          name: 'TechBuild Solutions',
          logo: 'TB',
          unitPrice: 14200,
          totalPrice: 14200,
          deliveryTime: '6 days',
          quality: 'A+',
          rating: 4.8,
          responseTime: '1 hour',
          certifications: ['ISO 9001', 'Safety Certified'],
          warrantyMonths: 9,
          paymentTerms: 'Net 30',
          previousOrders: 22,
          onTimeDelivery: 97,
          defectRate: 0.5,
          status: 'balanced',
          serviceDetails: {
            teamSize: '4 technicians',
            experience: '12 years',
            equipment: 'Included',
            insurance: 'Standard coverage'
          }
        }
      ]
    },
    {
      id: 'CMP-003',
      rfqId: 'KRAUBEX-RFQ-22157',
      projectName: 'Quality Control & Inspection',
      componentName: 'Non-Destructive Testing Service',
      specifications: 'Ultrasonic and X-ray testing for welds',
      quantity: 1,
      type: 'service',
      suppliers: [
        {
          id: 'SUP-009',
          name: 'QualityTest Pro GmbH',
          logo: 'QT',
          unitPrice: 8500,
          totalPrice: 8500,
          deliveryTime: '3 days',
          quality: 'A+',
          rating: 4.9,
          responseTime: '1 hour',
          certifications: ['ISO 17025', 'DIN EN ISO 9712', 'TÜV'],
          warrantyMonths: 24,
          paymentTerms: 'Net 45',
          previousOrders: 35,
          onTimeDelivery: 99.5,
          defectRate: 0.1,
          status: 'best_quality',
          serviceDetails: {
            teamSize: '2 certified inspectors',
            experience: '20+ years',
            equipment: 'State-of-the-art',
            insurance: 'Premium coverage',
            reportTime: '24 hours'
          }
        },
        {
          id: 'SUP-010',
          name: 'InspectX Services',
          logo: 'IX',
          unitPrice: 7200,
          totalPrice: 7200,
          deliveryTime: '4 days',
          quality: 'A',
          rating: 4.6,
          responseTime: '3 hours',
          certifications: ['ISO 9001', 'DIN EN ISO 9712'],
          warrantyMonths: 12,
          paymentTerms: 'Net 30',
          previousOrders: 19,
          onTimeDelivery: 95,
          defectRate: 0.9,
          status: 'lowest_price',
          serviceDetails: {
            teamSize: '2 inspectors',
            experience: '10 years',
            equipment: 'Standard',
            insurance: 'Basic coverage',
            reportTime: '48 hours'
          }
        },
        {
          id: 'SUP-011',
          name: 'Precision NDT Solutions',
          logo: 'PN',
          unitPrice: 7800,
          totalPrice: 7800,
          deliveryTime: '3 days',
          quality: 'A+',
          rating: 4.8,
          responseTime: '2 hours',
          certifications: ['ISO 17025', 'DIN EN ISO 9712'],
          warrantyMonths: 18,
          paymentTerms: 'Net 30',
          previousOrders: 27,
          onTimeDelivery: 98,
          defectRate: 0.4,
          status: 'best_price',
          serviceDetails: {
            teamSize: '2 certified inspectors',
            experience: '15 years',
            equipment: 'Advanced',
            insurance: 'Full coverage',
            reportTime: '36 hours'
          }
        }
      ]
    }
  ];

  const getStatusBadge = (status) => {
    const badges = {
      'lowest_price': { label: 'Lowest Price', color: 'bg-green-100 text-green-800 border-green-300' },
      'best_price': { label: 'Best Price', color: 'bg-blue-100 text-blue-800 border-blue-300' },
      'best_quality': { label: 'Best Quality', color: 'bg-purple-100 text-purple-800 border-purple-300' }
    };
    return badges[status] || { label: status, color: 'bg-gray-100 text-gray-800 border-gray-300' };
  };

  const handleSelectSupplier = (supplierId) => {
    if (selectedSuppliers.includes(supplierId)) {
      setSelectedSuppliers(selectedSuppliers.filter(id => id !== supplierId));
    } else {
      setSelectedSuppliers([...selectedSuppliers, supplierId]);
    }
  };

  const handleDraftContract = (supplier, comparison) => {
    setSelectedForContract({ supplier, comparison });
    setShowContractDraft(true);
  };

  const formatCurrency = (amount) => {
    return `€${amount.toLocaleString('de-DE')}`;
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">RFQ Comparison Dashboard</h1>
          <p className="text-gray-600">Compare quotes, evaluate suppliers, and draft contracts faster</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">3</p>
            <p className="text-xs text-gray-600 mt-1">Active Comparisons</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Building2 className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">5</p>
            <p className="text-xs text-gray-600 mt-1">Suppliers Quoted</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <TrendingDown className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-700">€4K</p>
            <p className="text-xs text-gray-600 mt-1">Potential Savings</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">14</p>
            <p className="text-xs text-gray-600 mt-1">Avg. Days Delivery</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Star className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">4.8</p>
            <p className="text-xs text-gray-600 mt-1">Avg. Supplier Rating</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow mb-6 p-6">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by component, project, or supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Comparison Tables */}
        <div className="space-y-6">
          {comparisons.map((comparison) => (
            <div key={comparison.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Comparison Header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                <h3 className="text-xl font-bold text-white">{comparison.componentName}</h3>
                <p className="text-blue-100 text-sm mt-1">
                  RFQ: {comparison.rfqId} • Project: {comparison.projectName}
                </p>
                <div className="flex items-center gap-4 text-sm mt-2">
                  <span className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    Qty: {comparison.quantity}
                  </span>
                  <span className="text-blue-100">•</span>
                  <span>{comparison.specifications}</span>
                </div>
              </div>

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b-2 border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Supplier</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Unit Price</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Total Price</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Delivery</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Quality</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Rating</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Performance</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparison.suppliers.map((supplier) => {
                      const badge = getStatusBadge(supplier.status);
                      return (
                        <tr key={supplier.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedSuppliers.includes(supplier.id)}
                                onChange={() => handleSelectSupplier(supplier.id)}
                                className="w-4 h-4 text-blue-600 rounded"
                              />
                              <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center text-white text-sm font-semibold">
                                {supplier.logo}
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{supplier.name}</p>
                                <span className={`text-xs px-2 py-0.5 rounded border ${badge.color}`}>
                                  {badge.label}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-lg font-bold text-gray-900">{formatCurrency(supplier.unitPrice)}</p>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <p className="text-xl font-bold text-blue-600">{formatCurrency(supplier.totalPrice)}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold">{supplier.deliveryTime}</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Response: {supplier.responseTime}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`px-3 py-1 rounded-full font-bold ${
                              supplier.quality === 'A+' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                            }`}>
                              {supplier.quality}
                            </span>
                            <div className="flex items-center justify-center gap-1 mt-2">
                              {supplier.certifications.slice(0, 2).map((cert, i) => (
                                <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 rounded">{cert}</span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                              <span className="text-lg font-bold">{supplier.rating}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-600">On-Time</span>
                                  <span className="font-semibold">{supplier.onTimeDelivery}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-green-600 h-2 rounded-full"
                                    style={{ width: `${supplier.onTimeDelivery}%` }}
                                  ></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span className="text-gray-600">Defect</span>
                                  <span className="font-semibold">{supplier.defectRate}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      supplier.defectRate < 0.5 ? 'bg-green-600' : 'bg-yellow-600'
                                    }`}
                                    style={{ width: `${Math.min(supplier.defectRate * 10, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => handleDraftContract(supplier, comparison)}
                                className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 flex items-center justify-center gap-1"
                              >
                                <FileCheck className="w-4 h-4" />
                                Contract
                              </button>
                              <button className="px-3 py-1.5 border border-blue-600 text-blue-600 text-sm rounded-lg hover:bg-blue-50">
                                Details
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Summary */}
              <div className="bg-gray-50 p-6 border-t">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Price Range</p>
                    <p className="text-sm font-bold text-gray-900">
                      {formatCurrency(Math.min(...comparison.suppliers.map(s => s.totalPrice)))} - {formatCurrency(Math.max(...comparison.suppliers.map(s => s.totalPrice)))}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Savings</p>
                    <p className="text-sm font-bold text-green-600">
                      {formatCurrency(Math.max(...comparison.suppliers.map(s => s.totalPrice)) - Math.min(...comparison.suppliers.map(s => s.totalPrice)))}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Fastest</p>
                    <p className="text-sm font-bold text-gray-900">10 days</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Best Rating</p>
                    <p className="text-sm font-bold text-gray-900">4.9 ★</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contract Draft Modal */}
        {showContractDraft && selectedForContract && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Draft Contract</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {selectedForContract.supplier.name} • {selectedForContract.comparison.componentName}
                  </p>
                </div>
                <button onClick={() => setShowContractDraft(false)}>
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6 mb-6 border border-green-200">
                  <h4 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-600" />
                    Contract Summary
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Supplier</p>
                      <p className="font-semibold text-gray-900">{selectedForContract.supplier.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Value</p>
                      <p className="font-semibold text-green-600 text-lg">
                        {formatCurrency(selectedForContract.supplier.totalPrice)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Delivery</p>
                      <p className="font-semibold text-gray-900">{selectedForContract.supplier.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Start Date</label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">End Date</label>
                      <input type="date" className="w-full px-3 py-2 border rounded-lg" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Special Terms</label>
                    <textarea
                      rows="4"
                      className="w-full px-3 py-2 border rounded-lg"
                      placeholder="Enter special terms..."
                    ></textarea>
                  </div>
                </div>

                <div className="flex gap-3 mt-6 pt-6 border-t">
                  <button
                    onClick={() => setShowContractDraft(false)}
                    className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2">
                    <FileCheck className="w-4 h-4" />
                    Send
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