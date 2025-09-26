import React from 'react';
import Header from './components/Header';
import GtinCard from './components/GtinCard';
import Footer from './components/Footer';

function App() {
  const types = ['GTIN-14', 'GTIN-12', 'GTIN-13', 'GTIN-8'];

  return (
    <div className="min-h-screen flex flex-col bg-slate-500">
      <Header />
      <div className="flex-1 flex flex-wrap justify-center gap-4 px-4">
        {types.map((type) => (
          <GtinCard key={type} type={type} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;
