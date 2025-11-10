import { useState } from 'react';
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  Calendar,
  Building2,
  FileText,
  ArrowUpDown,
  ChevronDown,
  AlertCircle,
  TrendingUp,
  Package
} from 'lucide-react';

export default function OrdersInvoicesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState([]);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRFQs, setSelectedRFQs] = useState([]); // ✅ Checkbox state

  const handleCheckboxChange = (rfqId) => {
    setSelectedRFQs((prev) =>
      prev.includes(rfqId)
        ? prev.filter((id) => id !== rfqId)
        : [...prev, rfqId]
    );
  };

  const invoices = [
    {
      id: 'INV-2025-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      supplier: 'SteelSphere GmbH',
      project: 'Industrial Warehouse Structure',
      amount: 65000,
      currency: '€',
      status: 'accepted',
      paymentStatus: 'paid',
      issueDate: '2025-10-15',
      dueDate: '2025-11-15',
      paidDate: '2025-11-10',
      items: [
        { name: 'I-Beams Grade A36', quantity: 20, unitPrice: 2500, total: 50000 },
        { name: 'Installation Service', quantity: 1, unitPrice: 15000, total: 15000 }
      ]
    },
    {
      id: 'INV-2025-002',
      rfqId: 'KRAUBEX-RFQ-15678',
      supplier: 'MetalWorks Industries',
      project: 'Bridge Component Fabrication',
      amount: 125000,
      currency: '€',
      status: 'accepted',
      paymentStatus: 'pending',
      issueDate: '2025-10-20',
      dueDate: '2025-11-25',
      items: [
        { name: 'Steel Girders', quantity: 15, unitPrice: 7000, total: 105000 },
        { name: 'Welding & Assembly', quantity: 1, unitPrice: 20000, total: 20000 }
      ]
    },
    {
      id: 'INV-2025-003',
      rfqId: 'KRAUBEX-RFQ-20445',
      supplier: 'Precision Steel Co.',
      project: 'Custom Machine Parts',
      amount: 45000,
      currency: '€',
      status: 'accepted',
      paymentStatus: 'overdue',
      issueDate: '2025-09-10',
      dueDate: '2025-10-10',
      items: [
        { name: 'CNC Machined Components', quantity: 50, unitPrice: 800, total: 40000 },
        { name: 'Quality Inspection', quantity: 1, unitPrice: 5000, total: 5000 }
      ]
    },
    {
      id: 'INV-2025-004',
      rfqId: 'KRAUBEX-RFQ-18932',
      supplier: 'Industrial Metals Ltd',
      project: 'Structural Framework',
      amount: 89000,
      currency: '€',
      status: 'pending',
      paymentStatus: 'pending',
      issueDate: '2025-10-22',
      dueDate: '2025-11-30',
      items: [
        { name: 'Steel Columns', quantity: 30, unitPrice: 2500, total: 75000 },
        { name: 'Transportation', quantity: 1, unitPrice: 14000, total: 14000 }
      ]
    },
    {
      id: 'INV-2025-005',
      rfqId: 'KRAUBEX-RFQ-22157',
      supplier: 'Deutsche Stahlbau',
      project: 'Roofing Structure',
      amount: 78000,
      currency: '€',
      status: 'rejected',
      paymentStatus: 'cancelled',
      issueDate: '2025-10-18',
      dueDate: '2025-11-20',
      items: [
        { name: 'Steel Trusses', quantity: 25, unitPrice: 3000, total: 75000 },
        { name: 'Coating Service', quantity: 1, unitPrice: 3000, total: 3000 }
      ]
    },
    {
      id: 'INV-2025-006',
      rfqId: 'KRAUBEX-RFQ-19876',
      supplier: 'Titan Steel Works',
      project: 'Equipment Platform',
      amount: 52000,
      currency: '€',
      status: 'accepted',
      paymentStatus: 'pending',
      issueDate: '2025-10-21',
      dueDate: '2025-11-28',
      items: [
        { name: 'Platform Structure', quantity: 1, unitPrice: 45000, total: 45000 },
        { name: 'Safety Rails', quantity: 1, unitPrice: 7000, total: 7000 }
      ]
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'accepted': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch(status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch(status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = inv.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         inv.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab = activeTab === 'all' || inv.status === activeTab;
    const matchesFilter = filterStatus === 'all' || inv.paymentStatus === filterStatus;

    return matchesSearch && matchesTab && matchesFilter;
  });

  const stats = {
    total: invoices.length,
    accepted: invoices.filter(i => i.status === 'accepted').length,
    pending: invoices.filter(i => i.status === 'pending').length,
    rejected: invoices.filter(i => i.status === 'rejected').length,
    totalAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    paidAmount: invoices.filter(i => i.paymentStatus === 'paid').reduce((sum, inv) => sum + inv.amount, 0),
    pendingAmount: invoices.filter(i => i.paymentStatus === 'pending').reduce((sum, inv) => sum + inv.amount, 0),
    overdueAmount: invoices.filter(i => i.paymentStatus === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)
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

  const getDaysUntilDue = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Orders & Invoices</h1>
          <p className="text-gray-600">Manage and track all your RFQ orders and invoices</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Invoices</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">{formatCurrency(stats.totalAmount)}</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
            <p className="text-xs text-gray-600 mt-1">Accepted</p>
            <p className="text-xs text-green-600 font-semibold mt-1">Orders</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending</p>
            <p className="text-xs text-yellow-600 font-semibold mt-1">Review</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            <p className="text-xs text-gray-600 mt-1">Rejected</p>
            <p className="text-xs text-red-600 font-semibold mt-1">Orders</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-md p-4 border-2 border-green-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-700">{invoices.filter(i => i.paymentStatus === 'paid').length}</p>
            <p className="text-xs text-gray-700 mt-1">Paid</p>
            <p className="text-xs text-green-700 font-semibold mt-1">{formatCurrency(stats.paidAmount)}</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow-md p-4 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <p className="text-2xl font-bold text-red-700">{invoices.filter(i => i.paymentStatus === 'overdue').length}</p>
            <p className="text-xs text-gray-700 mt-1">Overdue</p>
            <p className="text-xs text-red-700 font-semibold mt-1">{formatCurrency(stats.overdueAmount)}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All Orders ({stats.total})
              </button>
              <button
                onClick={() => setActiveTab('accepted')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'accepted'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Accepted ({stats.accepted})
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
                onClick={() => setActiveTab('rejected')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'rejected'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Rejected ({stats.rejected})
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by supplier, project, or invoice ID..."
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
                  <option value="all">All Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                  <option value="cancelled">Cancelled</option>
                </select>

                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  {/* Checkbox column */}
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRFQs.length === filteredInvoices.length && filteredInvoices.length > 0}
                      onChange={(e) =>
                        setSelectedRFQs(
                          e.target.checked ? filteredInvoices.map((inv) => inv.rfqId) : []
                        )
                      }
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice / RFQ
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Supplier
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInvoices.map((invoice) => {
                  const daysUntilDue = getDaysUntilDue(invoice.dueDate);
                  return (
                    <tr key={invoice.id} className="hover:bg-gray-50">
                      {/* Checkbox */}
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedRFQs.includes(invoice.rfqId)}
                          onChange={() => handleCheckboxChange(invoice.rfqId)}
                        />
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{invoice.id}</p>
                          <p className="text-xs text-gray-500 font-mono">{invoice.rfqId}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {invoice.supplier}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {invoice.project}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatCurrency(invoice.amount, invoice.currency)}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(invoice.status)}`}>
                          {invoice.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap flex items-center gap-1">
                        {getPaymentStatusIcon(invoice.paymentStatus)}
                        <span className={`text-xs font-semibold ${getPaymentStatusColor(invoice.paymentStatus)}`}>
                          {invoice.paymentStatus}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        {formatDate(invoice.dueDate)} ({daysUntilDue} days)
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                          <Eye className="w-4 h-4" /> View
                        </button>
                        <button className="text-green-600 hover:text-green-800 flex items-center gap-1">
                          <Download className="w-4 h-4" /> Download
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
