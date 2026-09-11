import React from "react";
import { motion } from "framer-motion";

export interface Testimonial {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = ({
  testimonials,
  className = "",
  duration = 10,
}: {
  testimonials: Testimonial[];
  className?: string;
  duration?: number | string;
}) => {
  const parsedDuration = typeof duration === "string" ? parseInt(duration.replace(/\D/g, ""), 10) || 10 : duration;

  return (
    <div className={`flex flex-col gap-6 ${className}`}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration: parsedDuration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...testimonials, ...testimonials].map((item, index) => (
          <div
            key={index}
            className="p-6 border border-stone-200/90 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] bg-white/95 backdrop-blur-sm flex flex-col justify-between max-w-xs transition-all duration-300 hover:shadow-md hover:border-stone-300 hover:-translate-y-0.5"
          >
            <p className="font-sans text-stone-700 text-sm leading-relaxed font-normal">"{item.text}"</p>
            <div className="flex items-center gap-3 mt-5 pt-3 border-t border-stone-100">
              <img
                src={item.image.replace(/\[|\]|\(|\)/g, "")}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover ring-1 ring-stone-200"
              />
              <div className="flex flex-col">
                <span className="font-sans font-semibold text-stone-900 text-xs tracking-wider uppercase">{item.name}</span>
                <span className="font-sans text-[11px] text-[#b87d1d] uppercase tracking-wider font-medium">{item.role}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const testimonialsData: Testimonial[] = [
  {
    text: "Experiência incrível, rigor estético e profissionalismo irrepreensível.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    name: "Sofia Mota",
    role: "Investidora",
  },
  {
    text: "O projeto superou todas as expetativas de arquitetura e luz natural.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    name: "Carlos Silva",
    role: "Proprietário",
  },
  {
    text: "Atenção ao detalhe em cada acabamento. Recomendo vivamente.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    name: "Mariana Costa",
    role: "Cliente",
  },
  {
    text: "Uma abordagem limpa e contemporânea ao imobiliário de luxo.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    name: "Diogo Ferreira",
    role: "Investidor",
  },
  {
    text: "Processo fluido e acompanhamento personalizado do início ao fim.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    name: "Inês Ramos",
    role: "Arquiteta",
  },
  {
    text: "A visão estética alinhada com as referências nórdicas fez toda a diferença.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    name: "Pedro Lima",
    role: "Proprietário",
  }
];

const firstColumn = testimonialsData.slice(0, 2);
const secondColumn = testimonialsData.slice(2, 4);
const thirdColumn = testimonialsData.slice(4, 6);

export const Testimonials = () => {
  return (
    <section id="testimonials-section" className="bg-[#faf8f5] text-stone-900 my-0 relative overflow-hidden py-20 sm:py-28 border-t border-stone-200/60">
      <div className="container z-10 mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[560px] mx-auto text-center"
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#b87d1d] font-semibold font-sans mb-3 block">
            AVALIAÇÕES & RECONHECIMENTO
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-[0.18em] text-stone-900 font-sans uppercase">
            TESTEMUNHOS
          </h2>
          <p className="text-stone-500 text-xs sm:text-sm mt-3 font-sans font-normal tracking-wide">
            O que dizem os nossos clientes sobre o acompanhamento arquitetónico e imobiliário
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-12 sm:mt-14 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[580px] overflow-hidden">
          <TestimonialsColumn duration={22} testimonials={firstColumn} />
          <TestimonialsColumn className="hidden md:block" duration={26} testimonials={secondColumn} />
          <TestimonialsColumn className="hidden lg:block" duration={24} testimonials={thirdColumn} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
