import mantaPoster from '../assets/manta-poster.png';
import ietf from '../assets/ietf.png';
import echoNews from '../assets/echo-news-85.png';
import undivePoster from '../assets/undive-poster.png';
import sswc from '../assets/sswc.png';
import ebaf from '../assets/ebaf.png';
import badappleUefi from '../assets/badapple-uefi.png';
import mantaShowcase from '../assets/manta-showcase.gif';
import badappleTerminal from '../assets/badapple-terminal.png';
import hueshift from '../assets/hueshift.gif';
import clashOfLegends from '../assets/clash-of-legends.png';
import undiveShowcase from '../assets/undive-showcase.png';
import dailyAnime from '../assets/daily-anime-ddpm.png';
import wholeNewWorld from '../assets/a-whole-new-world.png';
import harq from '../assets/harq.png';
import e2eEncrypted from '../assets/e2e-encrypted-comm.png';
import mantaOverview from '../assets/manta-overview.png';
import undiveOverview from '../assets/undive-overview.png';

export const personalInfo = {
  name: "Hemang J Jamadagni",
  education: "MSCS @ University of California, San Diego (UCSD)",
  about: "I am an Applied AI and Computer Vision Researcher with a rigorous background in Systems Engineering. I am also an avid open-source enthusiast, open to chatting or collaborating on interesting projects.",
  socials: {
    email: "mailto:hemangjamadagni@gmail.com",
    linkedin: "https://www.linkedin.com/in/hemangjamadagni",
    github: "https://github.com/Kazedaa",
    googleScholar: "https://scholar.google.com/citations?user=3W8dWKMAAAAJ&hl=en"
  },
  educationList: [
    {
      degree: "Master of Science in Computer Science",
      school: "University of California, San Diego (UCSD)",
      date: "2026 - 2028",
      major: "Computer Science"
    },
    {
      degree: "Bachelor of Technology",
      school: "National Institute of Technology Karnataka (NITK)",
      date: "2022 - 2026",
      major: "Computer Science and Engineering",
      minor: "Machine Learning"
    }
  ]
};

export const highlights = [
  {

    image: mantaPoster,
    description: "Authored MANTA: Physics-Informed Underwater Object Tracking, accepted to WACV 2026.",
    date: "March 2026",
    link: "https://wacv.thecvf.com/virtual/2026/poster/373"
  },
  {

    image: ietf,
    description: "Presented a Congestion Control Evaluation Suite Design at the 124th IETF Meeting to the CCWG in Montreal, Canada.",
    date: "Nov 2025",
    link: "https://www.youtube.com/watch?v=elcRv2ruyDc"
  },
  {

    image: echoNews,
    description: "Developed eBAF, a kernel-level eBPF Ad Firewall that received a shout-out from eBPF Foundation Leader Bill Mulligan in his newsletter Echo News.",
    date: "July 2025",
    link: "https://www.linkedin.com/pulse/echo-news-85-bill-mulligan-jcsgf/"
  },
  {

    image: undivePoster,
    description: "Co-Authored UnDIVE: Generalized Underwater Video Enhancement using Generative Priors, accepted to WACV 2025, and presented at Tucson, USA.",
    date: "March 2025",
    link: "https://openaccess.thecvf.com/content/WACV2025/html/Srinath_UnDIVE_Generalized_Underwater_Video_Enhancement_using_Generative_Priors_WACV_2025_paper.html"
  },
  // {

  //   image: sswc,
  //   description: "Authored HARQ Soft Combining Using Bidirectional LSTMs, accepted and presented at SSWC 2024.",
  //   date: "Apr 2025",
  //   link: "https://link.springer.com/chapter/10.1007/978-981-96-1348-9_9"
  // },
];

