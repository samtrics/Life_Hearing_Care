import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ricImg from '../assets/ric_hearing_aid.png';
import starkeyImg from '../assets/starkey_aids.png';

const hearingAidsData = [
  {
    id: 1,
    name: 'Lumina X-7',
    price: '₹1,99,000',
    brand: 'Phonak Precision',
    description: 'AI-powered noise cancellation with immersive spatial audio for crystal clear conversations.',
    features: ['Rechargeable', 'Bluetooth'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDu83RUG1EP0AOfW6dstC1EAgnyRuDqVwlUx6Qxf45wclM8RplVulLQrnJko0sk6q4OuLQ1_5jwa-GJE8Ujo-o1J3ZDENnIAKZzThz_fqKZKxvNXs9ubaa6KtbJTCL6KNCt_uvpOEQcUgZYCtzWqq7F_15jFHuQbo8pF3h87W9kBxbPk8x4hEE_Rg8gSQkOwQl0BtloZnNXjBqL7bZVfn-sc3k22cydr_oiD4CpSyOQA8YUceyEQdY3pCW6Ts7heUz-MSPt5OICUjFM',
    badge: 'Top Rated',
    badgeClass: 'bg-secondary text-on-secondary',
    details: {
      ai: 'Advanced',
      battery: '30 Hours',
      waterResistance: 'IP68',
      bluetooth: 'Multi-Device'
    }
  },
  {
    id: 2,
    name: 'InvisiCore Pro',
    price: '₹1,49,000',
    brand: 'Oticon Clarity',
    description: 'Virtually invisible design with deep-ear fit for natural sound resonance and comfort.',
    features: ['Invisible', 'Natural Sound'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBb0ShO3H6Y2V0l_yyceKFnUS9XMquFOTBfW86Kfir76yshtjNfnSJPeERK0HIYGGddrcicvuWYWTE5i0afBdRU2NRoNoyifTyircjaiNSS35t2FduJTd2FShvuowTc7iqT8l2YlmmVwADqRrjFW_M4mwVI1Qr_AfkDA-AookhuhaFegBPWtc1QQXhoqFadpr9_4xywBJYX5T-1Vpuf0rmEZZvW8Y0TJxEJNxbzP_OrkA7wUl_sBIfmjXOM4e9Q-46Kx-trvdK8PJqW',
    badge: 'Discreet',
    badgeClass: 'bg-primary-container text-on-primary-container',
    details: {
      ai: 'Standard',
      battery: 'Zinc-Air Only',
      waterResistance: 'IP57',
      bluetooth: 'N/A'
    }
  },
  {
    id: 3,
    name: 'UltraStream S2',
    price: '₹2,49,000',
    brand: 'Starkey Edge',
    description: 'Stream directly from your TV and phone. Long-lasting battery life for all-day use.',
    features: ['Bluetooth', 'Fast Charging'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMBB2_3tk7DsR-j45Wy-RnUqKUtHZ4cLfiIpUkXiEQlXACf2Cdtoyd3zFWlcUJR2ebjZk61Ms7QqozHCX3-YFaPaNZR2FHQBbH2ouEk7r1xVFFanrVP-K9tVB4Pjeks2lMbYbiwpp2z550dzhtVmeoLEjEGkHvwnMs1OJtBc4ukFbflikKojl8SRJ6VDuhRMPqfc6XN0ERnzZwGfQTM4GjuErDVY02vtAL0TF0tds4gLBYS5unkJkcFAHAKfh24VrBYzIFijLZZKcD',
    badge: 'Bestseller',
    badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
    details: {
      ai: 'Premium',
      battery: '48 Hours',
      waterResistance: 'IP68',
      bluetooth: 'Multi-Device'
    }
  },
  {
    id: 4,
    name: 'HearClear: Kit Pure C&G BCT 2IX',
    price: '₹2,09,990',
    brand: 'HearClear',
    description: 'Premium Receiver-In-Canal hearing aid providing crisp sound quality and seamless connectivity. Zero Cost EMI Available.',
    features: ['Zero Cost EMI', 'Bluetooth', 'Rechargeable'],
    image: ricImg,
    badge: 'EMI Available',
    badgeClass: 'bg-primary text-on-primary',
    details: {
      ai: 'Advanced',
      battery: 'Rechargeable',
      waterResistance: 'IP68',
      bluetooth: 'Yes'
    }
  },
  {
    id: 5,
    name: 'Active IX Transmitter',
    price: '₹39,990',
    brand: 'HearClear',
    description: 'Enhance your hearing experience with the Active IX Transmitter. Direct audio streaming. Zero Cost EMI Available.',
    features: ['Zero Cost EMI', 'Audio Streaming'],
    image: starkeyImg,
    badge: 'Accessory',
    badgeClass: 'bg-secondary text-on-secondary',
    details: {
      ai: 'N/A',
      battery: 'Rechargeable',
      waterResistance: 'Standard',
      bluetooth: 'Transmitter'
    }
  }
];

function HearingAids() {
  const [selectedProduct, setSelectedProduct] = useState(null);

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
      <Navbar />
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
{hearingAidsData.map(product => (
  <div key={product.id} className="group bg-surface-container-lowest rounded-2xl overflow-hidden shadow-[0px_4px_20px_rgba(15,76,129,0.05)] hover:shadow-xl transition-all flex flex-col h-full">
    <div className="relative h-64 overflow-hidden">
      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={product.name} src={product.image}/>
      <span className={`absolute top-md left-md ${product.badgeClass} text-xs font-bold px-sm py-1 rounded-full uppercase tracking-wider`}>{product.badge}</span>
    </div>
    <div className="p-md flex flex-col flex-grow">
      <div className="flex justify-between items-start mb-xs">
        <h4 className="text-title-lg font-title-lg text-on-surface">{product.name}</h4>
        <span className="text-primary font-bold">{product.price}</span>
      </div>
      <p className="text-label-md text-secondary mb-sm">{product.brand}</p>
      <p className="text-body-lg text-on-surface-variant line-clamp-2 mb-md">{product.description}</p>
      <div className="flex flex-wrap gap-xs mb-lg">
        {product.features.map(f => (
          <span key={f} className="bg-surface-container-high px-sm py-1 rounded text-xs font-medium">{f}</span>
        ))}
      </div>
      <button onClick={() => setSelectedProduct(product)} className="mt-auto w-full border-2 border-primary text-primary py-sm rounded-lg font-label-md hover:bg-primary hover:text-on-primary transition-all active:scale-95">View Details</button>
    </div>
  </div>
))}
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
            <span className="font-bold text-on-surface">{selectedProduct.details.ai}</span>
          </li>
          <li className="flex justify-between border-b border-outline-variant/20 pb-xs">
            <span className="text-on-surface-variant">Battery Life:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details.battery}</span>
          </li>
          <li className="flex justify-between border-b border-outline-variant/20 pb-xs">
            <span className="text-on-surface-variant">Water Resistance:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details.waterResistance}</span>
          </li>
          <li className="flex justify-between pb-xs">
            <span className="text-on-surface-variant">Bluetooth Pairing:</span>
            <span className="font-bold text-on-surface">{selectedProduct.details.bluetooth}</span>
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
<Footer />
    </>
  );
}

export default HearingAids;
