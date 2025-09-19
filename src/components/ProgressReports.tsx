import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, Calendar, DollarSign, TrendingUp } from 'lucide-react';

export const ProgressReports: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('1');

  const projects = [
    { id: '1', name: 'Konut Projesi A Blok' },
    { id: '2', name: 'Ofis Binası İnşaatı' }
  ];

  const reports = [
    {
      id: '1',
      period: 3,
      reportDate: '2024-01-20',
      totalWorkDone: 1250000,
      previousWorkDone: 850000,
      currentWorkDone: 400000,
      priceAdjustment: 25000,
      deductions: 15000,
      advances: 125000,
      vatAmount: 72000,
      netPayable: 357000,
      status: 'approved' as const
    },
    {
      id: '2',
      period: 2,
      reportDate: '2024-01-15',
      totalWorkDone: 850000,
      previousWorkDone: 450000,
      currentWorkDone: 400000,
      priceAdjustment: 20000,
      deductions: 10000,
      advances: 85000,
      vatAmount: 64800,
      netPayable: 389800,
      status: 'approved' as const
    },
    {
      id: '3',
      period: 1,
      reportDate: '2024-01-10',
      totalWorkDone: 450000,
      previousWorkDone: 0,
      currentWorkDone: 450000,
      priceAdjustment: 15000,
      deductions: 5000,
      advances: 90000,
      vatAmount: 81000,
      netPayable: 451000,
      status: 'approved' as const
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      draft: { label: 'Taslak', className: 'bg-gray-100 text-gray-800' },
      submitted: { label: 'Gönderildi', className: 'bg-blue-100 text-blue-800' },
      approved: { label: 'Onaylandı', className: 'bg-green-100 text-green-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig];
    return (
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}>
        {config.label}
      </span>
    );
  };

  // Totals calculation
  const totalApprovedAmount = reports
    .filter(r => r.status === 'approved')
    .reduce((sum, report) => sum + report.netPayable, 0);
  
  const totalWorkDone = reports
    .filter(r => r.status === 'approved')
    .reduce((sum, report) => sum + report.currentWorkDone, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Hakediş Raporları</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            <Download className="h-4 w-4" />
            <span>Tümünü İndir</span>
          </button>
          <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Plus className="h-4 w-4" />
            <span>Yeni Hakediş</span>
          </button>
        </div>
      </div>

      {/* Project Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Proje:</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          >
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Ödenen</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalApprovedAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam İş Yapıldı</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalWorkDone)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam Hakediş</p>
              <p className="text-2xl font-bold text-gray-900">{reports.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Dönem
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Tarih
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Bu Dönem İş
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Fiyat Farkı
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Kesintiler
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Avanslar
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  KDV
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Net Ödenecek
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-4 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="font-medium text-gray-900">
                        {report.period}. Hakediş
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(report.reportDate).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {formatCurrency(report.currentWorkDone)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-green-600">
                      +{formatCurrency(report.priceAdjustment)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-red-600">
                      -{formatCurrency(report.deductions)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-orange-600">
                      -{formatCurrency(report.advances)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {formatCurrency(report.vatAmount)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {formatCurrency(report.netPayable)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(report.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors" title="Görüntüle">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-green-600 transition-colors" title="PDF İndir">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Toplam {reports.length} hakediş
            </span>
            <div className="text-sm font-semibold text-gray-900">
              Genel Toplam: {formatCurrency(totalApprovedAmount)}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors group">
            <Plus className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900">Yeni Hakediş Oluştur</h3>
            <p className="text-sm text-gray-600">Metraj girişlerinden hakediş hesapla</p>
          </button>
          
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors group">
            <FileText className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900">Toplu PDF Çıktı</h3>
            <p className="text-sm text-gray-600">Tüm hakediş raporlarını indir</p>
          </button>
          
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors group">
            <Download className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="font-medium text-gray-900">Excel Raporu</h3>
            <p className="text-sm text-gray-600">Özet rapor oluştur ve indir</p>
          </button>
        </div>
      </div>
    </div>
  );
};