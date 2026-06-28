import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { supabase } from '../supabaseClient';

const renderTextWithLinks = (text) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-secondary hover:underline inline-flex items-center gap-1 font-bold">
          {part} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
};

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('today');
  const [appointments, setAppointments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Date selection state
  const todayStr = new Date().toLocaleDateString('en-CA');
  const [selectedDate, setSelectedDate] = useState(todayStr);

  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRescheduleModal, setShowRescheduleModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedAppt, setSelectedAppt] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', date: '', time: 'morning', reason: 'consultation', notes: '', age: '', gender: ''
  });
  const [feedbackForm, setFeedbackForm] = useState({ name: '', rating: 5, text: '', honeypot: '' });

  // Security state
  const [blockedNumbers, setBlockedNumbers] = useState([]);
  const [blockInput, setBlockInput] = useState('');

  // Newsletter state
  const [subscribers, setSubscribers] = useState([]);

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [blogFormData, setBlogFormData] = useState({
    title: '', excerpt: '', category: '', author: '', imageUrl: '', content: '', is_featured: false
  });

  const loadAppointments = async () => {
    try {
      const { data: appointmentsData, error } = await supabase
        .from('appointments')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      if (appointmentsData) {
        const mapped = appointmentsData.map(d => ({
          id: d.id,
          appointmentId: d.appointment_id,
          firstName: d.first_name,
          lastName: d.last_name,
          email: d.email,
          phone: d.phone,
          age: d.age,
          gender: d.gender,
          service: d.service,
          date: d.appointment_date,
          time: d.appointment_time,
          reason: d.reason || d.medical_reason || 'consultation',
          notes: d.additional_notes,
          status: d.status,
          otpVerified: d.otp_verified,
          appointmentType: d.appointment_type,
          homeAddress: d.home_address,
          source: d.source || 'Online Booking',
          createdAt: d.created_at
        }));
        
        // Sort by Date (ascending) and Time block
        const timeOrder = { 'morning': 1, 'afternoon': 2, 'evening': 3 };
        mapped.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA < dateB) return -1;
          if (dateA > dateB) return 1;
          
          const timeA = timeOrder[a.time?.toLowerCase()] || 4;
          const timeB = timeOrder[b.time?.toLowerCase()] || 4;
          return timeA - timeB;
        });
        
        setAppointments(mapped);
      }
    } catch (err) {
      console.error('Supabase Error:', err);
    }
  };

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('patient_feedback')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) {
        const mapped = data.map(r => ({
          id: r.id,
          author: r.author_name,
          rating: r.rating,
          text: r.feedback_text,
          status: r.status || 'pending',
          date: r.created_at
        }));
        setReviews(mapped);
      }
    } catch (err) {
      console.error('Error loading reviews:', err);
    }
  };

  const handleApproveReview = async (id) => {
    const { error } = await supabase.from('patient_feedback').update({ status: 'approved' }).eq('id', id);
    if (!error) loadReviews();
    else alert('Failed to approve: ' + error.message);
  };

  const handleRejectReview = async (id) => {
    const { error } = await supabase.from('patient_feedback').update({ status: 'rejected' }).eq('id', id);
    if (!error) loadReviews();
    else alert('Failed to reject: ' + error.message);
  };

  const loadSubscribers = async () => {
    try {
      const { data, error } = await supabase
        .from('newsletter_subscribers')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      if (data) setSubscribers(data);
    } catch (err) {
      console.error('Error loading subscribers:', err);
    }
  };

  const loadBlogs = async () => {
    const { data } = await supabase.from('blogs').select('*').order('created_at', { ascending: false });
    if (data) setBlogs(data);
  };

  const loadBlockedNumbers = async () => {
    const { data } = await supabase.from('blocked_numbers').select('phone_number');
    if (data) setBlockedNumbers(data.map(d => d.phone_number));
  };

  useEffect(() => {
    loadReviews();
    loadAppointments();
    loadSubscribers();
    loadBlogs();
    loadBlockedNumbers();
  }, []);

  // Route Protection (Un-bypassable email verification)
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate('/admin-login');
        return;
      }

      const allowedEmail = import.meta.env.VITE_STAFF_EMAIL;
      const userEmail = data.session.user.email;

      if (allowedEmail && userEmail?.toLowerCase() !== allowedEmail.toLowerCase()) {
        await supabase.auth.signOut();
        navigate('/admin-login');
      }
    };
    checkSession();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const handleBlockNumber = async (e) => {
    e.preventDefault();
    if (!blockInput) return;
    // SECURITY: Normalize phone number (digits only) before storing
    const normalizedPhone = blockInput.replace(/\D/g, '');
    const { error } = await supabase.from('blocked_numbers').insert([{ phone_number: normalizedPhone }]);
    if (!error) {
      loadBlockedNumbers();
      setBlockInput('');
    } else {
      if (error.code === '23505') alert("This number is already blocked.");
      else alert("Failed to block number. Please try again.");
    }
  };

  const handleUnblock = async (num) => {
    const { error } = await supabase.from('blocked_numbers').delete().eq('phone_number', num);
    if (!error) {
      loadBlockedNumbers();
    } else {
      alert("Failed to unblock number: " + error.message);
    }
  };

  const handleDeleteSubscriber = async (id) => {
    if (!window.confirm("Are you sure you want to remove this subscriber?")) return;
    const { error } = await supabase.from('newsletter_subscribers').delete().eq('id', id);
    if (!error) loadSubscribers();
    else alert("Failed to remove subscriber. Please try again.");
  };

  const handleDeleteAppt = async (id) => {
    alert("Permission Denied: Only the Doctor can permanently delete records.");
  };

  const handleDeleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      try {
        const { error } = await supabase.from('patient_feedback').delete().eq('id', id);
        if (error) throw error;
        loadReviews();
      } catch (err) {
        alert("Failed to delete review. Please try again.");
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const { error } = await supabase.from('appointments').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      loadAppointments();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status.");
    }
  };

  const handleAddBlog = async (e) => {
    e.preventDefault();
    
    // SECURITY: Validate URL to prevent SSRF or malformed links
    if (blogFormData.imageUrl && !blogFormData.imageUrl.startsWith('https://')) {
      alert("Security Error: Image URL must be a secure HTTPS link.");
      return;
    }
    
    try {
      const { error } = await supabase.from('blogs').insert([{
        title: blogFormData.title,
        excerpt: blogFormData.excerpt,
        category: blogFormData.category,
        author: blogFormData.author,
        image_url: blogFormData.imageUrl,
        content: blogFormData.content,
        is_featured: blogFormData.is_featured
      }]);
      if (error) throw error;
      alert("Blog added successfully!");
      setShowBlogModal(false);
      setBlogFormData({ title: '', excerpt: '', category: '', author: '', imageUrl: '', content: '', is_featured: false });
      loadBlogs();
    } catch (err) {
      alert("Error adding blog: " + err.message);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
        const { error } = await supabase.from('blogs').delete().eq('id', id);
        if (error) throw error;
        loadBlogs();
      } catch (err) {
        alert("Failed to delete blog: " + err.message);
      }
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    // Check if the phone number is blocked
    if (blockedNumbers.includes(formData.phone)) {
      alert("Cannot book appointment: This phone number is blocked for security reasons.");
      return;
    }

    const newAppointment = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      appointment_date: formData.date,
      appointment_time: formData.time,
      medical_reason: formData.reason,
      reason: formData.reason, // Adding this because your database has a column named 'reason'
      additional_notes: formData.notes,
      age: formData.age || null,
      gender: formData.gender || null,
      status: 'Confirmed',
      source: 'Booking by Admin'
    };
    const { error } = await supabase.from('appointments').insert([newAppointment]);
    if (error) {
      console.error("Error adding appointment:", error);
      alert("Failed to add appointment: " + error.message);
      return;
    }
    setShowAddModal(false);
    setFormData({ firstName: '', lastName: '', email: '', phone: '', date: '', time: 'morning', reason: 'consultation', notes: '', age: '', gender: '' });
    loadAppointments();
  };

  const openReschedule = (appt) => {
    setSelectedAppt(appt);
    setFormData({ ...formData, date: appt.date, time: appt.time });
    setShowRescheduleModal(true);
  };

  const handleRescheduleSubmit = async (e) => {
    e.preventDefault();
    
    // If the appointment was cancelled, automatically reactivate it to Confirmed
    const newStatus = selectedAppt.status.toLowerCase() === 'cancelled' ? 'Confirmed' : selectedAppt.status;
    
    const { error } = await supabase.from('appointments').update({ 
      appointment_date: formData.date, 
      appointment_time: formData.time,
      status: newStatus
    }).eq('id', selectedAppt.id);
    
    if (error) {
      console.error("Error rescheduling:", error);
      alert("Failed to reschedule: " + error.message);
      return;
    }
    setShowRescheduleModal(false);
    loadAppointments();
  };

  // Helpers
  const formatTime = (timeValue) => {
    switch (timeValue) {
      case 'morning': return 'Morning (8am-12pm)';
      case 'afternoon': return 'Afternoon (12pm-4pm)';
      case 'evening': return 'Late Afternoon (4pm-6pm)';
      default: return timeValue;
    }
  };

  const getStatusBadge = (status) => {
    const lower = status.toLowerCase();
    if (lower === 'pending') return <span className="bg-tertiary-container text-on-tertiary-container px-3 py-1 rounded-full text-xs font-bold border border-tertiary/20">Pending</span>;
    if (lower === 'under review') return <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-xs font-bold border border-secondary/20">Under Review</span>;
    if (lower === 'confirmed' || lower === 'upcoming') return <span className="bg-[#25D366]/20 text-[#128C7E] px-3 py-1 rounded-full text-xs font-bold border border-[#25D366]/30">Confirmed</span>;
    if (lower === 'cancelled') return <span className="bg-error-container text-on-error-container px-3 py-1 rounded-full text-xs font-bold border border-error/20">Cancelled</span>;
    if (lower === 'completed') return <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold border border-primary/30">Completed</span>;
    return <span className="bg-surface-container-high text-on-surface px-3 py-1 rounded-full text-xs font-bold">{status}</span>;
  };

  const filteredAppointments = appointments.filter(appt => {
    const term = searchQuery.toLowerCase();
    
    // Tab Filters
    const apptDateStr = new Date(appt.date).toLocaleDateString('en-CA');
    const isSelectedDate = apptDateStr === selectedDate;
    const isActive = appt.status.toLowerCase() !== 'cancelled' && appt.status.toLowerCase() !== 'completed';
    
    if (activeTab === 'today' && !isSelectedDate) return false;
    if (activeTab === 'active' && !isActive) return false;

    return (
      (appt.firstName || '').toLowerCase().includes(term) ||
      (appt.lastName || '').toLowerCase().includes(term) ||
      (appt.email || '').toLowerCase().includes(term) ||
      (appt.phone || '').includes(term) ||
      (appt.id || '').toLowerCase().includes(term)
    );
  }).sort((a, b) => {
    const getTimeStr = (t) => {
      if (t === 'morning') return '08:00';
      if (t === 'afternoon') return '12:00';
      if (t === 'evening') return '16:00';
      return t || '00:00';
    };
    
    // Sort by date and time ascending
    const dateA = new Date(`${a.date}T${getTimeStr(a.time)}`);
    const dateB = new Date(`${b.date}T${getTimeStr(b.time)}`);
    const diff = dateA - dateB;
    
    // Secondary sort: who booked first (created_at ascending)
    if (diff === 0 && a.createdAt && b.createdAt) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
    return diff;
  });

  return (
    <div className="bg-surface-container-lowest text-on-surface font-body-lg min-h-screen flex flex-col relative">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-xl px-gutter max-w-container-max mx-auto w-full">
        
        {/* Header & Mobile Friendly Tabs */}
        <div className="flex flex-col gap-md mb-lg pt-4 md:pt-0">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-headline-md md:text-headline-lg font-headline-md text-primary flex items-center gap-xs md:gap-sm">
                <span className="material-symbols-outlined text-[32px] md:text-[40px]">admin_panel_settings</span>
                Admin Portal
              </h1>
              <p className="text-xs md:text-body-lg text-on-surface-variant mt-1">Manage operations securely.</p>
            </div>
            <button 
              onClick={handleLogout}
              className="px-3 py-2 md:px-4 md:py-2 rounded-xl font-bold transition-all bg-error/10 text-error hover:bg-error/20 flex items-center gap-1 text-xs md:text-sm"
            >
              <span className="hidden sm:inline">Logout</span> <span className="material-symbols-outlined text-[18px]">logout</span>
            </button>
          </div>

          <div className="flex overflow-x-auto custom-scrollbar pb-2 gap-sm border-b border-outline-variant/20 -mx-gutter px-gutter md:mx-0 md:px-0">
            <button 
              onClick={() => setActiveTab('today')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'today' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">today</span> Daily Schedule
            </button>
            <button 
              onClick={() => setActiveTab('active')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'active' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">list_alt</span> Active Appointments
            </button>
            <button 
              onClick={() => setActiveTab('records')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'records' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">inventory</span> All Records
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'reviews' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">star</span> Reviews
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'security' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">security</span> Security
            </button>
            <button 
              onClick={() => setActiveTab('newsletter')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'newsletter' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">mail</span> Newsletter
            </button>
            <button 
              onClick={() => setActiveTab('blogs')}
              className={`whitespace-nowrap px-md md:px-lg py-sm rounded-full font-bold text-sm transition-all flex items-center gap-1 ${activeTab === 'blogs' ? 'bg-primary text-on-primary shadow-md' : 'bg-surface-container hover:bg-surface-container-high text-on-surface'}`}
            >
              <span className="material-symbols-outlined text-[18px]">article</span> Blogs
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="animate-fade-in">
          
          {/* APPOINTMENTS TAB */}
          {(activeTab === 'today' || activeTab === 'active' || activeTab === 'records') && (
            <div className="space-y-lg">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <h2 className="text-title-lg font-title-lg text-primary">
                    {activeTab === 'today' ? "Daily Schedule" : activeTab === 'active' ? "Active Appointments" : "All Records"} ({filteredAppointments.length})
                  </h2>
                  {activeTab === 'today' && (
                    <input 
                      type="date" 
                      value={selectedDate} 
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="border border-outline-variant/30 bg-surface-container-low rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface shadow-sm cursor-pointer w-full sm:w-auto"
                    />
                  )}
                </div>
                {activeTab === 'today' && (
                  <button onClick={() => setShowAddModal(true)} className="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center justify-center gap-1 w-full sm:w-auto">
                    <span className="material-symbols-outlined text-[18px]">add</span> New Appointment
                  </button>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
                <input
                  type="text"
                  placeholder="Search by name, email, phone, or ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-outline-variant/30 rounded-full pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                />
              </div>
              
              {appointments.length === 0 ? (
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-xl text-center">
                  <p className="text-on-surface-variant">No bookings saved.</p>
                </div>
              ) : (
                <>
                  {/* Desktop View: Table */}
                  <div className="hidden lg:block bg-white rounded-3xl shadow-sm border border-outline-variant/20 overflow-hidden">
                    <div className="overflow-x-auto custom-scrollbar">
                      <table className="w-full text-left border-collapse min-w-[1000px]">
                        <thead>
                          <tr className="bg-surface-container-low text-on-surface-variant border-b border-outline-variant/20">
                            <th className="p-md font-label-md font-bold w-12 text-center">#</th>
                            <th className="p-md font-label-md font-bold">Patient</th>
                            <th className="p-md font-label-md font-bold">Contact</th>
                            <th className="p-md font-label-md font-bold">Date & Time</th>
                            <th className="p-md font-label-md font-bold">Status</th>
                            <th className="p-md font-label-md font-bold text-center">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-outline-variant/10">
                          {filteredAppointments.map((appt, index) => (
                            <tr key={appt.id} className="hover:bg-surface-container-lowest transition-colors">
                              <td className="p-md align-top text-center font-bold text-on-surface-variant">
                                {index + 1}
                              </td>
                              <td className="p-md align-top">
                                <div className="font-bold text-primary flex items-center gap-2">
                                  {appt.firstName} {appt.lastName}
                                  {appt.appointmentType === 'home' && (
                                    <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full border border-secondary/20 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">home_health</span> Home Visit</span>
                                  )}
                                </div>
                                <div className="text-xs text-on-surface-variant mt-1">{appt.appointmentId || 'LEGACY'}</div>
                                <div className="text-xs text-on-surface-variant mt-1 uppercase">{appt.service || appt.reason}</div>
                                <div className="text-xs font-bold text-secondary mt-1">{appt.source}</div>
                              </td>
                              <td className="p-md align-top">
                                <div className="flex items-center gap-xs text-sm"><span className="material-symbols-outlined text-[16px]">phone</span> {appt.phone}</div>
                                <div className="flex items-center gap-xs text-sm text-on-surface-variant mt-1"><span className="material-symbols-outlined text-[16px]">mail</span> {appt.email}</div>
                              </td>
                              <td className="p-md align-top">
                                <div className="font-bold text-on-surface flex items-center gap-xs"><span className="material-symbols-outlined text-[18px] text-primary">event</span> {new Date(appt.date).toLocaleDateString()}</div>
                                <div className="text-sm text-on-surface-variant mt-1 ml-6">{formatTime(appt.time)}</div>
                              </td>
                              <td className="p-md align-middle">
                                {getStatusBadge(appt.status)}
                              </td>
                              <td className="p-md align-middle text-center">
                                <div className="flex items-center justify-center gap-2">
                                  {appt.status.toLowerCase() === 'pending' && (
                                    <button onClick={() => handleStatusChange(appt.id, 'Under Review')} title="Mark Under Review" className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center hover:bg-secondary/20 transition-colors">
                                      <span className="material-symbols-outlined text-[18px]">search</span>
                                    </button>
                                  )}
                                  {(appt.status.toLowerCase() === 'pending' || appt.status.toLowerCase() === 'under review') && (
                                    <>
                                      <button onClick={() => handleStatusChange(appt.id, 'Confirmed')} title="Accept" className="w-8 h-8 rounded-full bg-[#25D366]/10 text-[#128C7E] flex items-center justify-center hover:bg-[#25D366]/20 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">check</span>
                                      </button>
                                      <button onClick={() => handleStatusChange(appt.id, 'Cancelled')} title="Reject" className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error/20 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">close</span>
                                      </button>
                                    </>
                                  )}
                                  {(appt.status.toLowerCase() === 'confirmed' || appt.status.toLowerCase() === 'upcoming') && (
                                    <button onClick={() => handleStatusChange(appt.id, 'Completed')} title="Mark as Completed" className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                                      <span className="material-symbols-outlined text-[18px]">done_all</span>
                                    </button>
                                  )}
                                  <button onClick={() => { setSelectedAppt(appt); setShowDetailsModal(true); }} title="View Details" className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">visibility</span>
                                  </button>
                                  {appt.status.toLowerCase() !== 'completed' && (
                                    <button onClick={() => openReschedule(appt)} title="Reschedule" className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                                      <span className="material-symbols-outlined text-[18px]">edit_calendar</span>
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Mobile View: Cards */}
                  <div className="lg:hidden space-y-4">
                    {filteredAppointments.map((appt, index) => (
                      <div key={appt.id} className="bg-white rounded-3xl shadow-sm border border-outline-variant/20 p-4 flex flex-col gap-3 relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1.5 h-full ${appt.status.toLowerCase() === 'confirmed' ? 'bg-[#25D366]' : appt.status.toLowerCase() === 'cancelled' ? 'bg-error' : 'bg-secondary'}`}></div>
                        <div className="flex justify-between items-start pl-2">
                          <div>
                            <h3 className="font-bold text-primary text-lg leading-tight flex items-center gap-2 flex-wrap">
                              <span className="text-on-surface-variant/50 text-sm">#{index + 1}</span>
                              {appt.firstName} {appt.lastName}
                              {appt.appointmentType === 'home' && (
                                <span className="bg-secondary/10 text-secondary text-[10px] px-2 py-0.5 rounded-full border border-secondary/20 flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">home_health</span> Home Visit</span>
                              )}
                            </h3>
                            <p className="text-xs font-bold text-on-surface-variant uppercase mt-1">{appt.reason}</p>
                            <p className="text-xs font-bold text-secondary mt-1">{appt.source}</p>
                          </div>
                          {getStatusBadge(appt.status)}
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm bg-surface-container-lowest p-3 rounded-xl border border-outline-variant/30 ml-2">
                          <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">event</span> {new Date(appt.date).toLocaleDateString()}</div>
                          <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">schedule</span> {formatTime(appt.time)}</div>
                          <div className="flex items-center gap-2"><span className="material-symbols-outlined text-[16px] text-primary">phone</span> {appt.phone}</div>
                          <div className="flex items-center gap-2 truncate"><span className="material-symbols-outlined text-[16px] text-primary">mail</span> {appt.email}</div>
                        </div>
                        
                        <div className="flex items-center justify-end gap-2 pt-3 border-t border-outline-variant/20 mt-1 pl-2">
                          {appt.status.toLowerCase() === 'pending' && (
                            <button onClick={() => handleStatusChange(appt.id, 'Under Review')} className="px-3 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container text-sm font-bold flex items-center gap-1 hover:bg-secondary/20">
                              <span className="material-symbols-outlined text-[16px]">search</span> Review
                            </button>
                          )}
                          {(appt.status.toLowerCase() === 'pending' || appt.status.toLowerCase() === 'under review') && (
                            <>
                              <button onClick={() => handleStatusChange(appt.id, 'Confirmed')} className="px-3 py-1.5 rounded-lg bg-[#25D366]/10 text-[#128C7E] text-sm font-bold flex items-center gap-1 hover:bg-[#25D366]/20">
                                <span className="material-symbols-outlined text-[16px]">check</span> Accept
                              </button>
                              <button onClick={() => handleStatusChange(appt.id, 'Cancelled')} className="w-8 h-8 rounded-full bg-error/10 text-error flex items-center justify-center hover:bg-error/20">
                                <span className="material-symbols-outlined text-[16px]">close</span>
                              </button>
                            </>
                          )}
                          {(appt.status.toLowerCase() === 'confirmed' || appt.status.toLowerCase() === 'upcoming') && (
                            <button onClick={() => handleStatusChange(appt.id, 'Completed')} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-bold flex items-center gap-1 hover:bg-primary/20">
                              <span className="material-symbols-outlined text-[16px]">done_all</span> Done
                            </button>
                          )}
                          <button onClick={() => { setSelectedAppt(appt); setShowDetailsModal(true); }} className="w-8 h-8 rounded-full bg-surface-container text-on-surface flex items-center justify-center hover:bg-surface-container-high">
                            <span className="material-symbols-outlined text-[16px]">visibility</span>
                          </button>
                          {appt.status.toLowerCase() !== 'completed' && (
                            <button onClick={() => openReschedule(appt)} className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20">
                              <span className="material-symbols-outlined text-[16px]">edit_calendar</span>
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* REVIEWS TAB */}
          {activeTab === 'reviews' && (
            <div className="space-y-lg">
              <div className="flex flex-col md:flex-row justify-between md:items-end gap-md border-b border-outline-variant/20 pb-md">
                <div>
                  <h2 className="text-title-lg font-title-lg text-primary mb-sm">Patient Feedback</h2>
                  <div className="flex items-center gap-3 flex-wrap">
                    {reviews.filter(r => r.status === 'approved').length > 0 && (
                      <div className="flex items-center gap-xs">
                        <span className="text-secondary font-bold text-lg">
                          {(reviews.filter(r => r.status === 'approved').reduce((acc, curr) => acc + curr.rating, 0) / reviews.filter(r => r.status === 'approved').length).toFixed(1)}
                        </span>
                        <span className="material-symbols-outlined text-secondary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>star</span>
                        <span className="text-on-surface-variant text-sm">Average ({reviews.filter(r => r.status === 'approved').length} approved)</span>
                      </div>
                    )}
                    {reviews.filter(r => r.status === 'pending').length > 0 && (
                      <span className="text-[11px] font-bold bg-tertiary-container text-on-tertiary-container px-2 py-1 rounded-full animate-pulse">
                        {reviews.filter(r => r.status === 'pending').length} pending review
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Pending Approval Section */}
              {reviews.filter(r => r.status === 'pending').length > 0 && (
                <div className="bg-tertiary-container/30 border border-tertiary/20 rounded-2xl p-lg">
                  <h3 className="font-bold text-on-tertiary-container flex items-center gap-2 mb-md">
                    <span className="material-symbols-outlined text-[20px]">pending_actions</span>
                    Awaiting Your Approval ({reviews.filter(r => r.status === 'pending').length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                    {reviews.filter(r => r.status === 'pending').map((review) => (
                      <div key={review.id} className="bg-white p-md rounded-2xl border border-outline-variant/20 shadow-sm flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">{review.author?.[0]}</div>
                          <div>
                            <div className="font-bold text-on-surface text-sm">{review.author}</div>
                            <div className="flex text-secondary text-xs">
                              {[...Array(5)].map((_, i) => <span key={i} className={`material-symbols-outlined text-[14px]`} style={i < review.rating ? {fontVariationSettings: "'FILL' 1"} : {opacity: 0.3}}>star</span>)}
                            </div>
                          </div>
                          <span className="ml-auto text-xs text-on-surface-variant">{new Date(review.date).toLocaleDateString()}</span>
                        </div>
                        <p className="text-sm text-on-surface italic border-l-2 border-outline-variant pl-3">"{review.text}"</p>
                        <div className="flex gap-2 pt-2 border-t border-outline-variant/10">
                          <button onClick={() => handleApproveReview(review.id)} className="flex-1 bg-[#25D366]/10 text-[#128C7E] py-2 rounded-xl text-sm font-bold hover:bg-[#25D366]/20 transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">check_circle</span> Approve
                          </button>
                          <button onClick={() => handleRejectReview(review.id)} className="flex-1 bg-error/10 text-error py-2 rounded-xl text-sm font-bold hover:bg-error/20 transition-colors flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-[16px]">cancel</span> Reject
                          </button>
                          <button onClick={() => handleDeleteReview(review.id)} className="w-10 h-10 rounded-xl bg-surface-container text-on-surface-variant hover:bg-error/10 hover:text-error transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[16px]">delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Approved Reviews */}
              <div>
                <h3 className="font-bold text-on-surface-variant text-sm uppercase tracking-wider mb-md flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-secondary">verified</span>
                  Live on Website ({reviews.filter(r => r.status === 'approved').length})
                </h3>
                {reviews.filter(r => r.status === 'approved').length === 0 ? (
                  <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-xl text-center">
                    <p className="text-on-surface-variant">No approved reviews yet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                    {reviews.filter(r => r.status === 'approved').map((review) => (
                      <div key={review.id} className="bg-white p-lg rounded-3xl border border-outline-variant/20 shadow-sm flex flex-col relative group">
                        <button 
                          onClick={() => handleDeleteReview(review.id)}
                          className="absolute top-4 right-4 text-outline-variant hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                          title="Delete Review"
                        >
                          <span className="material-symbols-outlined text-[20px]">delete</span>
                        </button>
                        <div className="flex text-secondary mb-sm">
                          {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined text-[16px]" style={i < review.rating ? {fontVariationSettings: "'FILL' 1"} : {opacity: 0.3}}>star</span>)}
                        </div>
                        <p className="text-on-surface mb-md italic flex-grow">"{review.text}"</p>
                        <div className="font-bold text-sm text-primary mt-auto">- {review.author}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* SECURITY TAB */}
          {activeTab === 'security' && (
            <div className="space-y-lg">
              <h2 className="text-title-lg font-title-lg text-primary mb-md">Security & Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md mb-lg">
                <div className="bg-white p-lg rounded-3xl border border-outline-variant/20 shadow-sm text-center">
                  <span className="material-symbols-outlined text-[40px] text-secondary mb-xs">security</span>
                  <div className="font-bold text-lg">System Secure</div>
                  <p className="text-sm text-on-surface-variant">All endpoints are protected by OTP</p>
                </div>
                <div className="bg-white p-lg rounded-3xl border border-outline-variant/20 shadow-sm text-center">
                  <span className="material-symbols-outlined text-[40px] text-primary mb-xs">verified_user</span>
                  <div className="font-bold text-lg">{blockedNumbers.length}</div>
                  <p className="text-sm text-on-surface-variant">Blocked Numbers</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden">
                <div className="p-md bg-surface-container-lowest border-b border-outline-variant/20">
                  <h3 className="font-bold text-primary mb-sm">Block a Number</h3>
                  <form onSubmit={handleBlockNumber} className="flex flex-col sm:flex-row gap-md max-w-md">
                    <input 
                      type="tel" 
                      value={blockInput} 
                      onChange={(e) => setBlockInput(e.target.value)} 
                      placeholder="e.g. (555) 000-0000" 
                      className="flex-1 w-full sm:w-auto px-4 py-2 rounded-xl border border-outline-variant focus:ring-primary focus:border-primary"
                    />
                    <button type="submit" className="bg-error text-white px-md py-sm rounded-xl font-bold hover:bg-error/90 transition-colors w-full sm:w-auto">
                      Block
                    </button>
                  </form>
                </div>
                <div className="p-md">
                  {blockedNumbers.length === 0 ? (
                    <p className="text-on-surface-variant text-center py-md">No numbers are currently blocked.</p>
                  ) : (
                    <ul className="divide-y divide-outline-variant/10">
                      {blockedNumbers.map((num, idx) => (
                        <li key={idx} className="py-sm flex justify-between items-center">
                          <span className="font-medium text-on-surface flex items-center gap-2">
                            <span className="material-symbols-outlined text-[16px] text-error">phone_disabled</span>
                            {num}
                          </span>
                          <button onClick={() => handleUnblock(num)} className="text-primary hover:underline text-sm font-bold">Unblock</button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* NEWSLETTER TAB */}
          {activeTab === 'newsletter' && (
            <div className="space-y-lg">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-md">
                <div>
                  <h2 className="text-title-lg font-title-lg text-primary mb-xs">Newsletter Subscribers</h2>
                  <p className="text-sm text-on-surface-variant">Total Subscribers: {subscribers.length}</p>
                </div>
              </div>
              
              {subscribers.length === 0 ? (
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-xl text-center flex flex-col items-center justify-center">
                  <span className="material-symbols-outlined text-[48px] text-on-surface-variant/50 mb-2">mark_email_read</span>
                  <p className="text-on-surface-variant font-medium">No one has subscribed yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                  {subscribers.map((sub) => (
                    <div key={sub.id} className="glass-card rounded-3xl p-6 flex flex-col justify-between relative group hover:-translate-y-2 hover:shadow-2xl hover:border-primary/50 transition-all duration-500 overflow-hidden border-border/50">
                      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                         <span className="material-symbols-outlined text-[64px]">mark_email_read</span>
                      </div>
                      <div className="flex items-start justify-between mb-4 relative z-10">
                        <div className="flex items-center gap-4 w-full">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500">
                            <span className="material-symbols-outlined text-[24px]">alternate_email</span>
                          </div>
                          <div className="overflow-hidden">
                            <p className="font-extrabold text-on-surface truncate w-full text-lg" title={sub.email}>{sub.email}</p>
                            <p className="text-sm text-on-surface-variant mt-0.5 font-medium flex items-center gap-1">
                              <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                              {new Date(sub.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t border-outline-variant/20 flex justify-between items-center relative z-10">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-100/50 px-3 py-1.5 rounded-lg border border-emerald-200/50 flex items-center gap-1">
                          <span className="relative flex h-2 w-2 mr-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          Active
                        </span>
                        <button 
                          onClick={() => handleDeleteSubscriber(sub.id)}
                          title="Remove Subscriber"
                          className="text-error hover:text-white hover:bg-error font-bold text-sm bg-error/10 w-10 h-10 rounded-xl transition-colors flex items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[20px]">person_remove</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* BLOGS TAB */}
          {activeTab === 'blogs' && (
            <div className="space-y-lg">
              <div className="flex justify-between items-end border-b border-outline-variant/20 pb-md">
                <div>
                  <h2 className="text-title-lg font-title-lg text-primary mb-xs">Blog Posts</h2>
                  <p className="text-sm text-on-surface-variant">Manage your blog articles.</p>
                </div>
                <button onClick={() => setShowBlogModal(true)} className="bg-secondary text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md hover:bg-secondary-container hover:text-on-secondary-container transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px]">add</span> New Blog
                </button>
              </div>
              
              {blogs.length === 0 ? (
                <div className="bg-surface-container-low border border-outline-variant/20 rounded-3xl p-xl text-center">
                  <p className="text-on-surface-variant">No blog posts found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-md">
                  {blogs.map((blog) => (
                    <div key={blog.id} className="bg-white rounded-3xl border border-outline-variant/20 shadow-sm overflow-hidden flex flex-col relative">
                      {blog.is_featured && (
                        <div className="absolute top-2 left-2 bg-secondary text-white text-[10px] font-bold uppercase px-2 py-1 rounded-md shadow-md z-10">
                          Featured
                        </div>
                      )}
                      <div className="h-40 overflow-hidden relative">
                        <img src={blog.image_url} alt={blog.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4 flex flex-col flex-grow">
                        <div className="text-xs text-secondary font-bold mb-1 uppercase">{blog.category}</div>
                        <h3 className="font-bold text-on-surface line-clamp-2 mb-2">{blog.title}</h3>
                        <p className="text-sm text-on-surface-variant line-clamp-2 mb-4 flex-grow">{blog.excerpt}</p>
                        <div className="flex justify-between items-center mt-auto border-t border-outline-variant/20 pt-3">
                          <span className="text-xs text-on-surface-variant">{new Date(blog.created_at).toLocaleDateString()}</span>
                          <button 
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-error hover:text-error/80 font-bold text-xs bg-error/10 px-2 py-1 rounded transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </main>

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-on-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-gutter animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-lg shadow-2xl relative">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
               <span className="material-symbols-outlined text-[32px]">cancel</span>
            </button>
            <h2 className="text-headline-sm text-primary mb-md">New Appointment</h2>
            <form onSubmit={handleAddSubmit} className="space-y-md">
               <div className="grid grid-cols-2 gap-md">
                 <div>
                   <label className="block text-sm font-bold mb-1">First Name</label>
                   <input required type="text" value={formData.firstName} onChange={e => setFormData({...formData, firstName: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Last Name</label>
                   <input required type="text" value={formData.lastName} onChange={e => setFormData({...formData, lastName: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Email</label>
                   <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Phone</label>
                   <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Date</label>
                   <input required type="date" min={todayStr} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Time Block</label>
                   <select required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border rounded-xl p-2 bg-white">
                     <option value="morning">Morning (8am-12pm)</option>
                     <option value="afternoon">Afternoon (12pm-4pm)</option>
                     <option value="evening">Late Afternoon (4pm-6pm)</option>
                   </select>
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Age</label>
                   <input type="number" min="0" max="120" value={formData.age} onChange={e => setFormData({...formData, age: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">Gender</label>
                   <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="w-full border rounded-xl p-2 bg-white">
                     <option value="">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value="other">Other</option>
                   </select>
                 </div>
               </div>
               <button type="submit" className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 hover:bg-primary-container transition-colors">Save Appointment</button>
            </form>
          </div>
        </div>
      )}

      {/* RESCHEDULE MODAL */}
      {showRescheduleModal && (
        <div className="fixed inset-0 bg-on-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-gutter animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-lg shadow-2xl relative">
            <button onClick={() => setShowRescheduleModal(false)} className="absolute top-4 right-4 text-on-surface-variant hover:text-error transition-colors">
               <span className="material-symbols-outlined text-[32px]">cancel</span>
            </button>
            <h2 className="text-title-lg text-primary mb-md">Reschedule Appointment</h2>
            <p className="text-sm text-on-surface-variant mb-4">Select a new date and time for {selectedAppt?.firstName}.</p>
            <form onSubmit={handleRescheduleSubmit} className="space-y-md">
                 <div>
                   <label className="block text-sm font-bold mb-1">New Date</label>
                   <input required type="date" min={todayStr} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border rounded-xl p-2" />
                 </div>
                 <div>
                   <label className="block text-sm font-bold mb-1">New Time Block</label>
                   <select required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full border rounded-xl p-2 bg-white">
                     <option value="morning">Morning (8am-12pm)</option>
                     <option value="afternoon">Afternoon (12pm-4pm)</option>
                     <option value="evening">Late Afternoon (4pm-6pm)</option>
                   </select>
                 </div>
               <button type="submit" className="w-full bg-secondary text-white py-3 rounded-xl font-bold mt-4 hover:bg-secondary-container transition-colors">Confirm Reschedule</button>
            </form>
          </div>
        </div>
      )}

      {/* DETAILS MODAL */}
      {showDetailsModal && selectedAppt && (
        <div className="fixed inset-0 bg-on-surface/80 backdrop-blur-sm z-50 flex items-center justify-center p-gutter animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl relative overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-lg border-b border-outline-variant/20 relative">
              <button onClick={() => setShowDetailsModal(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/50 hover:bg-white rounded-full flex items-center justify-center text-on-surface-variant hover:text-error transition-colors shadow-sm">
                 <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-headline-md font-bold shadow-md">
                    {selectedAppt.firstName?.[0]}{selectedAppt.lastName?.[0]}
                  </div>
                  <div>
                    <h2 className="text-headline-sm font-bold text-on-surface">{selectedAppt.firstName} {selectedAppt.lastName}</h2>
                    <p className="text-sm font-medium text-on-surface-variant">ID: {selectedAppt.appointmentId || 'LEGACY-APP'}</p>
                  </div>
                </div>
                <div>{getStatusBadge(selectedAppt.status)}</div>
              </div>
            </div>
            
            <div className="p-lg space-y-6">
              
              {/* Top Details Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Contact Card */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[18px]">contact_mail</span> Contact Info
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">phone</span></div>
                    <span className="font-medium text-on-surface">{selectedAppt.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[16px]">mail</span></div>
                    <span className="font-medium text-on-surface truncate">{selectedAppt.email || 'No email provided'}</span>
                  </div>
                </div>
                
                {/* Schedule Card */}
                <div className="bg-surface-container-lowest p-5 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col gap-3">
                  <h3 className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2 mb-1">
                    <span className="material-symbols-outlined text-[18px]">event_available</span> Appointment
                  </h3>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[16px]">calendar_month</span></div>
                    <span className="font-medium text-on-surface">{new Date(selectedAppt.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/10 flex items-center justify-center text-secondary"><span className="material-symbols-outlined text-[16px]">schedule</span></div>
                    <span className="font-medium text-on-surface">{formatTime(selectedAppt.time)}</span>
                  </div>
                </div>
              </div>

              {/* Patient Info Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Age</p>
                  <p className="font-bold text-on-surface">{selectedAppt.age || '--'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Gender</p>
                  <p className="font-bold text-on-surface capitalize">{selectedAppt.gender || '--'}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">Source</p>
                  <p className="font-bold text-secondary">{selectedAppt.source}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider mb-1">OTP Verified</p>
                  <p className="font-bold text-on-surface">{selectedAppt.otpVerified ? 'Yes' : 'No'}</p>
                </div>
              </div>

              {selectedAppt.appointmentType === 'home' && (
                <div className="bg-secondary/10 p-5 rounded-2xl border border-secondary/20">
                  <h3 className="text-sm font-bold text-secondary uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[18px]">home_health</span> Home Visit Address
                  </h3>
                  <p className="font-medium text-on-surface whitespace-pre-wrap">{renderTextWithLinks(selectedAppt.homeAddress)}</p>
                </div>
              )}
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-primary uppercase tracking-wider flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[18px]">medical_services</span> Reason for Visit
                  </h3>
                  <div className="bg-white p-4 rounded-2xl border border-outline-variant/40 shadow-sm font-medium text-on-surface uppercase text-sm">
                    {selectedAppt.reason}
                  </div>
                </div>
                
                {selectedAppt.notes && (
                  <div>
                    <h3 className="text-sm font-bold text-on-surface-variant uppercase tracking-wider flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-[18px]">notes</span> Additional Notes
                    </h3>
                    <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/40 shadow-sm font-medium text-on-surface text-sm whitespace-pre-wrap">
                      {selectedAppt.notes}
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-surface-container p-4 flex justify-end gap-3 border-t border-outline-variant/20">
              <button onClick={() => setShowDetailsModal(false)} className="px-6 py-2 bg-white border border-outline-variant text-on-surface rounded-xl font-bold hover:bg-surface-container-lowest transition-colors shadow-sm">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* NEW BLOG MODAL */}
      {showBlogModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl p-6 md:p-8 animate-fade-in custom-scrollbar">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-headline-sm font-headline-sm text-primary flex items-center gap-2">
                <span className="material-symbols-outlined">edit_document</span>
                Add New Blog Post
              </h2>
              <button onClick={() => setShowBlogModal(false)} className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <form onSubmit={handleAddBlog} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Title</label>
                  <input type="text" required value={blogFormData.title} onChange={(e) => setBlogFormData({...blogFormData, title: e.target.value})} className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="e.g. 5 Signs You Need a Hearing Test" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Category</label>
                  <select required value={blogFormData.category} onChange={(e) => setBlogFormData({...blogFormData, category: e.target.value})} className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface">
                    <option value="">Select Category</option>
                    <option value="Hearing Health">Hearing Health</option>
                    <option value="Technology">Technology</option>
                    <option value="Lifestyle">Lifestyle</option>
                    <option value="Clinic News">Clinic News</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Author</label>
                  <input type="text" required value={blogFormData.author} onChange={(e) => setBlogFormData({...blogFormData, author: e.target.value})} className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="e.g. Dr. Marcus Chen" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-bold text-on-surface">Image URL</label>
                  <input type="url" required value={blogFormData.imageUrl} onChange={(e) => setBlogFormData({...blogFormData, imageUrl: e.target.value})} className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="https://unsplash.com/..." />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-on-surface">Excerpt (Short description)</label>
                <textarea required rows="2" value={blogFormData.excerpt} onChange={(e) => setBlogFormData({...blogFormData, excerpt: e.target.value})} className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface" placeholder="Brief summary of the article..." />
              </div>
              <div className="space-y-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={blogFormData.is_featured} onChange={(e) => setBlogFormData({...blogFormData, is_featured: e.target.checked})} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary" />
                  <span className="font-bold text-on-surface">Make this the Featured Article</span>
                </label>
              </div>
              
              <div className="pt-6 flex justify-end gap-3 border-t border-outline-variant/20 mt-2">
                <button type="button" onClick={() => setShowBlogModal(false)} className="px-6 py-2.5 rounded-xl font-bold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-bold bg-primary text-on-primary hover:scale-105 shadow-md hover:shadow-lg transition-all">Publish Blog</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Admin;
