export const formikValidation = (values: valuesTypes) => {
  if (!values.email) {
    return {
      email: "Email is required",
    }
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    return {
      email: "Invalid email address",
    }
  }
  if (!values.password) {
    return {
      password: "Password is required",
    }
  } else if (values.password.length < 6) {
    return {
      password: "The minimum foam length should be 6",
    }
  }
  if (!values.name) {
    return {
      name: "Name is required",
    }
  }
}

type valuesTypes = {
  email: string
  password: string
  name?: string
}
