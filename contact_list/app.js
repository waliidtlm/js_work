const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const storage = [];

function addContact() {
  rl.question('Add phone number? : ', (Phone) => {
    rl.question('Contact Fullname: ', (Fullname) => {
      const contact = {
        fullname: Fullname,
        phonenumber: Phone,
      };

      storage.push(contact);
      console.log('Contact Saved!!');
      displayMenu(); 
    });
  });
}

function viewContacts() {
  if (storage.length === 0) {
    console.log('No contacts found!!');
  } else {
    console.log('Contact list:');
    storage.forEach((contact, index) => {
      console.log(`${index + 1}. Name: ${contact.fullname}, Phone: ${contact.phonenumber}`);
    });
  }
  displayMenu(); 
}

function searchContact() {
  rl.question('Enter name: ', (isName) => {
    const foundContact = storage.find((contact) => contact.fullname === isName); 
    if (foundContact) {
      console.log(`Contact found: Name: ${foundContact.fullname}, Phone: ${foundContact.phonenumber}`);
    } else {
      console.log(`No contact with the name ${isName}`);
    }
    displayMenu(); 
  });
}

function exit() {
  console.log('Exiting the application.');
  rl.close();
}

function displayMenu() {
  console.log('Contacts Application Menu:');
  console.log('1. Add a Contact');
  console.log('2. View All Contacts');
  console.log('3. Search for a Contact');
  console.log('4. Exit');
  rl.question('Select an option (1/2/3/4): ', (choice) => {
    switch (choice) {
      case '1':
        addContact();
        break;
      case '2':
        viewContacts();
        break;
      case '3':
        searchContact();
        break;
      case '4':
        exit();
        break;
      default:
        console.log('Invalid option. Please try again.\n');
        displayMenu();
        break;
    }
  });
}
