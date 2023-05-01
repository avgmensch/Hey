export const help = `
hey [NAME] [FLAGS]

USAGE
  Request information about a name (NAME) from
  the APIs 'genderize.io', 'agify.io' and 'nationalize.io'.
  A valid name does not contain spaces. If it does only the
  first word from the string will be used.

FLAGS
  -g --no-gender   do not request data from genderize.io
  -a --no-age      do not request data from agify.io
  -n --no-nation   do nor request data from nationalize.io
  -h --help        show this message

EXAMPLE
  hey karen -g     request age and nationality for name karen
  hey hans         request everything for name hans
`;
