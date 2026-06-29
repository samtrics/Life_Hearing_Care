import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://utgsrpwqrfnjdbeobndh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjM4MjIyOCwiZXhwIjoyMDk3OTU4MjI4fQ.SYhS5-F6-ATN1ifE_YMMhIwxtTp9xpL05taGqQPJYdY';
const supabase = createClient(supabaseUrl, supabaseKey);

const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjcX9Qvnwn6s8OKjxk5aw3PzE9QMSE7_Q5ls7W4xMbymFoemsxkJ8L5YoKFCwCiLMq2MvNVoJlMYCNs-Z0cMjnwWgkJZucfrlbdJmk7hy6SmV4HPXwKtfjEJr7ko0RKYricjTUVO9wKBMdnzp-W-nTRm8RA3S66gkClB0n5V94dnaoTvmdau8BKAPhPN_HAgSbTgNY-wW7uPTFioTZufI0AoR-ktFsfqS4qYCvW9Xof2mxwAZe_j55QD_EZuFvlP0NEt4bl0I0Q-KE';

const products = [
  {
    name: 'IIC Invisible-in-Canal Aid',
    brand: 'Life Hearing',
    price: '₹1,50,000',
    description: 'The smallest and most discreet hearing aid available, resting deep in the ear canal where it is completely hidden.',
    image: defaultImage,
    badge: 'Discreet',
    badge_class: 'bg-primary text-on-primary',
    features: ['Invisible Fit', 'Clear Sound', 'Custom Molded'],
    details: { ai: 'Standard', battery: 'Size 10', waterResistance: 'IP68', bluetooth: 'N/A' }
  },
  {
    name: 'BTE Behind-The-Ear Model',
    brand: 'Life Hearing',
    price: '₹1,25,000',
    description: 'Robust and powerful hearing aid suitable for severe to profound hearing loss, featuring easy-to-use controls.',
    image: defaultImage,
    badge: 'Powerful',
    badge_class: 'bg-secondary text-on-secondary',
    features: ['High Amplification', 'Durable', 'Rechargeable Options'],
    details: { ai: 'Standard', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' }
  },
  {
    name: 'RIC Receiver-In-Canal Aid',
    brand: 'Life Hearing',
    price: '₹1,80,000',
    description: 'A comfortable open-fit design that keeps the ear canal open for natural sound quality, ideal for mild to severe loss.',
    image: defaultImage,
    badge: 'Popular',
    badge_class: 'bg-tertiary text-on-tertiary',
    features: ['Natural Sound', 'Bluetooth Ready', 'Comfortable'],
    details: { ai: 'Advanced', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' }
  },
  {
    name: 'CIC Completely-In-Canal',
    brand: 'Life Hearing',
    price: '₹1,65,000',
    description: 'Custom-molded to fit entirely inside your ear canal, offering a highly discreet cosmetic appeal.',
    image: defaultImage,
    badge: 'Custom Fit',
    badge_class: 'bg-primary-container text-on-primary-container',
    features: ['Cosmetically Appealing', 'Custom Fit', 'Clear Audio'],
    details: { ai: 'Standard', battery: 'Size 10', waterResistance: 'IP57', bluetooth: 'N/A' }
  },
  {
    name: 'ITC In-The-Canal',
    brand: 'Life Hearing',
    price: '₹1,70,000',
    description: 'Fits securely in the lower portion of the outer ear bowl, comfortable and easy to use.',
    image: defaultImage,
    badge: 'Easy Handling',
    badge_class: 'bg-secondary-container text-on-secondary-container',
    features: ['Easy to Handle', 'Custom Fit', 'Directional Microphones'],
    details: { ai: 'Advanced', battery: 'Size 312', waterResistance: 'IP68', bluetooth: 'Optional' }
  },
  {
    name: 'ITE In-The-Ear Full Shell',
    brand: 'Life Hearing',
    price: '₹1,60,000',
    description: 'Fills most of the bowl-shaped area of your outer ear. Ideal for those with dexterity issues who need powerful amplification.',
    image: defaultImage,
    badge: 'Accessible',
    badge_class: 'bg-tertiary-container text-on-tertiary-container',
    features: ['Large Controls', 'Long Battery', 'Powerful Sound'],
    details: { ai: 'Advanced', battery: 'Size 13', waterResistance: 'IP68', bluetooth: 'Standard' }
  },
  {
    name: 'AI Powered Smart Aid',
    brand: 'Life Hearing',
    price: '₹2,50,000',
    description: 'Cutting-edge hearing aid utilizing Artificial Intelligence to adapt instantly to any listening environment.',
    image: defaultImage,
    badge: 'Premium AI',
    badge_class: 'bg-error text-on-error',
    features: ['AI Processing', 'Health Tracking', 'App Control'],
    details: { ai: 'Deep Neural Net', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' }
  },
  {
    name: 'Phonak Audéo Lumity',
    brand: 'Phonak',
    price: '₹2,20,000',
    description: 'Experience the signature Phonak SmartSpeech technology for improved speech understanding in noisy environments.',
    image: defaultImage,
    badge: 'Swiss Tech',
    badge_class: 'bg-primary text-on-primary',
    features: ['SmartSpeech', 'AutoSense OS', 'Universal Connectivity'],
    details: { ai: 'AutoSense 5.0', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Universal' }
  },
  {
    name: 'Signia Silk Charge&Go',
    brand: 'Signia',
    price: '₹2,10,000',
    description: 'The world\'s first rechargeable, ready-to-wear Completely-in-Canal (CIC) hearing aid by Signia.',
    image: defaultImage,
    badge: 'Innovative',
    badge_class: 'bg-secondary text-on-secondary',
    features: ['Ready to Wear', 'Rechargeable CIC', 'Binaural OneMic'],
    details: { ai: 'Dynamic Soundscape', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'App Control' }
  },
  {
    name: 'Starkey Genesis AI',
    brand: 'Starkey',
    price: '₹2,45,000',
    description: 'Completely redesigned from the inside out to deliver the most natural sounding hearing aids ever from Starkey.',
    image: defaultImage,
    badge: 'Genesis AI',
    badge_class: 'bg-tertiary text-on-tertiary',
    features: ['Neuro Processor', 'Health Tracking', 'Edge Mode+'],
    details: { ai: 'Neuro Processor', battery: '51 Hours', waterResistance: 'IP68+', bluetooth: 'Direct to iOS/Android' }
  },
  {
    name: 'ReSound OMNIA',
    brand: 'ReSound',
    price: '₹2,30,000',
    description: 'Hear through the noise. ReSound OMNIA provides a 150% improvement in speech understanding in noisy environments.',
    image: defaultImage,
    badge: 'Noise Control',
    badge_class: 'bg-primary-container text-on-primary-container',
    features: ['Organic Hearing', 'Check My Fit', 'All-Weather'],
    details: { ai: 'Organic Hearing', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'MFi / ASHA' }
  },
  {
    name: 'Widex Moment Sheer',
    brand: 'Widex',
    price: '₹2,15,000',
    description: 'Experience pure, natural sound with ZeroDelay technology that eliminates the artificial sound of typical hearing aids.',
    image: defaultImage,
    badge: 'Natural Sound',
    badge_class: 'bg-secondary-container text-on-secondary-container',
    features: ['PureSound', 'ZeroDelay', 'SoundSense Learn'],
    details: { ai: 'SoundSense', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Standard' }
  },
  {
    name: 'Oticon Real',
    brand: 'Oticon',
    price: '₹2,60,000',
    description: 'BrainHearing technology gives your brain access to the full sound scene, balancing sudden disruptive sounds naturally.',
    image: defaultImage,
    badge: 'BrainHearing',
    badge_class: 'bg-tertiary-container text-on-tertiary-container',
    features: ['MoreSound Intelligence', 'Sudden Sound Stabilizer', 'Wind & Handling'],
    details: { ai: 'Deep Neural Net 2.0', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Bluetooth Low Energy' }
  },
  {
    name: 'Pediatric Care Solutions',
    brand: 'Life Hearing',
    price: '₹1,40,000',
    description: 'Durable, tamper-proof, and brightly colored hearing aids specifically designed to support children\'s speech and language development.',
    image: defaultImage,
    badge: 'For Kids',
    badge_class: 'bg-primary text-on-primary',
    features: ['Tamper-proof', 'LED Indicators', 'FM/Roger Ready'],
    details: { ai: 'Standard', battery: 'Rechargeable/Size 13', waterResistance: 'IP68 (Dust/Water)', bluetooth: 'FM System Compatible' }
  }
];

async function seed() {
  console.log('Seeding products...');
  for (const product of products) {
    const { data, error } = await supabase
      .from('products')
      .insert([product]);
    
    if (error) {
      console.error('Error inserting', product.name, error);
    } else {
      console.log('Inserted:', product.name);
    }
  }
  console.log('Done.');
}

seed();
