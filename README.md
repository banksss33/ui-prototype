# คู่มือการใช้งาน Storybook

## ภาพรวม
โปรเจกต์นี้ใช้ Storybook เพื่อพัฒนาและทดสอบ UI Components แบบแยกส่วน ช่วยให้เราสามารถดูและทดสอบคอมโพเนนต์ต่างๆ ได้โดยไม่ต้องรันแอปพลิเคชันทั้งหมด

## การติดตั้งและเริ่มต้นใช้งาน

### ติดตั้ง Dependencies
```bash
npm install
```

### เริ่มต้น Storybook
```bash
npm run storybook
```
Storybook จะเริ่มทำงานที่ `http://localhost:6006`

## โครงสร้างไฟล์

## สร้าง Story ใหม่

### 1. สร้าง Component
สร้างไฟล์ component ใหม่ในโฟลเดอร์ `src/stories/`

### 2. สร้าง Story File
สร้างไฟล์ `<ComponentName>.stories.ts` ตามตัวอย่าง:

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { YourComponent } from './your-component';

const meta: Meta<typeof YourComponent> = {
  title: 'Example/YourComponent',
  component: YourComponent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // กำหนด controls สำหรับ props
    propName: {
      control: 'text', // หรือ 'boolean', 'select', etc.
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// สร้าง Stories ต่างๆ
export const Default: Story = {
  args: {
    // กำหนดค่า default props
  },
};

export const WithDifferentProps: Story = {
  args: {
    // กำหนดค่า props ที่แตกต่างกัน
  },
};
```

## การใช้งาน Controls

ในแต่ละ Story สามารถควบคุม Props ของ Component ได้ผ่าน Controls panel:
- **Text**: สำหรับ string props
- **Boolean**: สำหรับ boolean props
- **Select**: สำหรับ enum หรือ union types
- **Number**: สำหรับ number props
- **Color**: สำหรับ color props

## Tips การใช้งาน

### 1. การจัดกลุ่ม Stories
ใช้ `title` ในการจัดกลุ่ม Stories:
```typescript
title: 'Components/Buttons/PrimaryButton'
title: 'Components/Forms/Input'
title: 'Pages/LoginPage'
```

### 2. การใช้ Parameters
```typescript
parameters: {
  layout: 'centered', // 'centered', 'fullscreen', 'padded'
  docs: {
    description: {
      story: 'คำอธิบาย Story นี้'
    }
  }
}
```

### 3. การใช้ Args
```typescript
args: {
  // Default values สำหรับ props
  disabled: false,
  children: 'Click me',
}
```

## การทดสอบ

Storybook ติดตั้ง Vitest addon เพื่อการทดสอบ:
- สร้างไฟล์ `*.test.ts` หรือ `*.spec.ts`
- รันการทดสอบผ่าน Storybook UI
- ดูผลการทดสอบในแท็บ Tests

## Best Practices

1. **ตั้งชื่อ Story ให้สื่อความหมาย**: ใช้ชื่อที่บอกถึงสถานะหรือการใช้งานของ Component
2. **สร้าง Story หลากหลายสถานะ**: Default, Loading, Error, Empty state, etc.
3. **ใช้ Controls อย่างเหมาะสม**: ช่วยให้ QA และ Designer ทดสอบได้ง่าย
4. **เขียน Documentation**: ใช้ addon-docs เพื่อสร้างเอกสารที่ดี
5. **ตรวจสอบ Accessibility**: ใช้ A11y addon เพื่อให้ Component เข้าถึงได้

## คำสั่งที่ใช้บ่อย

```bash
# เริ่ม Storybook
npm run storybook

# Build Storybook
npm run build-storybook

# รัน Lint
npm run lint

# รัน Dev server (สำหรับแอป)
npm run dev

# Build แอป
npm run build
```

## การแก้ปัญหาเบื้องต้น

### 1. Storybook ไม่เริ่มต้น
- ตรวจสอบว่าติดตั้ง dependencies ครบถ้วนแล้ว
- ลบ `node_modules` และ `package-lock.json` แล้วรัน `npm install` ใหม่

### 2. Story ไม่แสดงผล
- ตรวจสอบการ import Component ใน Story file
- ตรวจสอบว่า Component export อย่างถูกต้อง

### 3. Controls ไม่ทำงาน
- ตรวจสอบการกำหนด `argTypes` ใน meta
- ตรวจสอบว่า Props ของ Component มี type ที่ถูกต้อง

สำหรับปัญหาอื่นๆ สามารถดูเอกสารเพิ่มเติมได้ที่ [Storybook Documentation](https://storybook.js.org/docs)
