export const copy = {
  nav: {
    start: { en: "START", th: "หน้าแรก" },
    about: { en: "ABOUT ME", th: "เกี่ยวกับฉัน" },
    works: { en: "WORKS", th: "ผลงาน" },
    contact: { en: "CONTACT", th: "ติดต่อ" },
  },
  hero: {
    greeting: { en: "HELLO, MY NAME IS", th: "สวัสดีครับ ผม" },
    nameLine1: { en: "PANU", th: "ภานุ" },
    nameLine2: { en: "WASANAPITRANONT", th: "วาสนาพิตรานนท์" },
    subtitle: {
      en: "ELECTRONIC ENGINEERING (COMPUTER) STUDENT",
      th: "นักศึกษาวิศวกรรมอิเล็กทรอนิกส์แขนงคอมพิวเตอร์",
    },
  },
  about: {
    title: { en: "ABOUT ME", th: "เกี่ยวกับฉัน" },
    lead: {
      en: "Electronic Engineering student with a strong aptitude for Full Stack Development.",
      th: "นักศึกษาวิศวกรรมอิเล็กทรอนิกส์ที่มีความถนัดด้าน Full Stack Development",
    },
    body: {
      en: "Seeking an internship to contribute to technical projects and further develop industry expertise.",
      th: "กำลังมองหาสถานที่ฝึกงานเพื่อมีส่วนร่วมในโปรเจกต์ทางเทคนิคและพัฒนาความเชี่ยวชาญในสายอาชีพ",
    },
    github: { en: "GITHUB PROFILE", th: "โปรไฟล์ GITHUB" },
    skillsTitle: { en: "SKILLS", th: "ทักษะ" },
    skills: [
      {
        heading: { en: "PROGRAMMING", th: "การเขียนโปรแกรม" },
        items: "Python, C, Java, MATLAB, Mobile Development (Flutter & Dart)",
      },
      {
        heading: { en: "WEB DEVELOPMENT", th: "การพัฒนาเว็บ" },
        items:
          "Frontend (HTML, CSS, React, Bootstrap), Backend (PHP, Flask, FastAPI, REST API), Database (MySQL), UI/UX Design (Figma)",
      },
      {
        heading: { en: "SOFTWARE & TOOLS", th: "ซอฟต์แวร์และเครื่องมือ" },
        items:
          "Version Control (Git), Cloud & Deployment (Azure Cloud, Vercel, ngrok), Virtualization (VMWare), Network Simulation (Cisco Packet Tracer)",
      },
      {
        heading: { en: "HARDWARE & ELECTRONICS", th: "ฮาร์ดแวร์และอิเล็กทรอนิกส์" },
        items:
          "PCB Design (EasyEDA), Microcontrollers (Arduino, ESP32), Logic Design (CircuitVerse), Soldering",
      },
      {
        heading: { en: "MULTIMEDIA", th: "มัลติมีเดีย" },
        items:
          "Image Editing (Adobe Photoshop), Video Editing (DaVinci Resolve), Audio Editing (Audacity)",
      },
    ],
  },
  works: {
    title: { en: "WORKS", th: "ผลงาน" },
    details: { en: "DETAILS", th: "รายละเอียด" },
    close: { en: "CLOSE", th: "ปิด" },
    techStack: { en: "Tech Stack Used:", th: "เทคโนโลยีที่ใช้:" },
  },
  contact: {
    title: { en: "CONTACT", th: "ติดต่อ" },
    nameLabel: { en: "YOUR NAME *", th: "ชื่อของคุณ *" },
    namePlaceholder: { en: "Jane Doe", th: "สมชาย ใจดี" },
    emailLabel: { en: "YOUR EMAIL *", th: "อีเมลของคุณ *" },
    emailPlaceholder: { en: "jane@example.com", th: "somchai@example.com" },
    messageLabel: { en: "YOUR MESSAGE *", th: "ข้อความของคุณ *" },
    messagePlaceholder: {
      en: "Write your message here...",
      th: "พิมพ์ข้อความของคุณที่นี่...",
    },
    send: { en: "SEND", th: "ส่ง" },
    sending: { en: "SENDING...", th: "กำลังส่ง..." },
    deliveryFailed: {
      en: "DELIVERY FAILED - RETRY",
      th: "ส่งไม่สำเร็จ - ลองอีกครั้ง",
    },
    connectionFailed: {
      en: "CONNECTION FAILED - RETRY",
      th: "การเชื่อมต่อล้มเหลว - ลองอีกครั้ง",
    },
    success: { en: "Message Sent!", th: "ส่งข้อความสำเร็จ!" },
    otherWays: { en: "OTHER WAYS TO REACH ME", th: "ช่องทางการติดต่ออื่นๆ" },
    email: { en: "EMAIL", th: "อีเมล" },
    lineId: { en: "LINE ID", th: "ไลน์ไอดี" },
    facebook: { en: "FACEBOOK", th: "เฟซบุ๊ก" },
    quote: {
      en: '"Keep going, even if it\'s not for your own sake."',
      th: '"จงก้าวต่อไป แม้ว่าจะไม่ใช่เพื่อตัวคุณเองก็ตาม"',
    },
    copyright: {
      en: "© 2026 PANU WASANAPITRANONT. ALL RIGHTS RESERVED.",
      th: "© 2026 ภานุ วาสนาพิตรานนท์. สงวนลิขสิทธิ์.",
    },
  },
};

export function t(entry, language) {
  return entry[language];
}
