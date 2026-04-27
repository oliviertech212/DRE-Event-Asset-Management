import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@digitalrealm.rw' },
    update: {},
    create: {
      email: 'admin@digitalrealm.rw',
      password: hashedPassword,
      name: 'Admin User',
      role: 'ADMIN',
    },
  });

  console.log('✅ Admin user created:', admin.email);

  const event1 = await prisma.event.create({
    data: {
      title: 'Swahili Esports Champions Season 3',
      description: "Africa's premier esports championship returns for Season 3",
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      ],
      startDate: '2026-06-25',
      endDate: '2026-06-29',
      time: '10:00 AM - 6:00 PM',
      location: 'Kigali',
      venue: 'Kigali Convention Centre',
      address: 'KN 4 Ave, Kigali, Rwanda',
      email: 'events@digitalrealm.rw',
      phone: '+250 788 123 456',
      website: 'https://digitalrealm-entertainment.com',
      maxParticipants: 192,
      participants: 128,
      status: 'Live',
      published: true,
      createdById: admin.id,
    },
  });

  const event2 = await prisma.event.create({
    data: {
      title: 'Game Jam Kigali 2026 — African Worlds',
      description: 'A 48-hour game development marathon',
      category: 'Game Jam',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
      gallery: [],
      startDate: '2026-07-12',
      endDate: '2026-07-14',
      time: '9:00 AM - 9:00 PM',
      location: 'Kigali',
      venue: 'Impact Hub Kigali',
      address: 'Norrsken House, KG 7 Ave, Kigali',
      email: 'gamejam@digitalrealm.rw',
      phone: '+250 788 456 789',
      maxParticipants: 80,
      participants: 64,
      status: 'Upcoming',
      published: true,
      createdById: admin.id,
    },
  });

  console.log('✅ Events created:', event1.title, event2.title);

  const asset1 = await prisma.asset.create({
    data: {
      title: 'Warrior Character Pack',
      description: '3D character models for African warriors',
      type: '3D Model',
      project: 'Pixel Realm',
      thumbnailUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80',
      fileSize: '124 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      title: 'African City Tileset',
      description: '2D tileset for African urban environments',
      type: '2D Asset',
      project: 'Pixel Realm',
      thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80',
      fileSize: '56 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  console.log('✅ Assets created:', asset1.title, asset2.title);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
