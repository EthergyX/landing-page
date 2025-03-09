"use client";
// src/app/team/page.tsx
import { motion } from "framer-motion";
import Layout from "@/components/Layout";
import Image from "next/image";

export default function Team(): JSX.Element {
  // Team members data
  const teamMembers = [
    {
      name: "Ethan Chriss",
      position: "Chief Executive Officer",
      bio: "Ethan is the founder of EthergyX. He is passionate about the energy transition and is excited to find innovative solutions to facilitate growing energy demand.",
      linkedinUrl: "https://www.linkedin.com/in/ethan-chriss",
      imgSrc: "/team/EthanHeadshot.jpg", // You'll need to add these images
    },
    {
      name: "Jake Oswald",
      position: "Chief Product Officer",
      bio: "Jake is working towards his Master's of Geographic Information Systems and Technologies. He is building a program to optimize DER deployments in virtual power plants.",
      linkedinUrl: "https://www.linkedin.com/in/jake-oswald",
      imgSrc: "/team/JakeHeadshot.jpg",
    },
    {
      name: "Bryan Chay",
      position: "Chief Financial Officer",
      bio: "Bryan has experience with energy and infrastructure financing. He is building a platform to optimize DER financing for community microgrids and virtual power plants.",
      linkedinUrl: "https://www.linkedin.com/in/bryan-chay",
      imgSrc: "/team/BryanHeadshot.jpg",
    },
    {
      name: "Josh Gallardy",
      position: "Renewable Energy Specialist",
      bio: "Josh graduated from UC San Diego and has experience in the renewable energy sector. He is working on building software solutions for distributed energy resources.",
      linkedinUrl: "https://www.linkedin.com/in/josh-gallardy",
      imgSrc: "/team/JoshHeadshot.jpg",
    },
  ];

  return (
    <Layout>
      {/* Team Header Section */}
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Meet Our <span className="text-blue-400">Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto text-blue-100"
          >
            The innovative minds behind EthergyX&apos;s virtual power plant technology
          </motion.p>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="pb-24">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-8 border border-blue-500/20 flex flex-col md:flex-row gap-6"
              >
                <div className="md:w-1/3">
                  <div className="rounded-xl overflow-hidden aspect-square bg-blue-900/30 flex items-center justify-center">
                    {/* If you have actual images, use this: */}
                    <Image
                      src={member.imgSrc}
                      alt={`${member.name} - ${member.position}`}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover"
                    />

                    {/* Placeholder SVG (remove if using real images) */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 text-blue-400 opacity-50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0
                        00-7 7h14a7 7 0
                        00-7-7z"
                      />
                    </svg>
                  </div>
                </div>

                <div className="md:w-2/3">
                  <h2 className="text-2xl font-bold mb-1">{member.name}</h2>
                  <p className="text-blue-400 mb-4">{member.position}</p>
                  <p className="text-blue-100">{member.bio}</p>

                  <div className="mt-4 flex space-x-3">
                    {/* LinkedIn link */}
                    <a
                      href={member.linkedinUrl}
                      target="_blank"            // Open in new tab
                      rel="noopener noreferrer"  // Security best practice
                      className="text-blue-300 hover:text-blue-400 transition duration-300"
                    >
                      {/* LinkedIn SVG icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0
                          2.761 2.239 5 5 5h14c2.762 0 5-2.239
                          5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966
                          0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764
                          1.75.79 1.75 1.764-.783 1.764-1.75
                          1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4
                          0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777
                          7 2.476v6.759z"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Values Section */}
      <div className="bg-gray-900/90 backdrop-blur-lg py-16">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              The principles that guide our work and shape our company culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-blue-500/20 text-center"
            >
              <div className="rounded-full bg-blue-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 3.517-1.009 6.799-2.753
                    9.571m-3.44-2.04l.054-.09A13.916
                    13.916 0 008 11a4 4 0
                    118 0c0 1.017-.07 2.019-.203
                    3m-2.118 6.844A21.88
                    21.88 0 0015.171 17m3.839
                    1.132c.645-2.266.99-4.659.99-7.132A8 8 0
                    008 4.07M3 15.364c.64-1.319
                    1-2.8 1-4.364 0-1.457.39-2.823
                    1.07-4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-blue-100">
                We&apos;re committed to building energy solutions that create a more
                sustainable future for our planet.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-green-500/20 text-center"
            >
              <div className="rounded-full bg-green-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-green-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364
                    1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828
                    9.9a5 5 0
                    117.072 0l-.548.547A3.374 3.374 0
                    0014 18.469V19a2 2 0
                    11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Innovation</h3>
              <p className="text-blue-100">
                We constantly push boundaries to find new solutions to the world&apos;s most pressing energy challenges.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-gray-800/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 text-center"
            >
              <div className="rounded-full bg-purple-500/20 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-purple-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0
                    00-5.356-1.857M17 20H7m10
                    0v-2c0-.656-.126-1.283-.356-1.857M7
                    20H2v-2a3 3 0
                    015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0
                    0a5.002 5.002 0
                    019.288 0M15 7a3 3 0
                    11-6 0 3 3 0 016 0zm6
                    3a2 2 0
                    11-4 0 2 2 0
                    014 0zM7 10a2 2 0
                    11-4 0 2 2 0
                    014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Collaboration</h3>
              <p className="text-blue-100">
                We believe in the power of partnerships and collaborative problem-solving to achieve our mission.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Join Our Team CTA */}
      <div className="bg-gradient-to-b from-gray-900/90 to-blue-900/80 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Team</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
              Interested in helping build the energy grid of tomorrow? We&apos;re always looking
              for talented individuals who share our passion for innovation and sustainability.
            </p>

            <a
              href="/contact"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-lg transition duration-300 inline-block"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
}
