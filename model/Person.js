class Person {}
Person.schema = {
  name: "Person",
  properties: {
    name:  'string',
    avatar:  'string',
    birthday_month: 'int', // optional property
    birthday_year:'int' // optional property
  }
};
module.exports = Person;
