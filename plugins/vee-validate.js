import { extend, configure } from "vee-validate";
import { required, alpha, email, min } from "vee-validate/dist/rules";

const config = {
  classes: {
    valid: 'is-valid',
    // valid: 'has-success',
    invalid: 'is-invalid'
  },
};

configure(config);

extend("required", {
  ...required,
  message: "This field is required"
});

extend("alpha", {
  ...alpha,
  message: "This field must only contain alphabetic characters"
});

extend("email", {
  ...email,
  message: "error email"
});

extend("min", {
  ...min,
  message: "error min"
});
