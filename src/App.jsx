import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sun, Moon, Globe, Github, Linkedin, Mail, ExternalLink,
    Briefcase, GraduationCap, Code2, Brain, Terminal, Cpu,
    Eye, Gamepad2, Bot, Database, Cloud, Container,
    ChevronRight, Sparkles, MapPin, Calendar, ArrowRight, Copy, Check
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// TRANSLATIONS — Multi-language support (EN, ES, CAT, IT, FR, DE)
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
            role: 'AI / Backend Engineer building LLM systems and immersive 3D applications.',
            supporting: 'Computer Engineering student at FIB-UPC with experience in Python, FastAPI, LLMs, RAG, clinical NLP pipelines, Unity/VR and 3D graphics.',
            status: 'Open to Work / Research',
            cta: 'View Projects',
            download: 'Download CV'
        },
        about: {
            title: 'About Me',
            description: 'I build end-to-end AI systems — backend, model integration, data pipelines and real user-facing interaction. Main focus: applied LLMs, computer vision, VR/AR and tools that solve real problems.',
            passion: 'Passionate about pushing the boundaries of human-computer interaction through immersive technologies and intelligent systems.',
            location: 'Barcelona, Spain',
            stat1: '1+ yr', stat1label: 'Research Exp.',
            stat2: '4+', stat2label: 'AI Systems Built'
        },
        experience: {
            title: 'Experience & Education',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Research Unit',
                    role: 'AI / NLP Research Intern',
                    desc: 'Clinical NLP pipelines for document anonymization — Python, AI models, benchmarking and evaluation in a medical context.',
                    period: 'Oct 2025 – Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Erasmus+ Scholar',
                    role: 'Exchange Student',
                    desc: 'AI, data management, robotics and computer vision coursework.',
                    period: 'Feb 2026 – Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcelona',
                    role: 'Computer Engineering Degree',
                    desc: 'Algorithms, Python, C++, computer graphics, ML and system design.',
                    period: '2022 – Present',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Featured Systems',
            items: [
                {
                    name: 'Embodied AI VR Assistant',
                    tag: 'Thesis Project',
                    tagColor: 'blue',
                    desc: 'AI-powered interactive guide for a VR anatomy simulation with voice interaction and RAG.',
                    arch: ['Unity VR', 'FastAPI Backend', 'RAG Retrieval', 'Local LLM', 'Voice Response'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Clinical NLP Anonymization Pipeline',
                    tag: 'Research Internship',
                    tagColor: 'amber',
                    desc: 'AI pipeline to anonymize sensitive clinical documents in a medical research context.',
                    arch: ['Clinical Docs', 'Python Pipeline', 'AI Anonymization', 'Benchmarks', 'Evaluation'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'data pipelines'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'Work in Progress',
                    tagColor: 'green',
                    desc: 'Training assistant that generates adaptive workout plans using LLM reasoning and user goals.',
                    arch: ['User Goals', 'Constraints', 'LLM Reasoning', 'Progression Rules', 'Workout Plan'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'prompt engineering', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive Computer Vision',
                    tag: 'Computer Vision',
                    tagColor: 'purple',
                    desc: 'Real-time object detection system designed to assist visually impaired users navigate.',
                    arch: ['Camera Input', 'YOLOv8 Detection', 'Object Filtering', 'Audio Output'],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Tech Stack',
            copyLabel: 'Click to copy',
            copiedLabel: 'Copied!',
            groups: [
                {
                    title: 'AI / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'LLM Evaluation'],
                    exploring: ['LangChain', 'Agentic AI', 'Fine-tuning']
                },
                {
                    title: 'Backend / Systems',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Data Pipelines', 'API Integration'],
                    exploring: ['Cloud Deployment', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'VR Interaction'],
                    working: ['C++', 'OpenGL', '3D Graphics', 'Real-time Systems'],
                    exploring: ['Spatial AI', 'AR', 'CV for Immersive']
                },
                {
                    title: 'Computer Vision / Data',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Image Processing', 'Benchmarking'],
                    exploring: ['3D Vision', 'SLAM', 'Scene Understanding']
                }
            ]
        },
        contact: {
            title: "Let's Connect",
            subtitle: 'Open to AI, backend, research and immersive technology opportunities.',
            copyBtn: 'Click to copy email',
            copiedBtn: 'Email copied!'
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
            role: 'Ingeniero IA / Backend construyendo sistemas LLM y aplicaciones 3D inmersivas.',
            supporting: 'Estudiante de Ingeniería Informática en FIB-UPC con experiencia en Python, FastAPI, LLMs, RAG, NLP clínico, Unity/VR y gráficos 3D.',
            status: 'Abierto a Trabajo / Investigación',
            cta: 'Ver Proyectos',
            download: 'Descargar CV'
        },
        about: {
            title: 'Sobre Mí',
            description: 'Construyo sistemas de IA de extremo a extremo — backend, modelos, pipelines e interacción real. Foco en LLMs aplicados, visión por computador, VR/AR y herramientas que resuelven problemas reales.',
            passion: 'Apasionado por expandir los límites de la interacción humano-computadora a través de tecnologías inmersivas y sistemas inteligentes.',
            location: 'Barcelona, España',
            stat1: '+1 año', stat1label: 'Exp. Investigación',
            stat2: '4+', stat2label: 'Sistemas IA'
        },
        experience: {
            title: 'Experiencia y Educación',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unidad de Investigación',
                    role: 'Investigador IA / NLP (Prácticas)',
                    desc: 'Pipelines de NLP clínico para anonimización de documentos — Python, modelos de IA y benchmarking en contexto médico.',
                    period: 'Oct 2025 – Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Beca Erasmus+',
                    role: 'Estudiante de Intercambio',
                    desc: 'IA, gestión de datos, robótica y visión por computador.',
                    period: 'Feb 2026 – Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcelona',
                    role: 'Grado en Ingeniería Informática',
                    desc: 'Algoritmos, Python, C++, gráficos, ML y diseño de sistemas.',
                    period: '2022 – Presente',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Sistemas Destacados',
            items: [
                {
                    name: 'Asistente VR con IA Encarnada',
                    tag: 'Proyecto de Tesis',
                    tagColor: 'blue',
                    desc: 'Guía interactiva con IA para una simulación de anatomía en VR. Construida con Unity/C#, Python/FastAPI, LLMs locales, RAG, speech-to-text y text-to-speech.',
                    arch: ['Unity VR', 'Backend FastAPI', 'Recuperación RAG', 'LLM Local', 'Respuesta de Voz'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Pipeline de Anonimización NLP Clínico',
                    tag: 'Prácticas de Investigación',
                    tagColor: 'amber',
                    desc: 'Pipeline para procesar y anonimizar documentos clínicos usando técnicas de IA/NLP. Incluyó scripts Python, benchmarking de modelos, evaluación de LLMs y flujos de procesamiento con privacidad.',
                    arch: ['Documentos Clínicos', 'Pipeline Python', 'Anonimización IA', 'Benchmarks', 'Evaluación'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'pipelines'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'En Desarrollo',
                    tagColor: 'green',
                    desc: 'Asistente de entrenamiento con IA que genera planes de ejercicio adaptativos usando objetivos del usuario, restricciones, reglas de progresión y razonamiento LLM.',
                    arch: ['Objetivos', 'Restricciones', 'Razonamiento LLM', 'Reglas Progresión', 'Plan'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'Prompt Eng.', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Visión por Computador Asistiva',
                    tag: 'Visión por Computador',
                    tagColor: 'purple',
                    desc: 'Prototipo de detección de objetos para navegación asistiva, enfocado en detectar objetos relevantes para personas con discapacidad visual.',
                    arch: ['Entrada Cámara', 'Detección YOLOv8', 'Filtrado', 'Salida de Audio'],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnológico',
            groups: [
                {
                    title: 'IA / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'Evaluación LLMs'],
                    exploring: ['LangChain', 'IA Agéntica', 'Fine-tuning']
                },
                {
                    title: 'Backend / Sistemas',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Pipelines de Datos', 'Integración APIs'],
                    exploring: ['Cloud', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'Interacción VR'],
                    working: ['C++', 'OpenGL', 'Gráficos 3D', 'Tiempo Real'],
                    exploring: ['IA Espacial', 'AR', 'CV Inmersivo']
                },
                {
                    title: 'Visión por Computador / Datos',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Procesado de Imagen', 'Benchmarking'],
                    exploring: ['Visión 3D', 'SLAM', 'Comprensión de Escena']
                }
            ]
        },
        contact: {
            title: 'Conectemos',
            subtitle: 'Abierto a oportunidades en IA, backend, investigación y tecnologías inmersivas.',
            copyBtn: 'Clic para copiar email',
            copiedBtn: '¡Email copiado!'
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
            role: 'Enginyer IA / Backend construint sistemes LLM i aplicacions 3D immersives.',
            supporting: "Estudiant d'Enginyeria Informàtica a la FIB-UPC amb experiència en Python, FastAPI, LLMs, RAG, NLP clínic, Unity/VR i gràfics 3D.",
            status: 'Obert a Treball / Recerca',
            cta: 'Veure Projectes',
            download: 'Descarregar CV'
        },
        about: {
            title: 'Sobre Mi',
            description: "Construeixo sistemes d'IA d'extrem a extrem — backend, models, pipelines i interacció real. Foco en LLMs aplicats, visió per computador, VR/AR i eines que resolen problemes reals.",
            passion: "Apassionat per expandir els límits de la interacció humà-ordinador a través de tecnologies immersives i sistemes intel·ligents.",
            location: 'Barcelona, Espanya',
            stat1: '+1 any', stat1label: 'Exp. Recerca',
            stat2: '4+', stat2label: 'Sistemes IA'
        },
        experience: {
            title: 'Experiència i Educació',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unitat de Recerca',
                    role: 'Investigador IA / NLP (Pràctiques)',
                    desc: "Pipelines de NLP clínic per anonimitzar documents — Python, models d'IA i benchmarking en context mèdic.",
                    period: 'Oct 2025 – Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Beca Erasmus+',
                    role: "Estudiant d'Intercanvi",
                    desc: 'IA, gestió de dades, robòtica i visió per computador.',
                    period: 'Feb 2026 – Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcelona',
                    role: "Grau en Enginyeria Informàtica",
                    desc: "Algorismes, Python, C++, gràfics, ML i disseny de sistemes.",
                    period: '2022 – Present',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Sistemes Destacats',
            items: [
                {
                    name: 'Assistent VR amb IA Encarnada',
                    tag: 'Projecte de Tesi',
                    tagColor: 'blue',
                    desc: "Guia interactiva amb IA per a una simulació d'anatomia en VR. Construïda amb Unity/C#, Python/FastAPI, LLMs locals, RAG, speech-to-text i text-to-speech.",
                    arch: ['Unity VR', 'Backend FastAPI', 'Recuperació RAG', 'LLM Local', 'Resposta de Veu'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Pipeline NLP Clínic',
                    tag: 'Pràctiques de Recerca',
                    tagColor: 'amber',
                    desc: "Pipeline per processar i anonimitzar documents clínics usant tècniques d'IA/NLP. Va incloure scripts Python, benchmarking de models i fluxos d'avaluació amb privacitat.",
                    arch: ['Documents Clínics', 'Pipeline Python', 'Anonimització IA', 'Benchmarks', 'Avaluació'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'pipelines'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'En Desenvolupament',
                    tagColor: 'green',
                    desc: "Assistent d'entrenament amb IA que genera plans d'exercici adaptatius usant objectius, restriccions, regles de progressió i raonament LLM.",
                    arch: ['Objectius', 'Restriccions', 'Raonament LLM', 'Regles Progressió', 'Pla'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'Prompt Eng.', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Visió per Computador Assistiva',
                    tag: 'Visió per Computador',
                    tagColor: 'purple',
                    desc: "Prototip de detecció d'objectes per a navegació assistiva, enfocat a detectar objectes rellevants per a persones amb discapacitat visual.",
                    arch: ['Entrada Càmera', 'Detecció YOLOv8', 'Filtrat', 'Sortida Àudio'],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnològic',
            groups: [
                {
                    title: 'IA / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'Avaluació LLMs'],
                    exploring: ['LangChain', 'IA Agèntica', 'Fine-tuning']
                },
                {
                    title: 'Backend / Sistemes',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Pipelines de Dades', 'Integració APIs'],
                    exploring: ['Cloud', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'Interacció VR'],
                    working: ['C++', 'OpenGL', 'Gràfics 3D', 'Temps Real'],
                    exploring: ['IA Espacial', 'AR', 'CV Immersiu']
                },
                {
                    title: 'Visió per Computador / Dades',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Processament Imatge', 'Benchmarking'],
                    exploring: ['Visió 3D', 'SLAM', 'Comprensió Escena']
                }
            ]
        },
        contact: {
            title: 'Connectem',
            subtitle: 'Obert a oportunitats en IA, backend, recerca i tecnologies immersives.',
            copyBtn: 'Clic per copiar email',
            copiedBtn: 'Email copiat!'
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
            role: 'Ingegnere IA / Backend che sviluppa sistemi LLM e applicazioni 3D immersive.',
            supporting: 'Studente di Ingegneria Informatica alla FIB-UPC con esperienza in Python, FastAPI, LLMs, RAG, NLP clinico, Unity/VR e grafica 3D.',
            status: 'Disponibile per Lavoro / Ricerca',
            cta: 'Vedi Progetti',
            download: 'Scarica CV'
        },
        about: {
            title: 'Chi Sono',
            description: "Costruisco sistemi IA end-to-end — backend, modelli, pipeline e interazione reale. Focus su LLM applicati, computer vision, VR/AR e strumenti che risolvono problemi reali.",
            passion: "Appassionato nel superare i confini dell'interazione uomo-computer attraverso tecnologie immersive e sistemi intelligenti.",
            location: 'Barcellona, Spagna',
            stat1: '+1 anno', stat1label: 'Esp. Ricerca',
            stat2: '4+', stat2label: 'Sistemi IA'
        },
        experience: {
            title: 'Esperienza e Formazione',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unità di Ricerca',
                    role: 'Ricercatore IA / NLP (Stage)',
                    desc: 'Pipeline NLP clinico per anonimizzazione documenti — Python, modelli IA e benchmarking in ambito medico.',
                    period: 'Ott 2025 – Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Borsa Erasmus+',
                    role: 'Studente di Scambio',
                    desc: 'IA, gestione dati, robotica e computer vision.',
                    period: 'Feb 2026 – Lug 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcellona',
                    role: 'Laurea in Ingegneria Informatica',
                    desc: 'Algoritmi, Python, C++, computer graphics, ML e progettazione sistemi.',
                    period: '2022 – Presente',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Sistemi in Evidenza',
            items: [
                {
                    name: 'Assistente VR con IA Embodied',
                    tag: 'Progetto di Tesi',
                    tagColor: 'blue',
                    desc: 'Guida interattiva con IA per una simulazione VR di anatomia. Realizzata con Unity/C#, Python/FastAPI, LLMs locali, RAG, speech-to-text e text-to-speech.',
                    arch: ['Unity VR', 'Backend FastAPI', 'RAG Retrieval', 'LLM Locale', 'Risposta Vocale'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Pipeline NLP Clinico',
                    tag: 'Stage di Ricerca',
                    tagColor: 'amber',
                    desc: 'Pipeline per processare e anonimizzare documenti clinici con tecniche IA/NLP. Include script Python, benchmarking di modelli, valutazione LLM e flussi di elaborazione incentrati sulla privacy.',
                    arch: ['Doc. Clinici', 'Pipeline Python', 'Anonimizzazione IA', 'Benchmarks', 'Valutazione'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'pipeline'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'In Sviluppo',
                    tagColor: 'green',
                    desc: "Assistente di allenamento basato su IA che genera piani di workout adattativi usando obiettivi utente, vincoli, regole di progressione e ragionamento LLM.",
                    arch: ['Obiettivi', 'Vincoli', 'Ragionamento LLM', 'Regole Progressione', 'Piano'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'Prompt Eng.', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Computer Vision Assistiva',
                    tag: 'Computer Vision',
                    tagColor: 'purple',
                    desc: 'Prototipo di rilevamento oggetti per navigazione assistiva, focalizzato sul rilevamento in tempo reale di oggetti rilevanti per persone ipovedenti.',
                    arch: ['Input Fotocamera', 'Rilevamento YOLOv8', 'Filtraggio', 'Output Audio'],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Tecnologico',
            groups: [
                {
                    title: 'IA / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'Valutazione LLMs'],
                    exploring: ['LangChain', 'IA Agentiva', 'Fine-tuning']
                },
                {
                    title: 'Backend / Sistemi',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Pipeline di Dati', 'Integrazione API'],
                    exploring: ['Cloud', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'Interazione VR'],
                    working: ['C++', 'OpenGL', 'Grafica 3D', 'Sistemi Real-time'],
                    exploring: ['IA Spaziale', 'AR', 'CV Immersivo']
                },
                {
                    title: 'Computer Vision / Dati',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Elaborazione Immagini', 'Benchmarking'],
                    exploring: ['Visione 3D', 'SLAM', 'Scene Understanding']
                }
            ]
        },
        contact: {
            title: 'Connettiamoci',
            subtitle: 'Disponibile per opportunità in IA, backend, ricerca e tecnologie immersive.',
            copyBtn: 'Clic per copiare email',
            copiedBtn: 'Email copiata!'
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
            role: 'Ingénieur IA / Backend développant des systèmes LLM et applications 3D immersives.',
            supporting: 'Étudiant en Ingénierie Informatique à FIB-UPC avec expérience en Python, FastAPI, LLMs, RAG, NLP clinique, Unity/VR et graphiques 3D.',
            status: 'Ouvert aux Opportunités / Recherche',
            cta: 'Voir Projets',
            download: 'Télécharger CV'
        },
        about: {
            title: 'À Propos',
            description: "Je construis des systèmes IA de bout en bout — backend, modèles, pipelines et interaction réelle. Focus sur LLMs appliqués, vision par ordinateur, VR/AR et outils qui résolvent de vrais problèmes.",
            passion: "Passionné par repousser les limites de l'interaction homme-machine grâce aux technologies immersives et aux systèmes intelligents.",
            location: 'Barcelone, Espagne',
            stat1: '+1 an', stat1label: 'Exp. Recherche',
            stat2: '4+', stat2label: 'Systèmes IA'
        },
        experience: {
            title: 'Expérience et Formation',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Unité de Recherche',
                    role: 'Chercheur IA / NLP (Stage)',
                    desc: "Pipelines NLP cliniques pour l'anonymisation de documents — Python, modèles IA et benchmarks en contexte médical.",
                    period: 'Oct 2025 – Fév 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Bourse Erasmus+',
                    role: "Étudiant d'Échange",
                    desc: "IA, gestion des données, robotique et vision par ordinateur.",
                    period: 'Fév 2026 – Juil 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcelone',
                    role: "Licence en Ingénierie Informatique",
                    desc: "Algorithmes, Python, C++, infographie, ML et conception de systèmes.",
                    period: '2022 – Présent',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Systèmes en Vedette',
            items: [
                {
                    name: 'Assistant VR IA Embodied',
                    tag: 'Projet de Thèse',
                    tagColor: 'blue',
                    desc: "Guide interactif IA pour une simulation VR d'anatomie. Construit avec Unity/C#, Python/FastAPI, LLMs locaux, RAG, speech-to-text et text-to-speech.",
                    arch: ['Unity VR', 'Backend FastAPI', 'Récupération RAG', 'LLM Local', 'Réponse Vocale'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Pipeline NLP Clinique',
                    tag: 'Stage de Recherche',
                    tagColor: 'amber',
                    desc: "Pipeline pour traiter et anonymiser des documents cliniques avec des techniques IA/NLP. Inclut des scripts Python, benchmarking de modèles, évaluation LLM et flux de traitement axés sur la confidentialité.",
                    arch: ['Doc. Cliniques', 'Pipeline Python', 'Anonymisation IA', 'Benchmarks', 'Évaluation'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'pipelines'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'En Cours',
                    tagColor: 'green',
                    desc: "Assistant d'entraînement IA qui génère des plans de workout adaptatifs via objectifs utilisateur, contraintes, règles de progression et raisonnement LLM.",
                    arch: ['Objectifs', 'Contraintes', 'Raisonnement LLM', 'Règles Progression', 'Plan'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'Prompt Eng.', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Vision par Ordinateur Assistive',
                    tag: 'Vision par Ordinateur',
                    tagColor: 'purple',
                    desc: "Prototype de détection d'objets pour la navigation assistive, axé sur la détection d'objets pertinents pour les malvoyants en temps réel.",
                    arch: ["Entrée Caméra", "Détection YOLOv8", "Filtrage", "Sortie Audio"],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Stack Technologique',
            groups: [
                {
                    title: 'IA / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'Évaluation LLMs'],
                    exploring: ['LangChain', 'IA Agentique', 'Fine-tuning']
                },
                {
                    title: 'Backend / Systèmes',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Pipelines de Données', 'Intégration API'],
                    exploring: ['Cloud', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'Interaction VR'],
                    working: ['C++', 'OpenGL', 'Graphiques 3D', 'Temps Réel'],
                    exploring: ['IA Spatiale', 'AR', 'CV Immersif']
                },
                {
                    title: 'Vision / Données',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Traitement Image', 'Benchmarking'],
                    exploring: ['Vision 3D', 'SLAM', 'Compréhension Scène']
                }
            ]
        },
        contact: {
            title: 'Connectons-nous',
            subtitle: 'Ouvert aux opportunités en IA, backend, recherche et technologies immersives.',
            copyBtn: 'Cliquer pour copier email',
            copiedBtn: 'Email copié !'
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
            role: 'KI / Backend Engineer, der LLM-Systeme und immersive 3D-Anwendungen entwickelt.',
            supporting: 'Informatikstudent an der FIB-UPC mit Erfahrung in Python, FastAPI, LLMs, RAG, klinischem NLP, Unity/VR und 3D-Grafik.',
            status: 'Offen für Arbeit / Forschung',
            cta: 'Projekte Ansehen',
            download: 'CV Herunterladen'
        },
        about: {
            title: 'Über Mich',
            description: 'Ich baue KI-Systeme von Anfang bis Ende — Backend, Modellintegration, Datenpipelines und reale Nutzerinteraktion. Fokus auf angewandte LLMs, Computer Vision, VR/AR und Tools, die echte Probleme lösen.',
            passion: 'Leidenschaftlich daran interessiert, die Grenzen der Mensch-Computer-Interaktion durch immersive Technologien und intelligente Systeme zu erweitern.',
            location: 'Barcelona, Spanien',
            stat1: '+1 Jahr', stat1label: 'Forschungserf.',
            stat2: '4+', stat2label: 'KI-Systeme'
        },
        experience: {
            title: 'Erfahrung und Ausbildung',
            timeline: [
                {
                    org: 'Hospital Clínic de Barcelona',
                    subtitle: 'Forschungsabteilung',
                    role: 'KI / NLP Forschungspraktikant',
                    desc: 'Klinische NLP-Pipelines zur Dokumentenanonymisierung — Python, KI-Modelle und Benchmarking im medizinischen Kontext.',
                    period: 'Okt 2025 – Feb 2026',
                    type: 'work'
                },
                {
                    org: 'Sapienza Università di Roma',
                    subtitle: 'Erasmus+ Stipendium',
                    role: 'Austauschstudent',
                    desc: 'KI, Datenmanagement, Robotik und Computer Vision.',
                    period: 'Feb 2026 – Jul 2026',
                    type: 'education'
                },
                {
                    org: 'UPC – FIB',
                    subtitle: 'Barcelona',
                    role: 'Bachelor Informatik',
                    desc: 'Algorithmen, Python, C++, Computergrafik, ML und Systemdesign.',
                    period: '2022 – Aktuell',
                    type: 'education'
                }
            ]
        },
        projects: {
            title: 'Ausgewählte Systeme',
            items: [
                {
                    name: 'Embodied AI VR-Assistent',
                    tag: 'Thesis Projekt',
                    tagColor: 'blue',
                    desc: 'KI-gestützter interaktiver Guide für eine VR-Anatomiesimulation. Gebaut mit Unity/C#, Python/FastAPI, lokalen LLMs, RAG, Speech-to-Text und Text-to-Speech.',
                    arch: ['Unity VR', 'FastAPI Backend', 'RAG Retrieval', 'Lokales LLM', 'Sprachantwort'],
                    tech: ['Unity', 'C#', 'Python', 'FastAPI', 'RAG', 'ChromaDB', 'Whisper', 'Piper', 'Ollama'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Klinische NLP-Anonymisierungspipeline',
                    tag: 'Forschungspraktikum',
                    tagColor: 'amber',
                    desc: 'Pipeline zur Verarbeitung und Anonymisierung klinischer Dokumente mit KI/NLP. Enthält Python-Skripte, Modell-Benchmarking, LLM-Evaluation und datenschutzorientierte Verarbeitungsworkflows.',
                    arch: ['Klin. Dokumente', 'Python Pipeline', 'KI-Anonymisierung', 'Benchmarks', 'Evaluation'],
                    tech: ['Python', 'PyTorch', 'Transformers', 'NLP', 'Gemini API', 'AWS', 'Datenpipelines'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'AI Performance Coach',
                    tag: 'In Entwicklung',
                    tagColor: 'green',
                    desc: 'KI-gestützter Trainingsassistent, der adaptive Workoutpläne mit Nutzerzielen, Einschränkungen, Progressionsregeln und LLM-Reasoning generiert.',
                    arch: ['Ziele', 'Einschränkungen', 'LLM-Reasoning', 'Progressionsregeln', 'Trainingsplan'],
                    tech: ['Python', 'FastAPI', 'LangChain', 'LLM APIs', 'Prompt Eng.', 'RAG', 'REST APIs'],
                    link: 'https://github.com/vilavilla'
                },
                {
                    name: 'Assistive Computer Vision',
                    tag: 'Computer Vision',
                    tagColor: 'purple',
                    desc: 'Objekterkennungsprototyp für assistive Navigation, fokussiert auf die Echtzeit-Erkennung relevanter Objekte für sehbehinderte Personen.',
                    arch: ['Kamera-Eingang', 'YOLOv8-Erkennung', 'Filterung', 'Audio-Ausgabe'],
                    tech: ['Python', 'YOLOv8', 'OpenCV', 'TensorFlow'],
                    link: 'https://github.com/vilavilla'
                }
            ]
        },
        skills: {
            title: 'Technologie Stack',
            groups: [
                {
                    title: 'KI / LLMs',
                    icon: 'brain',
                    strong: ['Python', 'PyTorch', 'Transformers', 'LLM APIs', 'Prompt Engineering'],
                    working: ['RAG', 'ChromaDB', 'Cross-Encoder', 'Gemini API', 'LLM-Evaluation'],
                    exploring: ['LangChain', 'Agentische KI', 'Fine-tuning']
                },
                {
                    title: 'Backend / Systeme',
                    icon: 'terminal',
                    strong: ['Python', 'FastAPI', 'REST APIs', 'Git / GitHub'],
                    working: ['Docker', 'Linux', 'Datenpipelines', 'API-Integration'],
                    exploring: ['Cloud', 'GCP / Vertex AI', 'AWS']
                },
                {
                    title: '3D / XR',
                    icon: 'gamepad',
                    strong: ['Unity', 'C#', 'VR-Interaktion'],
                    working: ['C++', 'OpenGL', '3D-Grafik', 'Echtzeitsysteme'],
                    exploring: ['Räumliche KI', 'AR', 'CV für Immersive']
                },
                {
                    title: 'Computer Vision / Daten',
                    icon: 'eye',
                    strong: [],
                    working: ['OpenCV', 'YOLOv8', 'Bildverarbeitung', 'Benchmarking'],
                    exploring: ['3D Vision', 'SLAM', 'Scene Understanding']
                }
            ]
        },
        contact: {
            title: 'Verbinden wir uns',
            subtitle: 'Offen für Möglichkeiten in KI, Backend, Forschung und immersiven Technologien.',
            copyBtn: 'Klicken zum Kopieren der E-Mail',
            copiedBtn: 'E-Mail kopiert!'
        },
        footer: {
            built: 'Erstellt mit React, Tailwind und Framer Motion',
            rights: 'Alle Rechte vorbehalten'
        }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// ANIMATION VARIANTS
// ═══════════════════════════════════════════════════════════════════════════════

const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08, delayChildren: 0.05 }
    }
};

const scaleIn = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
    }
};

const slideInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// TAG COLOR MAP
// ═══════════════════════════════════════════════════════════════════════════════

const tagColorMap = {
    blue: {
        bg: 'bg-blue-500/10 dark:bg-blue-500/15',
        border: 'border-blue-400/30',
        text: 'text-blue-600 dark:text-blue-400'
    },
    amber: {
        bg: 'bg-amber-500/10 dark:bg-amber-500/15',
        border: 'border-amber-400/30',
        text: 'text-amber-600 dark:text-amber-400'
    },
    green: {
        bg: 'bg-emerald-500/10 dark:bg-emerald-500/15',
        border: 'border-emerald-400/30',
        text: 'text-emerald-600 dark:text-emerald-400'
    },
    purple: {
        bg: 'bg-purple-500/10 dark:bg-purple-500/15',
        border: 'border-purple-400/30',
        text: 'text-purple-600 dark:text-purple-400'
    }
};

// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// Language Selector
const LanguageSelector = ({ currentLang, setLang }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef(null);

    const languages = [
        { code: 'en',  label: 'English',  flag: '🇬🇧' },
        { code: 'es',  label: 'Español',  flag: '🇪🇸' },
        { code: 'cat', label: 'Català',   flag: '🇪🇸' },
        { code: 'it',  label: 'Italiano', flag: '🇮🇹' },
        { code: 'fr',  label: 'Français', flag: '🇫🇷' },
        { code: 'de',  label: 'Deutsch',  flag: '🇩🇪' },
    ];

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl
                   bg-zinc-800/50 dark:bg-zinc-800/50 bg-slate-100
                   hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 hover:bg-slate-200
                   border border-zinc-700/40 dark:border-zinc-700/40 border-slate-200
                   transition-all duration-200 text-sm font-medium"
                aria-label="Select language"
            >
                <Globe className="w-3.5 h-3.5 opacity-60" />
                {languages.find(l => l.code === currentLang)?.flag && (
                    <span>{languages.find(l => l.code === currentLang)?.flag}</span>
                )}
                <span className="hidden sm:inline">{languages.find(l => l.code === currentLang)?.label}</span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full right-0 mt-2 py-1.5 px-1
                       bg-zinc-900/95 dark:bg-zinc-900/95 bg-white/95
                       backdrop-blur-xl rounded-xl border
                       border-zinc-700/40 dark:border-zinc-700/40 border-slate-200
                       shadow-xl min-w-[130px] z-50"
                    >
                        {languages.map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => { setLang(lang.code); setIsOpen(false); }}
                                className={`w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg
                                   text-sm transition-colors text-left
                                   ${currentLang === lang.code
                                        ? 'text-blue-400 bg-blue-500/10'
                                        : 'text-zinc-300 dark:text-zinc-300 text-slate-600 hover:bg-zinc-800/50 dark:hover:bg-zinc-800/50 hover:bg-slate-100'}`}
                            >
                                <span className="text-base">{lang.flag}</span>
                                <span className="font-medium">{lang.label}</span>
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// Theme Toggle
const ThemeToggle = ({ isDark, setIsDark }) => (
    <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => setIsDark(!isDark)}
        className="p-2.5 rounded-xl
               bg-zinc-800/50 dark:bg-zinc-800/50 bg-slate-100
               hover:bg-zinc-700/50 dark:hover:bg-zinc-700/50 hover:bg-slate-200
               border border-zinc-700/40 dark:border-zinc-700/40 border-slate-200
               transition-all duration-200"
        aria-label="Toggle theme"
    >
        <AnimatePresence mode="wait">
            {isDark ? (
                <motion.div key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Sun className="w-4 h-4 text-yellow-400" />
                </motion.div>
            ) : (
                <motion.div key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                >
                    <Moon className="w-4 h-4 text-blue-500" />
                </motion.div>
            )}
        </AnimatePresence>
    </motion.button>
);

// Bento Card
const BentoCard = ({ children, className = '', delay = 0, hover = true }) => (
    <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay }}
        whileHover={hover ? { y: -4, transition: { duration: 0.25, ease: "easeOut" } } : {}}
        className={`bento-card group relative p-6 ${className}`}
    >
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                    transition-opacity duration-400 pointer-events-none
                    bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent" />
        <div className="relative z-10">{children}</div>
    </motion.div>
);

// Timeline Item
const TimelineItem = ({ item, isLast }) => (
    <motion.div variants={slideInLeft} className="relative pl-8 pb-8">
        {!isLast && (
            <div className="absolute left-[11px] top-7 w-0.5 h-full
                      bg-gradient-to-b from-blue-500/40 to-transparent" />
        )}
        <motion.div
            whileHover={{ scale: 1.2 }}
            className={`absolute left-0 top-1 w-5 h-5 rounded-full border-2
                  flex items-center justify-center
                  ${item.type === 'work'
                    ? 'border-blue-500 bg-blue-500/15'
                    : 'border-purple-500 bg-purple-500/15'}`}
        >
            {item.type === 'work'
                ? <Briefcase className="w-2.5 h-2.5 text-blue-400" />
                : <GraduationCap className="w-2.5 h-2.5 text-purple-400" />
            }
        </motion.div>

        <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
            className="dark:bg-zinc-800/40 bg-white rounded-xl p-5
                 dark:border-zinc-700/30 border-slate-200 border
                 hover:border-blue-500/25 dark:hover:border-blue-500/25
                 transition-all duration-300 shadow-sm dark:shadow-none"
        >
            <div className="flex items-start justify-between flex-wrap gap-2 mb-1.5">
                <div>
                    <h4 className="font-semibold dark:text-white text-slate-900">{item.org}</h4>
                    <p className="text-xs dark:text-zinc-500 text-slate-400 mt-0.5">{item.subtitle}</p>
                </div>
                <span className="flex items-center gap-1 text-xs dark:text-zinc-500 text-slate-400
                        dark:bg-zinc-800/60 bg-slate-100 px-2 py-1 rounded-full font-code">
                    <Calendar className="w-3 h-3" />
                    {item.period}
                </span>
            </div>
            <p className="text-blue-500 dark:text-blue-400 text-sm font-medium mb-2">{item.role}</p>
            <p className="text-sm dark:text-zinc-400 text-slate-500 leading-relaxed">{item.desc}</p>
        </motion.div>
    </motion.div>
);

// Project Card
const gradientMap = {
    blue:   'from-blue-500 to-indigo-500',
    amber:  'from-amber-500 to-orange-500',
    green:  'from-emerald-500 to-teal-500',
    purple: 'from-purple-500 to-pink-500'
};

const ProjectCard = ({ project, index }) => {
    const colors  = tagColorMap[project.tagColor] || tagColorMap.blue;
    const gradient = gradientMap[project.tagColor] || gradientMap.blue;
    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="bento-card group relative overflow-hidden flex flex-col"
        >
            {/* Colour bar */}
            <div className={`h-1 w-full bg-gradient-to-r ${gradient} opacity-80`} />

            <div className="p-6 flex flex-col h-full">
                {/* Tag + link */}
                <div className="flex items-center justify-between mb-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${colors.bg} ${colors.border} ${colors.text}`}>
                        {project.tag}
                    </span>
                    <motion.a
                        href={project.link} target="_blank" rel="noopener noreferrer"
                        whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}
                        className="p-1.5 rounded-lg dark:bg-zinc-800/60 bg-slate-100 hover:bg-blue-500/15 transition-colors"
                        aria-label={`View ${project.name}`}
                    >
                        <Github className="w-3.5 h-3.5 dark:text-zinc-500 text-slate-400" />
                    </motion.a>
                </div>

                {/* Name */}
                <h3 className={`text-lg font-bold mb-2 bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
                    {project.name}
                </h3>

                {/* Desc */}
                <p className="text-sm leading-relaxed dark:text-zinc-400 text-slate-500 flex-grow">
                    {project.desc}
                </p>

                {/* Tech pills */}
                <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t dark:border-zinc-800/60 border-slate-100">
                    {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 text-xs font-code rounded
                          dark:bg-zinc-800/70 bg-slate-100
                          dark:text-zinc-400 text-slate-500
                          dark:border-zinc-700/40 border-slate-200 border">
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

// Skill Group Card
const skillCfg = {
    brain:    { icon: Brain,    accent: '#8b5cf6', iconBg: 'rgba(139,92,246,0.15)', iconColor: '#a78bfa' },
    terminal: { icon: Terminal, accent: '#3b82f6', iconBg: 'rgba(59,130,246,0.15)',  iconColor: '#60a5fa' },
    gamepad:  { icon: Gamepad2, accent: '#10b981', iconBg: 'rgba(16,185,129,0.15)',  iconColor: '#34d399' },
    eye:      { icon: Eye,      accent: '#ec4899', iconBg: 'rgba(236,72,153,0.15)',  iconColor: '#f472b6' }
};

const SkillGroupCard = ({ group, delay }) => {
    const cfg = skillCfg[group.icon] || skillCfg.brain;
    const IconComp = cfg.icon;

    const levels = [
        { key: 'strong',    label: 'Strong',    items: group.strong,    dotColor: '#60a5fa' },
        { key: 'working',   label: 'Working',   items: group.working,   dotColor: '#a78bfa' },
        { key: 'exploring', label: 'Exploring', items: group.exploring, dotColor: '#52525b' }
    ];

    return (
        <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay }}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="relative rounded-2xl p-6 transition-all duration-300 overflow-hidden
                       dark:bg-zinc-900/60 bg-white
                       dark:border-zinc-800/60 border-slate-200/80 border"
            style={{ boxShadow: `0 0 0 1px ${cfg.accent}22, 0 4px 24px ${cfg.accent}0a` }}
        >
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
                 style={{ background: `linear-gradient(to bottom, ${cfg.accent}, ${cfg.accent}44)` }} />

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                 style={{ background: `radial-gradient(ellipse at top left, ${cfg.accent}08, transparent 60%)` }} />

            {/* Icon + title */}
            <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl flex items-center justify-center"
                     style={{ background: cfg.iconBg }}>
                    <IconComp className="w-5 h-5" style={{ color: cfg.iconColor }} />
                </div>
                <h3 className="font-bold dark:text-white text-slate-900 text-base">{group.title}</h3>
            </div>

            {/* Levels */}
            <div className="space-y-4">
                {levels.map(({ key, label, items, dotColor }) => items.length > 0 && (
                    <div key={key}>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: dotColor }} />
                            <p className="text-xs dark:text-zinc-500 text-slate-400 font-medium uppercase tracking-wider">
                                {label}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {items.map(item => (
                                <span key={item} className={`skill-badge-${key}`}>{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

// Floating Particles — original density restored
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
        <div className="fixed inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
            {orbs.map((orb, i) => (
                <motion.div
                    key={`orb-${i}`}
                    className={`absolute rounded-full bg-gradient-radial ${orb.color} blur-3xl`}
                    style={{
                        width: orb.size, height: orb.size,
                        left: `${orb.x}%`, top: `${orb.y}%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3], x: [0, 30, 0], y: [0, -20, 0] }}
                    transition={{ duration: 8 + i * 2, repeat: Infinity, delay: orb.delay, ease: "easeInOut" }}
                />
            ))}

            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className={`absolute rounded-full ${p.color}`}
                    style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
                    animate={{ y: [0, -80, 0], x: [0, Math.sin(p.id) * 30, 0], opacity: [0.2, 0.6, 0.2], scale: [1, 1.8, 1] }}
                    transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
                />
            ))}

            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:80px_80px]" />
        </div>
    );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function App() {
    const [isDark, setIsDark] = useState(true);
    const [lang, setLang] = useState('en');
    const [activeSection, setActiveSection] = useState('');
    const [emailCopied, setEmailCopied] = useState(false);
    const t = translations[lang];

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        document.documentElement.classList.toggle('light', !isDark);
    }, [isDark]);

    // Active section tracking via IntersectionObserver
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-40% 0px -55% 0px' }
        );
        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('joanvilaa4@gmail.com');
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2500);
    };

    return (
        <div className={`min-h-screen transition-colors duration-400
                    ${isDark ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>

            <FloatingParticles />

            {/* Background glow blobs */}
            <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
                <div className={`absolute top-0 left-1/3 w-80 h-80 rounded-full blur-3xl
                        ${isDark ? 'bg-blue-500/8' : 'bg-blue-500/4'}`} />
                <div className={`absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full blur-3xl
                        ${isDark ? 'bg-purple-500/8' : 'bg-purple-500/4'}`} />
            </div>

            {/* ═══════════════════════ NAVBAR ═══════════════════════ */}
            <motion.nav
                initial={{ y: -80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 right-0 z-50 px-6 py-3.5
                    ${isDark
                        ? 'bg-zinc-950/85 border-b border-zinc-800/40'
                        : 'bg-white/85 border-b border-slate-200/80'}
                    backdrop-blur-xl`}
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <motion.a href="#" whileHover={{ scale: 1.03 }} className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600
                           flex items-center justify-center font-bold text-white text-sm">
                            JV
                        </div>
                        <span className={`font-semibold text-sm hidden sm:block
                            ${isDark ? 'text-zinc-200' : 'text-slate-800'}`}>
                            Joan Vila
                        </span>
                    </motion.a>

                    <div className="hidden md:flex items-center gap-7">
                        {Object.entries(t.nav).map(([key, label]) => (
                            <a
                                key={key}
                                href={`#${key}`}
                                className={`text-sm font-medium transition-colors duration-200 relative pb-1
                                    ${activeSection === key
                                        ? 'nav-link-active text-blue-500'
                                        : isDark ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                {label}
                            </a>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <LanguageSelector currentLang={lang} setLang={setLang} />
                        <ThemeToggle isDark={isDark} setIsDark={setIsDark} />
                    </div>
                </div>
            </motion.nav>

            {/* ═══════════════════════ MAIN ═══════════════════════ */}
            <main className="relative z-10 pt-20">

                {/* ── HERO ── */}
                <section id="hero" className="min-h-[92vh] flex items-center justify-center px-6 py-24">
                    <motion.div
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl mx-auto text-center"
                    >
                        {/* Status badge */}
                        <motion.div
                            variants={scaleIn}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                                bg-green-500/10 border border-green-500/30 mb-8"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                            </span>
                            <span className="text-sm font-medium text-green-400">
                                {t.header.status}
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            variants={fadeInUp}
                            className="text-5xl sm:text-7xl lg:text-8xl font-bold mb-5 tracking-tight leading-none"
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
                            className="text-lg sm:text-xl mb-4 font-medium dark:text-zinc-300 text-slate-700 max-w-2xl mx-auto"
                        >
                            {t.header.role}
                        </motion.p>

                        {/* Tech pills */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center justify-center gap-2 mb-10"
                        >
                            {['Python', 'FastAPI', 'LLMs', 'RAG', 'NLP', 'Unity / VR', '3D Graphics'].map((tag) => (
                                <span key={tag} className="px-3 py-1 text-xs font-code rounded-full
                                    dark:bg-zinc-800/70 bg-slate-100
                                    dark:border-zinc-700/50 border-slate-200 border
                                    dark:text-zinc-400 text-slate-500">
                                    {tag}
                                </span>
                            ))}
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-wrap items-center justify-center gap-3 mb-10"
                        >
                            <motion.a
                                href="#projects"
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className="group flex items-center gap-2 px-6 py-3 rounded-xl
                           bg-gradient-to-r from-blue-500 to-purple-600
                           text-white text-sm font-medium
                           shadow-lg shadow-blue-500/20
                           hover:shadow-xl hover:shadow-blue-500/30
                           transition-all duration-200"
                            >
                                <Sparkles className="w-4 h-4" />
                                {t.header.cta}
                                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                            </motion.a>

                            <motion.a
                                href="/cv-joan-vila-orus.pdf"
                                download
                                whileHover={{ scale: 1.04, y: -2 }}
                                whileTap={{ scale: 0.97 }}
                                className={`flex items-center gap-2 px-6 py-3 rounded-xl
                           text-sm font-medium border transition-all duration-200
                           ${isDark
                                        ? 'border-zinc-700 text-zinc-200 hover:bg-zinc-800/60'
                                        : 'border-slate-300 text-slate-700 hover:bg-slate-100'}`}
                            >
                                {t.header.download}
                            </motion.a>
                        </motion.div>

                        {/* Social links */}
                        <motion.div
                            variants={fadeInUp}
                            className="flex items-center justify-center gap-3"
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
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`p-2.5 rounded-xl border transition-all duration-200
                                    ${isDark
                                            ? 'bg-zinc-800/50 border-zinc-700/40 text-zinc-400 hover:text-white hover:border-zinc-600'
                                            : 'bg-slate-100 border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'}`}
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>

                {/* ── ABOUT ── */}
                <section id="about" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            className="grid grid-cols-1 lg:grid-cols-3 gap-5"
                        >
                            <BentoCard className="lg:col-span-2">
                                <div className="flex items-start gap-4 mb-5">
                                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/15 to-purple-500/15
                                         border border-blue-500/15 flex-shrink-0">
                                        <Brain className="w-5 h-5 text-blue-400" />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-bold dark:text-white text-slate-900">
                                            {t.about.title}
                                        </h2>
                                        <p className="text-xs dark:text-zinc-500 text-slate-400 mt-1 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {t.about.location}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-base leading-relaxed dark:text-zinc-300 text-slate-600 mb-4">
                                    {t.about.description}
                                </p>
                                <p className="text-sm leading-relaxed dark:text-zinc-400 text-slate-500">
                                    {t.about.passion}
                                </p>
                            </BentoCard>

                            <div className="flex flex-col gap-5">
                                <BentoCard className="flex items-center justify-center flex-1 min-h-[130px]">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                                            {t.about.stat1}
                                        </div>
                                        <p className="text-sm dark:text-zinc-400 text-slate-500 font-medium">
                                            {t.about.stat1label}
                                        </p>
                                    </div>
                                </BentoCard>

                                <BentoCard className="flex items-center justify-center flex-1 min-h-[130px]">
                                    <div className="text-center">
                                        <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                                            {t.about.stat2}
                                        </div>
                                        <p className="text-sm dark:text-zinc-400 text-slate-500 font-medium">
                                            {t.about.stat2label}
                                        </p>
                                    </div>
                                </BentoCard>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── EXPERIENCE ── */}
                <section id="experience" className="py-20 px-6">
                    <div className="max-w-3xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                        >
                            <motion.div variants={fadeInUp} className="text-center mb-14">
                                <h2 className="text-3xl font-bold mb-3 dark:text-white text-slate-900">
                                    {t.experience.title}
                                </h2>
                                <div className="w-16 h-0.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

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

                {/* ── PROJECTS ── */}
                <section id="projects" className="py-20 px-6">
                    <div className="max-w-7xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                        >
                            <motion.div variants={fadeInUp} className="text-center mb-14">
                                <h2 className="text-3xl font-bold mb-3 dark:text-white text-slate-900">
                                    {t.projects.title}
                                </h2>
                                <div className="w-16 h-0.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {t.projects.items.map((project, index) => (
                                    <ProjectCard key={index} project={project} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── SKILLS ── */}
                <section id="skills" className="py-20 px-6">
                    <div className="max-w-5xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                        >
                            <motion.div variants={fadeInUp} className="text-center mb-14">
                                <h2 className="text-3xl font-bold mb-3 dark:text-white text-slate-900">
                                    {t.skills.title}
                                </h2>
                                <div className="w-16 h-0.5 mx-auto rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                            </motion.div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {t.skills.groups.map((group, i) => (
                                    <SkillGroupCard key={group.title} group={group} delay={i * 0.07} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* ── CONTACT ── */}
                <section id="contact" className="py-20 px-6">
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-80px" }}
                            className="text-center"
                        >
                            <BentoCard className="border-gradient">
                                <motion.div variants={fadeInUp}>
                                    <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                        {t.contact.title}
                                    </h2>
                                    <p className="mb-8 dark:text-zinc-400 text-slate-500 text-sm">
                                        {t.contact.subtitle}
                                    </p>

                                    {/* Email copy */}
                                    <motion.button
                                        onClick={handleCopyEmail}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full group cursor-pointer mb-5"
                                        aria-label="Copy email address"
                                    >
                                        <div className={`flex items-center justify-between gap-3 p-4 rounded-xl
                                            border-2 transition-all duration-200
                                            ${emailCopied
                                                ? 'border-emerald-500/40 dark:bg-emerald-500/5 bg-emerald-50'
                                                : 'dark:bg-zinc-800/50 bg-slate-50 dark:border-zinc-700/50 border-slate-200 hover:border-blue-500/40'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Mail className={`w-5 h-5 flex-shrink-0 ${emailCopied ? 'text-emerald-500' : 'text-blue-500'}`} />
                                                <span className="font-medium dark:text-white text-slate-900 text-sm sm:text-base">
                                                    joanvilaa4@gmail.com
                                                </span>
                                            </div>
                                            <span className={`flex items-center p-1.5 rounded-lg flex-shrink-0
                                                ${emailCopied
                                                    ? 'text-emerald-500 bg-emerald-500/10'
                                                    : 'dark:text-zinc-400 text-slate-500 dark:bg-zinc-800/60 bg-slate-100'}`}>
                                                {emailCopied
                                                    ? <Check className="w-3.5 h-3.5" />
                                                    : <Copy className="w-3.5 h-3.5" />
                                                }
                                            </span>
                                        </div>
                                    </motion.button>

                                    {/* Social links in contact */}
                                    <div className="flex items-center justify-center gap-3">
                                        {[
                                            { icon: Github, href: 'https://github.com/vilavilla', label: 'GitHub' },
                                            { icon: Linkedin, href: 'https://www.linkedin.com/in/joan-vila-orus-a82840278/', label: 'LinkedIn' },
                                        ].map((s) => (
                                            <motion.a
                                                key={s.label}
                                                href={s.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                whileHover={{ scale: 1.08, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all duration-200
                                                ${isDark
                                                        ? 'bg-zinc-800/50 border-zinc-700/40 text-zinc-300 hover:text-white hover:border-zinc-600'
                                                        : 'bg-slate-100 border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-300'}`}
                                                aria-label={s.label}
                                            >
                                                <s.icon className="w-4 h-4" />
                                                {s.label}
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>
                            </BentoCard>
                        </motion.div>
                    </div>
                </section>

                {/* ── FOOTER ── */}
                <footer className={`py-7 px-6 border-t
                           ${isDark ? 'border-zinc-800/40 bg-zinc-950/60' : 'border-slate-200 bg-white/60'}`}>
                    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                        <p className={isDark ? 'text-zinc-600' : 'text-slate-400'}>
                            © {new Date().getFullYear()} Joan Vila Orús. {t.footer.rights}
                        </p>
                        <p className={isDark ? 'text-zinc-700' : 'text-slate-300'}>
                            {t.footer.built}
                        </p>
                    </div>
                </footer>
            </main>
        </div>
    );
}

export default App;
