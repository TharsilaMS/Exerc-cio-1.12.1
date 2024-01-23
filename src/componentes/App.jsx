import React, { useState, useEffect } from 'react';
import Button from './Button';
import Mensagem from './Mensagem';
import './App.css';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [mensagens, setMensagens] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8080');
        setMensagens(response.data);
        setErro(null); 
      } catch (error) {
        console.error('Erro ao obter mensagens do servidor:', error);
        setErro('Erro ao carregar mensagens !'); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="chat">
      <div className="header">
        <Button />
        <h3>Meu Chat</h3>
      </div>
      <div className="content">
        {loading && (
          <div>
            <div className='skeleton-loader'></div>
            <div className='skeleton-loader'></div>
            <div className='skeleton-loader'></div>
          </div>
        )}
        {!loading && !erro && (
          <ul>
            {mensagens.map(mensagem => (
              <Mensagem
                key={mensagem.id}
                mensagem={mensagem.mensagem}
                visualizado={mensagem.visualizado}
                remetente={mensagem.remetente}
              />
            ))}
          </ul>
        )}
        {erro && (
          <div className="erro-mensagem">
            {erro}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
