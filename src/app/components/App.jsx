'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);


  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
        setPokemonData(res.data.results);
        setFilteredData(res.data.results);  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchPokemonData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filtered = pokemonData.filter(pokemon =>
      pokemon.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  return (
    <div className="App container mx-auto">
      <h1 className="text-center text-4xl my-4">Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        className="p-2 border rounded mb-4"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="grid grid-cols-3 gap-4 p-4">
        {filteredData.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

const PokemonCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      const res = await axios.get(pokemon.url);
      setPokemonDetails(res.data);
    };
    fetchPokemonDetails();
  }, [pokemon.url]);

  if (!pokemonDetails) return <div>Loading...</div>;

  return (
    <div className="card p-4 border rounded-lg shadow-lg">
      <img
        src={pokemonDetails.sprites.front_default}
        alt={pokemonDetails.name}
        className="mx-auto mb-4"
      />
      <h2 className="text-xl text-center">{pokemonDetails.name}</h2>
    </div>
  );
};

export default App;
