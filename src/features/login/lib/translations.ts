export const translations = {
  ru: {
    login: "Вход в систему",
    register: "Форма регистрации",
    email: "Почта",
    username: "Логин",
    password: "Пароль",
    enterUsername: "Введите логин",
    enterPassword: "Введите пароль",
    submit: "Войти",
    submitRegister: "Зарегистрироваться",
    cancel: 'Отмена'
  },
  en: {
    login: "Sign In",
    register: "Form of registration",
    email: "Email",
    username: "Username",
    password: "Password",
    enterUsername: "Enter username",
    enterPassword: "Enter password",
    submit: "Sign In",
    submitRegister: "Register",
    cancel: 'Cancel',
  },
} as const;


export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations["en"]
