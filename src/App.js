import React, { useState, useEffect } from "react";

import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const getRepositories =  async () => {
      const response = await api.get('/repositories');
      setRepositories(response.data);
    };

    getRepositories();
  }, []);

  async function handleAddRepository() {
    try {
      const response = await api.post("/repositories", {
        url: "https://github.com/luisfscoelho",
        title: "Go Stack",
        techs: ["JavaScript", "React", "Node.js"],
      });
  
      setRepositories([...repositories, response.data]);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`/repositories/${id}`);
      setRepositories(
        repositories.filter((repository) => repository.id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
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
