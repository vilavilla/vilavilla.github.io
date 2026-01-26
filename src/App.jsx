import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun, Moon, Globe, Github, Linkedin, Mail, ExternalLink,
    Briefcase, GraduationCap, Code2, Brain, Terminal, Cpu,
    Eye, Gamepad2, Bot, Database, Cloud, Container,
    ChevronRight, Sparkles, MapPin, Calendar
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS - Multi-language support (EN, ES, CAT, IT)
// ═══════════════════════════════════════════════════════════════════════════════

const translations = {
    en: {
        nav: {
            about: 'About',
            experience: 'Experience',
            projects: 'Projects',
            skills: 'Skills',
            contact: 'Contact'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'R&D Engineer | Applied AI & VR',
            status: 'Open to Work / Research',
            cta: 'View Projects',
            download: 'Download CV'
        },
        about: {
            title: 'About Me',
            description: 'Computer Engineering Student at UPC-FIB & Research Intern at Hospital Clínic. Merging Real-Time Graphics (C++) with Generative AI.',
            passion: 'Passionate about pushing the boundaries of human-computer interaction through immersive technologies and intelligent systems.'
        },
        experience: {
            title: 'Experience & Education',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Research Unit',
                    role: 'Machine Learning Engineer Intern',
                    desc: 'Privacy-preserving NLP with BERT & Deployment on Vertex AI.',
                    period: 'Oct 2025 - Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Erasmus+ Scholar',
                    role: 'Exchange Student',
                    desc: 'Focus on Robotics, AI & Computer Vision.',
                    period: 'Feb 2026 - Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcelona',
                    role: 'Computer Engineering Degree',
                    desc: 'High Performance Computing & Software Architecture.',
                    period: '2022 - Present',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Featured Projects',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Thesis Project',
                    desc: 'Unity + C++ + LLMs. Real-time avatar with low-latency voice interaction.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'AI Game',
                    desc: 'Social Engineering Game using RAG & VectorDBs (FAISS).',
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Computer Vision',
                    desc: 'YOLOv8 Object detection for visually impaired navigation.',
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Tech Stack',
            categories: {
                languages: 'Languages',
                ai: 'AI & ML',
                tools: 'Tools & Cloud'
            }
        },
        contact: {
            title: "Let's Connect",
            subtitle: 'Open to research collaborations and exciting opportunities',
            email: 'Get in Touch'
        },
        footer: {
            built: 'Built with React, Tailwind & Framer Motion',
            rights: 'All rights reserved'
        }
    },
    es: {
        nav: {
            about: 'Sobre mí',
            experience: 'Experiencia',
            projects: 'Proyectos',
            skills: 'Habilidades',
            contact: 'Contacto'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'Ingeniero I+D | IA Aplicada & VR',
            status: 'Abierto a Trabajo / Investigación',
            cta: 'Ver Proyectos',
            download: 'Descargar CV'
        },
        about: {
            title: 'Sobre Mí',
            description: 'Estudiante de Ingeniería Informática en UPC-FIB e Investigador en Hospital Clínic. Fusionando Gráficos en Tiempo Real (C++) con IA Generativa.',
            passion: 'Apasionado por expandir los límites de la interacción humano-computadora a través de tecnologías inmersivas y sistemas inteligentes.'
        },
        experience: {
            title: 'Experiencia y Educación',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unidad de Investigación',
                    role: 'Ingeniero Machine Learning (Prácticas)',
                    desc: 'NLP con privacidad preservada usando BERT y despliegue en Vertex AI.',
                    period: 'Oct 2025 - Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Beca Erasmus+',
                    role: 'Estudiante de Intercambio',
                    desc: 'Enfoque en Robótica, IA y Visión por Computador.',
                    period: 'Feb 2026 - Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcelona',
                    role: 'Grado en Ingeniería Informática',
                    desc: 'Computación de Alto Rendimiento y Arquitectura de Software.',
                    period: '2022 - Presente',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Proyectos Destacados',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Proyecto de Tesis',
                    desc: 'Unity + C++ + LLMs. Avatar en tiempo real con interacción de voz de baja latencia.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'Juego IA',
                    desc: 'Juego de Ingeniería Social usando RAG y VectorDBs (FAISS).',
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Visión por Computador',
                    desc: 'Detección de objetos con YOLOv8 para navegación de personas con discapacidad visual.',
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnológico',
            categories: {
                languages: 'Lenguajes',
                ai: 'IA & ML',
                tools: 'Herramientas & Cloud'
            }
        },
        contact: {
            title: 'Conectemos',
            subtitle: 'Abierto a colaboraciones de investigación y oportunidades emocionantes',
            email: 'Contactar'
        },
        footer: {
            built: 'Construido con React, Tailwind y Framer Motion',
            rights: 'Todos los derechos reservados'
        }
    },
    cat: {
        nav: {
            about: 'Sobre mi',
            experience: 'Experiència',
            projects: 'Projectes',
            skills: 'Habilitats',
            contact: 'Contacte'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'Enginyer R+D | IA Aplicada & VR',
            status: 'Obert a Treball / Recerca',
            cta: 'Veure Projectes',
            download: 'Descarregar CV'
        },
        about: {
            title: 'Sobre Mi',
            description: "Estudiant d'Enginyeria Informàtica a la UPC-FIB i Investigador a l'Hospital Clínic. Fusionant Gràfics en Temps Real (C++) amb IA Generativa.",
            passion: "Apassionat per expandir els límits de la interacció humà-ordinador a través de tecnologies immersives i sistemes intel·ligents."
        },
        experience: {
            title: 'Experiència i Educació',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unitat de Recerca',
                    role: 'Enginyer Machine Learning (Pràctiques)',
                    desc: 'NLP amb privacitat preservada usant BERT i desplegament a Vertex AI.',
                    period: 'Oct 2025 - Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Beca Erasmus+',
                    role: "Estudiant d'Intercanvi",
                    desc: 'Enfocament en Robòtica, IA i Visió per Computador.',
                    period: 'Feb 2026 - Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcelona',
                    role: "Grau en Enginyeria Informàtica",
                    desc: 'Computació d\'Alt Rendiment i Arquitectura de Software.',
                    period: '2022 - Present',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Projectes Destacats',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Projecte de Tesi',
                    desc: 'Unity + C++ + LLMs. Avatar en temps real amb interacció de veu de baixa latència.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'Joc IA',
                    desc: "Joc d'Enginyeria Social usant RAG i VectorDBs (FAISS).",
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Visió per Computador',
                    desc: "Detecció d'objectes amb YOLOv8 per a navegació de persones amb discapacitat visual.",
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnològic',
            categories: {
                languages: 'Llenguatges',
                ai: 'IA & ML',
                tools: 'Eines & Cloud'
            }
        },
        contact: {
            title: 'Connectem',
            subtitle: "Obert a col·laboracions de recerca i oportunitats emocionants",
            email: 'Contactar'
        },
        footer: {
            built: 'Construït amb React, Tailwind i Framer Motion',
            rights: 'Tots els drets reservats'
        }
    },
    it: {
        nav: {
            about: 'Chi Sono',
            experience: 'Esperienza',
            projects: 'Progetti',
            skills: 'Competenze',
            contact: 'Contatti'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'Ingegnere R&S | IA Applicata & VR',
            status: 'Disponibile per Lavoro / Ricerca',
            cta: 'Vedi Progetti',
            download: 'Scarica CV'
        },
        about: {
            title: 'Chi Sono',
            description: 'Studente di Ingegneria Informatica presso UPC-FIB e Ricercatore presso Hospital Clínic. Unione di grafica in tempo reale (C++) e IA generativa.',
            passion: "Appassionato di spingere i confini dell'interazione uomo-computer attraverso tecnologie immersive e sistemi intelligenti."
        },
        experience: {
            title: 'Esperienza e Formazione',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unità di Ricerca',
                    role: 'Ingegnere Machine Learning (Stage)',
                    desc: 'NLP con privacy preservata usando BERT e deployment su Vertex AI.',
                    period: 'Ott 2025 - Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Borsa Erasmus+',
                    role: 'Studente di Scambio',
                    desc: 'Focus su Robotica, IA e Computer Vision.',
                    period: 'Feb 2026 - Lug 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcellona',
                    role: 'Laurea in Ingegneria Informatica',
                    desc: 'High Performance Computing e Architettura Software.',
                    period: '2022 - Presente',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Progetti in Evidenza',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Progetto di Tesi',
                    desc: 'Unity + C++ + LLMs. Avatar in tempo reale con interazione vocale a bassa latenza.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'Gioco IA',
                    desc: 'Gioco di Social Engineering usando RAG e VectorDBs (FAISS).',
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Computer Vision',
                    desc: 'Rilevamento oggetti con YOLOv8 per la navigazione di persone ipovedenti.',
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnologico',
            categories: {
                languages: 'Linguaggi',
                ai: 'IA & ML',
                tools: 'Strumenti & Cloud'
            }
        },
        contact: {
            title: 'Connettiamoci',
            subtitle: 'Aperto a collaborazioni di ricerca e opportunità entusiasmanti',
            email: 'Contattami'
        },
        footer: {
            built: 'Costruito con React, Tailwind e Framer Motion',
            rights: 'Tutti i diritti riservati'
        }
    },
    fr: {
        nav: {
            about: 'À Propos',
            experience: 'Expérience',
            projects: 'Projets',
            skills: 'Compétences',
            contact: 'Contact'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'Ingénieur R&D | IA Appliquée & VR',
            status: 'Ouvert aux Opportunités / Recherche',
            cta: 'Voir Projets',
            download: 'Télécharger CV'
        },
        about: {
            title: 'À Propos',
            description: "Étudiant en Ingénierie Informatique à UPC-FIB et Chercheur Stagiaire à l'Hospital Clínic. Fusion de graphiques temps réel (C++) et IA générative.",
            passion: "Passionné par repousser les limites de l'interaction homme-machine à travers les technologies immersives et les systèmes intelligents."
        },
        experience: {
            title: 'Expérience et Formation',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unité de Recherche',
                    role: 'Ingénieur Machine Learning (Stage)',
                    desc: 'NLP préservant la confidentialité avec BERT et déploiement sur Vertex AI.',
                    period: 'Oct 2025 - Fév 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Bourse Erasmus+',
                    role: "Étudiant d'Échange",
                    desc: 'Focus sur Robotique, IA et Vision par Ordinateur.',
                    period: 'Fév 2026 - Juil 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcelone',
                    role: 'Licence en Ingénierie Informatique',
                    desc: 'Calcul Haute Performance et Architecture Logicielle.',
                    period: '2022 - Présent',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Projets en Vedette',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Projet de Thèse',
                    desc: 'Unity + C++ + LLMs. Avatar temps réel avec interaction vocale basse latence.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'Jeu IA',
                    desc: "Jeu d'Ingénierie Sociale utilisant RAG et VectorDBs (FAISS).",
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Vision par Ordinateur',
                    desc: "Détection d'objets avec YOLOv8 pour navigation des malvoyants.",
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Technologique',
            categories: {
                languages: 'Langages',
                ai: 'IA & ML',
                tools: 'Outils & Cloud'
            }
        },
        contact: {
            title: 'Connectons-nous',
            subtitle: 'Ouvert aux collaborations de recherche et opportunités passionnantes',
            email: 'Me Contacter'
        },
        footer: {
            built: 'Construit avec React, Tailwind et Framer Motion',
            rights: 'Tous droits réservés'
        }
    },
    de: {
        nav: {
            about: 'Über Mich',
            experience: 'Erfahrung',
            projects: 'Projekte',
            skills: 'Fähigkeiten',
            contact: 'Kontakt'
        },
        header: {
            name: 'Joan Vila Orús',
            role: 'F&E Ingenieur | Angewandte KI & VR',
            status: 'Offen für Arbeit / Forschung',
            cta: 'Projekte Ansehen',
            download: 'CV Herunterladen'
        },
        about: {
            title: 'Über Mich',
            description: 'Informatikstudent an der UPC-FIB und Forschungspraktikant am Hospital Clínic. Verbindung von Echtzeit-Grafik (C++) mit generativer KI.',
            passion: 'Leidenschaftlich daran interessiert, die Grenzen der Mensch-Computer-Interaktion durch immersive Technologien und intelligente Systeme zu erweitern.'
        },
        experience: {
            title: 'Erfahrung und Ausbildung',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Forschungsabteilung',
                    role: 'Machine Learning Ingenieur (Praktikum)',
                    desc: 'Datenschutzkonformes NLP mit BERT und Deployment auf Vertex AI.',
                    period: 'Okt 2025 - Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Erasmus+ Stipendium',
                    role: 'Austauschstudent',
                    desc: 'Fokus auf Robotik, KI und Computer Vision.',
                    period: 'Feb 2026 - Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC - FIB',
                    subtitle: 'Barcelona',
                    role: 'Bachelor Informatik',
                    desc: 'High Performance Computing und Software-Architektur.',
                    period: '2022 - Aktuell',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Ausgewählte Projekte',
            items: [
                {
                    name: 'VR Embodied Agent',
                    tag: 'Thesis Projekt',
                    desc: 'Unity + C++ + LLMs. Echtzeit-Avatar mit latenzarmer Sprachinteraktion.',
                    tech: ['Unity', 'C++', 'LLMs', 'VR'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'The Rogue Taxi',
                    tag: 'KI Spiel',
                    desc: 'Social Engineering Spiel mit RAG und VectorDBs (FAISS).',
                    tech: ['Python', 'RAG', 'FAISS', 'LangChain'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive CV',
                    tag: 'Computer Vision',
                    desc: 'YOLOv8 Objekterkennung für Navigation von Sehbehinderten.',
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Technologie Stack',
            categories: {
                languages: 'Sprachen',
                ai: 'KI & ML',
                tools: 'Tools & Cloud'
            }
        },
        contact: {
            title: 'Verbinden wir uns',
            subtitle: 'Offen für Forschungskooperationen und spannende Möglichkeiten',
            email: 'Kontakt aufnehmen'
        },
        footer: {
            built: 'Erstellt mit React, Tailwind und Framer Motion',
            rights: 'Alle Rechte vorbehalten'
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// SKILLS DATA
// ═══════════════════════════════════════════════════════════════════════════════

const skillsData = {
    languages: [
        { name: 'C++', icon: Code2, level: 90 },
        { name: 'Python', icon: Terminal, level: 95 },
        { name: 'JavaScript', icon: Code2, level: 80 },
    ],
    ai: [
        { name: 'PyTorch', icon: Brain, level: 85 },
        { name: 'TensorFlow', icon: Cpu, level: 80 },
        { name: 'LLMs', icon: Bot, level: 90 },
    ],
    tools: [
        { name: 'Unity', icon: Gamepad2, level: 85 },
        { name: 'Docker', icon: Container, level: 80 },
        { name: 'Linux', icon: Terminal, level: 90 },
        { name: 'AWS/GCP', icon: Cloud, level: 75 },
    ]
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Language Selector Component
const LanguageSelector = ({ currentLang, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);

    const languages = [
        { code: 'en', label: 'EN', flag: '🇬🇧' },
        { code: 'es', label: 'ES', flag: '🇪🇸' },
        { code: 'cat', label: 'CAT', flag: '🏴󠁥󠁳󠁣󠁴󠁿' },
        { code: 'it', label: 'IT', flag: '🇮🇹' },
        { code: 'fr', label: 'FR', flag: '🇫🇷' },
        { code: 'de', label: 'DE', flag: '🇩🇪' },
    ];

    return (
        <div className="relative">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl 
                   bg-zinc-800/50 dark:bg-zinc-800/50 
                   light:bg-slate-100 
                   hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50
                   border border-zinc-700/50 dark:border-zinc-700/50
                   light:border-slate-200
                   transition-all duration-300"
            >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                    {languages.find(l => l.code === currentLang)?.flag} {currentLang.toUpperCase()}
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full right-0 mt-2 py-2 px-1
                       bg-zinc-900/95 dark:bg-zinc-900/95
                       light:bg-white/95
                       backdrop-blur-xl rounded-xl border 
                       border-zinc-700/50 dark:border-zinc-700/50
                       light:border-slate-200
                       shadow-2xl min-w-[120px] z-50"
                    >
                        {languages.map((lang) => (
                            <motion.button
                                key={lang.code}
                                whileHover={{ x: 4, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                                onClick={() => { setLang(lang.code); setIsOpen(false); }}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg
                           text-sm transition-colors
                           ${currentLang === lang.code
                                        ? 'text-blue-400 dark:text-blue-400 bg-blue-500/10'
                                        : 'text-zinc-300 dark:text-zinc-300 light:text-slate-600 hover:text-white dark:hover:text-white'}`}
                            >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="font-medium">{lang.label}</span>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Theme Toggle Component
const ThemeToggle = ({ isDark, setIsDark }) => (
    <motion.button
        whileHover={{ scale: 1.05, rotate: 15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsDark(!isDark)}
        className="p-3 rounded-xl 
               bg-zinc-800/50 dark:bg-zinc-800/50 
               hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50
               border border-zinc-700/50 dark:border-zinc-700/50
               transition-all duration-300"
        aria-label="Toggle theme"
    >
        <AnimatePresence mode="wait">
            {isDark ? (
                <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Sun className="w-5 h-5 text-yellow-400" />
                </motion.div>
            ) : (
                <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <Moon className="w-5 h-5 text-blue-400" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);

// Bento Card Component
const BentoCard = ({ children, className = '', delay = 0, hover = true }) => (
    <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay }}
        whileHover={hover ? {
            y: -8,
            scale: 1.02,
            transition: { duration: 0.3, ease: "easeOut" }
        } : {}}
        className={`bento-card group relative p-6 ${className}`}
    >
        {/* Gradient border on hover */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 pointer-events-none
                    bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20" />
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 
                    transition-opacity duration-500 blur-xl pointer-events-none
                    bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            style={{ transform: 'translateY(20px)' }} />
        <div className="relative z-10">{children}</div>
    </motion.div>
);

// Timeline Item Component
const TimelineItem = ({ item, index, isLast }) => (
    <motion.div
        variants={slideInLeft}
        className="relative pl-8 pb-8"
    >
        {/* Timeline line */}
        {!isLast && (
            <div className="absolute left-[11px] top-8 w-0.5 h-full 
                      bg-gradient-to-b from-blue-500/50 to-transparent" />
        )}

        {/* Timeline dot */}
        <motion.div
            whileHover={{ scale: 1.3 }}
            className={`absolute left-0 top-1 w-6 h-6 rounded-full border-2 
                  flex items-center justify-center
                  ${item.type === 'work'
                    ? 'border-blue-500 bg-blue-500/20'
                    : 'border-purple-500 bg-purple-500/20'}`}
        >
            {item.type === 'work' ? (
                <Briefcase className="w-3 h-3 text-blue-400" />
            ) : (
                <GraduationCap className="w-3 h-3 text-purple-400" />
            )}
        </motion.div>

        {/* Content */}
        <motion.div
            whileHover={{ x: 8 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-zinc-800/30 bg-white rounded-xl p-5
                 dark:border-zinc-700/30 border-slate-200 border
                 hover:border-blue-500/30 dark:hover:border-blue-500/30
                 transition-all duration-300 shadow-sm dark:shadow-none"
        >
            <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                <div>
                    <h4 className="font-semibold dark:text-white text-slate-900 text-lg">{item.org}</h4>
                    <p className="text-sm dark:text-zinc-400 text-slate-500">{item.subtitle}</p>
                </div>
                <span className="flex items-center gap-1 text-xs dark:text-zinc-500 text-slate-500 
                        dark:bg-zinc-800/50 bg-slate-100 px-2 py-1 rounded-full">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                </span>
            </div>
            <p className="text-blue-500 dark:text-blue-400 font-medium mb-2">{item.role}</p>
            <p className="text-sm dark:text-zinc-300 text-slate-600 leading-relaxed">{item.desc}</p>
        </motion.div>
    </motion.div>
);

// Project Card Component
const ProjectCard = ({ project, index }) => (
    <BentoCard delay={index * 0.1}>
        <div className="flex flex-col h-full">
            {/* Header with tag */}
            <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 text-xs font-medium rounded-full 
                        bg-gradient-to-r from-blue-500/20 to-purple-500/20
                        text-blue-400 dark:text-blue-400 border border-blue-500/20">
                    {project.tag}
                </span>
                <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: -10 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-lg bg-zinc-800/50 dark:bg-zinc-800/50 
                     hover:bg-blue-500/20 dark:hover:bg-blue-500/20
                     transition-colors duration-300"
                >
                    <ExternalLink className="w-4 h-4 text-zinc-400 dark:text-zinc-400 
                                   group-hover:text-blue-400 dark:group-hover:text-blue-400" />
                </motion.a>
            </div>

            {/* Project name */}
            <h3 className="text-xl font-bold mb-3 dark:text-white text-slate-900
                     group-hover:text-transparent group-hover:bg-clip-text 
                     group-hover:bg-gradient-to-r group-hover:from-blue-400 
                     group-hover:to-purple-400 transition-all duration-300">
                {project.name}
            </h3>

            {/* Description */}
            <p className="text-sm leading-relaxed mb-4 flex-grow dark:text-zinc-400 text-slate-600">
                {project.desc}
            </p>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((tech, i) => (
                    <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="px-2 py-1 text-xs font-code rounded-md
                      dark:bg-zinc-800/80 bg-slate-100 dark:text-zinc-300 text-slate-700
                      dark:border-zinc-700/50 border-slate-200 border"
                    >
                        {tech}
                    </motion.span>
                ))}
            </div>
        </div>
    </BentoCard>
);

// Skill Bar Component
const SkillBar = ({ skill, delay }) => (
    <motion.div
        variants={fadeInUp}
        transition={{ delay }}
        className="group"
    >
        <div className="flex items-center gap-3 mb-2">
            <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20
                   border border-blue-500/20"
            >
                <skill.icon className="w-4 h-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium dark:text-zinc-300 text-slate-700">{skill.name}</span>
            <span className="ml-auto text-xs dark:text-zinc-500 text-slate-500 font-code">{skill.level}%</span>
        </div>
        <div className="h-2 dark:bg-zinc-800/50 bg-slate-200 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            />
        </div>
    </motion.div>
);

// Floating Particles Background - Antigravity Style
const FloatingParticles = () => {
    const particles = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 5 + Math.random() * 8,
        delay: Math.random() * 4,
        color: i % 4 === 0 ? 'bg-blue-400' : i % 4 === 1 ? 'bg-purple-400' : i % 4 === 2 ? 'bg-cyan-400' : 'bg-pink-400'
    }));

    const orbs = [
        { x: 15, y: 20, size: 300, color: 'from-blue-500/20 to-transparent', delay: 0 },
        { x: 80, y: 60, size: 400, color: 'from-purple-500/15 to-transparent', delay: 2 },
        { x: 50, y: 80, size: 350, color: 'from-cyan-500/15 to-transparent', delay: 4 },
    ];

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
            {/* Glowing Orbs */}
            {orbs.map((orb, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl`}
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: `${orb.x}%`,
                        top: `${orb.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                        x: [0, 30, 0],
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 8 + i * 2,
                        repeat: Infinity,
                        delay: orb.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Floating Particles */}
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${p.color}`}
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                    }}
                    animate={{
                        y: [0, -80, 0],
                        x: [0, Math.sin(p.id) * 30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.8, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeInOut"
                    }}
                />
            ))}

            {/* Animated Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />

            {/* Diagonal Lines */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
                <defs>
                    <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="100" height="100">
                        <path d="M0 100L100 0" stroke="currentColor" strokeWidth="0.5" className="text-blue-500" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#diagonalLines)" />
            </svg>

            {/* Center gradient spotlight */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-blue-500/5 via-transparent to-transparent rounded-full blur-3xl" />
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function App() {
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState('en');
    const t = translations[lang];

    // Apply theme class to document
    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
    }, [isDark]);

    return (
        <div className={`min-h-screen transition-colors duration-500
                    ${isDark
                ? 'bg-zinc-950 text-white'
                : 'bg-slate-50 text-slate-900'}`}>

            {/* Background effects */}
            <FloatingParticles />
            <div className="fixed inset-0 pointer-events-none">
                <div className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl
                        ${isDark ? 'bg-blue-500/10' : 'bg-blue-500/5'}`} />
                <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl
                        ${isDark ? 'bg-purple-500/10' : 'bg-purple-500/5'}`} />
            </div>

            {/* Navigation */}
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-4
                    ${isDark
                        ? 'bg-zinc-950/80 border-b border-zinc-800/50'
                        : 'bg-white/80 border-b border-slate-200'}
                    backdrop-blur-xl`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="#"
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600
                           flex items-center justify-center font-bold text-white text-lg">
                            JV
                        </div>
                        <span className="font-semibold hidden sm:block dark:text-white text-slate-900">
                            Joan Vila
                        </span>
                    </motion.a>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-6">
                        {Object.entries(t.nav).map(([key, label]) => (
                            <motion.a
                                key={key}
                                href={`#${key}`}
                                whileHover={{ y: -2 }}
                                className="text-sm font-medium transition-colors dark:text-zinc-400 dark:hover:text-white text-slate-600 hover:text-slate-900"
                            >
                                {label}
                            </motion.a>
                        ))}
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-3">
                        <LanguageSelector currentLang={lang} setLang={setLang} />
                        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
                    </div>
                </div>
            </motion.nav>

            {/* Main Content */}
            <main className="relative z-10 pt-24">

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* HERO SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section className="min-h-[90vh] flex items-center justify-center px-6 py-20">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Status Badge */}
                        <motion.div
                            variants={scaleIn}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                        bg-green-500/10 border border-green-500/30 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full 
                                bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm font-medium text-green-400">{t.header.status}</span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
                        >
                            <span className="dark:text-white text-slate-900">
                                {t.header.name.split(' ')[0]}
                            </span>
                            <br />
                            <span className="gradient-text">
                                {t.header.name.split(' ').slice(1).join(' ')}
                            </span>
                        </motion.h1>

                        {/* Role */}
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl sm:text-2xl mb-8 font-light dark:text-zinc-400 text-slate-600"
                        >
                            {t.header.role}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center justify-center gap-4"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className="group flex items-center gap-2 px-8 py-4 rounded-xl
                          bg-gradient-to-r from-blue-500 to-purple-600
                          text-white font-medium shadow-lg shadow-blue-500/25
                          hover:shadow-xl hover:shadow-blue-500/40
                          transition-all duration-300"
                            >
                                <Sparkles className="w-5 h-5" />
                                {t.header.cta}
                                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="/cv-joan-vila-orus.pdf"
                                download
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={`flex items-center gap-2 px-8 py-4 rounded-xl
                           font-medium border-2 transition-all duration-300
                           ${isDark
                                        ? 'border-zinc-700 text-white hover:bg-zinc-800/50'
                                        : 'border-slate-300 text-slate-900 hover:bg-slate-100'}`}
                            >
                                {t.header.download}
                            </motion.a>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-4 mt-12"
                        >
                            {[
                                { icon: Github, href: 'https://github.com/vilavilla', label: 'GitHub' },
                                { icon: Linkedin, href: 'https://www.linkedin.com/in/joan-vila-orus-a82840278/', label: 'LinkedIn' },
                            ].map((social) => (
                                <motion.a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.15, y: -3 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-3 rounded-xl transition-all duration-300
                             ${isDark
                                            ? 'bg-zinc-800/50 hover:bg-zinc-700/50 text-zinc-400 hover:text-white'
                                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-5 h-5" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* ABOUT SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section id="about" className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                        >
                            {/* Main About Card */}
                            <BentoCard className="lg:col-span-2 lg:row-span-2">
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20
                                 border border-blue-500/20">
                                        <Eye className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-3xl font-bold mb-2 dark:text-white text-slate-900">
                                            {t.about.title}
                                        </h2>
                                        <p className="text-sm dark:text-zinc-500 text-slate-500">
                                            <MapPin className="w-3 h-3 inline mr-1" />
                                            Barcelona, Spain
                                        </p>
                                    </div>
                                </div>

                                <p className="text-lg leading-relaxed mb-6 dark:text-zinc-300 text-slate-600">
                                    {t.about.description}
                                </p>

                                <p className="text-base leading-relaxed dark:text-zinc-400 text-slate-500">
                                    {t.about.passion}
                                </p>
                            </BentoCard>

                            {/* Quick Stats Cards */}
                            <BentoCard className="flex items-center justify-center min-h-[140px]">
                                <div className="text-center">
                                    <motion.div
                                        className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        1+
                                    </motion.div>
                                    <p className={`mt-3 text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                                        Years of Experience
                                    </p>
                                </div>
                            </BentoCard>

                            <BentoCard className="flex items-center justify-center min-h-[140px]">
                                <div className="text-center">
                                    <motion.div
                                        className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.3 }}
                                    >
                                        10+
                                    </motion.div>
                                    <p className={`mt-3 text-sm font-medium ${isDark ? 'text-zinc-300' : 'text-slate-600'}`}>
                                        Projects Completed
                                    </p>
                                </div>
                            </BentoCard>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* EXPERIENCE SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section id="experience" className="py-24 px-6">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Section Header */}
                            <motion.div variants={fadeInUp} className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4 dark:text-white text-slate-900">
                                    {t.experience.title}
                                </h2>
                                <div className="w-24 h-1 mx-auto rounded-full 
                               bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

                            {/* Timeline */}
                            <div className="relative">
                                {t.experience.timeline.map((item, index) => (
                                    <TimelineItem
                                        key={index}
                                        item={item}
                                        index={index}
                                        isLast={index === t.experience.timeline.length - 1}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* PROJECTS SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section id="projects" className="py-24 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Section Header */}
                            <motion.div variants={fadeInUp} className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4 dark:text-white text-slate-900">
                                    {t.projects.title}
                                </h2>
                                <div className="w-24 h-1 mx-auto rounded-full 
                               bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

                            {/* Projects Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {t.projects.items.map((project, index) => (
                                    <ProjectCard key={index} project={project} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* SKILLS SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section id="skills" className="py-24 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            {/* Section Header */}
                            <motion.div variants={fadeInUp} className="text-center mb-16">
                                <h2 className="text-4xl font-bold mb-4 dark:text-white text-slate-900">
                                    {t.skills.title}
                                </h2>
                                <div className="w-24 h-1 mx-auto rounded-full 
                               bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

                            {/* Skills Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Languages */}
                                <BentoCard>
                                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 dark:text-white text-slate-900">
                                        <Code2 className="w-5 h-5 text-blue-400" />
                                        {t.skills.categories.languages}
                                    </h3>
                                    <div className="space-y-5">
                                        {skillsData.languages.map((skill, i) => (
                                            <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                                        ))}
                                    </div>
                                </BentoCard>

                                {/* AI & ML */}
                                <BentoCard>
                                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 dark:text-white text-slate-900">
                                        <Brain className="w-5 h-5 text-purple-400" />
                                        {t.skills.categories.ai}
                                    </h3>
                                    <div className="space-y-5">
                                        {skillsData.ai.map((skill, i) => (
                                            <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                                        ))}
                                    </div>
                                </BentoCard>

                                {/* Tools & Cloud */}
                                <BentoCard>
                                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 dark:text-white text-slate-900">
                                        <Cloud className="w-5 h-5 text-cyan-400" />
                                        {t.skills.categories.tools}
                                    </h3>
                                    <div className="space-y-5">
                                        {skillsData.tools.map((skill, i) => (
                                            <SkillBar key={skill.name} skill={skill} delay={i * 0.1} />
                                        ))}
                                    </div>
                                </BentoCard>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* CONTACT SECTION */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <section id="contact" className="py-24 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            className="text-center"
                        >
                            <BentoCard className="border-gradient">
                                <motion.div variants={fadeInUp}>
                                    <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        {t.contact.title}
                                    </h2>
                                    <p className="mb-8 dark:text-zinc-400 text-slate-600">
                                        {t.contact.subtitle}
                                    </p>

                                    {/* Email Display - Click to Copy */}
                                    <div
                                        onClick={() => {
                                            navigator.clipboard.writeText('joanvilaa4@gmail.com');
                                            alert('✅ Email copiado: joanvilaa4@gmail.com');
                                        }}
                                        className="cursor-pointer group"
                                    >
                                        <div className="flex items-center justify-center gap-3 p-6 rounded-xl dark:bg-zinc-800/50 bg-slate-100 border-2 dark:border-zinc-700 border-slate-300 hover:border-blue-500 dark:hover:border-blue-500 transition-all">
                                            <Mail className="w-6 h-6 text-blue-500" />
                                            <span className="text-xl font-medium dark:text-white text-slate-900 group-hover:text-blue-500 transition-colors">
                                                joanvilaa4@gmail.com
                                            </span>
                                            <span className="text-sm dark:text-zinc-400 text-slate-500 ml-2">📋 Click para copiar</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </BentoCard>
                        </motion.div>
                    </div>
                </section>

                {/* ═══════════════════════════════════════════════════════════════════ */}
                {/* FOOTER */}
                {/* ═══════════════════════════════════════════════════════════════════ */}
                <footer className={`py-8 px-6 border-t
                           ${isDark
                        ? 'border-zinc-800/50 bg-zinc-950/50'
                        : 'border-slate-200 bg-white/50'}`}>
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center 
                          justify-between gap-4 text-sm">
                        <p className={isDark ? 'text-zinc-500' : 'text-slate-500'}>
                            © {new Date().getFullYear()} Joan Vila Orús. {t.footer.rights}
                        </p>
                        <p className={isDark ? 'text-zinc-600' : 'text-slate-400'}>
                            {t.footer.built}
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default App;
