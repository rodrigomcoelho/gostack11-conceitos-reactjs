import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() =>
  {
    api.get('/repositories').then(({ data }) => setRepositories(data));
  },[]);

  async function handleAddRepository() {
    const respository = { 
      title: `Repositorio ${new Date()}`, 
      url: `http://github.com/rodrigocoelho/${new Date()}`,
      techs: ['ReactJS', 'React Native'],
    };

    const { data } = await api.post('/repositories', respository);
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repo => repo.id !== id));
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          (<li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
