import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect } from "react";
import "./Searchbar.css";
import { faSoccerBall, faBasketball, faVolleyball, faPingPongPaddleBall, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router";
export default function Searchbar({ socket, socketId }) {
    const SPORTS = {
        football: <FontAwesomeIcon icon={faSoccerBall} />,
        basketball: <FontAwesomeIcon icon={faBasketball} />,
        volley: <FontAwesomeIcon icon={faVolleyball} />,
        ping_pong: <FontAwesomeIcon icon={faPingPongPaddleBall} />
      };

        
    const [club, setClub] = useState("");
    const [searchedClubs, setSearchedClubs] = useState([]);
    const [personalClubs, setPersonalClubs] = useState([]);
    const navigate = useNavigate();
    const changeText = async e => {
        
        const currValue = e.target.value;
        setClub(currValue);
        if (currValue.length === 0) {
            setSearchedClubs([]);
            return;
        }
        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: currValue
            })
        };

        const resJSON = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/search-club`, options);
        const rows = await resJSON.json();
        console.log(rows);
        setSearchedClubs(rows);
    };  

    const checkIfInClub = (clubId) => {
        console.log(personalClubs);
        const found = personalClubs.some(club => club.id === clubId);
        console.log("FOUND: ", found)
        return found;
    };

    const joinClub = async (clubId, clubName, sport) => {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: localStorage.getItem("id"),
                email: localStorage.getItem("email"),
                username: localStorage.getItem("username"),
                clubId: clubId, 
                clubName: clubName,
                sport: sport,
                socketId: socketId
            })
        };

        const resJSON = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/join-club`, options);
        const res = await resJSON.json();
        console.log(await res);
        const currClubs = JSON.parse(localStorage.getItem("clubs")) || [];
        currClubs.push({
            id: localStorage.getItem("id"),
            clubId: clubId,
            name: clubName,
            owner: false,
            date: new Date(),
            sport: sport,
            socketId: socket.id
        });

        localStorage.setItem("clubs", JSON.stringify(currClubs));
        
        if (res.joined) {

            navigate(`/clubs/${clubId}`);
        }
    };  

    useEffect(() => {
        (async () => {
          if (!localStorage.getItem("logged")) return;
    
          const options = {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              id: localStorage.getItem("id")
            })
          };
    
          const resJSON = await fetch(`${process.env.REACT_APP_URL}:${process.env.REACT_APP_SERVER_PORT}/get-clubs`, options);
          const clubs = await resJSON.json();
          console.log(clubs, clubs.clubs);
          setPersonalClubs(await clubs.clubs);
          
        })();
      }, []);
    

    return (
        <div className="search-bar">
            <input className="search-input" placeholder="Search clubs..." value={club} onChange={async e => await changeText(e)} />
            <div className="results" style={{backgroundColor: searchedClubs.length !== 0 ? "rgba(41, 33, 45, .9)" : "transparent", borderRadius: searchedClubs.length !== 0 ? "16px" : "40px"}}>
                {searchedClubs.map((club, idx) => {
                    const inClub = checkIfInClub(club.club_id);
                    console.log(inClub); 
                    return (
                        <div className="result" key={idx} onClick={async () => inClub ? navigate(`/clubs/${club.club_id}`) : await joinClub(club.club_id, club.club_name, club.sport)}>
                            {SPORTS[club.sport]}
                            <h3>{club.club_name}</h3>

                            <h3>{club.people}</h3>

                            {!inClub && <FontAwesomeIcon 
                                icon={faUserPlus}
                            />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};