export const experiences = [
  {

    company: "National Institute of Technology Karnataka",
    role: "Undergraduate Research Assistant",
    dateRange: "Feb 2025 - May 2026",
    description: "Working on Medical Image Segmentation under the guidance of Dr Jeny Rajan. Manuscript under review at the Journal of Engineering Applications of Artificial Intelligence (EAAI).",
    highlights: [
    ]
  },
  {

    company: "Indian Institute of Science (IISc)",
    role: "Undergraduate Research Assistant",
    dateRange: "May 2025 - Sept 2025",
    description: "Designed and developed MANTA, a physics-informed framework for underwater object tracking that integrates representation learning with tracking design to solve the challenges of wavelength-dependent attenuation and scattering in underwater environments. Translating mathematical optical models into robust neural network architectures ultimately strengthened my expertise in merging theoretical physics with applied, state-of-the-art computer vision. This experience deepened my understanding of building efficient, real-time AI by combining physics-informed machine learning with foundational computer science concepts to optimize models for resource-constrained environments.",
    highlights: [
      "Authored \"MANTA: Physics-Informed Generalized Underwater Object Tracking,\" which was accepted for publication at WACV 2026.",
      "Architected a dual-positive contrastive learning strategy that couples temporal consistency with Beer-Lambert augmentations, yielding feature representations that are highly robust to both temporal and underwater spatial distortions.",
      "Engineered a multi-stage pipeline augmenting motion-based tracking with a physics-informed secondary association algorithm. This integrated geometric consistency and appearance similarity to successfully re-identify targets even under severe occlusion and drift.",
      "Designed and integrated a graph-based tracking algorithm, leveraging fundamental data structures to significantly reduce computational overhead compared to standard deep learning based tracking methods.",
      "Formulated and introduced novel evaluation metrics, including Center-Scale Consistency (CSC) and Geometric Alignment Score (GAS), to rigorously assess geometric fidelity beyond standard IoU metrics.",
      "Outperformed existing baselines by 6% in Success AUC and established new efficiency benchmarks by achieving an inference speed of 37 FPS while halving the model size (45M) compared to other state-of-the-art methods."
    ]
  },
  {

    company: "IEEE NITK",
    role: "Project Head",
    dateRange: "Apr 2025 - Apr 2026",
    description: "Directed the year-long technical mentorship program and oversaw financial operations for the student chapter. This leadership role allowed me to step outside of pure engineering to hone my skills in project management, resource allocation, and organizational strategy.",
    highlights: [
    ]
  },
  {

    company: "Different",
    role: "Software Development Intern",
    dateRange: "May 2025 - July 2025",
    description: "Designed and developed an internal product, end-to-end, that streamlined bug reporting across the engineering pipeline. This required the translation of high-level user needs into a reliable, production-ready technical architecture. This role helped me bridge the gap between theoretical computer science and practical product development.",
    highlights: [
      "Architected and developed a full-stack, intelligent bug-tracking browser extension backed by a FastAPI and AWS backend to eliminate manual reporting friction.",
      "Automated deployment by integrating the service into the company's CI/CD pipeline using Terraform. Provisioned secure AWS infrastructure and managed Cloudflare certificates to ensure the internal tool remained strictly private and isolated.",
      "Integrated Agentic AI to automatically convert rough user inputs into structured bug titles and descriptions, significantly improving issue tracking accuracy.",
      "Implemented a custom Stale-While-Revalidate (SWR) caching strategy from scratch to optimize data retrieval for dynamic fields (like tags and assignees), effectively reducing the extension's UI latency from 2 seconds to under 100ms.",
      "Engineered the extension to automatically capture critical page state context (including console logs, network requests, browser/OS info, and area-selected screenshots) and format it directly into the team's Notion task tracker."
    ]
  },
  {

    company: "IEEE NITK",
    role: "Executive Member",
    dateRange: "Dec 2022 - Apr 2026",
    description: "Mentored a team of junior developers through the end-to-end research and development of a complex computer vision pipeline. This role allowed me to develop my technical leadership skills, translating my deep learning expertise into actionable guidance and architectural direction for the students.",
    highlights: [
    ]
  },
  {

    company: "Indian Institute of Science (IISc)",
    role: "Undergraduate Research Assistant",
    dateRange: "Apr 2024 - July 2024",
    description: "Collaborated with Dr. Prathosh A. P. to tackle the complex challenges of enhancing underwater media, specifically addressing the lack of ground-truth data and the inability of single-image methods to maintain temporal consistency. This experience served as my introduction to formal, rigorous academic research.",
    highlights: [
      "Co-authored \"UnDIVE: Generalized Underwater Video Enhancement Using Generative Priors,\" which was accepted and published at WACV 2025.",
      "Developed the framework by coupling a downstreamed Denoising Diffusion Probabilistic Model (DDPM) with a classical physics-based imaging model for spatial enhancement.",
      "Implemented an unsupervised temporal consistency loss, establishing a new state-of-the-art performance benchmark and proving the model's ability to generalize across various water types.",
      "Presented the research at the WACV2025 conference in Tucson, Arizona, earning praise from industry experts for contributing to the solution of maritime and environmental challenges."
    ]
  },
];

