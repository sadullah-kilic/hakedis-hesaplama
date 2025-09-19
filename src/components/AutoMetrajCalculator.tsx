import React, { useState } from 'react';
import { Calculator, FileText, Download, Upload, Settings, Play } from 'lucide-react';
import { MetrajCalculator, ProjectDimensions, CalculatedMetraj, METRAJ_RULES } from '../utils/metrajCalculator';

export const AutoMetrajCalculator: React.FC = () => {
  const [calculator] = useState(new MetrajCalculator());
  const [dimensions, setDimensions] = useState<ProjectDimensions>({
    length: 20,
    width: 15,
    height: 3,
    floorCount: 3,
    roomCount: 12,
    windowCount: 15,
    doorCount: 8,
    balconyArea: 25,
    stairCount: 1,
    wallThickness: 0.2,
    foundationDepth: 1.5,
    roofArea: 320
  });

  const [calculatedResults, setCalculatedResults] = useState<CalculatedMetraj[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [showFormulas, setShowFormulas] = useState(false);

  const categories = ['Tümü', 'Zemin İşleri', 'Beton İşleri', 'Demir İşleri', 'Duvar İşleri', 'Sıva İşleri', 'Çatı İşleri', 'Kapı Pencere İşleri'];

  const handleCalculate = () => {
    const results = calculator.calculateMetraj(dimensions);
    setCalculatedResults(results);
  };

  const handleDimensionChange = (key: keyof ProjectDimensions, value: number) => {
    setDimensions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const filteredResults = calculatedResults.filter(result => 
    selectedCategory === 'Tümü' || result.category === selectedCategory
  );

  const formatNumber = (num: number) => {
    return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const exportToCSV = () => {
    const headers = ['Poz No', 'Açıklama', 'Miktar', 'Birim', 'Kategori', 'Formül'];
    const csvContent = [
      headers.join(','),
      ...calculatedResults.map(result => [
        result.pozNo,
        `"${result.description}"`,
        result.calculatedQuantity,
        result.unit,
        result.category,
        `"${result.formula}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'metraj_hesaplama.csv';
    link.click();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Calculator className="h-8 w-8 text-orange-600" />
          <h1 className="text-3xl font-bold text-gray-900">Otomatik Metraj Hesaplama</h1>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Settings className="h-4 w-4" />
            <span>{showFormulas ? 'Formülleri Gizle' : 'Formülleri Göster'}</span>
          </button>
          <button
            onClick={exportToCSV}
            disabled={calculatedResults.length === 0}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Download className="h-4 w-4" />
            <span>CSV İndir</span>
          </button>
        </div>
      </div>

      {/* Project Dimensions Input */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Proje Boyutları</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uzunluk (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.length}
              onChange={(e) => handleDimensionChange('length', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Genişlik (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.width}
              onChange={(e) => handleDimensionChange('width', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kat Yüksekliği (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.height}
              onChange={(e) => handleDimensionChange('height', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kat Sayısı
            </label>
            <input
              type="number"
              value={dimensions.floorCount}
              onChange={(e) => handleDimensionChange('floorCount', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Oda Sayısı
            </label>
            <input
              type="number"
              value={dimensions.roomCount}
              onChange={(e) => handleDimensionChange('roomCount', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pencere Sayısı
            </label>
            <input
              type="number"
              value={dimensions.windowCount}
              onChange={(e) => handleDimensionChange('windowCount', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kapı Sayısı
            </label>
            <input
              type="number"
              value={dimensions.doorCount}
              onChange={(e) => handleDimensionChange('doorCount', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Duvar Kalınlığı (m)
            </label>
            <input
              type="number"
              step="0.01"
              value={dimensions.wallThickness}
              onChange={(e) => handleDimensionChange('wallThickness', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Temel Derinliği (m)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.foundationDepth}
              onChange={(e) => handleDimensionChange('foundationDepth', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Çatı Alanı (m²)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.roofArea}
              onChange={(e) => handleDimensionChange('roofArea', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Balkon Alanı (m²)
            </label>
            <input
              type="number"
              step="0.1"
              value={dimensions.balconyArea}
              onChange={(e) => handleDimensionChange('balconyArea', parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Merdiven Sayısı
            </label>
            <input
              type="number"
              value={dimensions.stairCount}
              onChange={(e) => handleDimensionChange('stairCount', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <button
            onClick={handleCalculate}
            className="flex items-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            <Play className="h-5 w-5" />
            <span>Metraj Hesapla</span>
          </button>
        </div>
      </div>

      {/* Results */}
      {calculatedResults.length > 0 && (
        <>
          {/* Category Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Kategori:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-500">
                {filteredResults.length} poz gösteriliyor
              </span>
            </div>
          </div>

          {/* Results Table */}
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
                      Hesaplanan Miktar
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Birim
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    {showFormulas && (
                      <th className="px-6 py-4 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                        Formül
                      </th>
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredResults.map((result, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-mono text-sm font-medium text-gray-900">
                          {result.pozNo}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{result.description}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-semibold text-gray-900">
                          {formatNumber(result.calculatedQuantity)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{result.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {result.category}
                        </span>
                      </td>
                      {showFormulas && (
                        <td className="px-6 py-4">
                          <div className="text-xs font-mono text-gray-600 max-w-xs truncate" title={result.formula}>
                            {result.formula}
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-600">
                  Toplam {filteredResults.length} poz hesaplandı
                </span>
                <span className="font-semibold text-gray-900">
                  Otomatik hesaplama tamamlandı
                </span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Help Section */}
      <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-3">
          <FileText className="h-6 w-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Nasıl Kullanılır?</h3>
            <div className="text-sm text-blue-800 space-y-2">
              <p>1. <strong>Proje boyutlarını girin:</strong> Binanızın temel ölçülerini (uzunluk, genişlik, yükseklik) ve diğer detayları doldurun.</p>
              <p>2. <strong>Hesapla butonuna tıklayın:</strong> Sistem otomatik olarak standart inşaat pozlarına göre metraj hesaplaması yapacak.</p>
              <p>3. <strong>Sonuçları inceleyin:</strong> Kategori bazında filtreleme yapabilir, formülleri görüntüleyebilirsiniz.</p>
              <p>4. <strong>Sonuçları dışa aktarın:</strong> CSV formatında indirerek Excel'de kullanabilirsiniz.</p>
            </div>
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Not:</strong> Bu hesaplamalar standart formüllere dayalıdır. Projenizin özel durumları için hesaplamaları kontrol edin ve gerekirse manuel düzeltmeler yapın.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};