import z from "zod";

//==================================================
// SUBJECT
//==================================================

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  teachers: z.array(z.string()), //teacherId
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

//==================================================
// CLASS
//==================================================

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required" }), //teacherId
  gradeId: z.coerce.number().min(1, { message: " Grade name is required" }), //teacherId
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

//==================================================
// TEACHER
//==================================================

export const teacherSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "BloodType is required!" }),
  img: z.string().optional(),
  subjects: z.array(z.coerce.number()).optional(), //Subject id
});

export type TeacherSchema = z.infer<typeof teacherSchema>;

//==================================================
// STUDENT
//==================================================

export const studentSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  name: z.string().min(1, { message: "First name is required" }),
  surname: z.string().min(1, { message: "Last name is required" }),
  phone: z.string().min(1, { message: "Phone is required" }).optional(),
  address: z.string().min(1, { message: "Address is required" }),
  birthday: z.coerce.date({ message: "Birthday is required" }),
  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required" }),
  bloodType: z.string().min(1, { message: "BloodType is required!" }),
  img: z.string().optional(),
  gradeId: z.coerce.number().min(1, { message: "Graded is required" }),
  classId: z.coerce.number().min(1, { message: "Class is required" }),
  parentId: z.string().min(1, { message: "Parent is required" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;
