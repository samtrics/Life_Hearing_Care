import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../supabaseClient';

function BookAppointment() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    age: '',
    gender: 'Not Specified',
    service: 'General Consultation',
    date: '',
    time: '',
    reason: '',
    notes: '',
    appointmentType: 'clinic',
    homeAddress: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  // System State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const today = new Date().toISOString().split('T')[0];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const timeoutId = setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, [isSubmitted]);



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setFormError('');

    if (formData.altPhone && formData.phone === formData.altPhone) {
      setError("Alternate mobile number cannot be the same as your primary phone number.");
      return;
    }

    // Strict Client-Side Zod Validation
    const { z } = await import('zod');
    const schema = z.object({
      firstName: z.string().min(1, "First name is required").max(50),
      lastName: z.string().min(1, "Last name is required").max(50),
      phone: z.string().min(10, "Phone must be at least 10 digits").max(15).regex(/^[0-9+()-\s]+$/, "Invalid phone format"),
      email: z.string().email("Invalid email").optional().or(z.literal('')),
      date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date"),
      time: z.string().min(1, "Time is required")
    });

    const parsed = schema.safeParse(formData);
    if (!parsed.success) {
      const firstError = parsed.error.errors[0].message;
      setFormError(`Validation Error: ${firstError}`);
      return;
    }

    setIsSubmitting(true);

    try {
      const { default: CryptoJS } = await import('crypto-js');

      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        age: formData.age ? parseInt(formData.age) : undefined,
        gender: formData.gender,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        appointmentType: formData.appointmentType,
        homeAddress: formData.homeAddress,
        notes: formData.notes,
        altPhone: formData.altPhone
      };

      const payloadString = JSON.stringify(payload);
      const secretKey = import.meta.env.VITE_API_SECRET;
      
      if (!secretKey) {
        throw new Error("System configuration error: Security key is missing. Please contact support.");
      }

      // Encrypt the payload so it never travels in plain text
      const encryptedPayload = CryptoJS.AES.encrypt(payloadString, secretKey).toString();

      // Sign the encrypted payload
      const signature = CryptoJS.HmacSHA256(encryptedPayload, secretKey).toString(CryptoJS.enc.Hex);

      // We now proxy requests via Vite locally and Vercel in production
      // to completely hide the backend URL from the network tab.
      const response = await fetch('/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'X-Payload-Signature': signature
        },
        body: encryptedPayload
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to book appointment");
      }

      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setFormError(err.message || "Failed to book appointment. Please try again or call us.");
      console.error('Booking error (masked for security):', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const mapsLink = `https://maps.google.com/?q=${latitude},${longitude}`;

        setFormData(prev => ({
          ...prev,
          homeAddress: prev.homeAddress
            ? `${prev.homeAddress}\n\nExact Pin: ${mapsLink}`
            : `Exact Pin: ${mapsLink}`
        }));
        setIsGettingLocation(false);
      },
      (err) => {
        setIsGettingLocation(false);
        alert("Unable to retrieve your location. Please check your browser permissions.");
        console.error(err);
      }
    );
  };


  return (
    <div className="bg-background text-on-surface font-body-lg min-h-screen flex flex-col">
      <style>
        {`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-6px); }
          75% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 0.25s ease-in-out 0s 2;
        }
        `}
      </style>
      <Navbar />

      <main className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative py-xl px-gutter bg-surface-container-low overflow-hidden animate-on-scroll">
          <div className="max-w-container-max mx-auto text-center relative z-10">
            <span className="inline-block py-xs px-md bg-secondary-container text-on-secondary-container rounded-full text-label-md font-label-md uppercase tracking-wider mb-md">
              Secure Your Spot
            </span>
            <h1 className="text-display-lg font-display-lg text-primary mb-md">
              Schedule Your <span className="text-secondary">Visit</span>
            </h1>
            <p className="text-body-xl text-on-surface-variant max-w-2xl mx-auto">
              Take the first step toward better hearing. Our specialists are ready to provide you with personalized, premium care.
            </p>
          </div>

          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary-fixed/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary-fixed/30 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
        </section>

        {isSubmitted ? (
          <section className="py-xl px-gutter max-w-3xl mx-auto animate-in fade-in zoom-in duration-500 text-center min-h-[50vh] flex flex-col justify-center items-center">
            <div className="w-24 h-24 bg-primary-container rounded-full flex items-center justify-center mb-md">
              <span className="material-symbols-outlined text-[48px] text-primary">check_circle</span>
            </div>
            <h2 className="text-headline-md font-headline-md text-primary mb-sm">Request Received!</h2>
            <p className="text-body-xl text-on-surface-variant mb-lg">
              Thank you, {formData.firstName}. We have received your appointment request. One of our specialists will call you shortly at {formData.phone} to confirm your booking.
            </p>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  altPhone: '',
                  age: '',
                  gender: 'Not Specified',
                  service: 'General Consultation',
                  date: '',
                  time: '',
                  reason: '',
                  notes: ''
                });
                setOtpValue('');
              }}
              className="bg-primary text-on-primary px-lg py-md rounded-xl font-label-md text-label-md hover:shadow-lg transition-all active:scale-95"
            >
              Book Another Appointment
            </button>
          </section>
        ) : (
          <section className="py-xl px-gutter max-w-container-max mx-auto">
            <div className="flex flex-col lg:flex-row gap-xl">

              {/* Left Column: Info — appears below form on mobile, left sidebar on desktop */}
              <div className="lg:w-1/3 space-y-lg animate-on-scroll order-2 lg:order-1">

                {/* Contact Card */}
                <div className="bg-surface-container-lowest p-lg rounded-3xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] -z-0"></div>
                  <h3 className="text-title-lg font-title-lg text-primary mb-md relative z-10">Clinic Information</h3>

                  <div className="space-y-md relative z-10">
                    <div className="flex items-start gap-md">
                      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface mb-xs">Life Hearing Care.</p>
                        <a href="https://www.google.com/maps/place/Life+Hearing+Care/@25.1529873,75.8525993,17.25z/data=!4m17!1m9!3m8!1s0x396f85f70140ed13:0xdfdb28470156842c!2sLife+Hearing+Care!8m2!3d25.1528616!4d75.8523502!9m1!1b1!16s%2Fg%2F11j1_gkc3h!3m6!1s0x396f85f70140ed13:0xdfdb28470156842c!8m2!3d25.1528616!4d75.8523502!10e1!16s%2Fg%2F11j1_gkc3h!18m1!1e1?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noreferrer" className="text-on-surface-variant hover:text-primary transition-colors hover:underline block">
                          25/A, Sheela Chaudhary Road, Sudha Hospital Rd, <br />near ICICI Bank ATM, opposite Bala Ji Mandir, Talwandi, Kota,<br />Rajasthan 324005
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                        <span className="material-symbols-outlined">phone</span>
                      </div>
                      <div>
                        <a href="tel:+91 9219559322" className="text-on-surface-variant hover:text-primary transition-colors font-medium block">
                          +91 9219559322
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-md">
                      <div className="w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center flex-shrink-0 text-primary">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <a href="mailto:@lifehearcare.com" className="text-on-surface-variant hover:text-primary transition-colors font-medium block">
                          lifehearcare@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="bg-surface-container-lowest p-lg rounded-3xl shadow-sm border border-outline-variant/20 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <h3 className="text-title-lg font-title-lg text-primary mb-md relative z-10 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">schedule</span>
                    Office Hours
                  </h3>
                  <ul className="space-y-sm text-body-lg text-on-surface-variant">
                    <li className="flex justify-between border-b border-outline-variant/10 pb-sm"><span>Monday - Saturday</span> <span>10:00 AM - 7:00 PM</span></li>
                    <li className="flex justify-between border-b border-outline-variant/10 pb-sm"><span>Sunday</span> <span>10:00 AM - 1:00 PM</span></li>
                  </ul>
                </div>

                {/* What to expect */}
                <div className="bg-primary text-on-primary p-lg rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
                  <h3 className="text-title-lg font-title-lg mb-md relative z-10 text-white">What to Expect</h3>
                  <ul className="space-y-sm text-white/90 relative z-10">
                    <li className="flex items-start gap-sm"><span className="material-symbols-outlined text-[20px] mt-1">check_circle</span> Comprehensive Hearing Evaluation</li>
                    <li className="flex items-start gap-sm"><span className="material-symbols-outlined text-[20px] mt-1">check_circle</span> Personalized Lifestyle Consultation</li>
                    <li className="flex items-start gap-sm"><span className="material-symbols-outlined text-[20px] mt-1">check_circle</span> Live Technology Demonstration</li>
                    <li className="flex items-start gap-sm"><span className="material-symbols-outlined text-[20px] mt-1">check_circle</span> No Obligation to Purchase</li>
                  </ul>
                </div>

              </div>

              {/* Right Column: Booking Form — appears first on mobile */}
              <div className="lg:w-2/3 animate-on-scroll order-1 lg:order-2">
                <div className="bg-surface-container-lowest p-md sm:p-lg md:p-xl rounded-3xl shadow-xl border border-outline-variant/20">
                  <h2 className="text-title-lg sm:text-headline-md font-headline-md text-primary mb-lg border-b border-outline-variant/20 pb-md">Appointment Request Form</h2>

                  <form onSubmit={handleSubmit} className="space-y-lg">
                    {/* Appointment Type Toggle */}
                    <div className="bg-surface p-md rounded-2xl border border-outline-variant/50">
                      <label className="block text-label-md mb-sm font-bold text-on-surface">Appointment Type *</label>
                      <div className="flex flex-wrap gap-4">
                        <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.appointmentType === 'clinic' ? 'bg-primary/10 border-primary text-primary font-bold' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>
                          <input type="radio" name="appointmentType" value="clinic" checked={formData.appointmentType === 'clinic'} onChange={handleChange} className="hidden" />
                          <span className="material-symbols-outlined text-[20px]">store</span>
                          Clinic Visit
                        </label>
                        <label className={`flex items-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition-all ${formData.appointmentType === 'home' ? 'bg-secondary/10 border-secondary text-secondary font-bold' : 'bg-white border-outline-variant text-on-surface-variant hover:bg-surface-container'}`}>
                          <input type="radio" name="appointmentType" value="home" checked={formData.appointmentType === 'home'} onChange={handleChange} className="hidden" />
                          <span className="material-symbols-outlined text-[20px]">home_health</span>
                          Home Visit (Kota Only)
                        </label>
                      </div>
                      {formData.appointmentType === 'home' && (
                        <div className="mt-md animate-fade-in">
                          <div className="bg-secondary-container/50 border border-secondary/20 p-sm rounded-lg text-sm text-on-secondary-container mb-3 flex gap-2">
                            <span className="material-symbols-outlined text-[18px]">info</span>
                            Our Home Visit service is currently exclusively available for patients residing within Kota, Rajasthan.
                          </div>
                          <label className="block text-label-md mb-xs font-bold text-on-surface">Complete Home Address *</label>
                          <div className="relative">
                            <textarea
                              name="homeAddress"
                              value={formData.homeAddress}
                              onChange={handleChange}
                              required
                              rows="3"
                              className="w-full px-md py-sm rounded-xl border border-outline-variant bg-white focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                              placeholder="House No, Street, Landmark, Kota, Rajasthan - Pin Code"
                            ></textarea>
                            <button
                              type="button"
                              onClick={handleGetLocation}
                              disabled={isGettingLocation}
                              className="absolute bottom-3 right-3 flex items-center gap-1 bg-surface-container hover:bg-surface-container-high text-on-surface-variant px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm border border-outline-variant/30"
                            >
                              {isGettingLocation ? (
                                <span className="material-symbols-outlined text-[14px] animate-spin">refresh</span>
                              ) : (
                                <span className="material-symbols-outlined text-[14px]">my_location</span>
                              )}
                              {isGettingLocation ? "Locating..." : "Share Location Pin"}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Name Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">First Name *</label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Sam"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Last Name *</label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="Jain"
                        />
                      </div>
                    </div>

                    {/* Contact Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Email Address *</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="samjain@gmail.com"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Phone Number *</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          placeholder="(987) 678-8761"
                        />
                      </div>
                    </div>

                    {/* Demographics Row — 2 cols on mobile, 3 on md+ */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-md">
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Age</label>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                          placeholder="Age"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Gender</label>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                          <option value="Not Specified">Not Specified</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Service</label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                        >
                          <option value="General Consultation">General Consultation</option>
                          <option value="RIC Hearing Aid">RIC Hearing Aid</option>
                          <option value="BERA Test Center">BERA Test Center</option>
                          <option value="Hearing Loss">Hearing Loss</option>
                          <option value="Starkey Hearing Aids">Starkey Hearing Aids</option>
                          <option value="Tinnitus Management">Tinnitus Management</option>
                          <option value="Hearing Aid Fitting">Hearing Aid Fitting</option>
                        </select>
                      </div>
                    </div>

                    {/* Alternate Contact */}
                    <div>
                      <label className="block text-label-md mb-xs font-bold text-on-surface">Alternate Mobile No. (Optional)</label>
                      <input
                        type="tel"
                        name="altPhone"
                        value={formData.altPhone}
                        onChange={handleChange}
                        className={`w-full px-md py-sm rounded-xl border ${error ? 'border-error focus:ring-error' : 'border-outline-variant focus:ring-primary'} bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
                        placeholder="(789) 987-6543"
                      />
                      {error && <p className="text-error text-sm mt-xs font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">error</span> {error}</p>}
                    </div>

                    {/* Schedule Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Preferred Date *</label>
                        <input
                          type="date"
                          name="date"
                          value={formData.date}
                          onChange={handleChange}
                          min={today}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                        />
                      </div>
                      <div>
                        <label className="block text-label-md mb-xs font-bold text-on-surface">Preferred Time *</label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleChange}
                          required
                          className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                        >
                          <option value="">Select a time</option>
                          {(() => {
                            let isSunday = false;
                            if (formData.date) {
                              const [year, month, day] = formData.date.split('-');
                              isSunday = new Date(year, month - 1, day).getDay() === 0;
                            }
                            return isSunday ? (
                              <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                            ) : (
                              <>
                                <option value="morning">Morning (10:00 AM - 1:00 PM)</option>
                                <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                                <option value="evening">Late Afternoon (4:00 PM - 7:00 PM)</option>
                              </>
                            );
                          })()}
                        </select>
                      </div>
                    </div>

                    {/* Reason */}
                    <div>
                      <label className="block text-label-md mb-xs font-bold text-on-surface">Reason for Visit *</label>
                      <select
                        name="reason"
                        value={formData.reason}
                        onChange={handleChange}
                        required
                        className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-on-surface"
                      >
                        <option value="">Select a reason</option>
                        <option value="initial">Initial Consultation & Hearing Test</option>
                        <option value="fitting">Hearing Aid Fitting</option>
                        <option value="maintenance">Device Maintenance / Repair</option>
                        <option value="tinnitus">Tinnitus Evaluation</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    {/* Notes */}
                    <div>
                      <label className="block text-label-md mb-xs font-bold text-on-surface">Additional Notes (Optional)</label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-md py-sm rounded-xl border border-outline-variant bg-surface focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all custom-scrollbar resize-none"
                        placeholder="Please share any specific symptoms, concerns, or questions..."
                      ></textarea>
                    </div>

                    {/* Security Errors */}
                    {formError && (
                      <div className="bg-error/10 text-error p-md rounded-xl flex items-start gap-sm">
                        <span className="material-symbols-outlined mt-1">gpp_bad</span>
                        <p className="text-body-lg font-medium">{formError}</p>
                      </div>
                    )}

                    {/* Submit */}
                    <div className="pt-md border-t border-outline-variant/20">
                      <p className="text-xs text-on-surface-variant mb-3 hidden md:block">
                        By submitting this form, you agree to our privacy policy. We will never share your personal information.
                      </p>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full px-xl py-md rounded-xl font-bold text-label-md transition-all flex items-center justify-center gap-sm ${isSubmitting ? 'bg-surface-container-high text-on-surface-variant cursor-not-allowed' : 'bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary active:scale-95 shadow-md'}`}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-on-surface-variant border-t-transparent rounded-full animate-spin"></div>
                            Processing...
                          </>
                        ) : (
                          <>Request Appointment <span className="material-symbols-outlined">send</span></>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        )}


      </main>
      <Footer />
    </div>
  );
}

export default BookAppointment;
