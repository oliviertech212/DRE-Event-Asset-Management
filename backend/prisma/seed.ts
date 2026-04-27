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
      description: "Africa's premier esports championship returns for Season 3, featuring the best players across East and Central Africa competing in real-time strategy games. Hosted in Kigali, Rwanda — the heart of Africa's rising gaming scene. Join us for the most anticipated esports event in East Africa! Watch as elite players battle it out in intense real-time strategy matches, with live commentary, professional production, and exciting prizes.",
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
        'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
        'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
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
      description: "A 48-hour game development marathon where creators build games inspired by African stories, culture, and innovation. Teams compete for prizes while learning from industry mentors. Over 48 intense hours, developers, artists, designers, and storytellers will collaborate to create unique games that celebrate African narratives. With workshops, mentorship sessions, and networking opportunities, this jam is perfect for both beginners and experienced developers.",
      category: 'Game Jam',
      imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
        'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      ],
      startDate: '2026-07-12',
      endDate: '2026-07-14',
      time: '9:00 AM - 9:00 PM',
      location: 'Kigali',
      venue: 'Impact Hub Kigali',
      address: 'Norrsken House, KG 7 Ave, Kigali',
      email: 'gamejam@digitalrealm.rw',
      phone: '+250 788 456 789',
      website: 'https://gamejam.digitalrealm.rw',
      maxParticipants: 80,
      participants: 64,
      status: 'Upcoming',
      published: true,
      createdById: admin.id,
    },
  });

  const event3 = await prisma.event.create({
    data: {
      title: 'WPGA Conference — Immersive Africa',
      description: 'Experience the future of gaming with cutting-edge VR and XR technologies showcasing African innovation in immersive experiences. Discover how virtual and extended reality are transforming entertainment, education, and business across the continent.',
      category: 'VR / XR',
      imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
        'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80',
      ],
      startDate: '2026-08-03',
      endDate: '2026-08-03',
      time: '9:00 AM - 5:00 PM',
      location: 'Nairobi',
      venue: 'Nairobi Tech Hub',
      address: 'Westlands, Nairobi, Kenya',
      email: 'wpga@digitalrealm.rw',
      phone: '+254 700 123 456',
      website: 'https://wpga.digitalrealm.rw',
      maxParticipants: 200,
      participants: 150,
      status: 'Published',
      published: true,
      createdById: admin.id,
    },
  });

  const event4 = await prisma.event.create({
    data: {
      title: 'Game Dev Bootcamp — Unity for Africa',
      description: 'Learn game development with Unity engine in this intensive 3-day workshop designed for African developers. Master the fundamentals of game design, programming, and asset creation with hands-on projects and expert instructors.',
      category: 'Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      ],
      startDate: '2026-09-05',
      endDate: '2026-09-07',
      time: '10:00 AM - 4:00 PM',
      location: 'Online',
      venue: 'Virtual Workshop',
      address: 'Online Event',
      email: 'bootcamp@digitalrealm.rw',
      phone: '+250 788 999 888',
      website: 'https://bootcamp.digitalrealm.rw',
      maxParticipants: 50,
      participants: 40,
      status: 'Draft',
      published: false,
      createdById: admin.id,
    },
  });

  const event5 = await prisma.event.create({
    data: {
      title: 'Mobile Gaming Summit Africa 2026',
      description: 'The largest mobile gaming conference in Africa bringing together developers, publishers, and investors. Explore the booming mobile gaming market across the continent with keynotes, panels, and networking sessions.',
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1556438064-2d7646166914?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
        'https://images.unsplash.com/photo-1559028012-481c04fa702d?w=800&q=80',
      ],
      startDate: '2026-10-15',
      endDate: '2026-10-17',
      time: '9:00 AM - 6:00 PM',
      location: 'Lagos',
      venue: 'Eko Convention Centre',
      address: 'Victoria Island, Lagos, Nigeria',
      email: 'summit@digitalrealm.rw',
      phone: '+234 800 555 1234',
      website: 'https://mobilesummit.digitalrealm.rw',
      maxParticipants: 500,
      participants: 320,
      status: 'Published',
      published: true,
      createdById: admin.id,
    },
  });

  const event6 = await prisma.event.create({
    data: {
      title: 'Indie Game Showcase — African Stories',
      description: 'Celebrate independent game developers from across Africa showcasing their unique games and stories. Play demos, meet creators, and discover the next generation of African gaming talent.',
      category: 'Game Jam',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      ],
      startDate: '2026-11-08',
      endDate: '2026-11-10',
      time: '11:00 AM - 8:00 PM',
      location: 'Cape Town',
      venue: 'Cape Town International Convention Centre',
      address: 'Convention Square, Cape Town, South Africa',
      email: 'indie@digitalrealm.rw',
      phone: '+27 21 555 9876',
      website: 'https://indie.digitalrealm.rw',
      maxParticipants: 150,
      participants: 95,
      status: 'Upcoming',
      published: true,
      createdById: admin.id,
    },
  });

  const event7 = await prisma.event.create({
    data: {
      title: 'VR Arcade Launch — Accra Gaming Hub',
      description: 'Grand opening of West Africa\'s first dedicated VR gaming arcade featuring the latest virtual reality experiences, multiplayer arenas, and exclusive game launches. Free demos and special launch promotions.',
      category: 'VR / XR',
      imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=800&q=80',
        'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
      ],
      startDate: '2026-12-01',
      endDate: '2026-12-01',
      time: '12:00 PM - 10:00 PM',
      location: 'Accra',
      venue: 'Accra Gaming Hub',
      address: 'Osu, Accra, Ghana',
      email: 'vr@digitalrealm.rw',
      phone: '+233 30 444 5678',
      website: 'https://vr.digitalrealm.rw',
      maxParticipants: 300,
      participants: 0,
      status: 'Upcoming',
      published: true,
      createdById: admin.id,
    },
  });

  const event8 = await prisma.event.create({
    data: {
      title: 'Blockchain Gaming Workshop',
      description: 'Learn how to integrate blockchain technology and NFTs into your games. Explore play-to-earn mechanics, digital ownership, and the future of gaming economies with industry experts.',
      category: 'Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80',
      ],
      startDate: '2027-01-20',
      endDate: '2027-01-22',
      time: '10:00 AM - 5:00 PM',
      location: 'Online',
      venue: 'Virtual Workshop',
      address: 'Online Event',
      email: 'blockchain@digitalrealm.rw',
      phone: '+250 788 777 666',
      website: 'https://blockchain.digitalrealm.rw',
      maxParticipants: 100,
      participants: 45,
      status: 'Published',
      published: true,
      createdById: admin.id,
    },
  });

  const event9 = await prisma.event.create({
    data: {
      title: 'FIFA Tournament — East Africa Cup',
      description: 'Regional FIFA esports championship featuring the best FIFA players from Kenya, Uganda, Tanzania, and Rwanda. Compete for cash prizes and a spot in the continental finals.',
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
        'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      ],
      startDate: '2027-02-14',
      endDate: '2027-02-16',
      time: '10:00 AM - 8:00 PM',
      location: 'Kampala',
      venue: 'Kampala Serena Hotel',
      address: 'Kintu Road, Kampala, Uganda',
      email: 'fifa@digitalrealm.rw',
      phone: '+256 41 555 3333',
      website: 'https://fifa.digitalrealm.rw',
      maxParticipants: 64,
      participants: 58,
      status: 'Live',
      published: true,
      createdById: admin.id,
    },
  });

  const event10 = await prisma.event.create({
    data: {
      title: 'Women in Gaming Africa Conference',
      description: 'Empowering women in the African gaming industry through networking, mentorship, and skill-building workshops. Featuring successful female game developers, designers, and entrepreneurs.',
      category: 'Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
        'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
      ],
      startDate: '2027-03-08',
      endDate: '2027-03-08',
      time: '9:00 AM - 5:00 PM',
      location: 'Nairobi',
      venue: 'iHub Nairobi',
      address: 'Ngong Road, Nairobi, Kenya',
      email: 'women@digitalrealm.rw',
      phone: '+254 700 888 999',
      website: 'https://women.digitalrealm.rw',
      maxParticipants: 120,
      participants: 85,
      status: 'Published',
      published: true,
      createdById: admin.id,
    },
  });

  const event11 = await prisma.event.create({
    data: {
      title: 'Retro Gaming Festival — Arcade Classics',
      description: 'Celebrate the golden age of gaming with classic arcade machines, retro consoles, and nostalgic tournaments. Featuring Street Fighter, Pac-Man, and more legendary games.',
      category: 'Tournament',
      imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
        'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      ],
      startDate: '2027-04-10',
      endDate: '2027-04-12',
      time: '11:00 AM - 9:00 PM',
      location: 'Johannesburg',
      venue: 'The Zone @ Rosebank',
      address: 'Rosebank, Johannesburg, South Africa',
      email: 'retro@digitalrealm.rw',
      phone: '+27 11 555 4321',
      website: 'https://retro.digitalrealm.rw',
      maxParticipants: 200,
      participants: 145,
      status: 'Upcoming',
      published: true,
      createdById: admin.id,
    },
  });

  const event12 = await prisma.event.create({
    data: {
      title: 'AI in Game Development Masterclass',
      description: 'Advanced workshop on implementing artificial intelligence in games. Learn about procedural generation, NPC behavior, machine learning for game testing, and AI-driven narratives.',
      category: 'Workshop',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
        'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80',
      ],
      startDate: '2027-05-18',
      endDate: '2027-05-20',
      time: '9:00 AM - 4:00 PM',
      location: 'Kigali',
      venue: 'Carnegie Mellon University Africa',
      address: 'Kigali Innovation City, Rwanda',
      email: 'ai@digitalrealm.rw',
      phone: '+250 788 555 444',
      website: 'https://ai.digitalrealm.rw',
      maxParticipants: 40,
      participants: 32,
      status: 'Draft',
      published: false,
      createdById: admin.id,
    },
  });

  console.log('✅ Events created:', event1.title, event2.title, event3.title, event4.title, event5.title, event6.title, event7.title, event8.title, event9.title, event10.title, event11.title, event12.title);

  const asset1 = await prisma.asset.create({
    data: {
      title: 'Warrior Character Pack',
      description: 'High-quality 3D character models featuring African warriors with authentic cultural details, animations, and customizable armor sets. Perfect for action games, RPGs, and historical simulations.',
      type: '3D Model',
      project: 'Pixel Realm',
      thumbnailUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.zip',
      fileSize: '124 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  const asset2 = await prisma.asset.create({
    data: {
      title: 'African City Tileset',
      description: '2D tileset collection for creating vibrant African urban environments with markets, buildings, streets, and cultural landmarks. Includes day and night variations with multiple color palettes.',
      type: '2D Asset',
      project: 'Pixel Realm',
      thumbnailUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.zip',
      fileSize: '56 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  const asset3 = await prisma.asset.create({
    data: {
      title: 'VR Training Env — Hospital',
      description: 'Immersive VR training environment simulating a fully equipped hospital facility for medical education and emergency response training. Features interactive equipment and realistic scenarios.',
      type: 'XR Asset',
      project: 'Realm XR',
      thumbnailUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.zip',
      fileSize: '880 MB',
      status: 'Draft',
      published: false,
      createdById: admin.id,
    },
  });

  const asset4 = await prisma.asset.create({
    data: {
      title: 'Afro Beats Soundtrack',
      description: 'Original Afrobeat music collection featuring traditional and modern African rhythms, perfect for game soundtracks, menus, and action sequences. Includes 15 high-quality tracks.',
      type: 'Audio',
      project: 'Realm Games',
      thumbnailUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.mp3',
      fileSize: '18 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  const asset5 = await prisma.asset.create({
    data: {
      title: 'Savanna Wildlife Pack',
      description: 'Complete 3D animal pack featuring African wildlife including lions, elephants, giraffes, and zebras with realistic animations and behaviors for nature simulation games.',
      type: '3D Model',
      project: 'Wildlife Sim',
      thumbnailUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.zip',
      fileSize: '256 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  const asset6 = await prisma.asset.create({
    data: {
      title: 'Kente Pattern Library',
      description: 'Authentic Kente cloth patterns and textures for character customization, environmental design, and UI elements. Includes over 50 traditional patterns with cultural significance.',
      type: '2D Asset',
      project: 'Cultural Assets',
      thumbnailUrl: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=400&q=80',
      assetUrl: 'https://res.cloudinary.com/demo/raw/upload/sample.zip',
      fileSize: '42 MB',
      status: 'Active',
      published: true,
      createdById: admin.id,
    },
  });

  console.log('✅ Assets created:', asset1.title, asset2.title, asset3.title, asset4.title, asset5.title, asset6.title);

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