export const projects = [
  {

    title: "eBAF: eBPF Based Ad Firewall",
    image: ebaf,
    description: "eBAF is a high-performance, kernel-level network adblocker utilizing eBPF/XDP. It is engineered to be a robust packet filtering system that bypasses the standard Linux networking stack to inspect and drop ad-serving traffic in real-time with near-zero latency. It handles the shifting ad domains by integrating a dynamic DNS resolution mechanism to continuously update IP blacklists, and includes an interactive web dashboard for live traffic monitoring. This project allowed me to explore low-level systems architecture and network protocols, ultimately earning a shout-out from eBPF Foundation Leader, Bill Mulligan in his newsletter Echo News.",
    date: "Apr 2025",
    link: "https://github.com/Kazedaa/eBAF"
  },
  {

    title: "Bad Apple but it's a Bootloader",
    image: badappleUefi,
    description: "A standalone UEFI application written in C that effectively acts as a bare-metal micro-operating system just to play a video during the computer's boot sequence. Bypassing the OS entirely, it interfaces directly with the motherboard's firmware and uses the UEFI Graphics Output Protocol (GOP) to stream video straight to the screen's framebuffer. To get around standard FAT32 file size limits, I wrote a custom video codec to compress the video into a 1-bit Run-Length Encoded (RLE) format that the C engine decodes on the fly.",
    date: "May 2026",
    link: "https://github.com/Kazedaa/Bad-Apple-but-its-a-bootloader"
  },
  {

    title: "MANTA: Physics-Informed Generalized Underwater Object Tracking",
    image: mantaShowcase,
    description: "MANTA is a state-of-the-art, physics-informed machine learning framework designed to solve severe aquatic visual distortions in underwater object tracking. It implements a novel dual-positive contrastive learning pipeline integrating Beer-Lambert optical priors, and a multi-stage tracking architecture that leverages geometric consistency to resolve complex occlusion and drift challenges. The framework achieves state-of-the-art performance across four major benchmarks (WebUOT-1M, UOT32, UTB180, UWCOT220), improving Success AUC by 6% while ensuring real-time efficiency, and culminated in a co-first author publication accepted at WACV 2026.",
    date: "May 2025",
    link: "https://github.com/Kazedaa/MANTA"
  },
  {

    title: "Bad Apple on a Terminal",
    image: badappleTerminal,
    description: "A silly project, rendering the Bad Apple music video on an ASCII Terminal.",
    date: "Jun 2025",
    link: "https://github.com/Kazedaa/badapple"
  },
  {

    title: "ClariGPT",
    image: "https://placehold.co/400x250/1a1a1a/ffffff?text=ClariGPT",
    description: "ClariGPT is a full-stack, AI-powered research assistant chatbot leveraging a ReACT agent framework, Flask, and the Groq API to streamline the querying and summarization of arXiv academic papers. It involves a modular, multi-tool backend integrating PyMuPDF for robust PDF extraction and Pydantic for structured AI outputs, successfully bridging the gap between raw LLM reasoning capabilities and a seamless, interactive conversational interface for end users.",
    date: "Mar 2025",
    link: "https://github.com/Kazedaa/ClariGPT"
  },
  {

    title: "HueShift: Breathing Life into Every Frame",
    image: hueshift,
    description: "HueShift is an end-to-end video colorization pipeline leveraging diffusion models, PyTorch, and OpenCV to automatically colorize grayscale video sequences. It implements the core machine learning infrastructure to perform frame-wise colorization, encompassing data preprocessing, model training and inference, and multi-resolution post-processing utilities. It tackles complex visual artifacts by implementing temporal consistency optimizations, keyframe detection, and deflickering techniques. This project culminated in a public demonstration at the NITK Executive Project Expo.",
    date: "Jun 2024",
    link: "https://github.com/Kazedaa/Hueshift-Video-Coloring"
  },
  {

    title: "Clash-of-Legends: A Two Player Street Fighter Game",
    image: clashOfLegends,
    description: "Clash of Legends is an interactive, browser-based 2D fighting game utilizing object-oriented JavaScript and HTML5 Canvas. It implements a robust core game loop to manage real-time player inputs, sprite rendering, and precise hitbox collision detection. It includes complex state management systems to handle dynamic combat mechanics, including real-time health tracking, round-based countdown timers, and a strict win/loss condition logic, delivering a responsive, arcade-style game.",
    date: "Sep 2024",
    link: "https://github.com/Kazedaa/Clash-of-Legends"
  },
  {

    title: "UnDIVE: Generalized Underwater Video Enhancement Using Generative Priors",
    image: undiveShowcase,
    description: "UnDIVE is a generalized machine learning framework leveraging generative priors to solve severe aquatic visual distortions in underwater video media. It tackles the critical lack of ground-truth data and the inherent temporal inconsistencies of traditional single-image enhancement methods by designing a robust pipeline that ensures stable, high-fidelity frame sequences across diverse underwater environments. This research successfully bridged theoretical generative models with practical video enhancement challenges, culminating in a co-authored publication accepted at WACV 2025.",
    date: "Apr 2024",
    link: "https://github.com/suhas-srinath/undive"
  },
  {

    title: "Daily DDPM Anime",
    image: dailyAnime,
    description: "An Instagram AI bot that generates and posts anime pictures. The bot utilizes a deep learning model, specifically a Denoising Diffusion Probabilistic Model (DDPM), implemented with PyTorch. The generated images are then automatically posted to Instagram.",
    date: "May 2024",
    link: "https://github.com/Kazedaa/Daily-DDPM-Anime"
  },
  {

    title: "A Hole New World: Seamless Image Inpainting",
    image: wholeNewWorld,
    description: "Image inpainting is a computer vision task that involves filling in missing or damaged parts of an image. It has various applications including photo editing, image restoration, and object removal. The focus of this project is on image inpainting using PatchGAN, a type of Generative Adversarial Network (GAN), on the CelebA dataset, which contains over 200,000 celebrity images.",
    date: "Jan 2024",
    link: "https://github.com/Kazedaa/A-Whole-New-World-Seamless-Image-Inpainting"
  },
  {

    title: "HARQ Soft Combining Using Bidirectional LSTMs",
    image: harq,
    description: "A deep learning-based error correction framework for wireless communications by optimizing the Hybrid Automatic Repeat Request (HARQ) protocol. A Bidirectional Long Short-Term Memory (Bi-LSTM) Autoencoder processes multiple corrupted transmission frames to seamlessly reconstruct a single, high-fidelity output frame. This framework successfully bridges sequence modeling with low-level network reliability, culminating in a co-first author publication in a Scopus-indexed Springer book chapter and a personal presentation at the SSWC2024 International Conference.",
    date: "Jul 2023",
    link: "https://github.com/Kazedaa/HARQ-Soft-Combining-Using-Bidirectional-LSTMs"
  },
  {

    title: "End-to-End Encrypted Communication Using Purely Digital Systems",
    image: e2eEncrypted,
    description: "The goal of this project is to design a system of units that communicate between each other via end-to-end encryption. The RSA encryption algorithm will be used and the user will be able to choose the kind of encryption. The aim is to achieve secure communication between two digital systems.",
    date: "Aug 2023",
    link: "https://github.com/AdiPadi2703/End-To-End-Encrypted-Communication"
  }
];

