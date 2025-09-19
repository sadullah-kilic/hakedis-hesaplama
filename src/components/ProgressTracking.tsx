import React, { useState } from 'react';
import { Calendar, TrendingUp, Save, Plus, FileText } from 'lucide-react';

export const ProgressTracking: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState('1');
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  
  const projects = [
    { id: '1', name: 'Konut Projesi A Blok' },
    { id: '2', name: 'Ofis Binası İnşaatı' }
  ];

  const pozProgress = [
    {
      id: '1',
      pozNo: '02.010.1001',
      description: 'Temel kazısı (kaya dışı zemin)',
      unit: 'm³',
      totalQuantity: 1250.00,
      previousProgress: 850.00,
      currentPeriod: 200.00,
      totalCompleted: 1050.00,
      progressPercentage: 84.00,
      unitPrice: 45.50
    },
    {
      id: '2',
      pozNo: '03.110.1001',
      description: 'C25/30 beton dökümü',
      unit: 'm³',
      totalQuantity: 850.00,
      previousProgress: 450.00,
      currentPeriod: 150.00,
      totalCompleted: 600.00,
      progressPercentage: 70.59,
      unitPrice: 285.75
    },
    {
      id: '3',
      pozNo: '04.210.1001',
      description: 'Nervürlü demir yerleştirilmesi (Ø12-32)',
      unit: 'kg',
      totalQuantity: 25500.00,
      previousProgress: 15000.00,
      currentPeriod: 3500.00,
      totalCompleted: 18500.00,
      progressPercentage: 72.55,
      unitPrice: 8.25
    },
    {
      id: '4',
      pozNo: '05.310.1001',
      description: 'Tuğla duvar örme (19 cm)',
      unit: 'm²',
      totalQuantity: 2850.00,
      previousProgress: 1200.00,
      currentPeriod: 600.00,
      totalCompleted: 1800.00,
      progressPercentage: 63.16,
      unitPrice: 125.30
    }
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const calculatePeriodAmount = (quantity: number, unitPrice: number) => {
    return quantity * unitPrice;
  };

  const totalCurrentPeriodAmount = pozProgress.reduce(
    (sum, item) => sum + calculatePeriodAmount(item.currentPeriod, item.unitPrice),
    0
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Metraj & İlerleme Takibi</h1>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors">
            <FileText className="h-4 w-4" />
            <span>Rapor Al</span>
          </button>
          <button className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Save className="h-4 w-4" />
            <span>Kaydet</span>
          </button>
        </div>
      </div>

      {/* Project and Period Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Proje Seçimi
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hakediş Dönemi
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              <option value={1}>1. Hakediş</option>
              <option value={2}>2. Hakediş</option>
              <option value={3}>3. Hakediş</option>
              <option value={4}>4. Hakediş</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hakediş Tarihi
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="date"
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                defaultValue={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Bu Dönem</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(totalCurrentPeriodAmount)}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Toplam İlerleme</p>
              <p className="text-2xl font-bold text-gray-900">%73.2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-lg">
              <FileText className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Aktif Poz</p>
              <p className="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <Plus className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Yeni Pozlar</p>
              <p className="text-2xl font-bold text-gray-900">-</p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Poz No
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Açıklama
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Toplam Miktar
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Önceki Dönem
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Bu Dönem
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  İlerleme %
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                  Tutar (Bu Dönem)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pozProgress.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-mono text-sm font-medium text-gray-900">
                      {item.pozNo}
                    </div>
                  </td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-sm text-gray-900 truncate" title={item.description}>
                      {item.description}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {item.totalQuantity.toLocaleString('tr-TR', { minimumFractionDigits: 2 })} {item.unit}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-600">
                      {item.previousProgress.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="number"
                      defaultValue={item.currentPeriod}
                      step="0.01"
                      className="w-24 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                        <div
                          className="bg-orange-600 h-2 rounded-full"
                          style={{ width: `${Math.min(item.progressPercentage, 100)}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 min-w-[3rem]">
                        {item.progressPercentage.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(calculatePeriodAmount(item.currentPeriod, item.unitPrice))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="bg-orange-50 px-6 py-4 border-t border-orange-200">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-orange-800">
              {selectedPeriod}. Hakediş Dönemi Toplamı
            </span>
            <span className="text-lg font-bold text-orange-900">
              {formatCurrency(totalCurrentPeriodAmount)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};