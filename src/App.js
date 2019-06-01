import React from "react";
import "./App.css";
import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";

const mutation = gql`
  mutation createTaco($name: String!, $description: String!) {
    createTaco($name: String!, $description: String!) {
      id name description
    }
  }
`;

const query = gql`
  query listTacos {
    listTacos {
      items {
        id
        name
        description
      }
    }
  }
`;

function App() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { loading, data } = useQuery(query);
  const [createTaco, { error }] = useMutation(mutation, {
    variables: { name, description },
    refetchQueries: ["listTacos"]
  });
  if (error) {
    console.log({ error });
  }
  if (loading) return <h2>Loading...</h2>;
  return (
    <div className="App">
      <input onChange={e => setName(e.target.value)} />
      <input onChange={e => setDescription(e.target.value)} />
      <button onClick={createTaco}>Create</button>

      {data.listTacos.items.map((item, index) => {
        <div key={item.id}>
          <h2>{item.name}</h2>
          <h2>{item.description}</h2>
        </div>;
      })}
    </div>
  );
}

export default App;
