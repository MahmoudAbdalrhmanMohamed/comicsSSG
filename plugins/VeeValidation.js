import { defineRule, configure, Field, Form, ErrorMessage } from "vee-validate";
import { localize, setLocale } from "@vee-validate/i18n";
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  numeric,
  confirmed,
  image,
  regex,
  alpha_num as alphaNum,
} from "@vee-validate/rules";

export default defineNuxtPlugin((nuxtApp) => {
  defineRule("required", required);
  defineRule("min", min);
  defineRule("max", max);
  defineRule("alphaSpaces", alphaSpaces);
  defineRule("email", email);
  defineRule("numeric", numeric);
  defineRule("confirmed", confirmed);
  defineRule("image", image);
  defineRule("alphaNum", alphaNum);
  defineRule("regex", regex);

  defineRule("accepted", (value) => {
    return value ? true : "You must accept the terms and conditions.";
  });

  defineRule("validDate", (value) => {
    const today = new Date();
    const inputDate = new Date(value);

    // Check if the date is invalid
    if (isNaN(inputDate.getTime())) {
      return "Invalid date.";
    }

    // Reset time to 00:00:00 for both dates to avoid timezone discrepancies
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    // Check if the input date is in the future
    if (inputDate > today) {
      return "Date must not be in the future.";
    }

    return true; // Valid date
  });

  defineRule("password", (value) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{3,})(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,16}$/;

    if (!passwordRegex.test(value)) {
      return "The password must be 8-16 characters long, contain at least one uppercase letter, one lowercase letter, one special character, and at least 3 digits, and should not contain spaces.";
    }

    return true;
  });
  const i18n = nuxtApp.$i18n;
  setLocale(i18n.locale.value);

  configure({
    generateMessage: localize({
      en: {
        messages: {
          required: "This field is required.",
          min: "This field is too short.",
          max: "This field is too long.",
          alphaSpaces:
            "This field may only contain alphabetical characters and spaces.",
          email: "This field must be a valid email.",
          confirmed: "These passwords don't match.",
          regex: "Invalid regex.",
          numeric: "This field must be a valid number.",
          image: "This field must be a valid image.",
          alphaNum:
            "This field must may contain alphabetic characters or numbers.",
        },
      },
      ar: {
        messages: {
          required: "يجب ادخال قيمه.",
          min: "قصير للغاية.",
          max: "كبير للغاية.",
          alphaSpaces: "يجب أن يتكون الحقل من حروف ومسافات.",
          email: "يجب أن يكون البريد الإلكتروني صحيحًا.",
          confirmed: "كلمات المرور غير متطابقة.",
          regex: "تنسيق غير صحيح.",
          numeric: "يجب أن يكون الرقم صحيحًا.",
          image: "يجب أن يكون الملف صورة.",
          alphaNum: "يجب أن يحتوي هذا الحقل على أحرف أبجدية أو أرقام.",
        },
      },
    }),
  });

  nuxtApp.vueApp.component("VeeForm", Form);
  nuxtApp.vueApp.component("VeeField", Field);
  nuxtApp.vueApp.component("VeeErrorMessage", ErrorMessage);
});
