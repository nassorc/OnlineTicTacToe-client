export const authInputs = [
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