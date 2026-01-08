import dayjs from "dayjs";
import z from "zod/v3";

const UserZodSchema = {
    username: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 255 ký tự' }),

    fullname: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(255, { message: 'Tối đa 255 ký tự' }),

    dob: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Ngày tháng không đúng định dạng')
        .refine(
            (dateStr) => dayjs(dateStr, 'YYYY-MM-DD', true).isValid(),
            { message: 'Ngày tháng không hợp lệ' }
        )
        .transform((val: string) => new Date(val)),

    phoneNumber: z.string()
        .min(5, { message: 'Tối đa 5 ký tự' })
        .max(15, { message: 'Tối đa 15 ký tự' }),
};

export default UserZodSchema;