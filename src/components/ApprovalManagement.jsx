import { useState } from 'react';
import {
  Search,
  Filter,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Users,
  TrendingUp,
  FileText,
  MessageSquare,
  Send,
  Eye,
  Download,
  Calendar,
  DollarSign,
  CreditCard
} from 'lucide-react';

export default function ApprovalManagementDashboard() {
  const [activeTab, setActiveTab] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');

  // Sample approval requests
  const approvals = [
    {
      id: 'APR-001',
      rfqId: 'KRAUBEX-RFQ-10234',
      requestedBy: 'John Müller',
      requestedByRole: 'Procurement Specialist',
      requestDate: '2025-11-01',
      projectName: 'Industrial Warehouse Structure',
      supplier: 'SteelSphere GmbH',
      amount: 50000,
      currency: '€',
      status: 'pending',
      urgency: 'high',
      approvalLevel: 1,
      currentApprover: 'Michael Schmidt',
      approverRole: 'Procurement Manager',
      daysWaiting: 2,
      description: 'Steel I-Beams for warehouse construction project',
      justification: 'Best quality-price ratio, trusted supplier with 98% on-time delivery',
      attachments: ['quote.pdf', 'comparison.xlsx'],
      approvalChain: [
        { level: 1, approver: 'Michael Schmidt', role: 'Procurement Manager', status: 'pending', amount: '< €100K' },
        { level: 2, approver: 'Sarah Weber', role: 'Finance Director', status: 'waiting', amount: '< €100K' }
      ]
    },
    {
      id: 'APR-002',
      rfqId: 'KRAUBEX-RFQ-15678',
      requestedBy: 'Anna Schneider',
      requestedByRole: 'Project Manager',
      requestDate: '2025-10-30',
      projectName: 'Bridge Component Fabrication',
      supplier: 'Deutsche Stahlbau',
      amount: 108000,
      currency: '€',
      status: 'pending',
      urgency: 'medium',
      approvalLevel: 2,
      currentApprover: 'Sarah Weber',
      approverRole: 'Finance Director',
      daysWaiting: 4,
      description: 'Heavy duty steel girders for bridge project',
      justification: 'Highest quality rating (A+), specialized certifications required for bridge construction',
      attachments: ['quote.pdf', 'certifications.pdf', 'technical_specs.pdf'],
      approvalChain: [
        { level: 1, approver: 'Michael Schmidt', role: 'Procurement Manager', status: 'approved', amount: '< €200K', approvedDate: '2025-10-31', comment: 'Approved - Good supplier choice' },
        { level: 2, approver: 'Sarah Weber', role: 'Finance Director', status: 'pending', amount: '€100K - €200K' },
        { level: 3, approver: 'Thomas Becker', role: 'CEO', status: 'waiting', amount: '> €100K' }
      ]
    },
    {
      id: 'APR-003',
      rfqId: 'KRAUBEX-RFQ-20445',
      requestedBy: 'Martin Fischer',
      requestedByRole: 'Procurement Specialist',
      requestDate: '2025-10-28',
      projectName: 'Installation Service Contract',
      supplier: 'ProInstall Services GmbH',
      amount: 15000,
      currency: '€',
      status: 'approved',
      urgency: 'low',
      approvalLevel: 1,
      currentApprover: 'Michael Schmidt',
      approverRole: 'Procurement Manager',
      daysWaiting: 0,
      description: 'On-site installation and assembly service',
      justification: 'Recommended supplier with excellent safety record',
      attachments: ['service_agreement.pdf'],
      approvalChain: [
        { level: 1, approver: 'Michael Schmidt', role: 'Procurement Manager', status: 'approved', amount: '< €50K', approvedDate: '2025-10-29', comment: 'Approved' }
      ],
      approvedDate: '2025-10-29',
      approvedBy: 'Michael Schmidt'
    },
    {
      id: 'APR-004',
      rfqId: 'KRAUBEX-RFQ-18932',
      requestedBy: 'Lisa Hoffmann',
      requestedByRole: 'Procurement Specialist',
      requestDate: '2025-10-29',
      projectName: 'Equipment Platform',
      supplier: 'Titan Steel Works',
      amount: 48500,
      currency: '€',
      status: 'rejected',
      urgency: 'medium',
      approvalLevel: 1,
      currentApprover: 'Michael Schmidt',
      approverRole: 'Procurement Manager',
      daysWaiting: 0,
      description: 'Platform structure with safety rails',
      justification: 'Lowest price option',
      attachments: ['quote.pdf'],
      approvalChain: [
        { level: 1, approver: 'Michael Schmidt', role: 'Procurement Manager', status: 'rejected', amount: '< €50K', rejectedDate: '2025-10-30', comment: 'Quality concerns - previous defect rate too high. Please get quotes from alternative suppliers.' }
      ],
      rejectedDate: '2025-10-30',
      rejectedBy: 'Michael Schmidt',
      rejectionReason: 'Quality concerns with supplier history'
    }
  ];

  const stats = {
    pending: approvals.filter(a => a.status === 'pending').length,
    approved: approvals.filter(a => a.status === 'approved').length,
    rejected: approvals.filter(a => a.status === 'rejected').length,
    avgApprovalTime: 2.5,
    totalValue: approvals.filter(a => a.status === 'pending').reduce((sum, a) => sum + a.amount, 0)
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'waiting': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch(urgency) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const handleApprove = (approval) => {
    console.log('Approving:', approval.id, 'Comment:', approvalComment);
    setShowApprovalModal(false);
    setApprovalComment('');
  };

  const handleReject = (approval) => {
    console.log('Rejecting:', approval.id, 'Reason:', approvalComment);
    setShowApprovalModal(false);
    setApprovalComment('');
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

  const filteredApprovals = approvals.filter(approval => {
    const matchesTab = activeTab === 'all' || approval.status === activeTab;
    const matchesSearch = approval.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         approval.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         approval.rfqId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Approval Management</h1>
          <p className="text-gray-600">Review and approve purchase requests from your team</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Clock className="w-8 h-8 text-yellow-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            <p className="text-xs text-gray-600 mt-1">Pending Approval</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
            <p className="text-xs text-gray-600 mt-1">Approved</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <XCircle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.rejected}</p>
            <p className="text-xs text-gray-600 mt-1">Rejected</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <TrendingUp className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.avgApprovalTime}d</p>
            <p className="text-xs text-gray-600 mt-1">Avg. Approval Time</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CreditCard className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalValue)}</p>
            <p className="text-xs text-gray-600 mt-1">Pending Value</p>
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
                All ({approvals.length})
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
                onClick={() => setActiveTab('approved')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  activeTab === 'approved'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Approved ({stats.approved})
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

            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by project, supplier, or RFQ ID..."
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

        {/* Approval List */}
        <div className="space-y-4">
          {filteredApprovals.map((approval) => (
            <div key={approval.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{approval.projectName}</h3>
                      <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(approval.status)}`}>
                        {approval.status.toUpperCase()}
                      </span>
                      <span className={`flex items-center gap-1 ${getUrgencyColor(approval.urgency)}`}>
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-xs font-semibold uppercase">{approval.urgency} Priority</span>
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      RFQ: {approval.rfqId} • Supplier: {approval.supplier}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">{formatCurrency(approval.amount, approval.currency)}</p>
                    {approval.status === 'pending' && (
                      <p className="text-xs text-gray-500 mt-1">Waiting {approval.daysWaiting} days</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Requested By</p>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-semibold">{approval.requestedBy}</p>
                        <p className="text-xs text-gray-500">{approval.requestedByRole}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Request Date</p>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <p className="text-sm font-semibold">{formatDate(approval.requestDate)}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Current Approver</p>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-semibold">{approval.currentApprover}</p>
                        <p className="text-xs text-gray-500">{approval.approverRole}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Approval Level</p>
                    <p className="text-sm font-semibold">Level {approval.approvalLevel} of {approval.approvalChain.length}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-700 mb-2"><strong>Description:</strong> {approval.description}</p>
                  <p className="text-sm text-gray-700"><strong>Justification:</strong> {approval.justification}</p>
                </div>

                {/* Approval Chain */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Approval Chain</h4>
                  <div className="flex items-center gap-2">
                    {approval.approvalChain.map((step, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`flex flex-col items-center p-3 rounded-lg border-2 ${
                          step.status === 'approved' ? 'bg-green-50 border-green-300' :
                          step.status === 'rejected' ? 'bg-red-50 border-red-300' :
                          step.status === 'pending' ? 'bg-yellow-50 border-yellow-300' :
                          'bg-gray-50 border-gray-300'
                        }`}>
                          <div className="flex items-center gap-2 mb-1">
                            {step.status === 'approved' && <CheckCircle className="w-5 h-5 text-green-600" />}
                            {step.status === 'rejected' && <XCircle className="w-5 h-5 text-red-600" />}
                            {step.status === 'pending' && <Clock className="w-5 h-5 text-yellow-600" />}
                            {step.status === 'waiting' && <Clock className="w-5 h-5 text-gray-400" />}
                            <span className="text-xs font-semibold">Level {step.level}</span>
                          </div>
                          <p className="text-xs font-semibold text-center">{step.approver}</p>
                          <p className="text-xs text-gray-500 text-center">{step.role}</p>
                          {step.approvedDate && (
                            <p className="text-xs text-green-600 mt-1">{formatDate(step.approvedDate)}</p>
                          )}
                          {step.comment && (
                            <p className="text-xs text-gray-600 mt-1 italic">"{step.comment}"</p>
                          )}
                        </div>
                        {index < approval.approvalChain.length - 1 && (
                          <div className="w-8 h-0.5 bg-gray-300 mx-1"></div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Attachments */}
                {approval.attachments && approval.attachments.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Attachments</h4>
                    <div className="flex gap-2">
                      {approval.attachments.map((file, index) => (
                        <div key={index} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm">{file}</span>
                          <Download className="w-4 h-4 text-blue-600 cursor-pointer" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t">
                  <button
                    onClick={() => {
                      setSelectedApproval(approval);
                      setShowApprovalModal(true);
                    }}
                    className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View Full Details
                  </button>
                  {approval.status === 'pending' && (
                    <>
                      <button
                        onClick={() => {
                          setSelectedApproval(approval);
                          setShowApprovalModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Approve
                      </button>
                      <button
                        onClick={() => {
                          setSelectedApproval(approval);
                          setShowApprovalModal(true);
                        }}
                        className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Approval Modal */}
        {showApprovalModal && selectedApproval && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Approval Request</h3>
                  <p className="text-sm text-gray-500 mt-1">{selectedApproval.rfqId}</p>
                </div>
                <button onClick={() => setShowApprovalModal(false)}>
                  <XCircle className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h4 className="font-semibold text-lg mb-2">{selectedApproval.projectName}</h4>
                  <p className="text-3xl font-bold text-blue-600 mb-4">
                    {formatCurrency(selectedApproval.amount, selectedApproval.currency)}
                  </p>
                  <p className="text-gray-700 mb-2"><strong>Supplier:</strong> {selectedApproval.supplier}</p>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {selectedApproval.description}</p>
                  <p className="text-gray-700"><strong>Justification:</strong> {selectedApproval.justification}</p>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2">
                    {selectedApproval.status === 'pending' ? 'Add Comment (Optional)' : 'Your Comment'}
                  </label>
                  <textarea
                    value={approvalComment}
                    onChange={(e) => setApprovalComment(e.target.value)}
                    rows="4"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your comments or reasons..."
                  ></textarea>
                </div>

                {selectedApproval.status === 'pending' && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowApprovalModal(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleReject(selectedApproval)}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </button>
                    <button
                      onClick={() => handleApprove(selectedApproval)}
                      className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}