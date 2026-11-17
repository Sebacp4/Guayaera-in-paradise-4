// Official Guayaera in Paradise 4 weekend itinerary.
// Activity and brand names are kept exactly as published. Only generic
// descriptive labels have an English equivalent ({ es, en }).

const BOTH_ACD = { es: 'Local A, C y D', en: 'Local A, C & D' };

export const itineraryDays = [
  {
    id: 'thursday',
    dayNumber: '03',
    accent: '#01C9CF',
    activities: [
      { start: '8:00 AM', end: '6:00 PM', name: { es: 'Montaje de evento', en: 'Event Setup' }, location: 'Everywhere' },
      { start: '7:00 PM', end: '9:00 PM', name: 'Neon Season by Harpelini', location: 'Local G' },
      { start: '8:00 PM', end: '11:00 PM', name: 'Guayaera Happy Hour', location: 'Local 4' },
    ],
  },
  {
    id: 'friday',
    dayNumber: '04',
    accent: '#EB459A',
    activities: [
      { start: '9:00 AM', end: '10:00 AM', name: 'Purpose Beach WOD', location: 'Local C' },
      { start: '10:00 AM', end: '6:00 PM', name: { es: 'Check in atletas', en: 'Athlete Check-in' }, location: 'Local D' },
      { start: '12:00 PM', end: '1:00 PM', name: 'B-One Seminar: Cuando tu cuerpo llama', location: 'Local I' },
      { start: '1:00 PM', end: '1:45 PM', name: 'LogiqFit Seminar', location: 'Local I' },
      { start: '2:00 PM', end: '2:45 PM', name: 'Zummer Seminar', location: 'Local I' },
      { start: '3:00 PM', end: '3:45 PM', name: 'Entrenar, adaptar y Empoderar by Yaliz', location: 'Local I' },
      { start: '3:00 PM', end: '10:00 PM', name: 'Vendors Village Opens', location: 'Local B' },
      { start: '3:00 PM', end: '6:00 PM', name: 'Floater Opens', location: 'Local B' },
      { start: '3:00 PM', end: '6:00 PM', name: 'Corona Cervezero Row', location: 'Local A' },
      { start: '6:30 PM', end: '7:15 PM', name: '3K Fun Race', location: 'Local H' },
      { start: '7:15 PM', end: '11:00 PM', name: 'Welcome Guayaera Party', location: 'Local A', featured: true },
    ],
  },
  {
    id: 'saturday',
    dayNumber: '05',
    accent: '#EB7A4B',
    activities: [
      { start: '6:30 AM', end: '5:30 PM', name: 'Guayaera Individual CrossFit Event', location: BOTH_ACD, featured: true },
      { start: '7:00 AM', end: '7:00 PM', name: 'Vendors Village Opens', location: 'Local B' },
      { start: '8:30 AM', end: '9:15 AM', name: 'Move in Yoga by Resilient', location: 'Local I' },
      { start: '9:00 AM', end: '1:00 PM', name: 'Floater Opens', location: 'Local B' },
      { start: '9:45 AM', end: '10:30 AM', name: 'Move in PILATES by Resilient', location: 'Local I' },
      { start: '11:00 AM', end: '11:45 AM', name: 'Move in Resilient Boot Camp', location: 'Local I' },
      { start: '1:00 PM', end: '1:45 PM', name: 'The Goat Gymnastics Workshop', location: 'Local I' },
      { start: '1:00 PM', end: '4:00 PM', name: 'Corona Cervezero Row', location: 'Local K' },
      { start: '2:00 PM', end: '2:45 PM', name: 'LogiqFit by Karla Hoffer', location: 'Local I' },
      {
        start: '5:30 PM',
        end: '6:00 PM',
        name: {
          es: 'Cierre evento individual – Podcast Merienda Digital',
          en: 'Individual Event Closing – Podcast Merienda Digital',
        },
        location: 'Local A',
      },
      {
        start: '7:00 PM',
        end: '9:00 PM',
        name: { es: 'Happy Hour para afiliados de CrossFit', en: 'Happy Hour for CrossFit Affiliates' },
        location: 'Local L',
      },
      { start: '7:45 PM', end: '10:00 PM', name: 'Illusion and Comedy Show', location: 'Local I' },
      { start: '9:00 PM', name: 'Guayaera Verbena & Plena', location: 'Local K' },
    ],
  },
  {
    id: 'sunday',
    dayNumber: '06',
    accent: '#FDFAF5',
    activities: [
      { start: '6:30 AM', end: '10:00 AM', name: 'Xtreme Warrior Race', location: 'Local C' },
      { start: '7:00 AM', end: '9:00 AM', name: 'Only Girls Fit Camp', location: 'Local I' },
      { start: '7:00 AM', end: '4:00 PM', name: 'Vendors Village Opens', location: 'Local B' },
      { start: '8:00 AM', end: '4:00 PM', name: 'Guayaera CrossFit Teams Event', location: BOTH_ACD, featured: true },
      { start: '10:00 AM', end: '10:45 AM', name: 'Linda Zumbas Party', location: 'Local I' },
      { start: '11:00 AM', end: '11:45 AM', name: 'Edgar Motion Class', location: 'Local I' },
      { start: '1:00 PM', end: '2:00 PM', name: 'The Goat Gymnastics Workshop', location: 'Local I' },
      { start: '1:00 PM', end: '3:00 PM', name: 'Last Chance Corona Cervezero Row', location: 'Local K' },
      { start: '4:30 PM', name: { es: 'Cierre evento de teams', en: 'Teams Event Closing' }, location: null },
      { start: '5:00 PM', name: 'Closing Party by Corona – Live Music by Via Urbana', location: 'Local J', featured: true },
    ],
  },
];

// "7:15 PM" -> minutes since midnight, used to guarantee chronological order.
export const toMinutes = (time) => {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(String(time).trim());
  if (!match) return 0;
  let hours = Number(match[1]) % 12;
  if (match[3].toUpperCase() === 'PM') hours += 12;
  return hours * 60 + Number(match[2]);
};

export const localize = (value, language) => {
  if (value && typeof value === 'object') return value[language] || value.es;
  return value;
};

export const totalActivities = itineraryDays.reduce((sum, day) => sum + day.activities.length, 0);
