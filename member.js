function skillsMember() {
  var skills = ['HTML', 'CSS', 'JS', 'React'];
  var member = {
    name: 'Yoon',
    age: 27,
    skills: skills
  };
  member.skills[3] = 'Vue';
  console.log(member);
}
