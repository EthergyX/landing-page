"use client"
// src/app/contact/page.tsx
import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/Layout";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<{
    submitted: boolean;
    success?: boolean;
    message?: string;
  }>({
    submitted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ submitted: true });
    
    // The form will be handled by Netlify automatically 
    // We just need to show a success message to the user
    setFormStatus({
      submitted: true,
      success: true,
      message: "Your message has been sent! We&apos;ll get back to you soon.",
    });
    
    // Reset form after submission
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <Layout>
      {/* Contact Hero Section */}
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get in <span className="text-blue-400">Touch</span>
            </h1>
            
            <p className="text-xl text-blue-50 mb-10">
              Have questions about our platform or want to schedule a demo?
              We&apos;d love to hear from you.
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Contact Form Section */}
      <div className="py-20 bg-gray-900/90 backdrop-blur-lg">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
                
                <div className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Email</h3>
                    <p className="text-blue-100">contact@ethergyx.com</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-blue-300">Phone</h3>
                    <p className="text-blue-100">(479) 257-0054</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {formStatus.submitted && formStatus.success ? (
                  <div className="bg-green-500/20 border border-green-500/30 p-6 rounded-lg">
                    <h3 className="text-xl font-semibold mb-2 text-green-300">Message Sent!</h3>
                    <p className="text-white">{formStatus.message}</p>
                  </div>
                ) : (
                  <form 
                    className="space-y-6" 
                    name="contact" 
                    method="POST" 
                    data-netlify="true"
                    netlify-honeypot="bot-field"
                    onSubmit={handleSubmit}
                  >
                    <input type="hidden" name="form-name" value="contact" />
                    <p className="hidden">
                      <label>
                        Don&apos;t fill this out if you&apos;re human: <input name="bot-field" />
                      </label>
                    </p>
                    
                    <div>
                      <label htmlFor="name" className="block text-blue-200 mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                        placeholder="Your name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-blue-200 mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                        placeholder="Your email"
                        required
                        value={formState.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-blue-200 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        className="w-full bg-gray-800/50 border border-blue-500/30 rounded-lg p-3 text-white"
                        placeholder="Your message"
                        required
                        value={formState.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 w-full"
                      disabled={formStatus.submitted && !formStatus.success}
                    >
                      {formStatus.submitted && !formStatus.success 
                        ? "Sending..." 
                        : "Send Message"}
                    </button>
                  </form>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}