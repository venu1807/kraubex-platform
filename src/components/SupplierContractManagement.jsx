import { useState } from 'react';
import {
  Search,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Building2,
  FileText,
  Plus,
  Edit,
  Trash2,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

export default function SupplierContractManagement() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedContract, setSelectedContract] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedContracts, setSelectedContracts] = useState([]);

  const [contracts, setContracts] = useState([
    {
      id: 'CNT-2025-001',
      contractNumber: 'KRAUBEX-CNT-10234',
      supplier: 'SteelSphere GmbH',
      category: 'Raw Materials',
      startDate: '2024-01-15',
      endDate: '2025-12-31',
      value: 450000,
      currency: '€',
      status: 'active',
      renewalStatus: 'upcoming',
      paymentTerms: 'Net 30',
      autoRenew: true,
      contactPerson: 'Hans Mueller',
      email: 'h.mueller@steelsphere.de',
      phone: '+49 123 456789',
      terms: ['Minimum order quantity: 100 units', 'Delivery within 14 days', 'Quality guarantee: 24 months', 'Price adjustment clause: Annual CPI +2%']
    },
    {
      id: 'CNT-2025-002',
      contractNumber: 'KRAUBEX-CNT-15678',
      supplier: 'MetalWorks Industries',
      category: 'Fabrication Services',
      startDate: '2024-03-20',
      endDate: '2026-03-19',
      value: 680000,
      currency: '€',
      status: 'active',
      renewalStatus: 'normal',
      paymentTerms: 'Net 45',
      autoRenew: false,
      contactPerson: 'Maria Schmidt',
      email: 'm.schmidt@metalworks.com',
      phone: '+49 234 567890',
      terms: ['Custom fabrication services', 'Priority scheduling available', 'Monthly capacity: 500 tons', 'Rush order surcharge: 15%']
    },
    {
      id: 'CNT-2025-003',
      contractNumber: 'KRAUBEX-CNT-20445',
      supplier: 'Precision Steel Co.',
      category: 'CNC Machining',
      startDate: '2023-06-10',
      endDate: '2025-11-30',
      value: 320000,
      currency: '€',
      status: 'active',
      renewalStatus: 'expiring',
      paymentTerms: 'Net 30',
      autoRenew: false,
      contactPerson: 'Thomas Weber',
      email: 't.weber@precisionsteel.de',
      phone: '+49 345 678901',
      terms: ['CNC precision machining', 'Tolerance: ±0.01mm', 'Material included in price', 'Free design consultation']
    },
    {
      id: 'CNT-2025-004',
      contractNumber: 'KRAUBEX-CNT-18932',
      supplier: 'Industrial Metals Ltd',
      category: 'Structural Components',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      value: 590000,
      currency: '€',
      status: 'active',
      renewalStatus: 'expiring',
      paymentTerms: 'Net 60',
      autoRenew: true,
      contactPerson: 'James Wilson',
      email: 'j.wilson@industrialmetals.uk',
      phone: '+44 123 456789',
      terms: ['Structural steel supply', 'Certified materials', 'Free delivery within 100km', 'Volume discount: 5% over €50k']
    },
    {
      id: 'CNT-2025-005',
      contractNumber: 'KRAUBEX-CNT-22157',
      supplier: 'Deutsche Stahlbau',
      category: 'Construction Services',
      startDate: '2023-09-15',
      endDate: '2024-12-31',
      value: 890000,
      currency: '€',
      status: 'expired',
      renewalStatus: 'expired',
      paymentTerms: 'Net 30',
      autoRenew: false,
      contactPerson: 'Klaus Bauer',
      email: 'k.bauer@stahlbau.de',
      phone: '+49 456 789012',
      terms: ['On-site construction', 'Project management included', 'Safety compliance guaranteed', 'Warranty: 36 months']
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800 border-green-200';
      case 'expired': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getRenewalStatusColor = (status) => {
    switch(status) {
      case 'normal': return 'bg-blue-100 text-blue-800';
      case 'upcoming': return 'bg-yellow-100 text-yellow-800';
      case 'expiring': return 'bg-red-100 text-red-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRenewalIcon = (status) => {
    switch(status) {
      case 'normal': return <CheckCircle className="w-4 h-4" />;
      case 'upcoming': return <Clock className="w-4 h-4" />;
      case 'expiring': return <AlertTriangle className="w-4 h-4" />;
      case 'expired': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const handleCheckboxChange = (contractId) => {
    setSelectedContracts((prev) =>
      prev.includes(contractId) ? prev.filter((id) => id !== contractId) : [...prev, contractId]
    );
  };

  const filteredContracts = contracts.filter(contract => {
    const matchesSearch = contract.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         contract.contractNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || contract.status === activeTab;
    const matchesFilter = filterStatus === 'all' || contract.renewalStatus === filterStatus;
    return matchesSearch && matchesTab && matchesFilter;
  });

  const stats = {
    total: contracts.length,
    active: contracts.filter(c => c.status === 'active').length,
    pending: contracts.filter(c => c.status === 'pending').length,
    expired: contracts.filter(c => c.status === 'expired').length,
    expiringSoon: contracts.filter(c => c.renewalStatus === 'expiring').length,
    totalValue: contracts.reduce((sum, c) => sum + c.value, 0),
    activeValue: contracts.filter(c => c.status === 'active').reduce((sum, c) => sum + c.value, 0)
  };

  const handleDeleteContract = (contractId) => {
    if (window.confirm("Are you sure you want to delete this contract?")) {
      setContracts((prev) => prev.filter((c) => c.id !== contractId));
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

  const getDaysUntilExpiry = (endDate) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Supplier Contract Management</h1>
          <p className="text-gray-600">Manage supplier contracts, renewals, and compliance</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <FileText className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Contracts</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.active}</p>
            <p className="text-xs text-gray-600 mt-1">Active</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <XCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.expired}</p>
            <p className="text-xs text-gray-600 mt-1">Expired</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow-md p-4 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-700">{stats.expiringSoon}</p>
            <p className="text-xs text-gray-700 mt-1">Expiring Soon</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-md p-4 border-2 border-green-200 hover:shadow-lg transition-shadow">
            <DollarSign className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-xl font-bold text-green-700">{formatCurrency(stats.activeValue / 1000)}K</p>
            <p className="text-xs text-gray-700 mt-1">Active Value</p>
          </div>

          <div className="bg-blue-50 rounded-lg shadow-md p-4 border-2 border-blue-200 hover:shadow-lg transition-shadow">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-xl font-bold text-blue-700">{formatCurrency(stats.totalValue / 1000)}K</p>
            <p className="text-xs text-gray-700 mt-1">Total Value</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            <div className="flex gap-2 mb-6 border-b">
              {['all', 'active', 'pending', 'expired'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                    activeTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)} ({tab === 'all' ? stats.total : stats[tab]})
                </button>
              ))}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by supplier, category, or contract number..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Renewal Status</option>
                  <option value="normal">Normal</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="expiring">Expiring</option>
                  <option value="expired">Expired</option>
                </select>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  New Contract
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedContracts.length === filteredContracts.length && filteredContracts.length > 0}
                      onChange={(e) => setSelectedContracts(e.target.checked ? filteredContracts.map(c => c.id) : [])}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contract ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Value</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Renewal</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">End Date</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => {
                  const daysUntilExpiry = getDaysUntilExpiry(contract.endDate);
                  return (
                    <tr key={contract.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedContracts.includes(contract.id)}
                          onChange={() => handleCheckboxChange(contract.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{contract.id}</p>
                          <p className="text-xs text-gray-500 font-mono">{contract.contractNumber}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-semibold">
                            {contract.supplier.substring(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{contract.supplier}</p>
                            <p className="text-xs text-gray-500">{contract.paymentTerms}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {contract.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(contract.value)}</p>
                        {contract.autoRenew && <p className="text-xs text-blue-600">Auto-renew</p>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(contract.status)}`}>
                          {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full inline-flex items-center gap-1 ${getRenewalStatusColor(contract.renewalStatus)}`}>
                          {getRenewalIcon(contract.renewalStatus)}
                          {contract.renewalStatus.charAt(0).toUpperCase() + contract.renewalStatus.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <div>
                          <p className="text-sm text-gray-900">{formatDate(contract.endDate)}</p>
                          {daysUntilExpiry > 0 && daysUntilExpiry < 90 && (
                            <p className={`text-xs ${daysUntilExpiry < 30 ? 'text-red-600' : 'text-yellow-600'}`}>
                              {daysUntilExpiry} days left
                            </p>
                          )}
                          {daysUntilExpiry < 0 && (
                            <p className="text-xs text-red-600">Expired {Math.abs(daysUntilExpiry)} days ago</p>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 justify-center">
                          <button
                            onClick={() => {
                              setSelectedContract(contract);
                              setShowDetailModal(true);
                            }}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteContract(contract.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredContracts.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No contracts found</p>
            </div>
          )}
        </div>

        {selectedContracts.length > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-sm text-blue-800 font-medium">{selectedContracts.length} contract(s) selected</p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
                Bulk Export
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${selectedContracts.length} selected contracts?`)) {
                    setContracts(prev => prev.filter(c => !selectedContracts.includes(c.id)));
                    setSelectedContracts([]);
                  }
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm"
              >
                Delete Selected
              </button>
            </div>
          </div>
        )}
      </div>

      {showDetailModal && selectedContract && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedContract.id}</h3>
                <p className="text-sm text-gray-500 font-mono">{selectedContract.contractNumber}</p>
              </div>
              <button onClick={() => setShowDetailModal(false)}>
                <XCircle className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Supplier</p>
                  <div className="flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="text-lg font-semibold">{selectedContract.supplier}</p>
                      <p className="text-sm text-gray-600">{selectedContract.category}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Contact Person</p>
                  <p className="text-lg font-semibold">{selectedContract.contactPerson}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{selectedContract.email}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <p className="text-sm text-gray-600">{selectedContract.phone}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(selectedContract.status)}`}>
                  {selectedContract.status.charAt(0).toUpperCase() + selectedContract.status.slice(1)}
                </span>
                <span className={`px-3 py-1 text-sm font-medium rounded-full inline-flex items-center gap-1 ${getRenewalStatusColor(selectedContract.renewalStatus)}`}>
                  {getRenewalIcon(selectedContract.renewalStatus)}
                  {selectedContract.renewalStatus.charAt(0).toUpperCase() + selectedContract.renewalStatus.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Start Date</p>
                  <p className="text-sm font-semibold">{formatDate(selectedContract.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">End Date</p>
                  <p className="text-sm font-semibold">{formatDate(selectedContract.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Contract Value</p>
                  <p className="text-sm font-semibold">{formatCurrency(selectedContract.value)}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Contract Terms</h4>
                <ul className="space-y-2">
                  {selectedContract.terms.map((term, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{term}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Contract
                </button>
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <Edit className="w-4 h-4" />
                  Edit Contract
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}