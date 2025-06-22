
import { Testimonial } from '@/types/testimonial';

export const exportTestimonialsToCSV = (testimonials: Testimonial[]) => {
  const headers = [
    'Client Name',
    'Company Name',
    'Rating',
    'Description',
    'Industry',
    'Results',
    'Profile Photo',
    'Sequence Order',
    'Is Active'
  ];

  const csvContent = [
    headers.join(','),
    ...testimonials.map(testimonial => [
      `"${testimonial.client_name.replace(/"/g, '""')}"`,
      `"${testimonial.company_name.replace(/"/g, '""')}"`,
      testimonial.rating,
      `"${testimonial.description.replace(/"/g, '""')}"`,
      `"${testimonial.industry.replace(/"/g, '""')}"`,
      `"${(testimonial.results || '').replace(/"/g, '""')}"`,
      `"${(testimonial.profile_photo || '').replace(/"/g, '""')}"`,
      testimonial.sequence_order,
      testimonial.is_active
    ].join(','))
  ].join('\n');

  downloadCSV(csvContent, 'testimonials.csv');
};

export const parseCSVToTestimonials = (csvContent: string): Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>[] => {
  const lines = csvContent.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  return lines.slice(1).map((line, index) => {
    const values = parseCSVLine(line);
    
    return {
      client_name: cleanCSVValue(values[0]) || `Client ${index + 1}`,
      company_name: cleanCSVValue(values[1]) || `Company ${index + 1}`,
      rating: parseInt(cleanCSVValue(values[2]) || '5') || 5,
      description: cleanCSVValue(values[3]) || 'No description provided',
      industry: cleanCSVValue(values[4]) || 'Technology',
      results: cleanCSVValue(values[5]) || '',
      profile_photo: cleanCSVValue(values[6]) || '',
      sequence_order: parseInt(cleanCSVValue(values[7]) || '0') || index + 1,
      is_active: cleanCSVValue(values[8])?.toLowerCase() === 'true'
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
