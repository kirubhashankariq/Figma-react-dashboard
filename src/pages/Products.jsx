import React, { useState } from 'react';
import {
  Package,
  Plus,
  Search,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Tag,
  Star,
  Layers,
} from 'lucide-react';
import { productsCatalog } from '../utils/mockData';
import { formatCurrency, formatNumber } from '../utils/formatters';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import { SearchInput, Input, Select } from '../components/Input';
import Modal from '../components/Modal';

export default function Products() {
  const [products, setProducts] = useState(productsCatalog);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Cloud Software',
    price: '',
    stock: '',
    sku: '',
    description: '',
  });

  const categories = ['All', 'Cloud Software', 'Developer Tools', 'Artificial Intelligence', 'Security'];

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (e) => {
    e.preventDefault();
    const created = {
      id: `PRD-${products.length + 101}`,
      name: newProduct.name,
      category: newProduct.category,
      price: parseFloat(newProduct.price) || 0,
      stock: parseInt(newProduct.stock, 10) || 0,
      status: parseInt(newProduct.stock, 10) > 10 ? 'In Stock' : parseInt(newProduct.stock, 10) > 0 ? 'Low Stock' : 'Out of Stock',
      sales: 0,
      rating: 5.0,
      sku: newProduct.sku || `SKU-${Date.now().toString().slice(-4)}`,
      description: newProduct.description,
    };
    setProducts([created, ...products]);
    setIsModalOpen(false);
    setNewProduct({ name: '', category: 'Cloud Software', price: '', stock: '', sku: '', description: '' });
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Product Catalog & Inventory
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Manage your digital software modules, enterprise plans, and stock allocations.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={Plus}
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </Button>
      </div>

      {/* Filter and Category Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-card">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs font-medium">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-brand-50 text-brand-700 font-semibold border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="w-full md:w-72">
          <SearchInput
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClear={() => setSearchTerm('')}
            placeholder="Search by product name or SKU..."
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} hover className="p-5 flex flex-col justify-between">
            <div>
              {/* Header: SKU, Category & Status */}
              <div className="flex items-center justify-between">
                <span className="text-2xs font-semibold text-slate-400 uppercase tracking-wider">
                  {product.sku}
                </span>
                <Badge
                  hasDot
                  variant={
                    product.status === 'In Stock'
                      ? 'success'
                      : product.status === 'Low Stock'
                      ? 'warning'
                      : 'danger'
                  }
                  size="sm"
                >
                  {product.status}
                </Badge>
              </div>

              {/* Title & Description */}
              <div className="mt-3">
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {product.name}
                </h3>
                <span className="text-2xs font-medium text-brand-600 bg-brand-50 px-2 py-0.5 rounded mt-1 inline-block">
                  {product.category}
                </span>
                <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                  {product.description}
                </p>
              </div>
            </div>

            {/* Price & Sales Details */}
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-2xs text-slate-400">Unit Price</span>
                <div className="text-lg font-bold text-slate-900">
                  {formatCurrency(product.price)}
                </div>
              </div>

              <div className="text-right">
                <div className="flex items-center gap-1 text-xs text-amber-500 font-semibold justify-end">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-2xs text-slate-400">
                  {formatNumber(product.sales)} sold
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Catalog Product"
        description="Enter product specifications and initial inventory."
      >
        <form onSubmit={handleAddProduct} className="space-y-4">
          <Input
            label="Product Title"
            placeholder="e.g. Enterprise Monitoring Agent"
            required
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={newProduct.category}
              onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
              options={[
                { value: 'Cloud Software', label: 'Cloud Software' },
                { value: 'Developer Tools', label: 'Developer Tools' },
                { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
                { value: 'Security', label: 'Security' },
              ]}
            />
            <Input
              label="SKU Code"
              placeholder="e.g. EMA-PRO-01"
              value={newProduct.sku}
              onChange={(e) => setNewProduct({ ...newProduct, sku: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price ($ USD)"
              type="number"
              placeholder="499.00"
              required
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <Input
              label="Available Stock"
              type="number"
              placeholder="100"
              required
              value={newProduct.stock}
              onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            />
          </div>

          <Input
            label="Description"
            placeholder="Brief product value proposition..."
            value={newProduct.description}
            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
          />

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Product
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
