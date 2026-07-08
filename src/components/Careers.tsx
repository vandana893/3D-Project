// import { useEffect, useRef } from 'react';
// import gsap from 'gsap';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
// import { Briefcase, ArrowUpRight } from 'lucide-react';

// gsap.registerPlugin(ScrollTrigger);

// const jobs = [
//   {
//     title: 'Lead Electrical Grid Architect',
//     location: 'Frankfurt, Germany',
//     department: 'Smart Infrastructure',
//     type: 'Full-Time',
//   },
//   {
//     title: 'Senior Automation Developer (R&D)',
//     location: 'Singapore',
//     department: 'Industrial Systems',
//     type: 'Full-Time',
//   },
//   {
//     title: 'BESS Integration Specialist',
//     location: 'Houston, USA',
//     department: 'Renewable Power',
//     type: 'Full-Time',
//   },
//   {
//     title: 'High Voltage Engineer',
//     location: 'Dubai, UAE',
//     department: 'Substation Engineering',
//     type: 'Full-Time',
//   },
// ];

// export default function Careers() {
//   const containerRef = useRef<HTMLDivElement>(null);
//   const listRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (containerRef.current) {
//       gsap.fromTo(
//         containerRef.current.children,
//         { y: 50, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 1,
//           stagger: 0.15,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: containerRef.current,
//             start: 'top 80%',
//           },
//         }
//       );
//     }

//     if (listRef.current) {
//       gsap.fromTo(
//         listRef.current.children,
//         { y: 40, opacity: 0 },
//         {
//           y: 0,
//           opacity: 1,
//           duration: 0.8,
//           stagger: 0.12,
//           ease: 'power3.out',
//           scrollTrigger: {
//             trigger: listRef.current,
//             start: 'top 85%',
//           },
//         }
//       );
//     }
//   }, []);

//   return (
//     <section id="careers" className="section" style={{ zIndex: 10 }}>
//       <div className="container">
//         <div
//           ref={containerRef}
//           style={{
//             textAlign: 'center',
//             marginBottom: '5rem',
//           }}
//         >
//           <div
//             style={{
//               display: 'inline-block',
//               padding: '0.5rem 1rem',
//               borderRadius: '100px',
//               backgroundColor: 'rgba(14, 165, 233, 0.1)',
//               color: 'var(--color-accent-1)',
//               fontSize: '0.875rem',
//               fontWeight: 600,
//               letterSpacing: '0.05em',
//               marginBottom: '1.5rem',
//               textTransform: 'uppercase',
//             }}
//           >
//             Careers
//           </div>
//           <h2 className="h2" style={{ color: 'var(--color-fg)', marginBottom: '1.5rem' }}>
//             Build the Future of <span className="text-gradient">Intelligent</span> Power
//           </h2>
//           <p className="text-lg" style={{ maxWidth: '650px', margin: '0 auto' }}>
//             Join a world-class team of engineers, designers, and innovators redesigning global power transmission systems, high-voltage networks, and green infrastructure.
//           </p>
//         </div>

//         <div
//           ref={listRef}
//           style={{
//             maxWidth: '1000px',
//             margin: '0 auto',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: '1.5rem',
//           }}
//         >
//           {jobs.map((job, index) => (
//             <div
//               key={index}
//               className="glass-panel"
//               style={{
//                 display: 'flex',
//                 justifyContent: 'space-between',
//                 alignItems: 'center',
//                 padding: '2rem 2.5rem',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
//                 background: 'rgba(255, 255, 255, 0.55)',
//               }}
//               onMouseEnter={(e) => {
//                 const target = e.currentTarget as HTMLDivElement;
//                 target.style.transform = 'translateX(10px) translateY(-2px)';
//                 target.style.borderColor = 'rgba(14, 165, 233, 0.4)';
//                 target.style.boxShadow = '0 20px 45px rgba(14, 165, 233, 0.08)';
//               }}
//               onMouseLeave={(e) => {
//                 const target = e.currentTarget as HTMLDivElement;
//                 target.style.transform = '';
//                 target.style.borderColor = '';
//                 target.style.boxShadow = '';
//               }}
//             >
//               <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
//                 <div
//                   style={{
//                     width: '46px',
//                     height: '46px',
//                     borderRadius: '12px',
//                     backgroundColor: 'rgba(14, 165, 233, 0.05)',
//                     color: 'var(--color-accent-1)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                   }}
//                 >
//                   <Briefcase size={20} />
//                 </div>
//                 <div>
//                   <h3
//                     style={{
//                       fontSize: '1.25rem',
//                       fontWeight: 600,
//                       color: 'var(--color-fg)',
//                       marginBottom: '0.25rem',
//                     }}
//                   >
//                     {job.title}
//                   </h3>
//                   <div style={{ display: 'flex', gap: '1rem', opacity: 0.6, fontSize: '0.85rem' }}>
//                     <span>{job.location}</span>
//                     <span>•</span>
//                     <span>{job.department}</span>
//                   </div>
//                 </div>
//               </div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
//                 <span
//                   style={{
//                     fontSize: '0.85rem',
//                     fontWeight: 500,
//                     padding: '0.35rem 0.85rem',
//                     borderRadius: '100px',
//                     backgroundColor: 'rgba(14, 165, 233, 0.08)',
//                     color: 'var(--color-accent-1)',
//                   }}
//                 >
//                   {job.type}
//                 </span>
//                 <div
//                   style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     backgroundColor: 'var(--color-fg)',
//                     color: '#fff',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     transition: 'background-color 0.3s',
//                   }}
//                   className="careers-arrow"
//                 >
//                   <ArrowUpRight size={18} />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
