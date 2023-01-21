import { createContext, useEffect, useState } from "react";

const MeetupContext = createContext({
  isLoading: true,
  meetups: [],

  addMeetup: (meetup) => {},
  removeMeetup: (meetupId) => {},
});

export function MeetupContextProvider(props) {
  const [meetupList, setMeetupList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const meetupUrl =
    "https://meetups-react-37eb0-default-rtdb.asia-southeast1.firebasedatabase.app/meetups";

  useEffect(() => {
    setIsLoading(true);
    fetch(meetupUrl + ".json")
      .then((response) => response.json())
      .then((data) => {
        const meetups = [];
        for (let key in data) {
          const meetup = {
            id: key,
            ...data[key],
          };
          meetups.push(meetup);
        }
        setMeetupList(meetups);
        setIsLoading(false);
      });
  }, []);

  function addMeetupHandler(meetup) {
    setMeetupList((prev) => [...prev, meetup]);
    fetch(meetupUrl + ".json", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(console.log("data submited"))
      .catch((reason) => {
        console.log(reason);
      });
  }

  function removeMeetupHandler(meetupId) {
    setMeetupList((prev) => prev.filter((meetup) => meetup.id !== meetupId));
    fetch(meetupUrl + `/${meetupId}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("data submited");
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  const context = {
    meetups: meetupList,
    isLoading,
    addMeetup: addMeetupHandler,
    removeMeetup: removeMeetupHandler,
  };

  return (
    <MeetupContext.Provider value={context}>
      {props.children}
    </MeetupContext.Provider>
  );
}

export default MeetupContext;
