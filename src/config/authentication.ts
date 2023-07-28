export const authSignInInputs = [
  {
    id: 1,
    name: 'email',
    type: 'email',
    placeholder: 'email',
    label: 'Email',
    pattern: '\\b[\\w\\d\\.~!#$%^&*}{}]+@[\\w\\.]+\\.(com|net|org)\\b',
    errorMessage: 'Valid email required',
    required: true,
  },
  {
    id: 2,
    name: 'password',
    type: 'password',
    placeholder: 'password',
    label: 'Password',
    pattern: '[.]{6,}',
    errorMessage: 'Password must be atleast 6 characters',
    required: true
  }
]

export const authSignUpInputs = [
  {
    id: 1,
    name: 'username',
    type: 'text',
    placeholder: 'username',
    label: 'Username',
    pattern: '',
    errorMessage: 'Valid username required',
    required: true,
  },
  {
    id: 2,
    name: 'email',
    type: 'email',
    placeholder: 'email',
    label: 'Email',
    pattern: '\\b[\\w\\d\\.~!#$%^&*}{}]+@[\\w\\.]+\\.(com|net|org)\\b',
    errorMessage: 'Valid email required',
    required: true,
  },
  {
    id: 3,
    name: 'password',
    type: 'password',
    placeholder: 'password',
    label: 'Password',
    pattern: '[.]{6,}',
    errorMessage: 'Password must be atleast 6 characters',
    required: true
  }
]