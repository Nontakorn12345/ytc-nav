import { Building } from './types';

export const BUILDINGS: Building[] = [
  {
    id: 'b1',
    name: 'ตึก 1 (บริหารธุรกิจ)',
    description: 'อาคารอำนวยการและแผนกวิชาบริหารธุรกิจ ตึกสีขาวโดดเด่นหน้าวิทยาลัย ติดกับทางเข้าหลัก',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=600&h=400&fit=crop',
    rooms: ['ห้องธุรการ', 'ห้องผู้อำนวยการ', 'ห้องเรียน 116', 'ห้องเรียน 121'],
    department: 'บริหารธุรกิจ',
    floors: 3
  },
  {
    id: 'b4',
    name: 'ตึก 4 (ช่างยนต์)',
    description: 'อาคารปฏิบัติงานช่างยนต์ มีอุปกรณ์ครบครันสำหรับการซ่อมบำรุงรถยนต์และรถจักรยานยนต์',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dcf18193c?q=80&w=600&h=400&fit=crop',
    rooms: ['โรงฝึกงานเครื่องยนต์', 'ห้องเรียนทฤษฎี 401', 'ห้องพัสดุช่างยนต์'],
    department: 'ช่างยนต์',
    floors: 2
  },
  {
    id: 'b6',
    name: 'ตึก 6 (IT)',
    description: 'อาคารเรียนแผนกเทคโนโลยีสารสนเทศและคอมพิวเตอร์กราฟิก ศูนย์รวมนวัตกรรมดิจิทัล',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=600&h=400&fit=crop',
    rooms: ['ห้อง Server', 'ห้องเรียน Com 1', 'ห้องเรียน Com 2', 'ห้องตัดต่อวิดีโอ'],
    department: 'เทคโนโลยีสารสนเทศ',
    floors: 4
  },
  {
    id: 'canteen',
    name: 'โรงอาหาร',
    description: 'แหล่งรวมอาหาร เครื่องดื่ม และที่พักผ่อนสำหรับนักศึกษา ตั้งอยู่กึ่งกลางวิทยาลัย',
    image: 'https://images.unsplash.com/photo-1567529684892-0f296dc0d5ff?q=80&w=600&h=400&fit=crop',
    rooms: ['ร้านค้าสวัสดิการ', 'โซนทานอาหาร', 'ห้องน้ำชาย-หญิง'],
    floors: 1
  },
  {
    id: 'library',
    name: 'วิทยบริการ (ห้องสมุด)',
    description: 'ศูนย์รวมความรู้ ห้องสืบค้นข้อมูล และห้องประชุมขนาดเล็ก',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=600&h=400&fit=crop',
    rooms: ['โซนอ่านหนังสือ', 'ห้อง Internet', 'ห้องประชุมย่อย 1-2'],
    floors: 2
  }
];

export const LOCATIONS = BUILDINGS.map(b => ({ label: b.name, value: b.id }));

export const MAP_IMAGE_URL = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&h=800&fit=crop';