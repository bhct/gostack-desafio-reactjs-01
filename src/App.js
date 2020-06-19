import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    handleRepositories();
  }, []);

  async function handleRepositories() {
    const { data } = await api.get("/repositories");

    setRepositories(data);
  }

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };

    const { data } = await api.post("/repositories", repository);

    setRepositories(data);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    handleRepositories();
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {/* <li>
          Desafio ReactJS
          <button onClick={() => handleRemoveRepository(1)}>Remover</button>
        </li> */}

        {repositories.length > 0 &&
          repositories.map((repository) => (
            <li key={repository.id}>
              {repository.title}
              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
