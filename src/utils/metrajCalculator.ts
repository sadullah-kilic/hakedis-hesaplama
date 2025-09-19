export interface MetrajCalculationRule {
  id: string;
  pozNo: string;
  name: string;
  formula: string;
  parameters: string[];
  unit: string;
  category: string;
}

export interface ProjectDimensions {
  length: number;
  width: number;
  height: number;
  floorCount: number;
  roomCount: number;
  windowCount: number;
  doorCount: number;
  balconyArea: number;
  stairCount: number;
  wallThickness: number;
  foundationDepth: number;
  roofArea: number;
}

export interface CalculatedMetraj {
  pozNo: string;
  description: string;
  calculatedQuantity: number;
  unit: string;
  formula: string;
  parameters: Record<string, number>;
  category: string;
}

// Standart metraj hesaplama kuralları
export const METRAJ_RULES: MetrajCalculationRule[] = [
  // Zemin İşleri
  {
    id: '1',
    pozNo: '02.010.1001',
    name: 'Temel Kazısı',
    formula: '(length + 2 * wallThickness) * (width + 2 * wallThickness) * foundationDepth',
    parameters: ['length', 'width', 'wallThickness', 'foundationDepth'],
    unit: 'm³',
    category: 'Zemin İşleri'
  },
  {
    id: '2',
    pozNo: '02.020.1001',
    name: 'Dolgu ve Sıkıştırma',
    formula: 'length * width * 0.3',
    parameters: ['length', 'width'],
    unit: 'm³',
    category: 'Zemin İşleri'
  },
  
  // Beton İşleri
  {
    id: '3',
    pozNo: '03.110.1001',
    name: 'Temel Betonu',
    formula: '(length + 2 * wallThickness) * (width + 2 * wallThickness) * 0.4',
    parameters: ['length', 'width', 'wallThickness'],
    unit: 'm³',
    category: 'Beton İşleri'
  },
  {
    id: '4',
    pozNo: '03.120.1001',
    name: 'Döşeme Betonu',
    formula: 'length * width * 0.15 * floorCount',
    parameters: ['length', 'width', 'floorCount'],
    unit: 'm³',
    category: 'Beton İşleri'
  },
  {
    id: '5',
    pozNo: '03.130.1001',
    name: 'Kolon Betonu',
    formula: '0.3 * 0.3 * height * floorCount * 4',
    parameters: ['height', 'floorCount'],
    unit: 'm³',
    category: 'Beton İşleri'
  },
  
  // Demir İşleri
  {
    id: '6',
    pozNo: '04.210.1001',
    name: 'Temel Demiri',
    formula: '(length + width) * 2 * 8 * 0.617',
    parameters: ['length', 'width'],
    unit: 'kg',
    category: 'Demir İşleri'
  },
  {
    id: '7',
    pozNo: '04.220.1001',
    name: 'Döşeme Demiri',
    formula: 'length * width * floorCount * 15',
    parameters: ['length', 'width', 'floorCount'],
    unit: 'kg',
    category: 'Demir İşleri'
  },
  
  // Duvar İşleri
  {
    id: '8',
    pozNo: '05.310.1001',
    name: 'Tuğla Duvar',
    formula: '((length + width) * 2 * height * floorCount) - (windowCount * 1.5 + doorCount * 2)',
    parameters: ['length', 'width', 'height', 'floorCount', 'windowCount', 'doorCount'],
    unit: 'm²',
    category: 'Duvar İşleri'
  },
  {
    id: '9',
    pozNo: '05.320.1001',
    name: 'İç Bölme Duvarı',
    formula: 'roomCount * 15 * height',
    parameters: ['roomCount', 'height'],
    unit: 'm²',
    category: 'Duvar İşleri'
  },
  
  // Sıva İşleri
  {
    id: '10',
    pozNo: '06.410.1001',
    name: 'İç Sıva',
    formula: '((length + width) * 2 * height * floorCount * 2) + (length * width * floorCount)',
    parameters: ['length', 'width', 'height', 'floorCount'],
    unit: 'm²',
    category: 'Sıva İşleri'
  },
  {
    id: '11',
    pozNo: '06.420.1001',
    name: 'Dış Sıva',
    formula: '(length + width) * 2 * height * floorCount',
    parameters: ['length', 'width', 'height', 'floorCount'],
    unit: 'm²',
    category: 'Sıva İşleri'
  },
  
  // Çatı İşleri
  {
    id: '12',
    pozNo: '07.510.1001',
    name: 'Çatı Kaplaması',
    formula: 'roofArea * 1.1',
    parameters: ['roofArea'],
    unit: 'm²',
    category: 'Çatı İşleri'
  },
  
  // Kapı Pencere İşleri
  {
    id: '13',
    pozNo: '08.610.1001',
    name: 'Pencere Montajı',
    formula: 'windowCount * 1.5',
    parameters: ['windowCount'],
    unit: 'm²',
    category: 'Kapı Pencere İşleri'
  },
  {
    id: '14',
    pozNo: '08.620.1001',
    name: 'Kapı Montajı',
    formula: 'doorCount * 2',
    parameters: ['doorCount'],
    unit: 'm²',
    category: 'Kapı Pencere İşleri'
  }
];

