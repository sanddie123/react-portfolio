export const workOrder = [
  "vku-internship",
  "kopart",
  "uav",
  "repair-system",
  "game-tracker-webapp",
  "game-and-groove",
  "pcb",
];

export const works = {
  "vku-internship": {
    category: { en: "INTERNATIONAL INTERNSHIP", th: "ฝึกงานต่างประเทศ" },
    cardTitle: {
      en: "VKU & KMUTNB Internship Program",
      th: "โครงการฝึกงาน VKU & KMUTNB",
    },
    title: {
      en: "VKU & KMUTNB\nInternship Program",
      th: "โครงการฝึกงาน\nVKU & KMUTNB",
    },
    desc: {
      en: [
        "Participated in an international internship and research program at the Vietnam-Korea University of Information and Communication Technology (VKU).",
        "Collaborated on advanced technical research and academic exchange initiatives as an exchange student from King Mongkut's University of Technology North Bangkok (KMUTNB).",
        "Engaged in cross-cultural engineering environments, combining software development methodologies with international academic standards.",
        "Successfully completed specialized project milestones and presented findings as part of the bilateral university exchange program.",
      ],
      th: [
        "เข้าร่วมโครงการฝึกงานและวิจัยระดับนานาชาติที่ Vietnam-Korea University of Information and Communication Technology (VKU)",
        "ร่วมมือในงานวิจัยทางเทคนิคขั้นสูงในฐานะนักศึกษาแลกเปลี่ยนจากมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ (KMUTNB)",
        "มีส่วนร่วมในสภาพแวดล้อมทางวิศวกรรมข้ามวัฒนธรรม ผสมผสานการพัฒนาซอฟต์แวร์เข้ากับมาตรฐานวิชาการสากล",
        "บรรลุเป้าหมายโปรเจกต์ที่ได้รับมอบหมายและนำเสนอผลงานซึ่งเป็นส่วนหนึ่งของโครงการแลกเปลี่ยนทวิภาคีระหว่างมหาวิทยาลัย",
      ],
    },
    links: [
      {
        label: {
          en: "ARTICLE 1",
          th: "บทความ 1",
        },
        url: "https://vku.udn.vn/vku-welcomes-six-students-from-king-mongkuts-university-of-technology-north-bangkok-kmutnb-thailand-for-international-internships/",
      },
      {
        label: {
          en: "ARTICLE 2",
          th: "บทความ 2",
        },
        url: "https://vku.udn.vn/students-from-king-mongkuts-university-of-technology-north-bangkok-kmutnb-thailand-successfully-complete-their-internship-and-research-program-at-vku/",
      },
    ],
    images: [
      "/assets/vku/images/0_image.png",
      "/assets/vku/images/1_image.png",
      "/assets/vku/images/2_image.png",
      "/assets/vku/images/3_image.png",
    ],
    cover: "/assets/vku/images/0_image.png",
  },
  kopart: {
    category: { en: "E-COMMERCE WEBSITE", th: "เว็บไซต์อีคอมเมิร์ซ" },
    cardTitle: { en: "Ko Parts Mahachai", th: "โก้ พาร์ท มหาชัย" },
    title: { en: "Ko Parts Mahachai", th: "โก้ พาร์ท มหาชัย" },
    techStack: ["WordPress", "WooCommerce", "Ruk-Com Hosting", "DNS Management"],
    desc: {
      en: [
        "Developed a fully functional WordPress e-commerce website for an automotive parts business.",
        "Implemented a checkout workflow allowing customers to easily purchase items.",
        "Configured a comprehensive WordPress admin dashboard for store managers to review payment slips, track order statuses, and manage product catalog listings.",
        "Managed domain configuration, DNS routing, and successfully deployed the website to a live environment using Ruk-Com hosting.",
      ],
      th: [
        "พัฒนาเว็บไซต์อีคอมเมิร์ซด้วย WordPress สำหรับธุรกิจจำหน่ายอะไหล่ยนต์",
        "สร้างระบบสั่งซื้อสินค้าเพื่อให้ลูกค้าเลือกซื้อสินค้าได้อย่างสะดวกและรวดเร็ว",
        "สร้างระบบหลังบ้าน (Admin Dashboard) ของ WordPress เพื่อให้ผู้ดูแลร้านสามารถตรวจสอบสลิปการชำระเงิน ติดตามสถานะคำสั่งซื้อ และจัดการรายการสินค้าได้",
        "จัดการการตั้งค่าโดเมน DNS Routing และนำเว็บไซต์ขึ้นไปใช้งานจริงผ่านบริการ Ruk-Com Hosting",
      ],
    },
    links: [
      {
        label: { en: "VISIT WEBSITE", th: "เข้าชมเว็บไซต์" },
        url: "https://ko2002.com/",
      },
    ],
    images: [
      "/assets/kopart/images/0_image.png",
      "/assets/kopart/images/1_image.png",
      "/assets/kopart/images/2_image.png",
      "/assets/kopart/images/3_image.png",
      "/assets/kopart/images/4_image.png",
      "/assets/kopart/images/5_image.png",
      "/assets/kopart/images/6_image.png",
    ],
    cover: "/assets/kopart/images/0_image.png",
  },
  uav: {
    category: { en: "WEB APPLICATION", th: "เว็บแอปพลิเคชัน" },
    cardTitle: {
      en: "UAV Landslide Dashboard",
      th: "แดชบอร์ดติดตามดินถล่ม UAV",
    },
    title: {
      en: "UAV Landslide Dashboard",
      th: "แดชบอร์ดติดตามดินถล่ม UAV",
    },
    techStack: [
      "Flask",
      "SQLite",
      "Genetic Algorithm",
      "Socket.IO",
      "Leaflet.js",
      "Chart.js",
    ],
    desc: {
      en: [
        "Developed a full-stack Flask application with a SQLite database to process real-time environmental sensor data.",
        "Integrated a machine learning model to predict landslide risk scores based on soil moisture, vibration, and tilt metrics.",
        "Built a responsive Bootstrap frontend with live Socket.IO updates, interactive Leaflet.js maps, and Chart.js data visualizations.",
        "Implemented automated SMTP email alerts for critical safety warnings and a CSV export feature for data analysis.",
      ],
      th: [
        "พัฒนาเว็บแอปพลิเคชัน Full-stack ด้วย Flask ร่วมกับใช้ฐานข้อมูล SQLite เพื่อประมวลผลข้อมูลเซ็นเซอร์แบบเรียลไทม์",
        "ผสานโมเดล Machine Learning เพื่อทำนายคะแนนความเสี่ยงของดินถล่มโดยอ้างอิงจากการวัดความชื้นในดิน การสั่นสะเทือน และความเอียง",
        "สร้าง Responsive Frontend ด้วย Bootstrap พร้อมการอัปเดตแบบเรียลไทม์ผ่าน Socket.IO, แผนที่แบบโต้ตอบ Leaflet.js และการแสดงผลข้อมูลด้วย Chart.js",
        "มีระบบแจ้งเตือนความปลอดภัยขั้นวิกฤตอัตโนมัติผ่านอีเมล (SMTP) และฟีเจอร์การส่งออกไฟล์ CSV สำหรับนำไปใช้ในการวิเคราะห์ข้อมูล",
      ],
    },
    links: [
      {
        label: { en: "WATCH VIDEOS", th: "ดูวิดีโอ" },
        type: "video-gallery",
        urls: [
          "/assets/uav/videos/0_video.mp4",
          "/assets/uav/videos/1_video.mp4",
          "/assets/uav/videos/2_video.mp4",
        ],
      },
      {
        label: { en: "GITHUB", th: "GITHUB" },
        url: "https://github.com/sanddie123/UAV-Landslide-Dashboard",
      },
    ],
    images: [
      "/assets/uav/images/0_image.png",
      "/assets/uav/images/1_image.png",
      "/assets/uav/images/2_image.png",
      "/assets/uav/images/3_image.png",
      "/assets/uav/images/4_image.png",
    ],
    cover: "/assets/uav/images/0_image.png",
  },
  "repair-system": {
    category: { en: "WEB APPLICATION", th: "เว็บแอปพลิเคชัน" },
    cardTitle: {
      en: "Request Repair System",
      th: "ระบบแจ้งซ่อมบำรุง",
    },
    title: {
      en: "Request Repair System",
      th: "ระบบแจ้งซ่อมบำรุง",
    },
    techStack: ["HTML/CSS/JS", "PHP", "MySQL", "Bootstrap"],
    desc: {
      en: [
        "Developed a full-stack repair management platform to track maintenance tickets.",
        "Architected a backend structure with a relational database to handle user roles, technician assignments, and repair logs.",
        "Built an intuitive, responsive frontend interface for seamless ticket submission and status updates.",
        "Implemented full CRUD functionality to streamline tracking, filtering, and updating active repair orders.",
      ],
      th: [
        "พัฒนาแพลตฟอร์มจัดการงานซ่อมบำรุงแบบ Full-stack เพื่อติดตามการแจ้งซ่อม",
        "ออกแบบโครงสร้าง Backend ด้วยฐานข้อมูลเชิงสัมพันธ์ เพื่อจัดการบทบาทผู้ใช้ งานมอบหมายช่างเทคนิค และประวัติการซ่อม",
        "สร้าง Frontend ที่ใช้งานง่ายด้วย HTML, CSS, Bootstrap และ JavaScript เพื่อการส่งการแจ้งซ่อมและการอัปเดตสถานะ",
        "ใช้ฟังก์ชัน CRUD เพื่อใช้ในการสร้าง อ่าน อัปเดต และลบคำสั่งซ่อม",
      ],
    },
    links: [
      {
        label: { en: "GITHUB", th: "GITHUB" },
        url: "https://github.com/sanddie123/cit-repair-system",
      },
    ],
    images: [
      "/assets/repair-system/images/0_image.png",
      "/assets/repair-system/images/1_image.png",
      "/assets/repair-system/images/2_image.png",
      "/assets/repair-system/images/3_image.png",
      "/assets/repair-system/images/4_image.png",
      "/assets/repair-system/images/5_image.png",
      "/assets/repair-system/images/6_image.png",
    ],
    cover: "/assets/repair-system/images/0_image.png",
  },
  "game-tracker-webapp": {
    category: { en: "WEB APPLICATION", th: "เว็บแอปพลิเคชัน" },
    cardTitle: { en: "Game Tracker", th: "ตัวจัดการคลังเกม" },
    title: { en: "Game Tracker", th: "ตัวจัดการคลังเกม" },
    techStack: ["HTML/CSS/JS", "PHP", "MySQL", "Bootstrap", "IGDB API"],
    desc: {
      en: [
        "Developed a full-stack web application to organize and track personal game collections.",
        "Built a responsive frontend using HTML, CSS, Bootstrap, and JavaScript, ensuring a user-friendly interface.",
        "Architected the backend using PHP and MySQL to manage user data and handle efficient database queries.",
        "Implemented full CRUD features (Create, Read, Update, Delete) to simplify library management.",
        "Integrated an IGDB API to fetch game information and enhance the user experience.",
      ],
      th: [
        "พัฒนา Full-stack เว็บแอปพลิเคชันเพื่อจัดการและติดตามคอลเล็กชันเกมส่วนตัว",
        "สร้าง Frontend ให้ใช้งานง่ายและรองรับทุกอุปกรณ์ด้วย HTML, CSS, Bootstrap และ JavaScript",
        "ออกแบบ Backend ด้วย PHP และ MySQL เพื่อจัดการข้อมูลผู้ใช้และประมวลผลฐานข้อมูลอย่างมีประสิทธิภาพ",
        "ใช้งานฟีเจอร์ CRUD แบบเต็มรูปแบบ (สร้าง, อ่าน, อัปเดต, ลบ) เพื่อให้การจัดการคลังเกมง่ายขึ้น",
        "เชื่อมต่อกับ IGDB API เพื่อดึงข้อมูลเกมและยกระดับประสบการณ์ใช้งาน",
      ],
    },
    links: [
      {
        label: { en: "GITHUB", th: "GITHUB" },
        url: "https://github.com/sanddie123/game-tracker-v2",
      },
    ],
    images: [
      "/assets/game-tracker-webapp/images/0_image.png",
      "/assets/game-tracker-webapp/images/1_image.png",
      "/assets/game-tracker-webapp/images/2_image.png",
      "/assets/game-tracker-webapp/images/3_image.png",
      "/assets/game-tracker-webapp/images/4_image.png",
      "/assets/game-tracker-webapp/images/5_image.png",
    ],
    cover: "/assets/game-tracker-webapp/images/0_image.png",
  },
  "game-and-groove": {
    category: { en: "MOBILE APPLICATION", th: "โมบายแอปพลิเคชัน" },
    cardTitle: {
      en: "Game and Groove",
      th: "แอปพลิเคชันคลังเพลงเกม",
    },
    title: {
      en: "Game and Groove",
      th: "แอปพลิเคชันคลังเพลงเกม",
    },
    techStack: ["Flutter", "Dart", "Firebase Firestore"],
    desc: {
      en: [
        "Developed a cross-platform mobile application using Flutter and Dart to serve as a video game music vault and soundtrack tracker.",
        "Architected a responsive user interface allowing users to seamlessly browse, organize, and enjoy gaming soundtracks.",
        "Integrated Google Cloud Firestore to securely store and sync user favorites, playlists, and personal vault preferences in real-time.",
        "Implemented custom audio playback controls and state management to ensure a smooth, immersive listening experience.",
      ],
      th: [
        "พัฒนาโมบายแอปพลิเคชันข้ามแพลตฟอร์มด้วย Flutter และ Dart เพื่อใช้เป็นคลังเพลงประกอบวิดีโอเกม",
        "ออกแบบ User Interface ที่รองรับทุกอุปกรณ์ เพื่อให้ผู้ใช้ค้นหา จัดการ และเพลิดเพลินกับเพลงประกอบเกมได้อย่างราบรื่น",
        "เชื่อมต่อกับ Google Cloud Firestore เพื่อจัดเก็บและซิงค์รายการโปรด เพลย์ลิสต์ และการตั้งค่าส่วนตัวแบบเรียลไทม์",
        "พัฒนาระบบควบคุมการเล่นเสียงแบบกำหนดเองและการจัดการ State เพื่อประสบการณ์การฟังที่ราบรื่นและเต็มอิ่ม",
      ],
    },
    links: [
      {
        label: { en: "GITHUB", th: "GITHUB" },
        url: "https://github.com/sanddie123/game-and-groove",
      },
    ],
    images: [
      "/assets/game-and-groove/images/0_image.png",
      "/assets/game-and-groove/images/1_image.png",
      "/assets/game-and-groove/images/2_image.png",
      "/assets/game-and-groove/images/3_image.png",
      "/assets/game-and-groove/images/4_image.png",
    ],
    cover: "/assets/game-and-groove/images/0_image.png",
  },
  pcb: {
    category: { en: "HARDWARE", th: "ฮาร์ดแวร์" },
    cardTitle: {
      en: "PCB Design & Fabrication",
      th: "การออกแบบและผลิต PCB",
    },
    title: {
      en: "PCB Design & Fabrication",
      th: "การออกแบบและผลิต PCB",
    },
    techStack: ["EasyEDA"],
    desc: {
      en: [
        "Designed a custom printed circuit board (PCB) using EasyEDA to control a 7-segment display via address decoding logic.",
        "Executed the complete hardware lifecycle from schematic capture to physical component soldering and hardware testing.",
        "Successfully verified circuit functionality, troubleshooting connection points to ensure stable performance.",
      ],
      th: [
        "ออกแบบแผงวงจรพิมพ์ (PCB) แบบกำหนดเองด้วย EasyEDA เพื่อควบคุม 7-segment display ผ่าน Address decoding logic",
        "ดำเนินการวงจรชีวิตฮาร์ดแวร์ตั้งแต่การวาด Schematic ไปจนถึงการบัดกรีอุปกรณ์และทดสอบฮาร์ดแวร์จริง",
        "ตรวจสอบการทำงานของวงจรและแก้ไขปัญหาจุดเชื่อมต่อจนสำเร็จ เพื่อให้มั่นใจในประสิทธิภาพที่เสถียร",
      ],
    },
    links: [],
    images: [
      "/assets/pcb/images/0_image.png",
      "/assets/pcb/images/1_image.jpg",
      "/assets/pcb/images/2_image.png",
      "/assets/pcb/images/3_image.jpg",
      "/assets/pcb/images/4_image.png",
    ],
    cover: "/assets/pcb/images/0_image.png",
  },
};
