import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// Import videos
import video1BHK from "@/assets/1 bhk.mp4";
import video2BHK from "@/assets/2 bhk.mp4";
import video3BHK from "@/assets/3 bhk.mp4";
import video4BHK from "@/assets/4 bhk1.mp4";

const floorplans = [
    { id: "1bhk", label: "1 BHK", video: video1BHK },
    { id: "2bhk", label: "2 BHK", video: video2BHK },
    { id: "3bhk", label: "3 BHK", video: video3BHK },
    { id: "4bhk", label: "4 BHK", video: video4BHK },
];

const BookConsultation = () => {
    const [step, setStep] = useState(1);
    const [selectedFloorplan, setSelectedFloorplan] = useState<string>("1bhk");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);
    const navigate = useNavigate();
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleFloorplanSelect = (floorplanId: string) => {
        setSelectedFloorplan(floorplanId);
    };

    const handleContinue = () => {
        setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formRef.current) return;

        try {
            // 1. Send Email via EmailJS
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            // 2. Submit to Google Sheets via Backend
            const formData = new FormData(formRef.current);
            const data = {
                firstName: formData.get('first_name'),
                lastName: formData.get('last_name'),
                email: formData.get('to_email'),
                projectType: selectedFloorplan,
                projectBrief: formData.get('message'),
            };

            await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            toast.success("Request sent successfully! We'll be in touch soon.");
            formRef.current.reset();
            setTimeout(() => navigate('/'), 2000);
        } catch (error) {
            console.error('FAILED...', error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-offwhite">
            <div className="bg-onyx shadow-lg">
                <Header />
            </div>

            <section className="section-padding-light">
                <div className="container-arch max-w-5xl">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <p className="caption text-brass mb-4">GET YOUR FREE ESTIMATE</p>
                        <h1 className="text-4xl md:text-5xl font-display text-onyx mb-4">
                            in <span className="text-brass">under 30 seconds!</span>
                        </h1>
                        <p className="text-graphite">Share your preferences for an accurate estimate</p>

                        <div className="flex items-center justify-center gap-4 mt-6">
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 1 ? 'bg-brass text-onyx' : 'bg-onyx text-offwhite'
                                    }`}>
                                    1
                                </div>
                                <span className="text-sm text-graphite hidden sm:inline">Floorplan</span>
                            </div>
                            <div className="h-px w-12 bg-stone/30"></div>
                            <div className="flex items-center gap-2">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === 2 ? 'bg-brass text-onyx' : 'bg-stone/20 text-graphite'
                                    }`}>
                                    2
                                </div>
                                <span className="text-sm text-graphite hidden sm:inline">Details</span>
                            </div>
                        </div>
                    </motion.div>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            >
                                {/* Side Menu */}
                                <div className="lg:col-span-1 space-y-3">
                                    <h3 className="text-lg font-medium text-onyx mb-4">Your floorplan</h3>
                                    {floorplans.map((plan, index) => (
                                        <motion.button
                                            key={plan.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            onClick={() => handleFloorplanSelect(plan.id)}
                                            className={`w-full text-left px-6 py-4 rounded-lg border-2 transition-all duration-300 ${selectedFloorplan === plan.id
                                                ? 'border-brass bg-brass/5 text-onyx'
                                                : 'border-stone/20 bg-white text-graphite hover:border-stone/40'
                                                }`}
                                        >
                                            <span className="text-lg font-medium uppercase tracking-label">
                                                {plan.label}
                                            </span>
                                        </motion.button>
                                    ))}

                                    <InteractiveHoverButton
                                        text="Continue"
                                        onClick={handleContinue}
                                        className="mt-6"
                                    />
                                </div>

                                {/* Video Player */}
                                <div className="lg:col-span-2">
                                    <motion.div
                                        key={selectedFloorplan}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className="rounded-lg overflow-hidden"
                                    >
                                        <video
                                            ref={videoRef}
                                            src={floorplans.find(p => p.id === selectedFloorplan)?.video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            className="w-full h-auto object-contain block"
                                        />
                                    </motion.div>
                                    <div className="mt-4 text-center">
                                        <p className="text-sm text-graphite">
                                            <span className="text-brass font-medium">
                                                {floorplans.find(p => p.id === selectedFloorplan)?.label}
                                            </span>
                                            {" "}selected
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="max-w-2xl mx-auto"
                            >
                                <div className="bg-onyx p-8 md:p-12 rounded-lg">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="text-xl text-offwhite font-medium tracking-label">
                                            Your Details
                                        </h3>
                                        <button
                                            onClick={() => setStep(1)}
                                            className="text-sm text-stone hover:text-brass transition-colors"
                                        >
                                            ← Change Floorplan
                                        </button>
                                    </div>

                                    <div className="mb-6 p-4 bg-brass/10 rounded border border-brass/20">
                                        <p className="text-sm text-stone">Selected: <span className="text-brass font-medium">{floorplans.find(p => p.id === selectedFloorplan)?.label}</span></p>
                                    </div>

                                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                                        <input type="hidden" name="project_type" value={selectedFloorplan || ''} />

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label className="caption text-stone block mb-2">First Name</label>
                                                <input
                                                    type="text"
                                                    name="first_name"
                                                    required
                                                    className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                                                    placeholder="John"
                                                />
                                            </div>
                                            <div>
                                                <label className="caption text-stone block mb-2">Last Name</label>
                                                <input
                                                    type="text"
                                                    name="last_name"
                                                    required
                                                    className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                                                    placeholder="Smith"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="caption text-stone block mb-2">Email Address</label>
                                            <input
                                                type="email"
                                                name="to_email"
                                                required
                                                className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div>
                                            <label className="caption text-stone block mb-2">Additional Requirements</label>
                                            <textarea
                                                name="message"
                                                rows={4}
                                                className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors duration-500 resize-none"
                                                placeholder="Tell us about your preferences..."
                                            />
                                        </div>

                                        <Button
                                            type="primary"
                                            size="large"
                                            shape="rounded"
                                            fullWidth
                                            loading={isSubmitting}
                                            disabled={isSubmitting}
                                        >
                                            Get Free Estimate
                                        </Button>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BookConsultation;
