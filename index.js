const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2501-FTB-ET-WEB-PT/events' //This is our API, which we will use fetch data form.


//State object after each api call.
const state = {
   events: [],
}

//Place root div in a variable
const root = document.querySelector('#root')


const eventForm = document.querySelector('#eventForm')
const eventName = document.querySelector('#eventName')
const eventDescription = document.querySelector('#eventDescription')
const eventDate = document.querySelector('#eventDate')
const eventLocation = document.querySelector('#eventLocation')

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toISOString()

}

//render a function

const render = (events) => {
    root.innerHTML = '';
    events.forEach(event => {
        const eventItem = document.createElement('div')
        eventItem.classList.add('event-item')
        
        const id = document.createElement('p')
        id.textContent = `ID: ${event.id}`

        const name = document.createElement('p')
        name.textContent = `Name: ${event.name}`

        const description = document.createElement('p')
        description.textContent = `Description: ${event.description}`

        const date = document.createElement('p')
        date.textContent = `Date: ${event.date}`

        const location = document.createElement('p')
        location.textContent = `Location: ${event.location}`
        
        const deleteBtn = document.createElement('button')
        deleteBtn.textContent = 'Delete Event';
        deleteBtn.addEventListener('click', () => 
            removeEvent(event.id))


        //Append all elements
        eventItem.appendChild(id);
        eventItem.appendChild(name);
        eventItem.appendChild(description);
        eventItem.appendChild(date);
        eventItem.appendChild(location);
        eventItem.appendChild(deleteBtn);

        //Append root to container
        root.appendChild(eventItem)

    })

}


//async function to GET/Fetch event from the API
const getEvents = async (apiUrl)=> {
    try{
        const response = await fetch(apiUrl)
        const result = await response.json()
        console.log(result)
        
        state.events = result.data
        console.log(state)
        render(state.events)

    }catch(error){
        console.error(error)
    }
}

getEvents(apiUrl)



// //POST a new event
const postNewEvent = async (newEvent) => {
    try{
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newEvent),
        })
            const result = await response.json();
            console.log('New event created:', result)
            // state.newEvent = result.data

    }catch(error){
        console.error(error)
    }
}


//submission of handle to post
const submitEvent = async (event) => {
    event.preventDefault();

    const newEvent = {
        name: eventName.value,
        description: eventDescription.value,
        date: eventDate.value,
        location: eventLocation.value,
    };
    console.log(newEvent)
    await postNewEvent(newEvent)
    
}

eventForm.addEventListener('submit', submitEvent);



//Delete event using `DELETE'
const removeEvent = async (id) => {
    try{
     const response = await fetch(`${apiUrl}/${id}`, {
       method: 'DELETE' 
     })
     if (response.ok) {
        console.log(`Event with ID ${id} has been deleted`);
        state.events = state.events.filter(event => event.id !== id);
        render(state.events); 
    } else {
        console.error('Failed to delete event');
    }  
}catch(error){
    console.error(error)
}
}
