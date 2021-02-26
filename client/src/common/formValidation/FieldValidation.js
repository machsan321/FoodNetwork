import * as yup from "yup";
import * as Constant from "./ConstantValidtion";

export const emailSchema = (yup
    .string("נא להזין מייל תקין")
    .email("נא להזין מייל תקין")
    .required("נא להזין מייל ")
    .max(80)
    .min(4))

export const passwordSchema = (yup
    .string("נא להזין סיסמה ")
    .required("נא להזין סיסמה")
    .max(20, "מקסימום 20 תווים")
    .min(4, "מינימום 4 תווים"))

export const firstNameSchema = (yup
    .string("נא להזין שם ")
    .required("נא להזין שם"))
export const LastNameSchema = (yup
    .string("נא להזין שם משפחה ")
    .required("נא להזין שם משפחה"))

    export const RequiredStringSchema = (yup
        .string("נא להזין ")
        .required("נא להזין"))

const AllSchemas = {
    [Constant.EMAIL_SCHEMA]: emailSchema,
    [Constant.PASSWORD_SCHEMA]: passwordSchema,
    [Constant.FIRSTNAME_SCHEMA]:firstNameSchema,
    [Constant.LASTNAME_SCHEMA]:LastNameSchema,
    [Constant.username_SCHEMA]:RequiredStringSchema

}

export const CreateValidionSchema = (reqSchema) => {
    let Schemas = [];

    reqSchema.forEach(element => {

        Object.keys(element).forEach((key) => {
            Schemas.push({ [key]: AllSchemas[element[key]] })
        });
    });
    const res = Object.assign({}, ...Schemas);

    return yup.object(res);

}