"use client";

import type React from "react";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Send, ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Card, CardContent } from "~/components/ui/card";

const contactCardVariants = {
  hidden: { opacity: 0, x: -50, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
  hover: {
    y: -8,
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const titleVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    },
  },
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: -5 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      delay: 0.3,
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.05,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 10,
    },
  },
};

const formVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.8,
      type: "spring",
      stiffness: 100,
    },
  },
};

const floatingBubbleVariants = {
  initial: (i: number) => ({
    x: Math.random() * 10 - 5,
    y: Math.random() * 10 - 5,
    opacity: 0.7 + Math.random() * 0.3,
  }),
  animate: (i: number) => ({
    x: Math.random() * 20 - 10,
    y: Math.random() * 20 - 10,
    opacity: 0.7 + Math.random() * 0.3,
    transition: {
      duration: 3 + Math.random() * 2,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse" as "reverse",
      delay: i * 0.2,
    },
  }),
};

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const [activeTab, setActiveTab] = useState<"links" | "form">("links");
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const contacts = [
    {
      href: "mailto:saputrathoriq@gmail.com",
      icon: "/contact/gmail.svg",
      alt: "GMAIL",
      title: "Email",
      description:
        "Send me an email to discuss your project or ask any questions",
      value: "saputrathoriq@gmail.com",
    },
    {
      href: "https://instagram.com/thoriqsaputra_",
      icon: "/contact/instagram.svg",
      alt: "instagram",
      title: "Instagram",
      description:
        "Follow me on Instagram to see my latest projects and updates",
      value: "@thoriqsaputra_",
    },
    {
      href: "https://www.linkedin.com/in/thoriqsaputra/",
      icon: "/contact/linkedin.svg",
      alt: "linkedin",
      title: "LinkedIn",
      description:
        "Connect with me on LinkedIn to view my professional profile",
      value: "linkedin.com/in/thoriqsaputra/",
    },
    {
      href: "https://github.com/thoriqsaputra",
      icon: "/contact/github.svg",
      alt: "github",
      title: "GitHub",
      description:
        "Check out my GitHub repositories to see my latest code projects",
      value: "github.com/thoriqsaputra",
    },
    {
      href: "https://twitter.com/ThoriqSaputra1",
      icon: "/contact/twitter.svg",
      alt: "twitter",
      title: "Twitter",
      description:
        "Follow me on Twitter to stay updated on my latest announcements",
      value: "@ThoriqSaputra1",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    setTimeout(() => {
      setFormStatus("success");

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    }, 1500);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);

    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  const bubbles = Array.from({ length: 15 }, (_, i) => i);

  return (
    <section
      id="contacts"
      ref={ref}
      className="w-full bg-light-pink border-b-8 border-pink-accent border-t-8 relative overflow-hidden"
    >
      {bubbles.map((i) => (
        <motion.div
          key={i}
          custom={i}
          variants={floatingBubbleVariants}
          initial="initial"
          animate="animate"
          className="absolute rounded-full bg-pink-accent/10"
          style={{
            width: 20 + Math.random() * 60,
            height: 20 + Math.random() * 60,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0,
          }}
        />
      ))}

      <div
        id="ContactContent"
        className="container mx-auto px-12 py-14 relative z-10"
      >
        <motion.section
          id="mycontacts"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
              },
            },
          }}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div
            id="titleIMG"
            className="flex flex-col items-center"
          >
            <motion.div className="relative mb-8" variants={titleVariants}>
              <h1
                id="mycontact"
                className="text-4xl md:text-5xl font-bold relative inline-flex z-10 contact-title-highlight"
              >
                CONTACT ME
              </h1>
              <div className="absolute -bottom-2 left-0 w-full h-4 bg-red-accent/70 -z-10 transform -rotate-1"></div>
            </motion.div>

            <motion.div
              className="relative w-full max-w-md"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src="/contact/ME.png"
                alt="Contact"
                className="ContactImg w-full rounded-lg"
              />
            </motion.div>

            <motion.div
              className="mt-8 bg-white/80 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-pink-accent/20 w-full max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="text-xl font-semibold text-red-accent mb-3">
                Let's Connect!
              </h3>
              <p className="text-gray-700">
                I'm always open to discussing new projects, creative ideas or
                opportunities to be part of your vision.
              </p>
            </motion.div>
          </motion.div>

          <div className="w-full max-w-xl mx-auto lg:mx-0">
            <motion.h2
              id="feelFree"
              className="text-red-accent text-xl sm:text-2xl font-semibold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Feel free to reach out to me for any inquiries or collaborations.
            </motion.h2>

            <div className="mb-6">
              <div className="flex space-x-2 bg-white/50 backdrop-blur-sm p-1 rounded-lg shadow-sm border border-pink-accent/20 mb-6">
                <Button
                  variant={activeTab === "links" ? "default" : "ghost"}
                  className={`flex-1 ${
                    activeTab === "links"
                      ? "bg-pink-accent text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("links")}
                >
                  Social Links
                </Button>
                <Button
                  variant={activeTab === "form" ? "default" : "ghost"}
                  className={`flex-1 ${
                    activeTab === "form"
                      ? "bg-pink-accent text-white"
                      : "text-gray-700"
                  }`}
                  onClick={() => setActiveTab("form")}
                >
                  Contact Form
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {activeTab === "links" ? (
                  <motion.div
                    key="links"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {contacts.map((contact, index) => (
                      <motion.div
                        key={index}
                        custom={index}
                        variants={contactCardVariants}
                        initial="hidden"
                        animate="visible"
                        whileHover="hover"
                        whileTap="tap"
                        className="group"
                      >
                        <Card className="overflow-hidden border-pink-accent/10 bg-white/90 backdrop-blur-sm hover:bg-light-orange/90 transition-all duration-300">
                          <CardContent className="p-0">
                            <div className="flex justify-between items-center gap-4 p-4">
                                <div className="relative">
                                  <div className="absolute inset-0 bg-pink-accent/10 rounded-full transform scale-0 group-hover:scale-150 transition-transform duration-500"></div>
                                  <img
                                    src={contact.icon || "/placeholder.svg"}
                                    alt={contact.alt}
                                    className="w-12 h-12 relative z-10 transition-transform duration-300 group-hover:scale-110"
                                  />
                                </div>

                                <div className="flex-1">
                                  <h3 className="font-semibold text-lg text-gray-900 group-hover:text-red-accent transition-colors duration-300">
                                    {contact.title}
                                  </h3>
                                  <p className="text-sm text-gray-600">
                                    {contact.description}
                                  </p>
                                </div>

                              <div className="flex flex-col md:flex-row gap-2 items-center justify-center">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-full h-8 w-8 p-0 border-pink-accent/30 hover:border-pink-accent hover:bg-pink-accent/10"
                                  onClick={() =>
                                    copyToClipboard(contact.value, index)
                                  }
                                >
                                  {copiedIndex === index ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <Copy className="h-4 w-4" />
                                  )}
                                  <span className="sr-only">Copy</span>
                                </Button>

                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="rounded-full h-8 w-8 p-0 border-pink-accent/30 hover:border-pink-accent hover:bg-pink-accent/10"
                                  asChild
                                >
                                  <a
                                    href={contact.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                    <span className="sr-only">Open link</span>
                                  </a>
                                </Button>
                              </div>
                            </div>

                            <div className="h-1 w-0 bg-gradient-to-r from-pink-accent to-red-accent group-hover:w-full transition-all duration-500"></div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg text-black p-6 border border-pink-accent/20"
                  >
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Your name"
                            required
                            className="border-pink-accent/20 focus:border-pink-accent focus:ring-pink-accent/30"
                            disabled={
                              formStatus === "submitting" ||
                              formStatus === "success"
                            }
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 mb-1"
                          >
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="your.email@example.com"
                            required
                            className="border-pink-accent/20 focus:border-pink-accent focus:ring-pink-accent/30"
                            disabled={
                              formStatus === "submitting" ||
                              formStatus === "success"
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="What is this regarding?"
                          required
                          className="border-pink-accent/20 focus:border-pink-accent focus:ring-pink-accent/30"
                          disabled={
                            formStatus === "submitting" ||
                            formStatus === "success"
                          }
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Your message here..."
                          rows={5}
                          required
                          className="border-pink-accent/20 focus:border-pink-accent focus:ring-pink-accent/30"
                          disabled={
                            formStatus === "submitting" ||
                            formStatus === "success"
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-pink-accent hover:bg-red-accent text-white transition-colors duration-300"
                        disabled={
                          formStatus === "submitting" ||
                          formStatus === "success"
                        }
                      >
                        {formStatus === "idle" && (
                          <>
                            <Send className="mr-2 h-4 w-4" /> Send Message
                          </>
                        )}
                        {formStatus === "submitting" && (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending...
                          </>
                        )}
                        {formStatus === "success" && (
                          <>
                            <Check className="mr-2 h-4 w-4" /> Message Sent!
                          </>
                        )}
                      </Button>

                      {formStatus === "success" && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-center text-green-600 bg-green-50 p-3 rounded-md"
                        >
                          Thank you for your message! I'll get back to you soon.
                        </motion.div>
                      )}
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>
      </div>
    </section>
  );
}
