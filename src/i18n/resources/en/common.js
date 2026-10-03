const enCommon = {
  languageSwitcher: {
    en: 'EN',
    es: 'ES',
  },
  header: {
    logoAlt: 'Guayaera In Paradise 4',
    home: 'Home',
    divisions: 'Divisions',
    sponsors: 'Sponsors',
    hotel: 'Hotel',
    schedule: 'Schedule',
    workout: 'Workouts',
    raffle: 'Enter the Raffle',
    registerNow: 'Register Now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
  },
  footer: {
    logoAlt: 'Guayaera In Paradise 4',
    description:
      'The premier functional fitness competition in paradise. Test your limits, forge new friendships, and experience the ultimate throwdown.',
    quickLinks: 'Quick Links',
    divisions: 'Divisions',
    workouts: 'Workouts',
    sponsors: 'Sponsors',
    contactLocation: 'Contact & Location',
    instagramLabel: 'Instagram',
    locationText:
      'Hyatt Regency Grand Reserve Puerto Rico. Highway 955-I, Rio Grande, PR 00745',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    copyright: '© 2026 Guayaera In Paradise. All rights reserved.',
  },
  home: {
    common: {
      currency: 'USD',
      originalPrice: 'Original Price',
    },
    hero: {
      backgroundAlt: 'CrossFit Athlete',
      tagline: 'The Island Becomes Your Arena',
      countdown: {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Mins',
        seconds: 'Secs',
      },
      primaryCta: 'Secure Your Spot',
      secondaryCta: 'Event Details',
    },
    about: {
      eyebrow: 'The Event',
      titleLineOne: 'Welcome To',
      titleLineTwo: 'The Island',
      description:
        'Guayaera in Paradise 4 is a premier multi-day fitness experience that combines competition, community, and lifestyle in a world-class destination. Hosted at the Hyatt Regency Grand Reserve Puerto Rico, the event transforms the entire resort into a high-energy fitness festival where athletes from Puerto Rico and abroad compete across multiple divisions in a professionally organized environment.',
      detailsCta: 'View Full Event Experience',
      galleryCtaTitle: 'Relive Guayaera 3',
      galleryCtaSubtitle: "Experience last year's energy",
      experienceTitle: 'Event Experience',
      experienceItems: [
        'Multiple competitive events and categories',
        'Vendor and brand activation areas',
        'Community-focused activities and seminars',
        'Wellness experiences and recovery zones',
        'Social events connecting athletes, brands, and spectators',
      ],
      tyr: {
        title: 'TYR Package',
        noteLabel: '(individual event only)',
        items: [
          'TYR T-shirt',
          'TYR shoes',
          'TYR sweat bands',
          'Shorts (first 200 athletes)',
        ],
        note:
          'Note: Sizes cannot be changed after purchase. If registration is transferred, the package remains assigned to the original registrant.',
      },
      schedule: {
        title: 'Event Schedule',
        items: [
          { day: 'Thursday Dec 3', description: 'Seminars and activities' },
          { day: 'Friday Dec 4', description: 'Seminars and fun race (5PM)' },
          { day: 'Saturday Dec 5', description: 'Individual Event' },
          { day: 'Sunday Dec 6', description: 'Teams Event' },
        ],
      },
      facts: {
        date: 'Dec 04, 2026',
        venue: 'Hyatt Regency Grand Reserve',
        licensedEvent: 'Licensed Event',
        elitePrizes: 'Elite Prizes',
      },
      carouselAlt: 'Event Action {{number}}',
      carouselSlideLabel: 'Slide {{number}}',
      yearBadge: 'YEAR 4',
    },
    divisions: {
      eyebrow: 'Categories',
      titlePrefix: 'Choose Your',
      titleHighlight: 'Division',
      earlyBirdBadge: 'Early Bird 16% Off',
      moreInfo: 'More Info',
      dotLabel: 'Go to division {{number}}',
      cards: {
        rx: {
          title: 'RX',
          description:
            'For elite competitors who can handle any movement and heavy loads as prescribed.',
          features: ['Muscle Ups (Ring/Bar)', 'Handstand Walks', 'Heavy Olympic Lifts'],
        },
        intermediate: {
          title: 'Intermediate',
          description:
            'Proficient in most movements but may struggle with high volume high-skill gymnastics.',
          features: ['Pull-ups / T2B', 'HSPU (Kipping)', 'Moderate Loads'],
        },
        beginners: {
          title: 'Beginners',
          description:
            'First time competing? This is for you. Focus on fun, effort, and simple mechanics.',
          features: ['Ring Rows', 'Single Unders', 'Lighter Loads'],
        },
        scale: {
          title: 'Scale',
          description:
            'Intermediate level modified for accessibility. Less complex movements, challenging weights.',
          features: ['Modified Gymnastics', 'Light Olympic Lifts', 'Scaled Volume'],
        },
        masters3944: {
          title: 'Masters 39-44',
          description:
            'For experienced competitors aged 39-44 ready to bring the heat with heavy loads.',
          features: ['Age Verified (39-44)', 'Prescribed Weights', 'Advanced Gymnastics'],
        },
        masters45plus: {
          title: 'Masters 45+',
          description:
            'For veteran athletes 45 and over. Scaling options available for complex movements.',
          features: ['Age Verified (45+)', 'Modified Weights', 'Adjusted Volume'],
        },
      },
    },
    workouts: {
      eyebrow: 'The Tests',
      title: 'Workouts',
      comingSoon: 'Are Here',
      description:
        'Official events, scoring and standards are now published. Study the workouts and prepare.',
      cta: 'View Official Workouts',
    },
    register: {
      eyebrow: 'Registration Open',
      title: 'Secure Your Spot',
      individual: {
        badge: 'Early Bird 16% Off',
        title: 'Individual',
        subtitle: 'All individual divisions included',
        divisions: ['RX', 'Intermediate', 'Beginners', 'Scale', 'Masters'],
        packageTitle: 'TYR package includes:',
        packageItems: [
          'TYR T-shirt of the event',
          'TYR shoes',
          'TYR sweat bands',
          'Short pants (first 200 athletes that register)',
        ],
        notes: [
          'Only for individual event',
          'Sizes cannot be changed after purchase. If registration is transferred, the package remains assigned to the original registrant.',
          'All sales are final. No refunds.',
        ],
        cta: 'Register Individual',
      },
      team: {
        popularBadge: 'Most Popular',
        title: 'Teams',
        subtitle: 'Mixed Sex (MM/FF) (Sunday Event)',
        divisions: ['RX', 'Intermediate', 'Beginners', 'Teens', 'Masters'],
        badge: 'Early Bird 37% Off',
        paymentLabel: 'Full Payment',
        formatTitle: 'Team Competition Format',
        formatItems: [
          'Mixed Sex Teams (MM/FF)',
          'Multiple divisions available',
          'High-level competitive environment',
          'Official judging and structured format',
        ],
        cta: 'Register Team',
      },
      raffleEyebrow: 'Also Happening',
      raffleCta: 'Enter the Raffle',
    },
    sponsors: {
      eyebrow: 'Supported By The Best',
      description: 'Proud partners powering Guayaera in Paradise 4',
      premierBadge: 'Premier Sponsor',
      cta: 'Meet Our Featured Partners',
      spotlightTitle: 'Premier Sponsor',
      spotlightDescription:
        'Recognized as a leading sponsor of Guayaera in Paradise 4.',
    },
  },
  workouts: {
    hero: {
      eyebrow: 'Official Workouts',
      title: 'The Workouts Are Here.',
      description:
        'Official events, scoring, standards and competition details for Guayaera in Paradise 4.',
      line: 'EVENT RULES • STANDARDS • SCORING',
    },
    quickLinks: {
      label: 'Jump to',
      event1: 'Event 01',
      event2: 'Event 02',
    },
    labels: {
      event: 'Event',
      location: 'Location',
      timeCap: 'Time Cap',
      scoring: 'Scoring',
      format: 'Format',
      score: 'Score',
      standards: 'Movement Standards',
      showStandards: 'View standards',
      hideStandards: 'Hide standards',
      tieBreakers: 'Tie-Breakers',
      weightsTitle: 'Loads by Division',
      weightsNote:
        'Loads are listed exactly as published. No units or sex assignments are stated for the pairs.',
      division: 'Division',
      load: 'Load',
      flow: 'Event Flow',
      partialNote:
        'This event reflects the complete official document (pages 1 and 2): format, yoke loads, movement standards, team rules and scoring. Any official updates will be published here.',
      minutes: 'min',
    },
    event1: {
      number: '01',
      name: 'A HEAVY PUSH WALK',
      location: 'El Yunque Salón',
      timeCap: 'Total cap 8 minutes',
      scoring: 'Double scoring',
      summary:
        'Two scored parts in one 8-minute window: a heavy bench press for 2 unbroken reps, then a yoke carry for max distance.',
      partA: {
        label: 'Part A',
        title: 'Bench Press',
        duration: '4 min',
        description:
          'At GO, perform 2 unbroken reps with the heaviest possible load.',
        score:
          'Heaviest successful load for 2 unbroken reps within 4 minutes.',
        standards: [
          'Athlete chooses the starting weight.',
          'Feet stay on the floor at all times, never on the bench or in the air.',
          'The bar touches the chest, then reaches full elbow extension on each rep.',
          'Glutes and shoulder blades stay in contact with the bench.',
          'No excessive powerlifting arch.',
          'No assistance. A spotter touching the bar invalidates the attempt.',
        ],
      },
      transition: {
        label: 'Transition',
        duration: '2 min',
        description:
          'At minute 4, unload and remove the bar from the rack, adjust the yoke crossbar to shoulder height or preference, and be ready for Part B at minute 6.',
      },
      partB: {
        label: 'Part B',
        title: 'Yoke Carry',
        duration: '2 min',
        description:
          'Carry the yoke on the shoulders, or in the assigned position for your division, in 25-ft shuttles.',
        score: 'Greatest distance covered in 2 minutes.',
        standards: [
          'No dragging, pushing or uncontrolled dropping of the yoke.',
          'The front of the yoke determines whether the 25-ft line has been reached.',
          'A full 25-ft segment must be completed to receive credit.',
        ],
      },
      tieBreakers: [
        'Part A ties are broken by the Part B result.',
        'Part B ties are broken by the Part A result.',
      ],
      weights: [
        { division: 'Beginners', load: '250 / 190' },
        { division: 'Scale', load: '310 / 250' },
        { division: 'Intermedio', load: '370 / 290' },
        { division: '38–44 Master', load: '370 / 290' },
        { division: '45+ Master', load: '310 / 250' },
        { division: 'RX', load: '250 / 150' },
      ],
      rxNote: 'RX must perform the carry overhead, above the head.',
    },
    event2: {
      number: '02',
      name: 'A HEAVY WALK BETWEEN FRIENDS',
      badge: 'Sunday Teams Event',
      format: '4 athletes (MM/FF)',
      timeCap: '15 min',
      scoring: '2 scores',
      summary:
        'Same-sex pairs split the work: one pair accumulates calories on the Echo Bike while the other moves through double unders and Zercher yoke carries, swapping every round.',
      partA: {
        label: 'Part A',
        title: 'Echo Bike',
        duration: '15 min',
        description:
          'Same-sex pairs: one MM pair and one FF pair. The MM pair starts on the bike to maximize total calories. Once the FF pair completes its DU / Zercher carry round, the pairs swap.',
        score:
          'Total calories accumulated on the Echo Bike during the 15-minute event.',
      },
      partB: {
        label: 'Part B',
        title: '6 Rounds For Time',
        duration: 'FF starts',
        description:
          'Each round, in order: 100 Double Unders (DU) or 200 Single Unders (SU), then four 25-ft Zercher yoke carry segments (100 ft per round). MM and FF alternate through all 6 rounds.',
        score:
          'Time to complete all 6 rounds; if the team does not finish, score the total repetitions completed.',
        rounds: [
          { label: 'Each round', value: '100 DU or 200 SU' },
          { label: 'Then', value: '4 × 25-ft Zercher yoke carry (100 ft)' },
        ],
      },
      flow: [
        'FF pair starts Part B while the MM pair is on the bike.',
        'Pairs swap after each completed round.',
        'FF completes rounds 1, 3 and 5. MM completes rounds 2, 4 and 6.',
        'After finishing Part B, that pair may join the bike until minute 15.',
      ],
      tieBreakers: [
        'Part A ties are broken by the Part B result.',
        'Part B ties are broken by the Part A result.',
      ],
      fullRules: {
        eyebrow: 'Official Document · Page 2',
        showLabel: 'View Full Standards & Rules',
        hideLabel: 'Hide Full Standards & Rules',
        showShort: 'Expand',
        hideShort: 'Collapse',
        intro:
          'Yoke loads, movement standards, team rules and the official scoring summary for A Heavy Walk Between Friends.',
        sections: {
          weights: 'Yoke Weights',
          yoke: 'Zercher Yoke Carry Standard',
          jumps: 'Double-Unders / Single-Unders Standard',
          rules: 'Team WOD Rules',
          scoring: 'Scoring Summary',
        },
        weights: {
          title: 'Yoke Weights by Division',
          division: 'Division',
          male: 'Masc.',
          female: 'Fem.',
          rows: [
            { division: 'Beginner', male: '250', female: '190' },
            { division: 'Scale', male: '310', female: '250' },
            { division: 'Intermedio', male: '370', female: '290' },
            { division: 'Master 40+', male: '310', female: '250' },
            { division: 'RX', male: '400', female: '310' },
          ],
        },
        yokeStandard: {
          title: 'Zercher Yoke Carry',
          subtitle: 'Standard',
          items: [
            'The yoke may only be carried in the Zercher position.',
            'Athletes are responsible for setting the crossbar to their preferred height before the workout begins.',
            'Each segment is 25 feet. One round requires 4 segments, for a total of 100 feet.',
            'The front of the yoke will be used as the reference point and must completely cross the line for each 25-foot segment to count.',
          ],
        },
        jumpsStandard: {
          title: 'Double-Unders / Single-Unders',
          subtitle: 'Standard',
          items: [
            'The jumps must be performed inside the marked floor area corresponding to the current round: RD1, RD2, RD3, RD4, RD5 or RD6.',
            'Both athletes in the pair may divide the double-unders or single-unders however they choose and may use their preferred strategy.',
          ],
        },
        teamRules: {
          title: 'Team WOD Rules',
          items: [
            'On the Echo Bike, athletes may switch as often as they choose and use their preferred strategy.',
            'Athletes may not touch the bike monitor at any time.',
            'Pairs may only switch stations after the pair working on the DU/SU and Zercher Yoke Carry has completed its round.',
            'When switching stations, the team is responsible for removing or adding the necessary weight for the pair entering the yoke station.',
            'Part B is won by completing all 6 rounds in the shortest time. If no team finishes, ranking is determined by the greatest number of repetitions completed within the 15-minute time cap.',
            'The FF pair begins the workout in Part B. The pairs must alternate every round throughout all 6 rounds.',
            'If the team completes the sixth round before the time cap, the pair that finished Part B may join the pair on the Echo Bike and continue using any strategy they choose until minute 15.',
          ],
        },
        scoringSummary: {
          title: 'Official Scoring Summary',
          partA: {
            label: 'Part A',
            text: 'Total calories accumulated on the Echo Bike during the 15-minute event.',
          },
          partB: {
            label: 'Part B',
            text: 'Time to complete all 6 rounds; if the team does not finish, score the total repetitions completed.',
          },
        },
      },
    },
    footer: {
      title: 'Ready to compete?',
      description:
        'Secure your spot and start preparing for the official Guayaera in Paradise 4 events.',
      registerCta: 'Register Now',
      scheduleCta: 'View Schedule',
    },
  },
  gallery: {
    momentAlt: 'Guayaera in Paradise 3 moment',
    viewMoment: 'View Moment',
    eyebrow: 'Gallery',
    titlePrefix: 'Guayaera In',
    titleHighlight: 'Paradise 3',
    subtitle: 'Relive the experience',
    description:
      'A look back at the energy, competition, community, and unforgettable moments from Guayaera in Paradise 3.',
    closeLightbox: 'Close Lightbox',
    expandedAlt: 'Expanded gallery view',
  },
  schedule: {
    eyebrow: 'Event Schedule',
    titlePrefix: 'Schedule',
    titleHighlight: 'Coming Soon',
    subtitle:
      'The full Guayaera in Paradise 4 schedule will be released closer to the event.',
    description:
      "We're preparing a complete weekend lineup with seminars, activities, competition days, and community experiences. Stay tuned for official updates.",
    teaserDays: [
      { day: 'Thursday', date: 'Dec 3', title: 'Seminars & Activities' },
      { day: 'Friday', date: 'Dec 4', title: 'Seminars & Fun Race' },
      { day: 'Saturday', date: 'Dec 5', title: 'Individual Event' },
      { day: 'Sunday', date: 'Dec 6', title: 'Teams Event' },
    ],
    backCta: 'Back to Event Details',
    registerCta: 'Register Now',
  },
  featuredPartners: {
    hero: {
      eyebrow: 'Featured Partners',
      titlePrefix: 'Meet Our',
      titleHighlight: 'Premier',
      titleSuffix: 'Brand Partners',
      subtitle:
        'A closer look at selected featured brands helping elevate the Guayaera in Paradise 4 experience.',
      description:
        'Guayaera in Paradise is supported by a strong community of sponsors and partners. This page highlights a deeper look into our featured brand partners, their story, presence, and connection to the event.',
    },
    common: {
      visitWebsite: 'Visit Website',
      follow: 'Follow',
    },
    viva: {
      titlePrefix: 'Viva La',
      titleHighlight: 'Fitness',
      description:
        'A featured brand partner of Guayaera in Paradise 4, bringing energy, identity, and community presence to the event experience.',
    },
    vitaSport: {
      titlePrefix: 'Vita',
      titleHighlight: 'Sport',
      description:
        'A premier partner supporting the athletes, spectators, and lifestyle experience behind Guayaera in Paradise 4.',
    },
    hyundai: {
      titlePrefix: 'Hyundai de',
      titleHighlight: 'Guaynabo',
      description:
        'Official automotive partner supporting the Guayaera in Paradise 4 experience. Hyundai de Guaynabo joins Guayaera in Paradise 4 as a featured partner, supporting the event experience and the community behind one of Puerto Rico’s most exciting fitness competitions.',
    },
    closing: {
      title: 'Thank You to Our Partners',
      description:
        'Guayaera in Paradise 4 is made possible through the support of brands, communities, and partners that believe in the event experience.',
      cta: 'Back to Sponsors',
    },
  },
  hotel: {
    galleryAlt: 'Venue view {{number}}',
    hero: {
      eyebrow: 'Official Venue',
      titlePrefix: 'Hyatt Regency Grand Reserve',
      titleHighlight: 'Puerto Rico',
      subtitle: 'Your event destination in paradise.',
      description:
        'Experience Guayaera in Paradise 4 at the Hyatt Regency Grand Reserve Puerto Rico — a world-class resort setting where competition, community, and island lifestyle come together.',
      stayCta: 'Book Your Stay',
      dayPassCta: 'Explore Day Pass',
      galleryCta: 'View Gallery',
    },
    dayPass: {
      eyebrow: 'Ticket Inclusions',
      titlePrefix: 'Your Ticket Includes',
      titleHighlight: 'Day Pass Access',
      description:
        'Your event ticket works as a day pass for access to the Hyatt Regency Grand Reserve Puerto Rico during the event. Guests can enjoy the resort atmosphere while being part of the Guayaera in Paradise experience.',
      items: [
        'Pool access',
        'Resort facilities',
        'Event areas',
        'Food and beverage areas',
        'Common guest areas',
        'Resort atmosphere',
        'Beach/resort environment',
        'Guayaera event experience',
      ],
      noteLabel: 'Important Note:',
      note:
        'Day pass access includes resort facilities and event areas. Motorized sports are not included.',
    },
    experience: {
      titlePrefix: 'A Resort Built for the',
      titleHighlight: 'Experience',
      description:
        'The Hyatt Regency Grand Reserve Puerto Rico offers a relaxing and elevated setting for athletes, teams, families, and spectators.',
      cards: [
        {
          title: 'Resort Atmosphere',
          description:
            'Enjoy a clean, tropical environment designed for connection.',
        },
        {
          title: 'Steps From Action',
          description:
            'Stay close to competition, event activities, and community moments.',
        },
        {
          title: 'Athletes & Guests',
          description:
            'Space to recover, enjoy, and experience Puerto Rico in style.',
        },
      ],
      stayCta: 'Book Your Stay',
    },
    gallery: {
      titlePrefix: 'Explore the',
      titleHighlight: 'Venue',
      badge: 'Premium Gallery',
      closeLabel: 'Close expanded venue photo',
      expandedAlt: 'Expanded venue view',
    },
  },
  raffle: {
    hero: {
      eyebrow: 'Guayaera Raffle',
      titlePrefix: 'Enter the',
      titleHighlight: 'Guayaera',
      titleSuffix: 'Experience',
      subtitle:
        'Purchase your raffle entry and receive an official reservation number with QR validation by email.',
      description:
        'Each valid purchase will receive a unique reservation number and a private QR validation link.',
      button: 'Buy Raffle Ticket',
      redirecting: 'Redirecting...',
      checkoutError:
        'Sorry, we could not start checkout. Please try again.',
      previewBadge: 'Official Raffle Entry',
      reservationLabel: 'Reservation #',
      validStatus: 'Status: Valid Entry',
      validationIncluded: 'QR Validation Included',
      previewNote:
        '* Visual preview only. Reservation numbers are generated after a valid purchase.',
    },
    process: {
      eyebrow: 'The Process',
      titlePrefix: 'How It',
      titleHighlight: 'Works',
      steps: [
        'Purchase your raffle entry',
        'Receive your confirmation email',
        'Get your reservation number and QR validation',
        'Keep your entry for the official raffle announcement',
      ],
    },
    receive: {
      eyebrow: 'Included',
      titlePrefix: 'What You',
      titleHighlight: 'Receive',
      items: [
        'Official raffle entry',
        'Unique reservation number',
        'QR validation link',
        'Email confirmation',
        'Valid entry status',
      ],
    },
    prizes: {
      eyebrow: 'The Rewards',
      titlePrefix: 'Raffle',
      titleHighlight: 'Prizes',
      description:
        'One entry. Three chances to win exclusive Guayaera in Paradise experiences.',
      priceBadge: 'only $10 for entry',
      firstPrizeLabel: 'first prize',
      secondPrizeLabel: 'second prize',
      thirdPrizeLabel: 'third prize',
      vipExperience: 'VIP experience',
      firstPrizeTitle: 'Weekend stay for 2 people',
      firstPrizeItems: [
        'From December 4 to 6',
        'VIP entry to all Guayaera events',
        'Free parking',
        'Breakfast included',
      ],
      vipPassLabel: 'VIP PASS',
      vipPassValue: 'INCLUDED',
      secondPrizeTitle: '$300 certificate from Viva La Fitness',
      secondPrizeItems: [
        'Must be used during the event',
        'Includes official event T-shirt',
      ],
      secondPrizeBadge: 'Official merch',
      thirdPrizeTitle: 'Recovery Weekend Pass + Photo Package',
      thirdPrizeItems: [
        '1 Recovery Pass (B-One Wellness)',
        '1 Photo package (Noidstill)',
        'Photos at the hotel facilities',
      ],
      endingNote: '* Raffle ends August 30.',
      button: 'Buy Raffle Ticket',
      redirecting: 'Redirecting...',
    },
    notes: {
      title: 'Important Notes',
      first:
        'All raffle entries are subject to official rules and validation. Each valid purchase receives one unique reservation number and QR validation link by email.',
      second: 'Please keep your confirmation email for your records.',
    },
    finalCta: {
      title: 'Ready to Enter?',
      description:
        'Purchase your raffle entry and receive your official confirmation by email.',
      button: 'Buy Raffle Ticket',
      redirecting: 'Redirecting...',
    },
    errors: {
      checkoutSession: 'Unable to create checkout session',
    },
  },
  raffleValidation: {
    titleStates: {
      loading: { prefix: 'Validating', highlight: 'Entry' },
      invalid: { prefix: 'Invalid Raffle', highlight: 'Entry' },
      cancelled: { prefix: 'Entry', highlight: 'Cancelled' },
      valid: { prefix: 'Valid Raffle', highlight: 'Entry' },
    },
    badgeStates: {
      loading: 'Checking',
      invalid: 'Invalid Entry',
      cancelled: 'Cancelled',
      valid: 'Valid Entry',
    },
    eyebrow: 'Raffle Validation',
    loadingTitle: 'Checking validation...',
    loadingDescription:
      'Please wait while we verify this raffle entry.',
    errorTitle: 'Validation Error',
    errorMessage:
      'We could not validate this raffle entry right now. Please try again later.',
    notFoundTitle: 'Entry Not Found',
    notFoundDescription:
      'This raffle entry could not be found in the Guayaera in Paradise validation system.',
    reservationLabel: 'Reservation Number',
    statusLabel: 'Status',
    cancelledEntry: 'Cancelled Entry',
    validEntry: 'Valid Entry',
    purchaseDateLabel: 'Purchase Date',
    validationCodeLabel: 'Validation Code',
    pageDescription:
      'This page confirms whether this raffle entry exists in the Guayaera in Paradise validation system.',
    backCta: 'Back to Raffle',
  },
};

export default enCommon;
