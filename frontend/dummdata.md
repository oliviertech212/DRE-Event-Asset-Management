const events = [
  {
    id: 'evt-2026-003',
    title: 'Swahili Esports Champions Season 3',
    category: 'ESPORTS TOURNAMENT',
    status: 'Live',
    statusColor: 'bg-green-500',
    date: 'Jun 25 — 29, 2026',
    location: 'Kigali',
    participants: 128,
    gradient: 'from-purple-900/40 to-purple-600/20',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80'
  },
  {
    id: 'evt-2026-004',
    title: 'Game Jam Kigali 2026 — African Worlds',
    category: 'GAME JAM',
    status: 'Upcoming',
    statusColor: 'bg-blue-500',
    date: 'Jul 12 — 14, 2026',
    location: 'Kigali',
    participants: 64,
    gradient: 'from-teal-900/40 to-teal-600/20',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80'
  },
  {
    id: 'evt-2026-005',
    title: 'WPGA Conference — Immersive Africa',
    category: 'VR / XR EXPERIENCE',
    status: 'Published',
    statusColor: 'bg-yellow-500',
    date: 'Aug 3, 2026',
    location: 'Nairobi',
    participants: 200,
    gradient: 'from-green-900/40 to-green-700/20',
    imageUrl: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80'
  },
  {
    id: 'evt-2026-006',
    title: 'Game Dev Bootcamp — Unity for Africa',
    category: 'WORKSHOP',
    status: 'Draft',
    statusColor: 'bg-gray-500',
    date: 'Sep 5 — 7, 2026',
    location: 'Online',
    participants: 40,
    gradient: 'from-orange-900/40 to-orange-700/20',
    imageUrl: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=800&q=80'
  }
]

const assets = [
  {
    id: 'asset-001',
    title: 'Warrior Character Pack',
    type: '3D Model',
    project: 'Pixel Realm',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '124 MB',
    icon: Wand2,
    bgColor: 'bg-gradient-to-br from-amber-900/20 to-amber-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=400&q=80'
  },
  {
    id: 'asset-002',
    title: 'African City Tileset',
    type: '2D Asset',
    project: 'Pixel Realm',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '56 MB',
    icon: ImageIcon,
    bgColor: 'bg-gradient-to-br from-blue-900/20 to-blue-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&q=80'
  },
  {
    id: 'asset-003',
    title: 'VR Training Env — Hospital',
    type: 'XR Asset',
    project: 'Realm XR',
    status: 'Draft',
    statusColor: 'bg-gray-500',
    size: '880 MB',
    icon: Globe,
    bgColor: 'bg-gradient-to-br from-teal-900/20 to-teal-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?w=400&q=80'
  },
  {
    id: 'asset-004',
    title: 'Afro Beats Soundtrack',
    type: 'Audio',
    project: 'Realm Games',
    status: 'Active',
    statusColor: 'bg-[#ff8c42]',
    size: '18 MB',
    icon: Music,
    bgColor: 'bg-gradient-to-br from-purple-900/20 to-purple-700/10',
    imageUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80'
  }
]


const eventData: Record<string, any> = {
  'evt-2026-003': {
    title: 'Swahili Esports Champions Season 3',
    category: 'Esports tournament',
    status: 'Live',
    statusColor: 'bg-green-500',
    startDate: 'Jun 25, 2026',
    endDate: 'Jun 29, 2026',
    time: '10:00 AM - 6:00 PM',
    location: 'Kigali Convention Centre',
    address: 'KN 4 Ave, Kigali, Rwanda',
    gameType: 'Real-Time Strategy',
    description: "Africa's premier esports championship returns for Season 3, featuring the best players across East and Central Africa competing in real-time strategy games. Hosted in Kigali, Rwanda — the heart of Africa's rising gaming scene.",
    fullDescription: "Join us for the most anticipated esports event in East Africa! The Swahili Esports Champions Season 3 brings together the region's top gaming talent for an unforgettable tournament experience. Watch as elite players battle it out in intense real-time strategy matches, with live commentary, professional production, and exciting prizes. Whether you're a hardcore gamer or just curious about the esports scene, this event promises entertainment, community, and the celebration of African gaming culture.",
    participants: 128,
    capacity: 192,
    eventId: 'EVT-2026-003',
    createdBy: 'Olivier G.',
    createdAt: 'Apr 20, 2026',
    lastUpdated: 'Apr 25, 2026',
    email: 'events@digitalrealm.rw',
    phone: '+250 788 123 456',
    website: 'https://digitalrealm-entertainment.com',
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&q=80',
      'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&q=80',
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
    ],
    gradient: 'from-purple-900/40 to-purple-600/20'
  },
  'evt-2026-004': {
    title: 'Game Jam Kigali 2026 — African Worlds',
    category: 'Game Jam',
    status: 'Upcoming',
    statusColor: 'bg-blue-500',
    startDate: 'Jul 12, 2026',
    endDate: 'Jul 14, 2026',
    time: '9:00 AM - 9:00 PM',
    location: 'Impact Hub Kigali',
    address: 'Norrsken House, KG 7 Ave, Kigali',
    gameType: 'Game Development',
    description: "A 48-hour game development marathon where creators build games inspired by African stories, culture, and innovation. Teams compete for prizes while learning from industry mentors.",
    fullDescription: "Game Jam Kigali 2026 is where creativity meets culture! Over 48 intense hours, developers, artists, designers, and storytellers will collaborate to create unique games that celebrate African narratives. With workshops, mentorship sessions, and networking opportunities, this jam is perfect for both beginners and experienced developers. Join us to push your creative boundaries, learn new skills, and be part of a movement that's putting African game development on the global map.",
    participants: 64,
    capacity: 80,
    eventId: 'EVT-2026-004',
    createdBy: 'Sarah M.',
    createdAt: 'May 10, 2026',
    lastUpdated: 'May 15, 2026',
    email: 'gamejam@digitalrealm.rw',
    phone: '+250 788 456 789',
    website: 'https://gamejam.digitalrealm.rw',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80',
      'https://images.unsplash.com/photo-1556438064-2d7646166914?w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    ],
    gradient: 'from-teal-900/40 to-teal-600/20'
  }
}