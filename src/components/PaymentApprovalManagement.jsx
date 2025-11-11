import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  AlertTriangle,
  Building2,
  CreditCard,
  FileText,
  Download,
  Send,
  Eye,
  User,
  MessageSquare,
  Check,
  Banknote,
  ArrowUpRight
} from 'lucide-react';

export default function PaymentApprovalDashboard() {
  const [activeTab, setActiveTab] = useState('pending_approval');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [paymentComment, setPaymentComment] = useState('');

  // Sample Payment Records
  const payments = [
    {
      id: 'PAY-2025-001',
      invoiceNumber: 'INV-2025-001',
      poNumber: 'PO-2025-001',
      matchId: 'MATCH-001',
      supplier: {
        name: 'SteelSphere GmbH',
        bankName: 'Deutsche Bank AG',
        accountNumber: 'DE89370400440532013000',
        iban: 'DE89370400440532013000',
        swift: 'DEUTDEFF'
      },
      invoiceDate: '2025-11-04',
      dueDate: '2025-12-04',
      amount: 60000,
      currency: '€',
      paymentTerms: 'Net 30',
      status: 'pending_approval',
      priority: 'normal',
      matchStatus: 'matched',
      approvalLevel: 1,
      currentApprover: 'Sarah Weber',
      approverRole: 'Finance Director',
      projectName: 'Industrial Warehouse Structure',
      daysUntilDue: 29,
      earlyPaymentDiscount: {
        available: true,
        discountPercent: 2,
        discountAmount: 1200,
        deadline: '2025-11-14'
      },
      approvalChain: [
        { level: 1, approver: 'Sarah Weber', role: 'Finance Director', status: 'pending', limit: '€100K' },
        { level: 2, approver: 'Thomas Becker', role: 'CEO', status: 'waiting', limit: '> €50K' }
      ]
    },
    {
      id: 'PAY-2025-002',
      invoiceNumber: 'INV-2025-002',
      poNumber: 'PO-2025-002',
      matchId: 'MATCH-002',
      supplier: {
        name: 'Deutsche Stahlbau',
        bankName: 'Commerzbank AG',
        accountNumber: 'DE12500400500500500500',
        iban: 'DE12500400500500500500',
        swift: 'COBADEFF'
      },
      invoiceDate: '2025-11-01',
      dueDate: '2025-12-31',
      amount: 130020,
      currency: '€',
      paymentTerms: 'Net 60',
      status: 'pending_approval',
      priority: 'high',
      matchStatus: 'matched',
      approvalLevel: 2,
      currentApprover: 'Thomas Becker',
      approverRole: 'CEO',
      projectName: 'Bridge Component Fabrication',
      daysUntilDue: 56,
      approvalChain: [
        {
          level: 1,
          approver: 'Sarah Weber',
          role: 'Finance Director',
          status: 'approved',
          limit: '€200K',
          approvedDate: '2025-11-02',
          comment: 'Approved - All documents verified'
        },
        { level: 2, approver: 'Thomas Becker', role: 'CEO', status: 'pending', limit: '> €100K' }
      ]
    },
    {
      id: 'PAY-2025-003',
      invoiceNumber: 'INV-2025-003',
      poNumber: 'PO-2025-003',
      matchId: 'MATCH-003',
      supplier: {
        name: 'ProInstall Services GmbH',
        bankName: 'Sparkasse Düsseldorf',
        accountNumber: 'DE98300500000000012345',
        iban: 'DE98300500000000012345',
        swift: 'DUSSDEDDXXX'
      },
      invoiceDate: '2025-10-24',
      dueDate: '2025-11-23',
      amount: 17850,
      currency: '€',
      paymentTerms: 'Net 30',
      status: 'approved',
      priority: 'normal',
      matchStatus: 'matched',
      approvalLevel: 1,
      projectName: 'Installation Service Contract',
      daysUntilDue: 18,
      approvalChain: [
        {
          level: 1,
          approver: 'Sarah Weber',
          role: 'Finance Director',
          status: 'approved',
          limit: '€50K',
          approvedDate: '2025-10-25',
          comment: 'Approved'
        }
      ],
      approvedBy: 'Sarah Weber',
      approvedDate: '2025-10-25',
      paymentScheduledDate: '2025-11-20'
    },
    {
      id: 'PAY-2025-004',
      invoiceNumber: 'INV-2025-004',
      poNumber: 'PO-2025-004',
      matchId: 'MATCH-004',
      supplier: {
        name: 'MetalWorks Industries',
        bankName: 'HypoVereinsbank',
        accountNumber: 'DE76700202700000012345',
        iban: 'DE76700202700000012345',
        swift: 'HYVEDEMMXXX'
      },
      invoiceDate: '2025-10-30',
      dueDate: '2025-11-29',
      amount: 61490,
      currency: '€',
      paymentTerms: 'Net 30',
      status: 'on_hold',
      priority: 'high',
      matchStatus: 'discrepancy',
      projectName: 'Equipment Platform',
      daysUntilDue: 24,
      holdReason: 'Partial delivery - Safety rails not received but included in invoice',
      holdDate: '2025-10-30',
      holdBy: 'Anna Schneider',
      disputeAmount: 6750,
      expectedResolution: '2025-11-05'
    },
    {
      id: 'PAY-2025-005',
      invoiceNumber: 'INV-2025-005',
      poNumber: 'PO-2025-005',
      matchId: 'MATCH-005',
      supplier: {
        name: 'Titan Steel Works',
        bankName: 'Postbank',
        accountNumber: 'DE89370100500000012345',
        iban: 'DE89370100500000012345',
        swift: 'PBNKDEFF'
      },
      invoiceDate: '2025-10-28',
      dueDate: '2025-11-27',
      amount: 47500,
      currency: '€',
      paymentTerms: 'Net 30',
      status: 'disputed',
      priority: 'high',
      matchStatus: 'discrepancy',
      projectName: 'Structural Components',
      daysUntilDue: 22,
      disputeReason: 'Quality issues - 3 out of 10 columns damaged. Credit note requested.',
      disputeDate: '2025-10-28',
      disputeBy: 'Klaus Mueller',
      disputeAmount: 14250,
      supplierNotified: true,
      creditNoteRequested: true
    },
    {
      id: 'PAY-2025-006',
      invoiceNumber: 'INV-PI-2025-003',
      poNumber: 'PO-2025-003',
      matchId: 'MATCH-003',
      supplier: {
        name: 'ProInstall Services GmbH',
        bankName: 'Sparkasse Düsseldorf',
        accountNumber: 'DE98300500000000012345',
        iban: 'DE98300500000000012345',
        swift: 'DUSSDEDDXXX'
      },
      invoiceDate: '2025-10-24',
      dueDate: '2025-11-23',
      amount: 17850,
      currency: '€',
      paymentTerms: 'Net 30',
      status: 'paid',
      priority: 'normal',
      matchStatus: 'matched',
      projectName: 'Installation Service Contract',
      daysUntilDue: 0,
      approvedBy: 'Sarah Weber',
      approvedDate: '2025-10-25',
      paidDate: '2025-11-15',
      paidBy: 'Finance Team',
      paymentMethod: 'Bank Transfer',
      transactionId: 'TRX-2025-1115-001',
      paymentConfirmation: 'Confirmed by supplier'
    }
  ];

  const stats = {
    total: payments.length,
    pending: payments.filter(p => p.status === 'pending_approval').length,
    approved: payments.filter(p => p.status === 'approved').length,
    onHold: payments.filter(p => p.status === 'on_hold').length,
    disputed: payments.filter(p => p.status === 'disputed').length,
    paid: payments.filter(p => p.status === 'paid').length,
    totalPendingValue: payments.filter(p => p.status === 'pending_approval').reduce((sum, p) => sum + p.amount, 0),
    totalApprovedValue: payments.filter(p => p.status === 'approved').reduce((sum, p) => sum + p.amount, 0),
    avgPaymentTime: 3.5,
    discountOpportunities: payments.filter(p => p.earlyPaymentDiscount?.available).length
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending_approval': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'on_hold': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'disputed': return 'bg-red-100 text-red-800 border-red-300';
      case 'paid': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending_approval': return <Clock className="w-4 h-4" />;
      case 'approved': return <CheckCircle className="w-4 h-4" />;
      case 'on_hold': return <AlertTriangle className="w-4 h-4" />;
      case 'disputed': return <XCircle className="w-4 h-4" />;
      case 'paid': return <Banknote className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'high': return 'text-red-600';
      case 'normal': return 'text-blue-600';
      case 'low': return 'text-gray-600';
      default: return 'text-gray-600';
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

  const handleApprovePayment = (payment) => {
    console.log('Approving payment:', payment.id, 'Comment:', paymentComment);
    setShowPaymentModal(false);
    setPaymentComment('');
  };

  const handleRejectPayment = (payment) => {
    console.log('Rejecting payment:', payment.id, 'Reason:', paymentComment);
    setShowPaymentModal(false);
    setPaymentComment('');
  };

  const filteredPayments = payments.filter(payment => {
    const matchesTab = activeTab === 'all' || payment.status === activeTab;
    const matchesSearch = payment.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payment.projectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Approval</h1>
          <p className="text-gray-600">Review and approve supplier payments</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <DollarSign className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            <p className="text-xs text-gray-600 mt-1">Total Payments</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            <p className="text-xs text-gray-600 mt-1">Approved</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-orange-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.onHold}</p>
            <p className="text-xs text-gray-600 mt-1">On Hold</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <XCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.disputed}</p>
            <p className="text-xs text-gray-600 mt-1">Disputed</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Banknote className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.paid}</p>
            <p className="text-xs text-gray-600 mt-1">Paid</p>
          </div>
        </div>

        {/* Value Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Pending Approval</p>
                <p className="text-4xl font-bold">{formatCurrency(stats.totalPendingValue)}</p>
              </div>
              <TrendingUp className="w-16 h-16 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Approved Value</p>
                <p className="text-4xl font-bold">{formatCurrency(stats.totalApprovedValue)}</p>
              </div>
              <CheckCircle className="w-16 h-16 opacity-50" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Avg. Processing Time</p>
                <p className="text-4xl font-bold">{stats.avgPaymentTime} days</p>
              </div>
              <Clock className="w-16 h-16 opacity-50" />
            </div>
          </div>
        </div>

        {/* Discount Opportunities Banner */}
        {stats.discountOpportunities > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
            <TrendingDown className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-green-900 mb-1">Early Payment Discounts Available!</h4>
              <p className="text-sm text-green-800">
                <strong>{stats.discountOpportunities}</strong> payment(s) eligible for early payment discounts.
                Pay early and save money!
              </p>
            </div>
          </div>
        )}

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
                onClick={() => setActiveTab('pending_approval')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'pending_approval'
                    ? 'border-yellow-600 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'approved'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Approved ({stats.approved})
              </button>
              <button
                onClick={() => setActiveTab('on_hold')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'on_hold'
                    ? 'border-orange-600 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                On Hold ({stats.onHold})
              </button>
              <button
                onClick={() => setActiveTab('disputed')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'disputed'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Disputed ({stats.disputed})
              </button>
              <button
                onClick={() => setActiveTab('paid')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === 'paid'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Paid ({stats.paid})
              </button>
            </div>

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by invoice, supplier, or project..."
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

        {/* Payment List */}
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <div key={payment.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{payment.id}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border flex items-center gap-1 ${getStatusColor(payment.status)}`}>
                        {getStatusIcon(payment.status)}
                        {payment.status.replace('_', ' ').toUpperCase()}
                      </span>
                      <span className={`flex items-center gap-1 ${getPriorityColor(payment.priority)}`}>
                        <AlertTriangle className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase">{payment.priority}</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      Invoice: {payment.invoiceNumber} • PO: {payment.poNumber}
                    </p>
                    <p className="text-sm text-gray-600">
                      Supplier: {payment.supplier.name} • Project: {payment.projectName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(payment.amount, payment.currency)}</p>
                    {payment.daysUntilDue > 0 && (
                      <p className={`text-sm mt-1 ${
                        payment.daysUntilDue < 7 ? 'text-red-600 font-semibold' : 'text-gray-500'
                      }`}>
                        Due in {payment.daysUntilDue} days
                      </p>
                    )}
                  </div>
                </div>

                {/* Early Payment Discount */}
                {payment.earlyPaymentDiscount?.available && (
                  <div className="mb-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <TrendingDown className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-green-900">Early Payment Discount Available</p>
                          <p className="text-sm text-green-800">
                            Save {formatCurrency(payment.earlyPaymentDiscount.discountAmount)} ({payment.earlyPaymentDiscount.discountPercent}%)
                            if paid by {formatDate(payment.earlyPaymentDiscount.deadline)}
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-600 text-white rounded-full text-sm font-bold">
                        -{payment.earlyPaymentDiscount.discountPercent}%
                      </span>
                    </div>
                  </div>
                )}

                {/* Payment Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Invoice Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(payment.invoiceDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Due Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(payment.dueDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Payment Terms</p>
                    <p className="text-sm font-semibold">{payment.paymentTerms}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Match Status</p>
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      payment.matchStatus === 'matched' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {payment.matchStatus}
                    </span>
                  </div>
                </div>

                {/* Approval Chain */}
                {payment.approvalChain && payment.approvalChain.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-3">Approval Chain</h4>
                    <div className="flex items-center gap-2 overflow-x-auto">
                      {payment.approvalChain.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                            step.status === 'approved' ? 'bg-green-50 border-green-300' :
                            step.status === 'pending' ? 'bg-yellow-50 border-yellow-300' :
                            'bg-gray-50 border-gray-300'
                          }`}>
                            <div className="flex items-center gap-2 mb-1">
                              {step.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                              {step.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                              {step.status === 'waiting' && <Clock className="w-5 h-5 text-gray-400" />}
                              <span className="text-xs font-semibold">Level {step.level}</span>
                            </div>
                            <p className="text-xs font-semibold text-center">{step.approver}</p>
                            <p className="text-xs text-gray-500 text-center">{step.role}</p>
                            {step.approvedDate && (
                              <p className="text-xs text-green-600 mt-1">{formatDate(step.approvedDate)}</p>
                            )}
                          </div>
                          {index < payment.approvalChain.length - 1 && (
                            <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Hold/Dispute Info */}
                {payment.holdReason && (
                  <div className="mb-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-orange-900 mb-1">On Hold</p>
                        <p className="text-sm text-orange-800 mb-2">{payment.holdReason}</p>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-orange-600">Hold Date:</span>
                            <span className="ml-1 font-semibold">{formatDate(payment.holdDate)}</span>
                          </div>
                          <div>
                            <span className="text-orange-600">By:</span>
                            <span className="ml-1 font-semibold">{payment.holdBy}</span>
                          </div>
                          <div>
                            <span className="text-orange-600">Expected Resolution:</span>
                            <span className="ml-1 font-semibold">{formatDate(payment.expectedResolution)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {payment.disputeReason && (
                  <div className="mb-4 p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="font-semibold text-red-900 mb-1">Disputed</p>
                        <p className="text-sm text-red-800 mb-2">{payment.disputeReason}</p>
                        <div className="grid grid-cols-3 gap-4 text-xs">
                          <div>
                            <span className="text-red-600">Dispute Date:</span>
                            <span className="ml-1 font-semibold">{formatDate(payment.disputeDate)}</span>
                          </div>
                          <div>
                            <span className="text-red-600">By:</span>
                            <span className="ml-1 font-semibold">{payment.disputeBy}</span>
                          </div>
                          <div>
                            <span className="text-red-600">Disputed Amount:</span>
                            <span className="ml-1 font-semibold">{formatCurrency(payment.disputeAmount)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700">
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700">
                      <FileText className="w-4 h-4" />
                      Documents
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700">
                      <MessageSquare className="w-4 h-4" />
                      Comments
                    </button>
                  </div>

                  {payment.status === 'pending_approval' && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRejectPayment(payment)}
                        className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                      <button
                        onClick={() => handleApprovePayment(payment)}
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                    </div>
                  )}

                  {payment.status === 'approved' && (
                    <div className="flex gap-2">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                        <Send className="w-4 h-4" />
                        Schedule Payment
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}