export class MetrajCalculator {
  private rules: MetrajCalculationRule[];

  constructor(customRules?: MetrajCalculationRule[]) {
    this.rules = customRules || METRAJ_RULES;
  }

  // Formül değerlendirme fonksiyonu
  private evaluateFormula(formula: string, dimensions: ProjectDimensions): number {
    try {
      // Güvenli formül değerlendirmesi için basit parser
      let expression = formula;
      
      // Değişkenleri değerlerle değiştir
      Object.entries(dimensions).forEach(([key, value]) => {
        const regex = new RegExp(`\\b${key}\\b`, 'g');
        expression = expression.replace(regex, value.toString());
      });

      // Basit matematiksel işlemleri değerlendir
      return this.safeEval(expression);
    } catch (error) {
      console.error('Formül değerlendirme hatası:', error);
      return 0;
    }
  }

  // Güvenli matematik değerlendirme
  private safeEval(expression: string): number {
    // Sadece sayılar, operatörler ve parantezlere izin ver
    const sanitized = expression.replace(/[^0-9+\-*/().\s]/g, '');
    
    try {
      // Function constructor kullanarak güvenli değerlendirme
      return new Function(`"use strict"; return (${sanitized})`)();
    } catch {
      return 0;
    }
  }

  // Ana hesaplama fonksiyonu
  calculateMetraj(dimensions: ProjectDimensions): CalculatedMetraj[] {
    const results: CalculatedMetraj[] = [];

    this.rules.forEach(rule => {
      // Gerekli parametrelerin mevcut olup olmadığını kontrol et
      const hasAllParameters = rule.parameters.every(param => 
        dimensions[param as keyof ProjectDimensions] !== undefined
      );

      if (hasAllParameters) {
        const calculatedQuantity = this.evaluateFormula(rule.formula, dimensions);
        
        // Parametreleri kaydet
        const parameters: Record<string, number> = {};
        rule.parameters.forEach(param => {
          parameters[param] = dimensions[param as keyof ProjectDimensions];
        });

        results.push({
          pozNo: rule.pozNo,
          description: rule.name,
          calculatedQuantity: Math.round(calculatedQuantity * 100) / 100, // 2 ondalık basamak
          unit: rule.unit,
          formula: rule.formula,
          parameters,
          category: rule.category
        });
      }
    });

    return results.sort((a, b) => a.pozNo.localeCompare(b.pozNo));
  }

  // Kategori bazında toplam hesaplama
  calculateByCategory(dimensions: ProjectDimensions): Record<string, CalculatedMetraj[]> {
    const results = this.calculateMetraj(dimensions);
    const grouped: Record<string, CalculatedMetraj[]> = {};

    results.forEach(result => {
      if (!grouped[result.category]) {
        grouped[result.category] = [];
      }
      grouped[result.category].push(result);
    });

    return grouped;
  }

  // Özel kural ekleme
  addCustomRule(rule: MetrajCalculationRule): void {
    this.rules.push(rule);
  }

  // Kural güncelleme
  updateRule(ruleId: string, updatedRule: Partial<MetrajCalculationRule>): void {
    const index = this.rules.findIndex(rule => rule.id === ruleId);
    if (index !== -1) {
      this.rules[index] = { ...this.rules[index], ...updatedRule };
    }
  }

  // Kural silme
  removeRule(ruleId: string): void {
    this.rules = this.rules.filter(rule => rule.id !== ruleId);
  }

  // Mevcut kuralları getir
  getRules(): MetrajCalculationRule[] {
    return [...this.rules];
  }
}

// Varsayılan hesaplayıcı instance
export const defaultMetrajCalculator = new MetrajCalculator();