import { createContext, useEffect, useState } from "react";

const FavoriteContext = createContext({
  favoriteMeetups: [],
  favoriteMeetupsCount: 0,
  isLoding: true,
  isFavoriteMeetup: (meetupId) => {},
  addFavoriteMeetup: (meetup) => {},
  removeFavoriteMeetup: (meetupId) => {},
});

export function FavoriteContextProvoider(props) {
  const [favoriteMeetups, setFavoriteMeetups] = useState([]);
  const [favoriteMeetupsCount, setFavoriteMeetupsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const favoriteMeetupUrl =
    "https://meetups-react-37eb0-default-rtdb.asia-southeast1.firebasedatabase.app/favorites";

  useEffect(() => {
    setIsLoading(true);
    fetch(favoriteMeetupUrl + ".json")
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
        setFavoriteMeetups(meetups);
        setFavoriteMeetupsCount(meetups.length);
        setIsLoading(false);
      });
  }, []);

  function addFavoriteMeetupHandler(meetup) {
    setFavoriteMeetups((prev) => [...prev, meetup]);
    fetch(favoriteMeetupUrl + ".json", {
      method: "POST",
      body: JSON.stringify(meetup),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("data submited");
        setFavoriteMeetupsCount((prev) => prev + 1);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }

  const isFavoriteMeetupHandler = (meetupId) =>
    favoriteMeetups.some((meetup) => meetup.id === meetupId);

  function removeFavoriteMeetupHandler(meetupId) {
    setFavoriteMeetups((prev) =>
      prev.filter((meetup) => meetup.id !== meetupId)
    );

    fetch(favoriteMeetupUrl + `/${meetupId}.json`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log("data submited");
        setFavoriteMeetupsCount((prev) => prev - 1);
      })
      .catch((reason) => {
        console.log(reason);
      });
  }
  const context = {
    favoriteMeetups,
    favoriteMeetupsCount,
    isLoading,
    isFavoriteMeetup: isFavoriteMeetupHandler,
    addFavoriteMeetup: addFavoriteMeetupHandler,
    removeFavoriteMeetup: removeFavoriteMeetupHandler,
  };

  return (
    <FavoriteContext.Provider value={context}>
      {props.children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