export const publications = [
  {

    title: "MANTA: Physics-Informed Generalized Underwater Object Tracking",
    publisher: "Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), 2026, pp. 3472-3482",
    image: mantaOverview,
    description: "Underwater object tracking is challenging due to wavelength-dependent attenuation and scattering, which severely distort appearance across depths and water conditions. Existing trackers trained on terrestrial data fail to generalize to these physics-driven degradations. We present MANTA, a physics-informed framework integrating representation learning with tracking design for underwater scenarios. We propose a dual-positive contrastive learning strategy coupling temporal consistency with Beer–Lambert augmentations to yield features robust to both temporal and underwater distortions. We further introduce a multi-stage pipeline augmenting motion-based tracking with a physics-informed secondary association algorithm that integrates geometric consistency and appearance similarity for re-identification under occlusion and drift. To complement standard IoU metrics, we propose Center–Scale Consistency (CSC) and Geometric Alignment Score (GAS) to assess geometric fidelity. Experiments on four underwater benchmarks (WebUOT-1M, UOT32, UTB180, UWCOT220) show that MANTA achieves state-of-the-art performance, improving Success AUC by up to 6%, while ensuring stable long-term generalized underwater tracking and efficient runtime.",
    date: "Mar 6, 2026",
    link: "https://openaccess.thecvf.com/content/WACV2026/html/Srinath_MANTA_Physics-Informed_Generalized_Underwater_Object_Tracking_WACV_2026_paper.html"
  },
  {

    title: "HARQ Soft Combining Using Bidirectional LSTMs",
    publisher: "Smart Innovation, Systems and Technologies ((SIST,volume 433)), pp. 109-122",
    image: harq,
    description: "Hybrid Automatic Repeat reQuest is used in modern wireless data communication to integrate both Automatic Repeat reQuest and high-rate Forward Error Correction mechanisms to enhance the reliability of data transmission. Unlike traditional ARQ, where an error-ridden frame is discarded upon reception, HARQ temporarily stores the erroneous frame in a buffer. When the re-transmission of the same frame occurs, these two frames are combined to generate a new frame, trying to minimize errors. This is HARQ with Soft Combining. Existing methods like Chase Combining (Type-I) and Incremental Redundancy (Type-II and Type-III) implement Log-Likelihood Ratio and Maximum Ratio Combining to combine two erroneous frames. This paper uses a Bidirectional Long Short-Term Memory model to combine two frames with high channel noise errors. This paper introduces the BiLSTM model, which aims to reduce the Bit Error Rate and provides an approach for integrating this model into the existing HARQ structure.",
    date: "Apr 18, 2025",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-1348-9_9"
  },
  {

    title: "UnDIVE: Generalized Underwater Video Enhancement using Generative Priors",
    publisher: "Proceedings of the IEEE/CVF Winter Conference on Applications of Computer Vision (WACV), 2025, pp. 8983-8994",
    image: undiveOverview,
    description: "With the rise of marine exploration, underwater imaging has gained significant attention as a research topic. Underwater video enhancement has become crucial for real-time computer vision tasks in marine exploration. However, most existing methods focus on enhancing individual frames and neglect video temporal dynamics, leading to visually poor enhancements. Furthermore, the lack of ground-truth references limits the use of abundant available underwater video data in many applications. To address these issues, we propose a two-stage framework for enhancing underwater videos. The first stage uses a denoising diffusion probabilistic model to learn a generative prior from unlabeled data, capturing robust and descriptive feature representations. In the second stage, this prior is incorporated into a physics-based image formulation for spatial enhancement, while also enforcing temporal consistency between video frames. Our method enables real-time and computationally-efficient processing of high-resolution underwater videos at lower resolutions, and offers efficient enhancement in the presence of diverse water-types. Extensive experiments on four datasets show that our approach generalizes well and outperforms existing enhancement methods.",
    date: "Mar 3, 2025",
    link: "https://openaccess.thecvf.com/content/WACV2025/html/Srinath_UnDIVE_Generalized_Underwater_Video_Enhancement_using_Generative_Priors_WACV_2025_paper.html"
  },
];
