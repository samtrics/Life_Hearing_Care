import React, { useEffect, useState } from 'react';
import ricImg from '../assets/ric_hearing_aid.png';
import starkeyImg from '../assets/starkey_aids.png';
import { supabase } from '../supabaseClient';

import imgInvisible from '../assets/img_invisible.png';
import imgBte from '../assets/img_bte.png';
import imgPediatric from '../assets/img_pediatric.png';

const defaultImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjcX9Qvnwn6s8OKjxk5aw3PzE9QMSE7_Q5ls7W4xMbymFoemsxkJ8L5YoKFCwCiLMq2MvNVoJlMYCNs-Z0cMjnwWgkJZucfrlbdJmk7hy6SmV4HPXwKtfjEJr7ko0RKYricjTUVO9wKBMdnzp-W-nTRm8RA3S66gkClB0n5V94dnaoTvmdau8BKAPhPN_HAgSbTgNY-wW7uPTFioTZufI0AoR-ktFsfqS4qYCvW9Xof2mxwAZe_j55QD_EZuFvlP0NEt4bl0I0Q-KE';

const defaultProducts = [
  { id: 'iic-1', name: 'IIC Invisible-in-Canal', brand: 'Life Hearing', price: '₹1,50,000', description: 'The smallest and most discreet hearing aid available, resting deep in the ear canal where it is completely hidden.', image: imgInvisible, badge: 'Discreet', badge_class: 'bg-primary text-on-primary', features: ['Invisible Fit', 'Clear Sound', 'Custom Molded'], details: { ai: 'Standard', battery: 'Size 10', waterResistance: 'IP68', bluetooth: 'N/A' } },
  { id: 'bte-1', name: 'BTE Behind-The-Ear Model', brand: 'Life Hearing', price: '₹1,25,000', description: 'Robust and powerful hearing aid suitable for severe to profound hearing loss, featuring easy-to-use controls.', image: imgBte, badge: 'Powerful', badge_class: 'bg-secondary text-on-secondary', features: ['High Amplification', 'Durable', 'Rechargeable'], details: { ai: 'Standard', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' } },
  { id: 'ric-1', name: 'RIC Receiver-In-Canal Aid', brand: 'Life Hearing', price: '₹1,80,000', description: 'A comfortable open-fit design that keeps the ear canal open for natural sound quality, ideal for mild to severe loss.', image: ricImg, badge: 'Popular', badge_class: 'bg-tertiary text-on-tertiary', features: ['Natural Sound', 'Bluetooth Ready', 'Comfortable'], details: { ai: 'Advanced', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' } },
  { id: 'cic-1', name: 'CIC Completely-In-Canal', brand: 'Life Hearing', price: '₹1,65,000', description: 'Custom-molded to fit entirely inside your ear canal, offering a highly discreet cosmetic appeal.', image: imgInvisible, badge: 'Custom Fit', badge_class: 'bg-primary-container text-on-primary-container', features: ['Cosmetically Appealing', 'Custom Fit', 'Clear Audio'], details: { ai: 'Standard', battery: 'Size 10', waterResistance: 'IP57', bluetooth: 'N/A' } },
  { id: 'itc-1', name: 'ITC In-The-Canal', brand: 'Life Hearing', price: '₹1,70,000', description: 'Fits securely in the lower portion of the outer ear bowl, comfortable and easy to use.', image: imgInvisible, badge: 'Easy Handling', badge_class: 'bg-secondary-container text-on-secondary-container', features: ['Easy to Handle', 'Custom Fit', 'Directional Mics'], details: { ai: 'Advanced', battery: 'Size 312', waterResistance: 'IP68', bluetooth: 'Optional' } },
  { id: 'ite-1', name: 'ITE In-The-Ear Full Shell', brand: 'Life Hearing', price: '₹1,60,000', description: 'Fills most of the bowl-shaped area of your outer ear. Ideal for those with dexterity issues who need powerful amplification.', image: defaultImage, badge: 'Accessible', badge_class: 'bg-tertiary-container text-on-tertiary-container', features: ['Large Controls', 'Long Battery', 'Powerful Sound'], details: { ai: 'Advanced', battery: 'Size 13', waterResistance: 'IP68', bluetooth: 'Standard' } },
  { id: 'ai-1', name: 'AI Powered Smart Aid', brand: 'Life Hearing', price: '₹2,50,000', description: 'Cutting-edge hearing aid utilizing Artificial Intelligence to adapt instantly to any listening environment.', image: defaultImage, badge: 'Premium AI', badge_class: 'bg-error text-on-error', features: ['AI Processing', 'Health Tracking', 'App Control'], details: { ai: 'Deep Neural Net', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Multi-Device' } },
  { id: 'phonak-1', name: 'Phonak Audéo Lumity', brand: 'Phonak', price: '₹2,20,000', description: 'Experience the signature Phonak SmartSpeech technology for improved speech understanding in noisy environments.', image: imgBte, badge: 'Swiss Tech', badge_class: 'bg-primary text-on-primary', features: ['SmartSpeech', 'AutoSense OS', 'Universal Connectivity'], details: { ai: 'AutoSense 5.0', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Universal' } },
  { id: 'signia-1', name: 'Signia Silk Charge&Go', brand: 'Signia', price: '₹2,10,000', description: "The world's first rechargeable, ready-to-wear Completely-in-Canal (CIC) hearing aid by Signia.", image: imgInvisible, badge: 'Innovative', badge_class: 'bg-secondary text-on-secondary', features: ['Ready to Wear', 'Rechargeable CIC', 'Binaural OneMic'], details: { ai: 'Dynamic Soundscape', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'App Control' } },
  { id: 'starkey-1', name: 'Starkey Genesis AI', brand: 'Starkey', price: '₹2,45,000', description: 'Completely redesigned from the inside out to deliver the most natural sounding hearing aids ever from Starkey.', image: starkeyImg, badge: 'Genesis AI', badge_class: 'bg-tertiary text-on-tertiary', features: ['Neuro Processor', 'Health Tracking', 'Edge Mode+'], details: { ai: 'Neuro Processor', battery: '51 Hours', waterResistance: 'IP68+', bluetooth: 'Direct to iOS/Android' } },
  { id: 'resound-1', name: 'ReSound OMNIA', brand: 'ReSound', price: '₹2,30,000', description: 'Hear through the noise. ReSound OMNIA provides a 150% improvement in speech understanding in noisy environments.', image: ricImg, badge: 'Noise Control', badge_class: 'bg-primary-container text-on-primary-container', features: ['Organic Hearing', 'Check My Fit', 'All-Weather'], details: { ai: 'Organic Hearing', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'MFi / ASHA' } },
  { id: 'widex-1', name: 'Widex Moment Sheer', brand: 'Widex', price: '₹2,15,000', description: 'Experience pure, natural sound with ZeroDelay technology that eliminates the artificial sound of typical hearing aids.', image: defaultImage, badge: 'Natural Sound', badge_class: 'bg-secondary-container text-on-secondary-container', features: ['PureSound', 'ZeroDelay', 'SoundSense Learn'], details: { ai: 'SoundSense', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Standard' } },
  { id: 'oticon-1', name: 'Oticon Real', brand: 'Oticon', price: '₹2,60,000', description: 'BrainHearing technology gives your brain access to the full sound scene, balancing sudden disruptive sounds naturally.', image: imgBte, badge: 'BrainHearing', badge_class: 'bg-tertiary-container text-on-tertiary-container', features: ['MoreSound Intelligence', 'Sudden Sound Stabilizer', 'Wind & Handling'], details: { ai: 'Deep Neural Net 2.0', battery: 'Rechargeable', waterResistance: 'IP68', bluetooth: 'Low Energy' } },
  { id: 'pediatric-1', name: 'Pediatric Care Solutions', brand: 'Life Hearing', price: '₹1,40,000', description: 'Durable, tamper-proof, and brightly colored hearing aids specifically designed to support children\'s speech development.', image: imgPediatric, badge: 'For Kids', badge_class: 'bg-primary text-on-primary', features: ['Tamper-proof', 'LED Indicators', 'FM/Roger Ready'], details: { ai: 'Standard', battery: 'Rechargeable/13', waterResistance: 'IP68', bluetooth: 'FM Compatible' } }
];

function HearingAids() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
        if (error && error.code !== '42P01') throw error;
        if (data && data.length > 0) {
            setProducts([...data, ...defaultProducts]);
        } else {
            setProducts(defaultProducts);
        }
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    // Simple filter interactions
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const handleCheckboxChange = function() {
        const parent = this.closest('.group');
        if (parent) {
            if(this.checked) {
                parent.classList.add('text-primary');
            } else {
                parent.classList.remove('text-primary');
            }
        }
    };
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', handleCheckboxChange);
        // Initialize state
        if (checkbox.checked) {
            const parent = checkbox.closest('.group');
            if (parent) parent.classList.add('text-primary');
        }
    });

    // Smooth scroll for anchors
    const anchors = document.querySelectorAll('a[href^="#"]');
    const handleAnchorClick = function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    anchors.forEach(anchor => {
        anchor.addEventListener('click', handleAnchorClick);
    });

    return () => {
        checkboxes.forEach(checkbox => {
            checkbox.removeEventListener('change', handleCheckboxChange);
        });
        anchors.forEach(anchor => {
            anchor.removeEventListener('click', handleAnchorClick);
        });
    };
  }, []);

  return (
    <>
      <main className="mt-20">
{/*  Hero Section  */}
<section className="relative h-[614px] flex items-center overflow-hidden">

<div className="relative z-10 px-gutter max-w-container-max mx-auto w-full">
<div className="max-w-2xl">
<h1 className="text-display-lg font-display-lg text-primary mb-md">Rediscover the <br/><span className="text-secondary">Sound of Life</span></h1>
<p className="text-body-xl font-body-xl text-on-surface-variant mb-lg">Precision-engineered hearing solutions designed to blend seamlessly into your lifestyle. Experience clarity like never before.</p>
<div className="flex gap-md">
<a className="bg-primary text-on-primary px-lg py-md rounded-xl font-label-md text-label-md hover:shadow-lg transition-all flex items-center gap-xs" href="#catalog">
                            Browse Collection <span className="material-symbols-outlined">arrow_downward</span>
</a>
</div>
</div>
</div>
{/*  Decorative image  */}
<div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-1/2 h-[80%] hidden lg:block rounded-l-[4rem] overflow-hidden shadow-2xl rotate-3">
<img className="w-full h-full object-cover" data-alt="A macro studio photograph of a premium, sleek hearing aid with a metallic finish, resting on a soft velvet surface. The lighting is dramatic and high-contrast, emphasizing the sophisticated micro-engineering and elegant curves of the device. The background is a soft, out-of-focus clinical blue, conveying a sense of high-end medical technology and professional care." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjcX9Qvnwn6s8OKjxk5aw3PzE9QMSE7_Q5ls7W4xMbymFoemsxkJ8L5YoKFCwCiLMq2MvNVoJlMYCNs-Z0cMjnwWgkJZucfrlbdJmk7hy6SmV4HPXwKtfjEJr7ko0RKYricjTUVO9wKBMdnzp-W-nTRm8RA3S66gkClB0n5V94dnaoTvmdau8BKAPhPN_HAgSbTgNY-wW7uPTFioTZufI0AoR-ktFsfqS4qYCvW9Xof2mxwAZe_j55QD_EZuFvlP0NEt4bl0I0Q-KE"/>
</div>
</section>
{/*  Styles and Categories Section  */}
<section className="py-xl bg-surface">
    <div className="px-gutter max-w-container-max mx-auto">
        <div className="text-center mb-xl">
            <h2 className="text-headline-md font-headline-md text-primary mb-sm">Explore by Style & Category</h2>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">Discover the perfect fit for your lifestyle. From virtually invisible to powerful behind-the-ear models.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-md">
            {[
                { id: 'iic', title: 'IIC', desc: 'Invisible-In-Canal', icon: 'earbuds' },
                { id: 'cic', title: 'CIC', desc: 'Completely-In-Canal', icon: 'hearing' },
                { id: 'itc', title: 'ITC', desc: 'In-The-Canal', icon: 'hearing_disabled' },
                { id: 'ite', title: 'ITE', desc: 'In-The-Ear', icon: 'record_voice_over' },
                { id: 'ric', title: 'RIC', desc: 'Receiver-In-Canal', icon: 'settings_bluetooth' },
                { id: 'bte', title: 'BTE', desc: 'Behind-The-Ear', icon: 'deaf' },
                { id: 'ai', title: 'AI Powered', desc: 'Smart & Adaptive', icon: 'memory' },
                { id: 'pediatric', title: 'Pediatric', desc: 'For Children', icon: 'child_care' }
            ].map((style) => (
                <div key={style.id} className="bg-surface-container-low p-md rounded-2xl border border-outline-variant/30 hover:border-primary hover:shadow-md transition-all text-center group cursor-pointer">
                    <div className="w-12 h-12 mx-auto bg-primary/10 text-primary rounded-full flex items-center justify-center mb-sm group-hover:bg-primary group-hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-[24px]">{style.icon}</span>
                    </div>
                    <h3 className="font-bold text-on-surface mb-xs">{style.title}</h3>
                    <p className="text-xs text-on-surface-variant uppercase tracking-wider">{style.desc}</p>
                </div>
            ))}
        </div>
    </div>
</section>

{/* Premium Brands Section */}
<section className="py-xl bg-surface-container-lowest border-y border-outline-variant/10">
    <div className="px-gutter max-w-container-max mx-auto text-center">
        <h2 className="text-headline-md font-headline-md text-primary mb-sm">Our Premium Partners</h2>
        <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-xl">We dispense and service the world's most advanced hearing technology brands.</p>
        
        <div className="flex flex-wrap justify-center gap-lg md:gap-xl">
            {['Phonak', 'Signia', 'Starkey', 'ReSound', 'Widex', 'Oticon'].map((brand) => (
                <div key={brand} className="px-lg py-md bg-white border border-outline-variant/20 rounded-2xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center min-w-[140px]">
                    <span className="font-display-sm text-xl font-black text-on-surface/80 uppercase tracking-widest">{brand}</span>
                </div>
            ))}
        </div>
    </div>
</section>

{/*  Advanced Catalog & Filters  */}
<section className="py-xl bg-surface-container-low" id="catalog">
<div className="px-gutter max-w-container-max mx-auto">
<div className="flex flex-col md:flex-row justify-between items-end mb-lg gap-md">
<div>
<h2 className="text-headline-md font-headline-md text-on-surface mb-xs">Premium Product Catalog</h2>
<p className="text-body-lg font-body-lg text-on-surface-variant">Filter by your specific needs and preferences. <span className="text-primary font-bold ml-2">🎉 Zero Cost EMI available for HearClear products!</span></p>
</div>
<div className="flex gap-sm">

<select className="px-md py-sm bg-surface-container-highest rounded-full text-label-md font-label-md text-primary border-none focus:ring-2 focus:ring-primary">
<option>Sort by: Popularity</option>
<option>Newest Arrivals</option>
</select>
</div>
</div>
<div className="w-full">
{/*  Product Grid  */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg max-w-5xl mx-auto">
{loading ? (
  <div className="col-span-1 md:col-span-2 lg:col-span-3 py-xl text-center">
    <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    <p className="mt-4 text-on-surface-variant font-medium">Loading premium catalog...</p>
  </div>
) : products.length === 0 ? (
  <div className="col-span-1 md:col-span-2 lg:col-span-3 py-xl text-center bg-surface-container-lowest rounded-3xl border border-outline-variant/30">
    <span className="material-symbols-outlined text-[48px] text-on-surface-variant/30 mb-2">inventory_2</span>
    <h3 className="text-title-lg font-bold text-on-surface">No Products Available</h3>
    <p className="text-on-surface-variant">Products will appear here once they are added in the Admin Portal.</p>
  </div>
) : (
  products.map(product => (
    <div key={product.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(15,76,129,0.05)] hover:shadow-xl transition-all flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image}/>
        {product.badge && (
          <span className={`absolute top-md left-md ${product.badge_class || 'bg-primary text-on-primary'} text-xs font-bold px-sm py-1 rounded-full uppercase tracking-wider`}>{product.badge}</span>
        )}
      </div>
      <div className="p-md flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-xs">
          <h4 className="text-title-lg font-title-lg text-on-surface line-clamp-1">{product.name}</h4>
          <span className="text-primary font-bold whitespace-nowrap ml-2">{product.price}</span>
        </div>
        <p className="text-label-md text-secondary mb-sm uppercase tracking-wide">{product.brand}</p>
        <p className="text-body-lg text-on-surface-variant line-clamp-2 mb-md">{product.description}</p>
        <div className="flex flex-wrap gap-xs mb-lg">
          {Array.isArray(product.features) && product.features.map(f => (
            <span key={f} className="bg-surface-container-high px-sm py-1 rounded text-xs font-medium">{f}</span>
          ))}
        </div>
        <button onClick={() => setSelectedProduct(product)} className="mt-auto w-full border-2 border-primary text-primary py-sm rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">View Details</button>
      </div>
    </div>
  ))
)}
</div>
</div>
</div>
</section>
{/*  Comparison Table Section  */}
<section className="py-xl bg-surface">
<div className="px-gutter max-w-container-max mx-auto">
<div className="text-center mb-lg">
<h2 className="text-headline-md font-headline-md text-on-surface">Compare Top Models</h2>
<p className="text-body-lg text-on-surface-variant max-w-xl mx-auto">Find the perfect balance of technology and value for your specific hearing profile.</p>
</div>
<div className="overflow-x-auto custom-scrollbar pb-md">
<table className="w-full min-w-[800px] border-collapse">
<thead>
<tr className="text-left border-b border-outline-variant">
<th className="py-md px-md text-label-md font-label-md text-primary bg-surface-container-low rounded-tl-xl">Feature</th>
<th className="py-md px-md text-title-lg font-title-lg text-center bg-surface-container-low">Lumina X-7</th>
<th className="py-md px-md text-title-lg font-title-lg text-center bg-surface-container-low">InvisiCore Pro</th>
<th className="py-md px-md text-title-lg font-title-lg text-center bg-surface-container-low rounded-tr-xl">UltraStream S2</th>
</tr>
</thead>
<tbody className="text-body-lg">
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
<td className="py-md px-md font-semibold text-on-surface">AI Processing</td>
<td className="py-md px-md text-center"><span className="material-symbols-outlined text-secondary">check_circle</span> Advanced</td>
<td className="py-md px-md text-center"><span className="material-symbols-outlined text-secondary">check_circle</span> Standard</td>
<td className="py-md px-md text-center"><span className="material-symbols-outlined text-secondary">check_circle</span> Premium</td>
</tr>
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
<td className="py-md px-md font-semibold text-on-surface">Battery Life</td>
<td className="py-md px-md text-center">30 Hours</td>
<td className="py-md px-md text-center">Zinc-Air Only</td>
<td className="py-md px-md text-center">48 Hours</td>
</tr>
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
<td className="py-md px-md font-semibold text-on-surface">Water Resistance</td>
<td className="py-md px-md text-center">IP68</td>
<td className="py-md px-md text-center">IP57</td>
<td className="py-md px-md text-center">IP68</td>
</tr>
<tr className="border-b border-outline-variant/30 hover:bg-surface-container-lowest transition-colors">
<td className="py-md px-md font-semibold text-on-surface">Bluetooth Pairing</td>
<td className="py-md px-md text-center">Multi-Device</td>
<td className="py-md px-md text-center">N/A</td>
<td className="py-md px-md text-center">Multi-Device</td>
</tr>
<tr className="hover:bg-surface-container-lowest transition-colors">
<td className="py-md px-md font-semibold text-on-surface">Price</td>
<td className="py-md px-md text-center text-primary font-bold">₹1,99,000</td>
<td className="py-md px-md text-center text-primary font-bold">₹1,49,000</td>
<td className="py-md px-md text-center text-primary font-bold">₹2,49,000</td>
</tr>
</tbody>
</table>
</div>
</div>
</section>
{/*  Educational Section: Bento Grid  */}
<section className="py-xl bg-surface-container-lowest">
<div className="px-gutter max-w-container-max mx-auto">
<div className="mb-lg">
<h2 className="text-headline-md font-headline-md text-on-surface">How to Choose the Right Aid</h2>
<p className="text-body-lg text-on-surface-variant">Expert guidance to help you navigate your hearing journey.</p>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-md">
{/*  Item 1: Wide  */}
<div className="md:col-span-2 p-lg bg-primary-container rounded-2xl text-on-primary-container flex flex-col justify-between overflow-hidden relative group">

<div className="relative z-10">
<span className="material-symbols-outlined text-[48px] mb-md">hearing</span>
<h3 className="text-headline-md font-headline-md mb-md">Understand Your Hearing Profile</h3>
<p className="text-body-xl mb-lg max-w-xl">Every ear is unique. Our clinical tests determine not just the volume you need, but the specific frequencies that require enhancement for maximum clarity.</p>
<a className="inline-flex items-center gap-xs font-label-md text-label-md hover:underline" href="#">Download Guide <span className="material-symbols-outlined">description</span></a>
</div>
</div>
{/*  Item 2  */}
<div className="p-lg bg-surface-container-high rounded-2xl flex flex-col gap-md">
<span className="material-symbols-outlined text-[40px] text-primary">line_style</span>
<h3 className="text-title-lg font-title-lg">Lifestyle Matching</h3>
<p className="text-body-lg text-on-surface-variant">Do you spend time in busy restaurants or quiet libraries? Your social habits dictate the level of noise-cancellation technology you need.</p>
</div>
{/*  Item 3  */}
<div className="p-lg bg-secondary-container rounded-2xl flex flex-col gap-md text-on-secondary-container">
<span className="material-symbols-outlined text-[40px] text-secondary">handyman</span>
<h3 className="text-title-lg font-title-lg">Dexterity &amp; Handling</h3>
<p className="text-body-lg">Smaller isn't always better. If you have trouble with fine motor skills, a rechargeable BTE model might be more manageable than a tiny IIC aid.</p>
</div>
{/*  Item 4: Wide  */}
<div className="md:col-span-2 p-lg bg-surface-container rounded-2xl flex flex-col md:flex-row gap-lg items-center">
<div className="w-full md:w-1/3 rounded-xl overflow-hidden aspect-video md:aspect-square">
<img className="w-full h-full object-cover" data-alt="A high-resolution 3D medical illustration of a human ear canal, showing how a modern, nearly-invisible hearing aid fits deep and securely. The style is clean, clinical, and sophisticated, using shades of transparent blue and white to highlight the technological precision of the fit. Soft lighting effects emphasize the depth and comfort of the device." src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcc30RuLN1KTcu2SgTQCiKf_9FyfMf77euvy69Fswo2bwEYPw5ShOIKPvPFhODd7Ce8m537iPmxm2jqaCL57GwYaABxvZgUDeQx_DpK_WeyUULYT5r5M8ZUBD58h6DKQCrZD2ec3HfhGzQXlbyfpYcG265BwhSTygycHbFlPL7RyPLpGhmYVwPGdQaQWU3ZkJT6TLv940MsEZHl3h_X8nWqFmKNVUJL8RXjmwKGfymN6tgif-39J-Rfs11fQ0eULeen1DQ-McJswvC"/>
</div>
<div className="flex-1">
<h3 className="text-title-lg font-title-lg mb-sm">The Fitting Process</h3>
<p className="text-body-lg text-on-surface-variant mb-md">Proper fit is 50% of the success. Our audiologists use Real Ear Measurement (REM) to ensure the aid is programmed specifically to your ear's anatomy.</p>
<button className="bg-primary text-on-primary px-md py-sm rounded-lg font-label-md">Learn about Fitting</button>
</div>
</div>
</div>
</div>
</section>

{selectedProduct && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-md bg-black/50 backdrop-blur-sm" onClick={() => setSelectedProduct(null)}>
    <div className="bg-white rounded-3xl p-lg md:p-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
      <div className="flex justify-between items-start mb-md">
        <h2 className="text-headline-md font-headline-md text-primary">{selectedProduct.name}</h2>
        <button onClick={() => setSelectedProduct(null)} className="text-outline hover:text-on-surface transition-colors">
          <span className="material-symbols-outlined text-3xl">close</span>
        </button>
      </div>
      
      <div className="aspect-video w-full rounded-2xl overflow-hidden mb-lg">
        <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-cover" />
      </div>

      <div className="flex justify-between items-center mb-md pb-md border-b border-outline-variant/30">
        <span className="text-title-lg font-bold text-secondary">{selectedProduct.brand}</span>
        <span className="text-title-lg font-bold text-primary">{selectedProduct.price}</span>
      </div>

      <p className="text-body-lg text-on-surface-variant mb-lg">{selectedProduct.description}</p>
      
      <h3 className="font-title-lg text-on-surface mb-sm">Key Technical Specifications</h3>
      <div className="bg-surface-container-low rounded-xl p-md">
        <ul className="space-y-sm text-body-lg">
          <li className="flex justify-between border-b border-outline-variant/20 pb-xs">
            <span className="text-on-surface-variant">AI Processing:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details?.ai || 'Standard'}</span>
          </li>
          <li className="flex justify-between border-b border-outline-variant/20 pb-xs">
            <span className="text-on-surface-variant">Battery Life:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details?.battery || 'N/A'}</span>
          </li>
          <li className="flex justify-between border-b border-outline-variant/20 pb-xs">
            <span className="text-on-surface-variant">Water Resistance:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details?.waterResistance || 'Standard'}</span>
          </li>
          <li className="flex justify-between pb-xs">
            <span className="text-on-surface-variant">Bluetooth Pairing:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details?.bluetooth || 'N/A'}</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-xl flex justify-end">
        <button onClick={() => setSelectedProduct(null)} className="bg-primary text-on-primary px-xl py-sm rounded-lg font-label-md hover:shadow-lg transition-all active:scale-95">
          Close
        </button>
      </div>
    </div>
  </div>
)}

</main>
    </>
  );
}

export default HearingAids;
