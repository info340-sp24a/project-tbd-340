import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, child, remove } from "firebase/database";
import { Link } from 'react-router-dom';

export function PCPart(props) {
    const [buildState, setBuildState] = useState([]);
    const { partName, currUser, onDataReady } = props;
    const db = getDatabase();

    const fetchBuilds = async () => {
      try {
        const snapshot = await get(child(ref(db), `builds/${currUser.uid}`));
        const buildRefObject = snapshot.val();

        if (buildRefObject) {
          const userComponents = Object.entries(buildRefObject).map(([keyString, PCObj]) => {
            // console.log("This is PCObj:", PCObj);
            return { ...PCObj, firebaseKey: keyString };
          });
          setBuildState(userComponents);
        } else {
          setBuildState([]);
        }
        onDataReady();
      } catch (error) {
        console.error("Error fetching builds: ", error);
      }
    };

    useEffect(() => {
      fetchBuilds();
    }, [db, currUser.uid]);

    // helper function to make 'Component' look better.
    function capitalizeFirstLetter(string) {
      let returnedString = string.replace(/-/g, ' ');
      return returnedString.charAt(0).toUpperCase() + returnedString.slice(1);
    }

    

    function createBuildTable() {
        const foundPart = buildState.find((part) => part.Component === partName);
        
        // Delete the part from Firebase
        const handleDelete = () => {
            let fb = foundPart.firebaseKey;
            remove(ref(db, 'builds/' + currUser.uid + "/" +fb)); 
            fetchBuilds();
        }
     
      if (foundPart) {
        return (
          <tr className="item">
            <th scope="row" className="component">{capitalizeFirstLetter(partName)}</th>
            <td className="product">
              <img src={"/img/icons/" + foundPart.Component + ".png"} alt={foundPart.Component.replace(/-/g, ' ') + " placeholder"} />
            </td>
            <td className="Title">{foundPart.name}</td>
            <td className="Price">{"$" + foundPart.price}</td>
            <td className="Link">
              <a href={"https://www.amazon.com/s?k=" + foundPart.name} target="_blank" rel="noreferrer">Buy Now</a>
            </td>
            <td className="Remove">
              <button type='button' className="fa fa-trash" onClick={handleDelete}></button>
            </td>
          </tr>
        );
      }

      return (
        <tr className="item">
          <th scope="row" className="component">{capitalizeFirstLetter(partName)}</th>
          <td className="addButton"><Link to='/search'><button>Add Component</button></Link></td>
          <td className="Title"></td>
          <td className="Price"></td>
        </tr>
      );
    }

    return <tbody>{createBuildTable()}</tbody>;
  }