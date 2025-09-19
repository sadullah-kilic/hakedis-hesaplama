import React from 'react';
import { TrendingUp, FileText, AlertCircle, CheckCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Toplam Proje',
      value: '12',
      change: '+2 bu ay',
      icon: FileText,
      color: 'blue'
    },
    {
      title: 'Aktif Hakediş',
      value: '8',
      change: '+15% artış',
      icon: TrendingUp,
      color: 'green'
    },
    {
      title: 'Bekleyen Onay',
      value: '3',
      change: 'İnceleme gerekli',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      title: 'Tamamlanan',
      value: '45',
      change: 'Bu yıl',
      icon: CheckCircle,
      color: 'emerald'
    }
  ];

  const recentProjects = [
    { name: 'Konut Projesi A Blok', progress: 85, value: '2.450.000 ₺' },
    { name: 'Ofis Binası İnşaatı', progress: 62, value: '5.680.000 ₺' },
    { name: 'AVM Dış Cephe Çalışması', progress: 91, value: '1.250.000 ₺' },
    { name: 'Fabrika Binası', progress: 37, value: '8.900.000 ₺' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const colorClasses = {
            blue: 'bg-blue-50 text-blue-600',
            green: 'bg-green-50 text-green-600',
            orange: 'bg-orange-50 text-orange-600',
            emerald: 'bg-emerald-50 text-emerald-600'
          };

          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-lg ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Son Projeler</h2>
          <div className="space-y-4">
            {recentProjects.map((project, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{project.name}</h3>
                  <div className="mt-2 flex items-center space-x-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {project.progress}%
                    </span>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-gray-900">{project.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Hızlı İşlemler</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-orange-50 hover:bg-orange-100 rounded-lg text-left transition-colors group">
              <FileText className="h-8 w-8 text-orange-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-gray-900">Yeni Proje</h3>
              <p className="text-sm text-gray-600">Proje oluştur</p>
            </button>
            <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-left transition-colors group">
              <TrendingUp className="h-8 w-8 text-blue-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-gray-900">Metraj Gir</h3>
              <p className="text-sm text-gray-600">İlerleme kaydet</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors group">
              <CheckCircle className="h-8 w-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-gray-900">Hakediş Oluştur</h3>
              <p className="text-sm text-gray-600">Rapor hazırla</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors group">
              <FileText className="h-8 w-8 text-purple-600 mb-2 group-hover:scale-110 transition-transform" />
              <h3 className="font-medium text-gray-900">Poz Ekle</h3>
              <p className="text-sm text-gray-600">Yeni poz tanımla</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};