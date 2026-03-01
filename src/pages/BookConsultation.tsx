import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

// Images
// Imports area already contains standard imports up to line 11
import officeImg from "@/assets/Office.png";
import residentialImg from "@/assets/Residential.png";
import commercialImg from "@/assets/Commercial .png";
// Replaced with the new user-requested image
import renovationImg from "@/assets/Renovation copy.png";
import planningImg from "@/assets/planning.png";
import constructionImg from "@/assets/construction.png";
import handoverImg from "@/assets/handover.png";
// Stage 3 Renovation Image
import renovationStageImg from "@/assets/renovation.png";

// Import videos for Old Design
import video1BHK from "@/assets/1 bhk.mp4";
import video2BHK from "@/assets/2 bhk.mp4";
import video3BHK from "@/assets/3 bhk.mp4";
import video4BHK from "@/assets/4 bhk1.mp4";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const floorplans = [
    { id: "1 BHK", label: "1 BHK", video: video1BHK },
    { id: "2 BHK", label: "2 BHK", video: video2BHK },
    { id: "3 BHK", label: "3 BHK", video: video3BHK },
    { id: "4+ BHK", label: "4+ BHK", video: video4BHK },
];

const BookConsultation = () => {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        projectType: '',
        location: 'Chennai',
        area: '',
        floorplan: '1 BHK', // Default to first item for video sake
        projectStage: '',
        budget: '',
        requirements: [] as string[],
        material: '',
        timeline: '',
        name: '',
        phone: '',
        email: '',
        consultationMode: ''
    });

    const updateForm = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const toggleRequirement = (req: string) => {
        setFormData(prev => {
            if (prev.requirements.includes(req)) {
                return { ...prev, requirements: prev.requirements.filter(r => r !== req) };
            }
            return { ...prev, requirements: [...prev.requirements, req] };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 7) {
            setStep(step + 1);
            return;
        }

        setIsSubmitting(true);

        try {
            // 1. Send Email via EmailJS
            const templateParams = {
                first_name: formData.name,
                to_email: formData.email,
                phone: formData.phone,
                consultation_mode: formData.consultationMode,
                project_type: formData.projectType,
                location: formData.location,
                area: formData.area || 'Not provided',
                floorplan: formData.floorplan,
                project_stage: formData.projectStage,
                budget: formData.budget,
                timeline: formData.timeline,
                requirements: formData.requirements.join(", ") || 'None selected',
                material: formData.material || 'None',
                message: "Please see the individual fields for consultation details."
            };

            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                templateParams,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // 2. Submit to Google Sheets via Backend
            const dataToSubmit = {
                firstName: formData.name,
                lastName: '',
                email: formData.email,
                phone: formData.phone,
                projectType: formData.projectType,
                location: formData.location,
                area: formData.area,
                floorplan: formData.floorplan,
                projectStage: formData.projectStage,
                budget: formData.budget,
                requirements: formData.requirements.join(", "),
                material: formData.material,
                timeline: formData.timeline,
                consultationMode: formData.consultationMode,
                projectBrief: templateParams.message,
            };

            await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });

            toast.success("Consultation Request sent successfully!");
            setStep(8); // Success step
        } catch (error) {
            console.error('FAILED...', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const OptionCard = ({ image, label, selected, onClick }: any) => (
        <div
            onClick={onClick}
            className={`relative cursor-pointer group flex flex-col items-center justify-center p-6 border transition-all duration-300 rounded-md py-8 ${selected ? 'border-brass bg-brass/5 shadow-sm' : 'border-stone/30 hover:border-brass/50 bg-white'}`}
        >
            <img src={image} alt={label} className="w-24 h-24 object-contain mb-4 group-hover:scale-110 transition-transform duration-300" />
            <span className={`text-base font-semibold text-center ${selected ? 'text-onyx' : 'text-graphite'}`}>{label}</span>
        </div>
    );

    // New Full-Width Variant for Step 1
    const OptionCardFull = ({ image, label, selected, onClick }: any) => (
        <div
            onClick={onClick}
            className={`relative cursor-pointer overflow-hidden group rounded-xl transition-all duration-300 ${selected ? 'ring-2 ring-brass shadow-md' : 'shadow hover:shadow-lg'}`}
        >
            <div className="w-full relative aspect-[4/3] sm:aspect-video md:aspect-[4/3] bg-transparent flex items-center justify-center">
                <img src={image} alt={label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                {/* Gradient overlay for text readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-onyx/80 to-transparent pointer-events-none" />

                {/* Floating Label */}
                <div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
                    <span className={`text-base md:text-lg font-semibold tracking-wide ${selected ? 'text-brass' : 'text-white'}`}>
                        {label}
                    </span>
                </div>
            </div>
        </div>
    );

    const ButtonSelect = ({ label, selected, onClick }: any) => (
        <button
            type="button"
            onClick={onClick}
            className={`px-6 py-3 border transition-colors duration-300 text-sm font-medium rounded-md ${selected ? 'border-brass text-onyx bg-brass/10' : 'border-stone/30 text-graphite bg-white hover:border-stone/80 hover:text-onyx'}`}
        >
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-offwhite flex flex-col">
            <div className="bg-onyx shadow-lg">
                <Header />
            </div>

            <section className="flex-grow section-padding-light flex items-center justify-center">
                <div className="container-arch max-w-5xl w-full">
                    {/* Header */}
                    {step < 8 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-12"
                        >
                            <p className="caption text-brass mb-4">BOOK FREE CONSULTATION</p>
                            <h1 className="text-3xl md:text-4xl font-display text-onyx mb-4">
                                Share your preferences
                            </h1>
                            <div className="flex items-center justify-center gap-2 mt-6">
                                <span className="text-sm font-medium text-brass">Step {step} of 7</span>
                            </div>
                        </motion.div>
                    )}

                    <div className="bg-white p-6 sm:p-8 md:p-12 border border-stone/20 rounded-xl shadow-sm relative overflow-hidden min-h-[400px]">
                        {step > 1 && step < 8 && (
                            <button
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="absolute top-6 left-6 md:top-8 md:left-8 text-sm text-stone text-graphite hover:text-brass transition-colors flex items-center gap-2 z-10"
                            >
                                <span>←</span> Back
                            </button>
                        )}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className={`h-full flex flex-col justify-center mt-8 md:mt-2 ${step === 2 ? 'w-full' : 'max-w-3xl mx-auto'}`}
                            >
                                {/* STEP 1 */}
                                {step === 1 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-6">What are you looking for?</h3>
                                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                                            <OptionCardFull image={officeImg} label="Office" selected={formData.projectType === 'Office'} onClick={() => { updateForm('projectType', 'Office'); setStep(2); }} />
                                            <OptionCardFull image={residentialImg} label="Residential" selected={formData.projectType === 'Residential'} onClick={() => { updateForm('projectType', 'Residential'); setStep(2); }} />
                                            <OptionCardFull image={commercialImg} label="Commercial" selected={formData.projectType === 'Commercial'} onClick={() => { updateForm('projectType', 'Commercial'); setStep(2); }} />
                                            <OptionCardFull image={renovationImg} label="Renovation" selected={formData.projectType === 'Renovation'} onClick={() => { updateForm('projectType', 'Renovation'); setStep(2); }} />
                                        </div>
                                    </div>
                                )}

                                {/* STEP 2 - Restored Original Video Design */}
                                {step === 2 && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                                        {/* Side Menu */}
                                        <div className="lg:col-span-1 space-y-3 mt-8 lg:mt-0">
                                            <h3 className="text-lg font-medium text-onyx mb-4 uppercase tracking-wider text-center lg:text-left">Your Floorplan</h3>

                                            <div className="mb-4">
                                                <input readOnly value={formData.location} className="w-full bg-stone/5 border border-stone/30 text-onyx py-3 px-4 rounded-md outline-none cursor-not-allowed text-sm text-center lg:text-left focus:border-stone/30" />
                                            </div>

                                            {floorplans.map((plan, index) => (
                                                <motion.button
                                                    key={plan.id}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    onClick={() => updateForm('floorplan', plan.id)}
                                                    className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-300 ${formData.floorplan === plan.id
                                                        ? 'border-brass bg-brass/5 text-onyx'
                                                        : 'border-stone/20 bg-white text-graphite hover:border-stone/40'
                                                        }`}
                                                >
                                                    <span className="text-lg font-medium uppercase tracking-label text-center lg:text-left block w-full">
                                                        {plan.label}
                                                    </span>
                                                </motion.button>
                                            ))}

                                            <div className="h-8 mt-2 text-center lg:text-left">
                                                {formData.floorplan === '2 BHK' && <p className="text-brass text-sm font-medium animate-fade-in">💡 2 BHK starts from ₹1.9L</p>}
                                                {formData.floorplan === '3 BHK' && <p className="text-brass text-sm font-medium animate-fade-in">💡 3 BHK starts from ₹3.8L</p>}
                                            </div>

                                            <div className="flex justify-center lg:justify-start mt-6 w-full">
                                                <InteractiveHoverButton
                                                    text="Continue"
                                                    onClick={() => setStep(3)}
                                                    className="mt-2 w-full max-w-[200px]"
                                                />
                                            </div>
                                        </div>

                                        {/* Video Player */}
                                        <div className="lg:col-span-2 bg-[#f5f2ea] flex items-center justify-center p-4 lg:p-12 rounded-lg">
                                            <div className="w-full h-full flex flex-col items-center justify-center">
                                                <motion.div
                                                    key={formData.floorplan}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="rounded-lg overflow-hidden w-full relative"
                                                >
                                                    <video
                                                        ref={videoRef}
                                                        src={floorplans.find(p => p.id === formData.floorplan)?.video}
                                                        autoPlay
                                                        loop
                                                        muted
                                                        playsInline
                                                        className="w-full h-full object-cover sm:object-contain min-h-[300px] max-h-[500px]"
                                                        style={{ mixBlendMode: 'multiply' }}
                                                    />
                                                </motion.div>
                                                <div className="mt-4 text-center">
                                                    <p className="text-sm text-graphite">
                                                        <span className="text-brass font-medium">
                                                            {floorplans.find(p => p.id === formData.floorplan)?.label}
                                                        </span>
                                                        {" "}selected
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 3 */}
                                {step === 3 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-6">Current stage?</h3>
                                        <div className="grid grid-cols-2 gap-4 md:gap-6">
                                            <OptionCard image={planningImg} label="Planning stage" selected={formData.projectStage === 'Planning stage'} onClick={() => { updateForm('projectStage', 'Planning stage'); setStep(4); }} />
                                            <OptionCard image={constructionImg} label="Under construction" selected={formData.projectStage === 'Under construction'} onClick={() => { updateForm('projectStage', 'Under construction'); setStep(4); }} />
                                            <OptionCard image={handoverImg} label="Newly handed over" selected={formData.projectStage === 'Newly handed over'} onClick={() => { updateForm('projectStage', 'Newly handed over'); setStep(4); }} />
                                            <OptionCard image={renovationStageImg} label="Renovation existing home" selected={formData.projectStage === 'Renovation existing home'} onClick={() => { updateForm('projectStage', 'Renovation existing home'); setStep(4); }} />
                                        </div>
                                        <p className="text-graphite italic text-sm mt-8 text-center font-medium bg-stone/10 py-3 px-4 rounded-md mx-auto max-w-lg">"We provide A-Z interior solutions from construction stage to handover."</p>
                                    </div>
                                )}

                                {/* STEP 4 */}
                                {step === 4 && (
                                    <div className="space-y-8 flex flex-col items-center">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-6">Budget Range</h3>
                                        <div className="flex flex-wrap justify-center gap-4 max-w-lg">
                                            {['₹1L – ₹2L', '₹2L – ₹4L', '₹4L – ₹6L', '₹6L+', 'Not sure'].map(b => (
                                                <ButtonSelect key={b} label={b} selected={formData.budget === b} onClick={() => { updateForm('budget', b); setStep(5); }} />
                                            ))}
                                        </div>
                                        <p className="text-graphite italic text-sm mt-10 text-center font-medium bg-stone/10 py-3 px-4 rounded-md mx-auto w-full max-w-lg">"Budget-focused execution with zero space wastage."</p>
                                    </div>
                                )}

                                {/* STEP 5 */}
                                {step === 5 && (
                                    <div className="space-y-8">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-6">Requirements & Preferences</h3>

                                        <div className="space-y-8 max-w-2xl mx-auto w-full">
                                            <div className="flex flex-wrap justify-center gap-3">
                                                {['Full Home Interiors', 'Modular Kitchen', 'Wardrobes', 'TV Unit', 'False Ceiling', 'Lighting', 'Custom requirements'].map(req => (
                                                    <ButtonSelect key={req} label={req} selected={formData.requirements.includes(req)} onClick={() => toggleRequirement(req)} />
                                                ))}
                                            </div>

                                            <div className="max-w-md mx-auto pt-4 border-t border-stone/20">
                                                <label className="caption text-graphite block mb-3 text-center">Material preference (Optional)</label>
                                                <select
                                                    value={formData.material}
                                                    onChange={(e) => updateForm('material', e.target.value)}
                                                    className="w-full bg-transparent border border-stone/30 text-onyx py-3 px-4 rounded-md focus:border-brass focus:outline-none transition-colors appearance-none cursor-pointer text-sm font-medium text-center"
                                                >
                                                    <option value="">Not specified</option>
                                                    <option value="BWP">BWP - Boiling Water Proof</option>
                                                    <option value="BWR">BWR - Boiling Water Resistant</option>
                                                    <option value="MR">MR - Moisture Resistant</option>
                                                    <option value="HDHMR">HDHMR - High Density High Moisture Resistance</option>
                                                    <option value="Not sure">Not sure / Advise me</option>
                                                </select>
                                            </div>
                                        </div>

                                        <p className="text-graphite italic text-sm mt-8 text-center font-medium">"100% customized interiors based on your space and lifestyle."</p>
                                        <div className="flex justify-center mt-4">
                                            <Button onClick={() => setStep(6)} disabled={formData.requirements.length === 0} className="px-12 py-6 text-sm tracking-wider uppercase bg-onyx text-offwhite hover:bg-brass transition-colors w-full max-w-xs">Continue</Button>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 6 */}
                                {step === 6 && (
                                    <div className="space-y-8 flex flex-col items-center">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-6">Timeline</h3>
                                        <div className="flex flex-col gap-4 w-full max-w-sm">
                                            {['Immediate', 'Within 1 month', '1–3 months', 'Just exploring'].map(t => (
                                                <ButtonSelect key={t} label={t} selected={formData.timeline === t} onClick={() => { updateForm('timeline', t); setStep(7); }} />
                                            ))}
                                        </div>
                                        <div className="mt-8 py-4 px-6 border-l-4 border-brass bg-brass/5 rounded-r max-w-sm w-full">
                                            <p className="text-onyx font-medium text-sm">✓ 45-day guaranteed delivery with clear agreement process.</p>
                                        </div>
                                    </div>
                                )}

                                {/* STEP 7 */}
                                {step === 7 && (
                                    <div className="max-w-lg mx-auto w-full">
                                        <h3 className="text-xl font-medium text-onyx text-center mb-8">Contact Details</h3>
                                        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <label className="caption text-graphite block mb-2">Name *</label>
                                                    <input required placeholder="Your full name" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} className="w-full bg-transparent border border-stone/30 text-onyx py-3 px-4 rounded-md focus:border-brass focus:outline-none text-sm" />
                                                </div>
                                                <div>
                                                    <label className="caption text-graphite block mb-2">Phone *</label>
                                                    <input required type="tel" placeholder="Mobile number" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="w-full bg-transparent border border-stone/30 text-onyx py-3 px-4 rounded-md focus:border-brass focus:outline-none text-sm" />
                                                </div>
                                                <div>
                                                    <label className="caption text-graphite block mb-2">Email *</label>
                                                    <input required type="email" placeholder="Email address" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="w-full bg-transparent border border-stone/30 text-onyx py-3 px-4 rounded-md focus:border-brass focus:outline-none text-sm" />
                                                </div>

                                                <div className="pt-6">
                                                    <label className="caption text-graphite block mb-3 text-center">Preferred consultation mode *</label>
                                                    <div className="grid grid-cols-2 gap-3">
                                                        {['Call', 'WhatsApp', 'Site Visit', 'Showroom Visit'].map(m => (
                                                            <ButtonSelect key={m} label={m} selected={formData.consultationMode === m} onClick={() => updateForm('consultationMode', m)} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="pt-6">
                                                <Button type="primary" disabled={isSubmitting || !formData.consultationMode} className="w-full py-6 text-sm tracking-wider uppercase bg-brass text-white hover:bg-onyx hover:text-white transition-all duration-300 disabled:opacity-50 shadow-md">
                                                    {isSubmitting ? 'Submitting...' : 'Book Free Consultation'}
                                                </Button>
                                            </div>
                                        </form>
                                    </div>
                                )}

                                {/* STEP 8: SUCCESS */}
                                {step === 8 && (
                                    <div className="space-y-8 py-8 text-center flex flex-col items-center justify-center">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                                            className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-500 border-2 border-emerald-500 flex items-center justify-center mb-4"
                                        >
                                            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </motion.div>

                                        <div>
                                            <h3 className="text-3xl font-display text-onyx mb-4">Thank you!</h3>
                                            <p className="text-graphite text-lg max-w-md mx-auto">Our Chennai design expert will contact you within <span className="font-medium text-onyx">30 minutes</span>.</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-8 w-full">
                                            <div className="px-5 py-3 border border-brass/30 bg-brass/5 text-onyx text-sm font-medium rounded-md shadow-sm">✓ 45 Days Delivery</div>
                                            <div className="px-5 py-3 border border-brass/30 bg-brass/5 text-onyx text-sm font-medium rounded-md shadow-sm">✓ 15 Years Warranty</div>
                                            <div className="px-5 py-3 border border-brass/30 bg-brass/5 text-onyx text-sm font-medium rounded-md shadow-sm">✓ Starts from ₹1.9L</div>
                                        </div>

                                        <div className="flex gap-6 mt-4 justify-center pt-8 border-t border-stone/20 w-full max-w-lg">
                                            <button onClick={() => navigate('/')} className="text-sm font-medium text-graphite hover:text-brass transition-colors uppercase tracking-wide">Return Home</button>
                                            <span className="text-stone">|</span>
                                            <a href="#" className="text-sm font-medium text-graphite hover:text-brass transition-colors uppercase tracking-wide">Download Brochure</a>
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
};

export default BookConsultation;
