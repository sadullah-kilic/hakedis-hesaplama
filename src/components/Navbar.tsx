import React from 'react';
import { Building2, FileText, Calculator, BarChart3, Settings, User, Zap } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'projects', label: 'Projeler', icon: Building2 },
    { id: 'poz-list', label: 'Poz Listesi', icon: FileText },
    { id: 'auto-metraj', label: 'Otomatik Metraj', icon: Zap },
    { id: 'progress', label: 'Metraj & İlerleme', icon: Calculator },
    { id: 'reports', label: 'Hakediş Raporları', icon: FileText },
    { id: 'settings', label: 'Ayarlar', icon: Settings },
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">
              Hakediş Yönetim Sistemi
            </span>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-orange-100 text-orange-700 border border-orange-200'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-sm text-gray-600">Kullanıcı Adı</span>
          </div>
        </div>
      </div>
    </nav>
  );
};