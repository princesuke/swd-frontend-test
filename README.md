# 📦 React + TypeScript + Next.js

## 🧩 Feature Summary

### 1. Layout Style Page (Shape Control)

- รองรับการแปลภาษาด้วย `i18next` (EN / TH)
- ใช้ **Ant Design** จัด Layout ของปุ่ม
- ปุ่มควบคุมการจัดเรียง shape:
  - 🔁 **Move Shape** – เลื่อนรูปร่างแบบวนซ้าย/ขวา
  - 🔀 **Move Position** – สลับแถวและจัดเรียงชิดซ้าย/ขวา
  - 🎲 **Random** – คลิก shape เพื่อสุ่มตำแหน่งใหม่
- รูปร่างสร้างด้วย **SCSS & CSS clip-path**
- ใช้โทนสีหลักพื้นหลัง:
  - `#FFA200` (ส้ม)
  - `#6EDA78` (เขียว)

### 2. Person Manager SPA

- ใช้ **Redux Toolkit** จัดการสถานะของฟอร์ม
- รองรับ **Create / Edit / Delete** และเก็บข้อมูลไว้ใน LocalStorage
- เมื่อรีเฟรช หน้าเว็บข้อมูลยังคงอยู่
- ตารางข้อมูลมี **Pagination**
- รองรับการลบแบบรายบุคคล
- รองรับการแปลภาษา (i18next)

---

## ▶️ การรันโปรเจกต์

```bash
pnpm install
pnpm dev
```

โปรเจกต์นี้จัดโครงสร้างแบบ Clean Architecture
แยก Feature ชัดเจนด้วย Feature-based Folder Structure บนพื้นฐานของ Next.js 14 App Router
