
import { Service } from '@/types/service';

export const exportServicesToCSV = (services: Service[]) => {
  const headers = [
    'Title',
    'Description', 
    'Icon',
    'Key Features',
    'Expected Benefits',
    'Sequence Order',
    'Is Active'
  ];

  const csvContent = [
    headers.join(','),
    ...services.map(service => [
      `"${service.title.replace(/"/g, '""')}"`,
      `"${service.description.replace(/"/g, '""')}"`,
      service.icon,
      `"${service.key_features.join('; ').replace(/"/g, '""')}"`,
      `"${service.expected_benefits.join('; ').replace(/"/g, '""')}"`,
      service.sequence_order,
      service.is_active
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'services.csv');
};

export const parseCSVToServices = (csvContent: string): Omit<Service, 'id' | 'created_at' | 'updated_at'>[] => {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    
    return {
      title: cleanCSVValue(values[0]) || `Service ${index + 1}`,
      description: cleanCSVValue(values[1]) || 'No description provided',
      icon: cleanCSVValue(values[2]) || 'Star',
      key_features: cleanCSVValue(values[3])?.split(';').map(f => f.trim()).filter(f => f) || [],
      expected_benefits: cleanCSVValue(values[4])?.split(';').map(b => b.trim()).filter(b => b) || [],
      sequence_order: parseInt(cleanCSVValue(values[5]) || '0') || index + 1,
      is_active: cleanCSVValue(values[6])?.toLowerCase() === 'true'
    };
  });
};

const parseCSVLine = (line: string): string[] => {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  
  result.push(current);
  return result;
};

const cleanCSVValue = (value: string): string => {
  return value?.replace(/^"(.*)"$/, '$1').replace(/""/g, '"').trim();
};

const downloadCSV = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
