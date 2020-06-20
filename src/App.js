import React from 'react';
import './styles.css';
import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepository(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'TESTE 1',
      url: 'aaa.com.br',
      techs: ['a', 'b'],
    });

    const repository = response.data;

    setRepository([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    await api.delete(`repositories/${id}`);

    const index = repositories.findIndex((repository) => repository.id == id);

    const repositoriesDelete = repositories;

    repositoriesDelete.splice(index, 1);

    setRepository([...repositoriesDelete]);
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
