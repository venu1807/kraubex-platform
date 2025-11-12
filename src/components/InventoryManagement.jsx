import { useState } from "react";
import {
  Package,
  Search,
  Filter,
  AlertTriangle,
  TrendingUp,
  Box,
  Plus,
  Edit,
  Trash2,
  Download,
  ArrowUpDown,
  CheckCircle,
  XCircle
} from "lucide-react";

export default function InventoryManagementPageContent() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedItems, setSelectedItems] = useState([]);

  const [inventory, setInventory] = useState([
    { id: "INV-2025-001", name: "Steel Beams", stock: 120, minStock: 50, unit: "pcs", category: "Structural", supplier: "Metallix GmbH", lastUpdated: "2025-11-10", status: "active" },
    { id: "INV-2025-002", name: "CNC Parts", stock: 40, minStock: 50, unit: "pcs", category: "Components", supplier: "Precision Steel Co.", lastUpdated: "2025-11-08", status: "active" },
    { id: "INV-2025-003", name: "Roof Trusses", stock: 75, minStock: 60, unit: "pcs", category: "Structural", supplier: "Deutsche Stahlbau", lastUpdated: "2025-11-11", status: "active" },
    { id: "INV-2025-004", name: "Welding Wire", stock: 25, minStock: 100, unit: "kg", category: "Consumables", supplier: "WeldTech Solutions", lastUpdated: "2025-11-05", status: "active" },
    { id: "INV-2025-005", name: "Hydraulic Pumps", stock: 15, minStock: 10, unit: "pcs", category: "Equipment", supplier: "Industrial Metals Ltd", lastUpdated: "2025-11-12", status: "active" },
    { id: "INV-2025-006", name: "Steel Plates", stock: 200, minStock: 150, unit: "sheets", category: "Raw Material", supplier: "SteelSphere GmbH", lastUpdated: "2025-11-09", status: "active" },
    { id: "INV-2025-007", name: "Cutting Blades", stock: 8, minStock: 20, unit: "pcs", category: "Tools", supplier: "Titan Steel Works", lastUpdated: "2025-11-07", status: "active" },
    { id: "INV-2025-008", name: "Safety Gear", stock: 45, minStock: 30, unit: "sets", category: "Safety", supplier: "SafeWork GmbH", lastUpdated: "2025-11-11", status: "active" },
  ]);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = filterStatus === "all" ||
                         (filterStatus === "low" && item.stock < item.minStock) ||
                         (filterStatus === "normal" && item.stock >= item.minStock);

    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalItems: inventory.length,
    lowStock: inventory.filter(i => i.stock < i.minStock).length,
    inStock: inventory.filter(i => i.stock >= i.minStock).length,
    categories: [...new Set(inventory.map(i => i.category))].length,
    totalValue: inventory.length * 15000 // Simulated total value
  };

  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]
    );
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setInventory((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-xl border-2 border-gray-300 p-6" style={{backgroundColor: '#efeee7', fontFamily: 'Roboto'}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap');`}</style>

      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Inventory Management</h1>
          <p className="text-gray-600">Track and manage your material inventory</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Package className="w-8 h-8 text-blue-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.totalItems}</p>
            <p className="text-xs text-gray-600 mt-1">Total Items</p>
            <p className="text-xs text-blue-600 font-semibold mt-1">In System</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <CheckCircle className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.inStock}</p>
            <p className="text-xs text-gray-600 mt-1">In Stock</p>
            <p className="text-xs text-green-600 font-semibold mt-1">Normal Level</p>
          </div>

          <div className="bg-red-50 rounded-lg shadow-md p-4 border-2 border-red-200 hover:shadow-lg transition-shadow">
            <AlertTriangle className="w-8 h-8 text-red-600 mb-2" />
            <p className="text-2xl font-bold text-red-700">{stats.lowStock}</p>
            <p className="text-xs text-gray-700 mt-1">Low Stock</p>
            <p className="text-xs text-red-700 font-semibold mt-1">Need Reorder</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <Box className="w-8 h-8 text-purple-600 mb-2" />
            <p className="text-2xl font-bold text-gray-900">{stats.categories}</p>
            <p className="text-xs text-gray-600 mt-1">Categories</p>
            <p className="text-xs text-purple-600 font-semibold mt-1">Types</p>
          </div>

          <div className="bg-green-50 rounded-lg shadow-md p-4 border-2 border-green-200 hover:shadow-lg transition-shadow">
            <TrendingUp className="w-8 h-8 text-green-600 mb-2" />
            <p className="text-2xl font-bold text-green-700">€{(stats.totalValue / 1000).toFixed(0)}K</p>
            <p className="text-xs text-gray-700 mt-1">Total Value</p>
            <p className="text-xs text-green-700 font-semibold mt-1">Estimated</p>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-6">
            {/* Filter Tabs */}
            <div className="flex gap-2 mb-6 border-b">
              <button
                onClick={() => setFilterStatus('all')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filterStatus === 'all'
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All Items ({stats.totalItems})
              </button>
              <button
                onClick={() => setFilterStatus('normal')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filterStatus === 'normal'
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                In Stock ({stats.inStock})
              </button>
              <button
                onClick={() => setFilterStatus('low')}
                className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                  filterStatus === 'low'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Low Stock ({stats.lowStock})
              </button>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by item name, supplier, or category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
                <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === filteredInventory.length && filteredInventory.length > 0}
                      onChange={(e) => setSelectedItems(e.target.checked ? filteredInventory.map(i => i.id) : [])}
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Invoice / RFQ </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Supplier</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Stock</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Min Stock</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Last Updated</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map(item => {
                  const isLowStock = item.stock < item.minStock;
                  const stockPercentage = (item.stock / item.minStock) * 100;

                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(item.id)}
                          onChange={() => handleCheckboxChange(item.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <p className="text-sm font-mono text-gray-500">{item.id}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-semibold">
                            {item.name.substring(0, 2)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.unit}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                          {item.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center text-white text-xs font-semibold">
                            {item.supplier.substring(0, 2)}
                          </div>
                          <span className="text-sm text-gray-900">{item.supplier}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-center">
                          <p className={`text-sm font-bold ${isLowStock ? 'text-red-600' : 'text-gray-900'}`}>
                            {item.stock}
                          </p>
                          {isLowStock && (
                            <div className="flex items-center justify-center gap-1 mt-1">
                              <AlertTriangle className="w-3 h-3 text-red-600" />
                              <p className="text-xs text-red-600">Low</p>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-sm text-gray-900">{item.minStock}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          isLowStock
                            ? 'bg-red-100 text-red-800'
                            : stockPercentage > 150
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-green-100 text-green-800'
                        }`}>
                          {isLowStock ? 'Reorder' : stockPercentage > 150 ? 'Overstock' : 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <p className="text-sm text-gray-900">{formatDate(item.lastUpdated)}</p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-2 justify-center">
                          <button
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Item"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Item"
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

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500">No inventory items found</p>
            </div>
          )}
        </div>

        {/* Selected Items Actions */}
        {selectedItems.length > 0 && (
          <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between">
            <p className="text-sm text-blue-800 font-medium">
              {selectedItems.length} item(s) selected
            </p>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white border border-blue-300 text-blue-700 rounded-lg hover:bg-blue-100 text-sm">
                Bulk Update
              </button>
              <button
                onClick={() => {
                  if (window.confirm(`Delete ${selectedItems.length} selected items?`)) {
                    setInventory(prev => prev.filter(item => !selectedItems.includes(item.id)));
                    setSelectedItems([]);
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
    </div>
  );
}