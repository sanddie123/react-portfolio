export const copy = {
  nav: {
    start: { en: "START", th: "หน้าแรก" },
    skills: { en: "SKILLS", th: "ทักษะ" },
    works: { en: "WORKS", th: "ผลงาน" },
    contact: { en: "CONTACT", th: "ติดต่อ" },
  },
  hero: {
    greeting: { en: "HELLO, MY NAME IS", th: "สวัสดีครับ ผม" },
    nameLine1: { en: "PANU", th: "ภานุ" },
    nameLine2: { en: "WASANAPITRANONT", th: "วาสนาพิตรานนท์" },
    lead: {
      en: "Electronic Engineering student with a strong aptitude for Full Stack Development.",
      th: "นักศึกษาวิศวกรรมอิเล็กทรอนิกส์ที่มีความถนัดด้าน Full Stack Development",
    },
    body: {
      en: "Seeking an internship to contribute to technical projects and further develop industry expertise.",
      th: "กำลังมองหาสถานที่ฝึกงานเพื่อมีส่วนร่วมในโปรเจกต์ทางเทคนิคและพัฒนาความเชี่ยวชาญในสายอาชีพ",
    },
    github: { en: "GITHUB PROFILE", th: "โปรไฟล์ GITHUB" },
  },
  skills: {
    title: { en: "SKILLS", th: "ทักษะ" },
    cards: [
      {
        heading: { en: "PROGRAMMING", th: "การเขียนโปรแกรม" },
        items: [
          { icon: "/assets/skills-icon/python.svg", label: "Python" },
          { icon: "/assets/skills-icon/c.svg", label: "C" },
          { icon: "/assets/skills-icon/java.svg", label: "Java" },
          { icon: "/assets/skills-icon/matlab.svg", label: "MATLAB" },
          { icon: "/assets/skills-icon/flutter.svg", label: "Flutter" },
          { icon: "/assets/skills-icon/dart.svg", label: "Dart" },
        ],
      },
      {
        heading: { en: "WEB DEVELOPMENT", th: "การพัฒนาเว็บ" },
        items: [
          { icon: "/assets/skills-icon/html.svg", label: "HTML" },
          { icon: "/assets/skills-icon/css.svg", label: "CSS" },
          { icon: "/assets/skills-icon/react.svg", label: "React" },
          { icon: "/assets/skills-icon/bootstrap.svg", label: "Bootstrap" },
          { icon: "/assets/skills-icon/php.svg", label: "PHP" },
          { icon: "/assets/skills-icon/flask.svg", label: "Flask" },
          { icon: "/assets/skills-icon/fastapi.svg", label: "FastAPI" },
          { icon: "/assets/skills-icon/rest-api.svg", label: "REST API" },
          { icon: "/assets/skills-icon/wordpress.svg", label: "WordPress" },
          { icon: "/assets/skills-icon/mysql.svg", label: "MySQL" },
          { icon: "/assets/skills-icon/figma.svg", label: "Figma" },
        ],
      },
      {
        heading: { en: "SOFTWARE & TOOLS", th: "ซอฟต์แวร์และเครื่องมือ" },
        items: [
          { icon: "/assets/skills-icon/git.svg", label: "Git" },
          { icon: "/assets/skills-icon/azure.svg", label: "Azure Cloud" },
          { icon: "/assets/skills-icon/vercel.svg", label: "Vercel" },
          { icon: "/assets/skills-icon/web-hosting.svg", label: "Web Hosting" },
          { icon: "/assets/skills-icon/dns.svg", label: "DNS Management" },
          { icon: "/assets/skills-icon/ngrok.svg", label: "ngrok" },
          { icon: "/assets/skills-icon/vmware.svg", label: "VMware" },
          { icon: "/assets/skills-icon/cisco.svg", label: "Cisco Packet Tracer" },
        ],
      },
      {
        heading: { en: "HARDWARE", th: "ฮาร์ดแวร์" },
        items: [
          { icon: "/assets/skills-icon/easyeda.svg", label: "EasyEDA" },
          { icon: "/assets/skills-icon/arduino.svg", label: "Arduino" },
          { icon: "/assets/skills-icon/esp32.svg", label: "ESP32" },
          { icon: "/assets/skills-icon/circuitverse.svg", label: "CircuitVerse" },
          { icon: "/assets/skills-icon/soldering.svg", label: "Soldering" },
        ],
      },
      {
        heading: { en: "MULTIMEDIA", th: "มัลติมีเดีย" },
        items: [
          { icon: "/assets/skills-icon/photoshop.svg", label: "Adobe Photoshop" },
          { icon: "/assets/skills-icon/davinci-resolve.svg", label: "DaVinci Resolve" },
          { icon: "/assets/skills-icon/audacity.svg", label: "Audacity" },
        ],
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
