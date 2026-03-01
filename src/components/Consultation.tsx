import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import SectionLabel from "./SectionLabel";
import emailjs from '@emailjs/browser';
import { toast } from "sonner";

// Images
import officeImg from "../assets/Office.png";
import residentialImg from "../assets/Residential.png";
import commercialImg from "../assets/Commercial .png";
import renovationImg from "../assets/renovation.png";
import planningImg from "../assets/planning.png";
import constructionImg from "../assets/construction.png";
import handoverImg from "../assets/handover.png";

const Consultation = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    projectType: '',
    location: 'Chennai',
    area: '',
    floorplan: '',
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [4, -4]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 7) {
      setStep(step + 1);
      return;
    }

    setIsSubmitting(true);
    let formElement = formRef.current;

    // We create a hidden form if needed to use with EmailJS or we can build the template params manually
    try {
      // 1. Send Email via EmailJS
      const templateParams = {
        first_name: formData.name, // Mapping correctly 
        last_name: '', // Empty last name to fit old template
        to_email: formData.email,
        project_type: formData.projectType,
        message: `
          Phone: ${formData.phone}
          Mode: ${formData.consultationMode}
          Location: ${formData.location}
          Area: ${formData.area}
          Floorplan: ${formData.floorplan}
          Stage: ${formData.projectStage}
          Budget: ${formData.budget}
          Requirements: ${formData.requirements.join(", ")}
          Material: ${formData.material}
          Timeline: ${formData.timeline}
        `
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
        projectType: formData.projectType,
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
      className={`relative cursor-pointer group flex flex-col items-center justify-center p-4 border transition-all duration-300 ${selected ? 'border-brass bg-stone/20' : 'border-stone/20 hover:border-brass/50'}`}
    >
      <img src={image} alt={label} className="w-16 h-16 object-contain mb-3 group-hover:scale-110 transition-transform duration-300" />
      <span className={`text-sm text-center ${selected ? 'text-brass' : 'text-offwhite'}`}>{label}</span>
    </div>
  );

  const ButtonSelect = ({ label, selected, onClick }: any) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 border transition-colors duration-300 text-sm ${selected ? 'border-brass text-brass bg-brass/10' : 'border-stone/30 text-stone hover:border-stone/80 hover:text-offwhite'}`}
    >
      {label}
    </button>
  );

  return (
    <section id="consultation" className="bg-offwhite section-padding-light relative overflow-hidden">
      <motion.div
        className="absolute top-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />

      <motion.div className="container-arch" ref={ref} style={{ y: sectionY }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <SectionLabel number="06" label="Visit Our Studio" variant="light" />
            <motion.h2
              className="text-onyx mb-6"
              initial={{ opacity: 0, y: 20, letterSpacing: "0.08em" }}
              animate={isInView ? { opacity: 1, y: 0, letterSpacing: "0.04em" } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Begin With a Conversation
            </motion.h2>

            <motion.div
              className="brass-line mb-8"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ originX: 0 }}
            />

            <motion.p
              className="text-graphite text-lg leading-relaxed mb-8"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Every project begins with understanding. Schedule a consultation
              at our studio to discuss your vision, explore material samples,
              and discover how we can bring certainty to your interior project.
            </motion.p>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {[
                {
                  title: "Studio Address",
                  content: (
                    <a
                      href="https://www.google.com/maps/search/112+Thyagaraya+Road+18%2F19+Vairam+Complex+Ground+floor+Pondy+Bazzar+T.Nagar+Chennai+Tamil+Nadu+600017"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-brass transition-colors duration-300"
                    >
                      112 Thyagaraya Road, 18/19 Vairam Complex,{"\n"}
                      Ground floor, Pondy Bazzar,{"\n"}
                      T.Nagar, Chennai, Tamil Nadu, 600017
                    </a>
                  )
                },
                {
                  title: "Opening Hours",
                  content: "Monday – Sunday: 10:00 – 19:00"
                },
                {
                  title: "Contact",
                  content: (
                    <>
                      <a href="mailto:studio@knbinnovations.com" className="underline hover:text-brass transition-colors duration-300">
                        studio@knbinnovations.com
                      </a>
                      {"\n"}
                      <a href="tel:+919500107162" className="underline hover:text-brass transition-colors duration-300">
                        +91 9500107162
                      </a>
                    </>
                  )
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  className="group"
                >
                  <h4 className="caption text-onyx mb-2 group-hover:text-brass transition-colors duration-300">
                    {item.title}
                  </h4>
                  <div className="text-graphite whitespace-pre-line">
                    {item.content}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Form Wizard */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-onyx p-8 md:p-12 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Header / Back Button */}
            {step < 8 && (
              <div className="flex justify-between items-center mb-8">
                <motion.h3
                  className="text-offwhite text-xl font-medium tracking-label"
                >
                  Request Consultation {step < 8 && <span className="text-brass ml-2 text-sm italic">Step {step} of 7</span>}
                </motion.h3>
                {step > 1 && step < 8 && (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="text-stone hover:text-brass text-sm transition-colors"
                  >
                    ← Back
                  </button>
                )}
              </div>
            )}

            <div className="flex-grow">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* STEP 1 */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">What are you looking for?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <OptionCard image={officeImg} label="Office" selected={formData.projectType === 'Office'} onClick={() => { updateForm('projectType', 'Office'); setStep(2); }} />
                        <OptionCard image={residentialImg} label="Residential" selected={formData.projectType === 'Residential'} onClick={() => { updateForm('projectType', 'Residential'); setStep(2); }} />
                        <OptionCard image={commercialImg} label="Commercial" selected={formData.projectType === 'Commercial'} onClick={() => { updateForm('projectType', 'Commercial'); setStep(2); }} />
                        <OptionCard image={renovationImg} label="Renovation" selected={formData.projectType === 'Renovation'} onClick={() => { updateForm('projectType', 'Renovation'); setStep(2); }} />
                      </div>
                    </div>
                  )}

                  {/* STEP 2 */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">Property Details</label>

                      <div className="space-y-4">
                        <div>
                          <label className="caption text-stone block mb-2">Location</label>
                          <input readOnly value={formData.location} className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 outline-none" />
                        </div>
                        <div>
                          <label className="caption text-stone block mb-2">Area (optional text)</label>
                          <input
                            placeholder="e.g. 1500 sqft"
                            value={formData.area}
                            onChange={(e) => updateForm('area', e.target.value)}
                            className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors"
                          />
                        </div>
                        <div>
                          <label className="caption text-stone block mb-2 mt-6">Floorplan</label>
                          <div className="flex flex-wrap gap-3">
                            {['1 BHK', '2 BHK', '3 BHK', '4+ BHK'].map(f => (
                              <ButtonSelect key={f} label={f} selected={formData.floorplan === f} onClick={() => updateForm('floorplan', f)} />
                            ))}
                          </div>
                          {formData.floorplan === '2 BHK' && <p className="text-brass text-sm mt-3 animate-pulse">2 BHK starts from ₹1.9L</p>}
                          {formData.floorplan === '3 BHK' && <p className="text-brass text-sm mt-3 animate-pulse">3 BHK starts from ₹3.8L</p>}
                        </div>
                      </div>
                      <button onClick={() => setStep(3)} disabled={!formData.floorplan} className="mt-8 w-full border border-brass py-3 text-offwhite uppercase tracking-wider text-sm hover:bg-brass hover:text-onyx transition-colors disabled:opacity-50">Next</button>
                    </div>
                  )}

                  {/* STEP 3 */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">Current stage?</label>
                      <div className="grid grid-cols-2 gap-4">
                        <OptionCard image={planningImg} label="Planning stage" selected={formData.projectStage === 'Planning stage'} onClick={() => { updateForm('projectStage', 'Planning stage'); setStep(4); }} />
                        <OptionCard image={constructionImg} label="Under construction" selected={formData.projectStage === 'Under construction'} onClick={() => { updateForm('projectStage', 'Under construction'); setStep(4); }} />
                        <OptionCard image={handoverImg} label="Newly handed over" selected={formData.projectStage === 'Newly handed over'} onClick={() => { updateForm('projectStage', 'Newly handed over'); setStep(4); }} />
                        <OptionCard image={renovationImg} label="Renovation existing home" selected={formData.projectStage === 'Renovation existing home'} onClick={() => { updateForm('projectStage', 'Renovation existing home'); setStep(4); }} />
                      </div>
                      <p className="text-stone italic text-sm mt-4 text-center">"We provide A-Z interior solutions from construction stage to handover."</p>
                    </div>
                  )}

                  {/* STEP 4 */}
                  {step === 4 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">Budget Range</label>
                      <div className="flex flex-wrap gap-3">
                        {['₹1L – ₹2L', '₹2L – ₹4L', '₹4L – ₹6L', '₹6L+', 'Not sure'].map(b => (
                          <ButtonSelect key={b} label={b} selected={formData.budget === b} onClick={() => { updateForm('budget', b); setStep(5); }} />
                        ))}
                      </div>
                      <p className="text-stone italic text-sm mt-6 text-center">"Budget-focused execution with zero space wastage."</p>
                    </div>
                  )}

                  {/* STEP 5 */}
                  {step === 5 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">Requirements & Preferences</label>
                      <div className="flex flex-wrap gap-3 mb-6">
                        {['Full Home Interiors', 'Modular Kitchen', 'Wardrobes', 'TV Unit', 'False Ceiling', 'Lighting', 'Custom requirements'].map(req => (
                          <ButtonSelect key={req} label={req} selected={formData.requirements.includes(req)} onClick={() => toggleRequirement(req)} />
                        ))}
                      </div>

                      <div className="mt-4">
                        <label className="caption text-stone block mb-2">Material preference (Optional)</label>
                        <select
                          value={formData.material}
                          onChange={(e) => updateForm('material', e.target.value)}
                          className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none transition-colors appearance-none cursor-pointer"
                        >
                          <option value="" className="bg-onyx">Not specified</option>
                          <option value="BWP" className="bg-onyx">BWP</option>
                          <option value="BWR" className="bg-onyx">BWR</option>
                          <option value="MR" className="bg-onyx">MR</option>
                          <option value="HDHMR" className="bg-onyx">HDHMR</option>
                          <option value="Not sure" className="bg-onyx">Not sure</option>
                        </select>
                      </div>

                      <p className="text-stone italic text-sm mt-6 text-center">"100% customized interiors based on your space and lifestyle."</p>
                      <button onClick={() => setStep(6)} disabled={formData.requirements.length === 0} className="mt-4 w-full border border-brass py-3 text-offwhite uppercase tracking-wider text-sm hover:bg-brass hover:text-onyx transition-colors disabled:opacity-50">Next</button>
                    </div>
                  )}

                  {/* STEP 6 */}
                  {step === 6 && (
                    <div className="space-y-6">
                      <label className="text-offwhite mb-4 block">Timeline</label>
                      <div className="flex flex-col gap-3">
                        {['Immediate', 'Within 1 month', '1–3 months', 'Just exploring'].map(t => (
                          <ButtonSelect key={t} label={t} selected={formData.timeline === t} onClick={() => { updateForm('timeline', t); setStep(7); }} />
                        ))}
                      </div>
                      <p className="text-brass italic text-sm mt-6 text-center">"45-day guaranteed delivery with clear agreement process."</p>
                    </div>
                  )}

                  {/* STEP 7 */}
                  {step === 7 && (
                    <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                      <label className="text-offwhite mb-4 block">Contact Details</label>
                      <div className="space-y-4">
                        <input required placeholder="Name *" value={formData.name} onChange={(e) => updateForm('name', e.target.value)} className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none" />
                        <input required type="tel" placeholder="Phone *" value={formData.phone} onChange={(e) => updateForm('phone', e.target.value)} className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none" />
                        <input required type="email" placeholder="Email *" value={formData.email} onChange={(e) => updateForm('email', e.target.value)} className="w-full bg-transparent border-b border-stone/30 text-offwhite py-3 focus:border-brass focus:outline-none" />

                        <div className="pt-4">
                          <label className="caption text-stone block mb-3">Preferred consultation mode: *</label>
                          <div className="flex flex-wrap gap-2">
                            {['Call', 'WhatsApp', 'Site Visit', 'Showroom Visit'].map(m => (
                              <ButtonSelect key={m} label={m} selected={formData.consultationMode === m} onClick={() => updateForm('consultationMode', m)} />
                            ))}
                          </div>
                        </div>
                      </div>

                      <button type="submit" disabled={isSubmitting || !formData.consultationMode} className="w-full border border-brass py-4 text-offwhite uppercase tracking-wide-editorial text-sm hover:bg-brass hover:text-onyx transition-all duration-500 mt-8 group flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span>{isSubmitting ? 'Submitting...' : 'Book Free Consultation'}</span>
                      </button>
                    </form>
                  )}

                  {/* STEP 8: SUCCESS */}
                  {step === 8 && (
                    <div className="space-y-8 py-8 text-center flex flex-col items-center justify-center h-full">
                      <div className="w-16 h-16 rounded-full border-2 border-brass flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-brass" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>

                      <h3 className="text-offwhite text-2xl font-medium tracking-label">Thank you!</h3>
                      <p className="text-stone">Our Chennai design expert will contact you within 30 minutes.</p>

                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center py-6 w-full">
                        <div className="px-4 py-2 border border-stone/20 bg-stone/5 text-brass text-sm rounded">45 Days Delivery</div>
                        <div className="px-4 py-2 border border-stone/20 bg-stone/5 text-brass text-sm rounded">15 Years Warranty</div>
                        <div className="px-4 py-2 border border-stone/20 bg-stone/5 text-brass text-sm rounded">Starting from ₹1.9L</div>
                      </div>

                      <div className="flex gap-4 mt-4">
                        <a href="#projects" onClick={() => setStep(1)} className="text-sm underline hover:text-brass transition-colors text-stone">View Projects</a>
                        <span className="text-stone">|</span>
                        <a href="/brochure" onClick={() => setStep(1)} className="text-sm underline hover:text-brass transition-colors text-stone">Download Brochure</a>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-stone/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </section>
  );
};

export default Consultation;
