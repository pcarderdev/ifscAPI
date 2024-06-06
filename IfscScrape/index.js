const ATHLETE_URL = 'http://localhost:5000/Athlete';

async function TestConnection() {
  await fetch(ATHLETE_URL + '/TestConnection')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(
          'TestConnection failed with status: ' + response.status
        );
      }
    })
    .then((body) => {
      console.debug(body);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function GetAthletes() {
  await fetch(ATHLETE_URL + '/GetAthletes')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('GetAthletes failed with status: ' + response.status);
      }
    })
    .then((body) => {
      console.debug(body);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function GetAthlete(id) {
  await fetch(ATHLETE_URL + `/GetAthlete/${id}`)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Failed to GetAthlete with id: ${id}`);
      }
    })
    .then((body) => {
      console.debug(body);
    })
    .catch((error) => {
      console.error(error);
    });
}

async function AddAthlete(fullName, country, ifscUrl) {
  await fetch(ATHLETE_URL + '/AddAthlete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      fullName,
      country,
      ifscUrl,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('AddAthlete was successful');
      } else {
        throw new Error('AddAthlete failed with status: ' + response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

async function EditAthlete(id, fullName, country, ifscUrl) {
  await fetch(ATHLETE_URL + '/EditAthlete', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id,
      fullName,
      country,
      ifscUrl,
    }),
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('EditAthlete was successful');
      } else {
        throw new Error('EditAthlete failed with status: ' + response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

async function DeleteAthlete(id) {
  await fetch(ATHLETE_URL + `/DeleteAthlete/${id}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.status === 200) {
        console.log('DeleteAthlete was successful');
      } else {
        throw new Error('DeleteAthlete failed with status: ' + response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
